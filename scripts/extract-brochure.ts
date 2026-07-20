/**
 * extract-brochure.ts
 *
 * Local-only pipeline that turns project PDF brochures into structured JSON
 * (`src/lib/projects.json`) + optimized cover images (`public/covers/*.webp`).
 *
 * Why this exists: PDFs are heavy. Shipping them in `public/` blows past
 * Vercel's hobby tier storage/hobby limits, so they live externally on
 * Vercel Blob / GitHub Releases. This script reads them locally (from
 * `brochures-source/`) OR fetches them from a remote URL list, extracts the
 * text with `pdfjs-dist`, then asks Gemini to structure it into the
 * `ProjectBrochure` shape. Only the small JSON + webp covers ever reach git.
 *
 * Usage:  npm run extract
 * Env:    GEMINI_API_KEY  (required for AI extraction)
 *         GITHUB_BLOB_URLS (optional JSON mapping slug -> external PDF URL,
 *                           used as fallback when the local file is missing)
 */

import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join, basename, extname, dirname } from "node:path";

const require = createRequire(import.meta.url);

// --- pdfjs-dist (ESM) ---
const pdfjs: typeof import("pdfjs-dist") = await import("pdfjs-dist");
// In Node we point workerSrc at the bundled worker file path. pdfjs will fall
// back to its "fake worker" (main-thread) when it can't spawn a real one,
// which is fine for text extraction + cover rendering in a script context.
const pdfWorkerPath = join(
  dirname(require.resolve("pdfjs-dist/package.json")),
  "build",
  "pdf.worker.min.mjs"
);
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerPath;

const { GoogleGenerativeAI } = await import("@google/generative-ai");
const sharp = (await import("sharp")).default;

// ----------------------------------------------------------------------------
// Paths
// ----------------------------------------------------------------------------
const ROOT = process.cwd();
const SOURCE_DIR = join(ROOT, "brochures-source");
const COVERS_DIR = join(ROOT, "public", "covers");
const OUT_JSON = join(ROOT, "src", "lib", "projects.json");
const TYPE_FILE = join(ROOT, "src", "lib", "types.ts");

// ----------------------------------------------------------------------------
// External URL configuration
// ----------------------------------------------------------------------------
// Pattern used for the brochureUrl written into projects.json. The slug is
// interpolated in. Override the host via env if you switch providers.
const BLOB_BASE =
  process.env.BLOB_BASE_URL ??
  "https://your-blob-store.vercel-storage.com/brochures";

// Optional slug -> external PDF URL map (lets us pull source PDFs from a
// GitHub release when the local file isn't present). Read from env JSON.
type BlobUrlMap = Record<string, string>;
const GITHUB_BLOB_URLS: BlobUrlMap = parseBlobUrls(process.env.GITHUB_BLOB_URLS);

function parseBlobUrls(raw?: string): BlobUrlMap {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return parsed as BlobUrlMap;
  } catch {
    // Also accept the `KEY=url,KEY=url` shorthand.
    const out: BlobUrlMap = {};
    for (const pair of raw.split(",")) {
      const [k, v] = pair.split("=");
      if (k && v) out[k.trim()] = v.trim();
    }
    return out;
  }
  return {};
}

// ----------------------------------------------------------------------------
// CLI args + mode selection
// ----------------------------------------------------------------------------
// `--local` (or a missing GEMINI_API_KEY) switches the pipeline into offline
// regex mode: no Gemini calls, no network. Structured fields are pulled out
// of the raw PDF text with pattern matching only.
const ARGS_LOCAL = process.argv.slice(2).includes("--local");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const LOCAL_MODE = ARGS_LOCAL || !GEMINI_API_KEY;

let genAI: InstanceType<typeof GoogleGenerativeAI> | null = null;
if (!LOCAL_MODE && GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
}
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

// ----------------------------------------------------------------------------
// Types (mirror src/lib/types.ts — re-read at runtime to stay in sync)
// ----------------------------------------------------------------------------
interface ProjectBrochure {
  slug: string;
  name: string;
  nameBn: string;
  location: string;
  locationBn: string;
  city: "Dhaka" | "Chandpur";
  status: "ongoing" | "upcoming" | "completed";
  flatSize: string;
  landArea: string;
  floors: string;
  facing: string;
  amenities: string[];
  description: string;
  descriptionBn: string;
  image: string;
  images?: string[];
  brochureUrl: string;
  coverImage: string;
  handover?: string;
  mapEmbedUrl?: string;
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

/** Recursively collect *.pdf paths under a directory. */
function scanPdfs(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...scanPdfs(full));
    else if (entry.toLowerCase().endsWith(".pdf")) out.push(full);
  }
  return out;
}

/** Convert "S & D Bondhon Tower.pdf" -> "bondhon-tower". */
function slugFromFile(file: string): string {
  let base = basename(file, extname(file));
  base = base.replace(/^S\s*&\s*D\s*/i, "").replace(/^S&D\s*/i, "");
  return base
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Build a Google Maps embed URL from a free-text location string.
 * Uses the no-API-key embed endpoint so it works without a key:
 *   https://www.google.com/maps?q=<encoded>&output=embed
 */
function buildMapEmbedUrl(location: string, city: string): string {
  const q = `${location} ${city} Bangladesh`.trim().replace(/\s+/g, " ");
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

/** Fetch a remote PDF as a Uint8Array. */
async function fetchPdf(url: string): Promise<Uint8Array> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch ${url} -> HTTP ${res.status}`);
  const buf = new Uint8Array(await res.arrayBuffer());
  return buf;
}

/** Pull text out of a PDF buffer using pdfjs-dist (no worker spawn). */
async function extractPdfText(data: Uint8Array): Promise<string> {
  // v6: pdfjs doesn't expose `disableWorker`; we let it use the fake worker.
  // `useSystemFonts: true` avoids shipping custom standard-font data in Node.
  const loadingTask = pdfjs.getDocument({
    data,
    useSystemFonts: true,
  });
  const doc = await loadingTask.promise;

  let text = "";
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    text += content.items
      .map((it) => ("str" in it ? (it as { str: string }).str : ""))
      .join(" ");
    text += "\n\n";
  }
  await loadingTask.destroy();
  return text.trim();
}

/** Render the first page of the PDF to a webp cover under 300KB. */
async function renderCover(data: Uint8Array, slug: string): Promise<string> {
  const loadingTask = pdfjs.getDocument({ data, useSystemFonts: true });
  const doc = await loadingTask.promise;

  const page = await doc.getPage(1);
  // 2x scale gives crisp-enough cover for typical 1-page brochures.
  const viewport = page.getViewport({ scale: 2 });
  const canvas = documentCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d")!;
  // pdfjs v4+ needs `canvas` + `canvasContext` on Node.
  await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

  const png = canvas.toBuffer("image/png");
  await loadingTask.destroy();

  const outPath = join(COVERS_DIR, `${slug}.webp`);
  // Quality ladder: walk down until under 300KB, floor at width 600.
  let width = Math.min(1600, Math.round(viewport.width));
  for (let i = 0; i < 5; i++) {
    await sharp(png)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 - i * 10 })
      .toFile(outPath);
    const size = statSync(outPath).size;
    if (size <= 300 * 1024 || width <= 600) break;
    width = Math.round(width * 0.85);
  }
  return `/covers/${slug}.webp`;
}

/**
 * Node-side canvas shim backed by the optional `canvas` npm package.
 * We intentionally use a local minimal type (not `typeof import("canvas")`)
 * so typecheck doesn't fail when the package isn't installed.
 */
interface NodeCanvas {
  width: number;
  height: number;
  getContext(type: string): CanvasContext | null;
  toBuffer(format: string): Buffer;
}
interface CanvasContext {
  fillRect: (...a: unknown[]) => void;
  [k: string]: unknown;
}

function documentCanvas(w: number, h: number): NodeCanvas {
  let canvasLib: { createCanvas(w: number, h: number): NodeCanvas } | null = null;
  try {
    canvasLib = require("canvas");
  } catch {
    canvasLib = null;
  }
  if (!canvasLib) {
    throw new Error(
      "Cover rendering needs the `canvas` npm package. Install it with: npm i -D canvas"
    );
  }
  return canvasLib.createCanvas(w, h);
}

// ----------------------------------------------------------------------------
// Gemini extraction
// ----------------------------------------------------------------------------

const EXTRACTION_PROMPT = `You extract structured real-estate project data from a PDF brochure's raw text.

Return STRICT JSON only (no markdown, no prose) that matches this TypeScript type:

interface ProjectBrochure {
  slug: string;            // kebab-case id, e.g. "bondhon-tower"
  name: string;            // English project name
  nameBn: string;          // Bengali project name (use Bengali script)
  location: string;        // full street-level address
  locationBn: string;      // same in Bengali
  city: "Dhaka" | "Chandpur";
  status: "ongoing" | "upcoming" | "completed";
  flatSize: string;        // e.g. "1130, 1420 sft"
  landArea: string;        // e.g. "5 Katha"
  floors: string;          // e.g. "G+9"
  facing: string;          // e.g. "South-East"
  amenities: string[];     // short feature names
  description: string;     // 1-2 sentence English marketing copy
  descriptionBn: string;   // Bengali equivalent
}

Rules:
- If a field is not present in the text, use an empty string (arrays -> []).
- Do NOT include brochureUrl or coverImage — the caller fills those.
- Output ONLY the JSON object.`;

async function extractWithGemini(
  text: string,
  fallbackSlug: string
): Promise<Omit<ProjectBrochure, "image" | "images" | "brochureUrl" | "coverImage" | "handover" | "mapEmbedUrl">> {
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: { responseMimeType: "application/json", temperature: 0 },
  });

  const prompt = `${EXTRACTION_PROMPT}

Suggested slug (override only if the brochure clearly states a different project name):
${fallbackSlug}

Brochure text:
"""
${text.slice(0, 30000)}
"""`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const parsed = JSON.parse(raw);

  // Guarantee required keys exist so the rest of the pipeline doesn't blow up.
  return {
    slug: String(parsed.slug ?? fallbackSlug),
    name: String(parsed.name ?? ""),
    nameBn: String(parsed.nameBn ?? ""),
    location: String(parsed.location ?? ""),
    locationBn: String(parsed.locationBn ?? ""),
    city: parsed.city === "Chandpur" ? "Chandpur" : "Dhaka",
    status: ["ongoing", "upcoming", "completed"].includes(parsed.status)
      ? parsed.status
      : "ongoing",
    flatSize: String(parsed.flatSize ?? ""),
    landArea: String(parsed.landArea ?? ""),
    floors: String(parsed.floors ?? ""),
    facing: String(parsed.facing ?? ""),
    amenities: Array.isArray(parsed.amenities) ? parsed.amenities : [],
    description: String(parsed.description ?? ""),
    descriptionBn: String(parsed.descriptionBn ?? ""),
  };
}

// ----------------------------------------------------------------------------
// Offline regex extraction (--local)
// ----------------------------------------------------------------------------

const LOCATION_KEYWORDS = [
  "Aftabnagar", "Aftab Nagar", "Chandpur", "Taltola", "Taltola Bazar",
  "Block-C", "Block C", "Block-H", "Block H", "Badda", "Merul Badda",
  "Jheelpar", "Faridganj", "Guakhula", "Hazi Wakiluddin Road",
  "Merul", "Rampura", "Banasree", "Niketan", "Gulshan",
];

// Bengali digit normalization (০-৯ -> 0-9) so Total Flat counts survive.
function normalizeDigits(s: string): string {
  return s.replace(/[\u09E6-\u09EF]/g, (d) => String(d.charCodeAt(0) - 0x09E6));
}

/** offline extractor: pure regex, no Gemini, no network. */
function extractOffline(
  text: string,
  fallbackSlug: string,
  sourceLabel: string
): Omit<ProjectBrochure, "image" | "images" | "brochureUrl" | "coverImage" | "handover" | "mapEmbedUrl"> {
  const t = normalizeDigits(text);

  // landArea — "5 Katha", "4.5 kata", "৭ কাঠা"
  const landMatch =
    t.match(/(\d+(?:\.\d+)?)\s*(katha|kata|কাঠা)/i);
  const landArea = landMatch ? `${landMatch[1]} Katha` : "";

  // buildingHeight — "G+9", "G + 9", "9 storied"
  const gplus = t.match(/G\s*\+\s*(\d+)/i);
  const storied = t.match(/(\d+)\s*storied/i);
  const floors = gplus ? `G+${gplus[1]}` : storied ? `G+${storied[1]}` : "";

  // flatSizes — every "1130 sft", "1420 sqft"
  const flatMatches = [...t.matchAll(/(\d{3,4})\s*(?:sft|sqft)\b/gi)].map(
    (m) => m[1]
  );
  const flatSizes = [...new Set(flatMatches)];
  const flatSize = flatSizes.join(", ");

  // facing
  const facingMatch = t.match(/(South-East|South-West|North-East|North-West|South|North|East|West)/i);
  const facing = facingMatch ? facingMatch[1] : "";

  // totalFlats — "Total Flats: 24", "Total Flat 24"
  const totalMatch = t.match(/Total\s*Flats?[^0-9]*(\d+)/i);
  const totalFlats = totalMatch ? Number(totalMatch[1]) : 0;

  // location — scan lines for known keywords
  const knownLocation = pickLocationLine(t);

  // city from location
  const city: "Dhaka" | "Chandpur" = /chandpur/i.test(knownLocation) ||
    /chandpur/i.test(fallbackSlug) ||
    /faridganj|guakhula/i.test(t)
    ? "Chandpur"
    : "Dhaka";

  // title / name — fallback to filename slug
  const title = fallbackSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // amenities — keyword presence check
  const AMENITY_KEYWORDS = ["Lift", "Generator", "Parking", "Mosque", "Rooftop"];
  const amenities = AMENITY_KEYWORDS.filter((kw) =>
    new RegExp(`\\b${kw}\\b`, "i").test(t)
  );

  // status heuristic
  const status: "ongoing" | "upcoming" | "completed" = /ongoing|handing over soon/i.test(t)
    ? "ongoing"
    : /upcoming|coming soon/i.test(t)
    ? "upcoming"
    : "completed";

  // description fallback — first 2 non-empty paragraphs
  const paragraphs = t
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 2);
  const description = paragraphs.join(" ").slice(0, 400);

  return {
    slug: fallbackSlug,
    name: title,
    nameBn: "",
    location: knownLocation,
    locationBn: "",
    city,
    status,
    flatSize,
    landArea,
    floors,
    facing,
    amenities,
    description,
    descriptionBn: "",
  };

  function pickLocationLine(text: string): string {
    // Prefer a line that contains one of the known keywords; keep the longest.
    const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    let best = "";
    for (const line of lines) {
      for (const kw of LOCATION_KEYWORDS) {
        if (new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(line)) {
          if (line.length > best.length) best = line;
          break;
        }
      }
    }
    return best.slice(0, 200);
  }
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
  console.log(`[extract] root            : ${ROOT}`);
  console.log(`[extract] source dir      : ${SOURCE_DIR}`);
  console.log(`[extract] covers dir      : ${COVERS_DIR}`);
  console.log(`[extract] out json        : ${OUT_JSON}`);
  console.log(`[extract] blob base       : ${BLOB_BASE}`);
  console.log(`[extract] remote fallback : ${Object.keys(GITHUB_BLOB_URLS).length} slug(s)`);
  console.log(`[extract] mode             : ${LOCAL_MODE ? "LOCAL (offline regex)" : "GEMINI (AI)"}`);
  console.log("");

  // Recreate covers dir so stale files don't linger.
  if (existsSync(COVERS_DIR)) rmSync(COVERS_DIR, { recursive: true, force: true });
  mkdirSync(COVERS_DIR, { recursive: true });
  mkdirSync(join(ROOT, "src", "lib"), { recursive: true });

  // Sanity-check the type file exists so the script + frontend stay in sync.
  if (!existsSync(TYPE_FILE)) {
    console.warn(`[extract] WARN: ${TYPE_FILE} not found. Pipeline output may drift from the frontend type.`);
  }

  // Gather inputs.
  const localPdfs = scanPdfs(SOURCE_DIR);
  const remoteSlugs = Object.keys(GITHUB_BLOB_URLS).filter(
    (s) => !localPdfs.some((f) => slugFromFile(f) === s)
  );

  type Input = { slug: string; source: string; load: () => Promise<Uint8Array> };
  const inputs: Input[] = [
    ...localPdfs.map((file) => ({
      slug: slugFromFile(file),
      source: `local:${basename(file)}`,
      load: async () => new Uint8Array(readFileSync(file)),
    })),
    ...remoteSlugs.map((slug) => ({
      slug,
      source: `remote:${GITHUB_BLOB_URLS[slug]}`,
      load: async () => fetchPdf(GITHUB_BLOB_URLS[slug]),
    })),
  ];

  if (inputs.length === 0) {
    console.error(
      `[extract] No PDFs found. Put *.pdf files in ${SOURCE_DIR} or set GITHUB_BLOB_URLS.`
    );
    process.exit(1);
  }

  console.log(`[extract] processing ${inputs.length} brochure(s):\n`);
  const results: ProjectBrochure[] = [];

  for (const input of inputs) {
    const { slug, source, load } = input;
    process.stdout.write(`  - ${slug.padEnd(28)} (${source}) ... `);
    try {
      const data = await load();
      const text = await extractPdfText(data);

      let coverPath = "";
      try {
        coverPath = await renderCover(data, slug);
      } catch (err) {
        // Cover is best-effort; carry on without it.
        console.warn(`\n      cover skipped: ${(err as Error).message}`);
        coverPath = "";
      }

      const extracted = LOCAL_MODE
        ? extractOffline(text, slug, source)
        : await extractWithGemini(text, slug);
      const finalSlug = extracted.slug || slug;

      const project: ProjectBrochure = {
        ...extracted,
        slug: finalSlug,
        image: coverPath,
        images: coverPath ? [coverPath] : undefined,
        brochureUrl: `${BLOB_BASE}/${finalSlug}.pdf`,
        coverImage: coverPath,
        // handover intentionally left empty — fill in manually in projects.json.
        handover: "",
        mapEmbedUrl: buildMapEmbedUrl(extracted.location, extracted.city),
      };

      results.push(project);
      console.log(`ok  (${text.length} chars, cover=${coverPath || "none"})`);
    } catch (err) {
      console.error(`FAILED\n      ${(err as Error).message}`);
    }
  }

  // Sort for stable diffs.
  results.sort((a, b) => a.slug.localeCompare(b.slug));
  writeFileSync(OUT_JSON, JSON.stringify(results, null, 2) + "\n", "utf8");

  console.log(`\n[extract] wrote ${results.length} project(s) -> ${OUT_JSON}`);
  console.log(`[extract] covers -> ${COVERS_DIR}`);
  console.log(`[extract] PDFs were NOT copied to public/ or dist/. brochureUrl points to ${BLOB_BASE}/...`);
  console.log(`[extract] done.`);
}

main().catch((err) => {
  console.error("\n[extract] fatal:", err);
  process.exit(1);
});
