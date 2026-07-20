/**
 * verify.ts — pre-deploy sanity checks.
 *
 * Runs locally or in CI. Exits non-zero if any check fails so a broken
 * catalog never ships. Run via `npm run verify`.
 *
 * Checks:
 *   1. src/lib/projects.json exists and every brochureUrl is external
 *      (not a /public path).
 *   2. Every project has a non-empty handover.
 *   3. Every mapEmbedUrl looks like a valid Google Maps embed.
 *   4. Every public/covers/*.webp is <= 300KB.
 *   5. No PDFs anywhere under public/.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const PROJECTS_JSON = join(ROOT, "src", "lib", "projects.json");
const COVERS_DIR = join(ROOT, "public", "covers");
const PUBLIC_DIR = join(ROOT, "public");

const MAX_COVER_BYTES = 300 * 1024;

interface ProjectRecord {
  slug?: string;
  name?: string;
  brochureUrl?: string;
  handover?: string;
  mapEmbedUrl?: string;
}

const failures: string[] = [];
const warnings: string[] = [];

function fail(msg: string) {
  failures.push(msg);
  console.error(`  ✗ ${msg}`);
}
function warn(msg: string) {
  warnings.push(msg);
  console.warn(`  ! ${msg}`);
}
function ok(msg: string) {
  console.log(`  ✓ ${msg}`);
}

console.log("\n[verify] running pre-deploy checks...\n");

// ---------------------------------------------------------------------------
// 1. projects.json exists + external brochureUrl
// ---------------------------------------------------------------------------
console.log("[1/5] projects.json + external brochureUrl");
if (!existsSync(PROJECTS_JSON)) {
  fail(`${relative(ROOT, PROJECTS_JSON)} missing. Run \`npm run extract -- --local\` first.`);
} else {
  let projects: ProjectRecord[] = [];
  try {
    projects = JSON.parse(readFileSync(PROJECTS_JSON, "utf8"));
    ok(`${relative(ROOT, PROJECTS_JSON)} parsed (${projects.length} projects).`);
  } catch (err) {
    fail(`JSON parse error: ${(err as Error).message}`);
  }

  if (projects.length === 0) {
    warn("projects.json is empty — page will render with no projects.");
  }

  let badUrlCount = 0;
  let missingUrlCount = 0;
  for (const p of projects) {
    const url = p.brochureUrl ?? "";
    if (!url) {
      // Soft: upcoming projects often have no brochure yet.
      warn(`${p.slug ?? "(unknown)"}: brochureUrl missing.`);
      missingUrlCount++;
      continue;
    }
    // External = starts with http(s)://. Anything else (incl. /public, /, relative) fails.
    if (!/^https?:\/\//i.test(url)) {
      fail(`${p.slug}: brochureUrl must be external, got "${url}".`);
      badUrlCount++;
    }
    // Explicit guard against accidental public/ leakage.
    if (url.includes("/public/") || url.startsWith("/covers/") || url.startsWith("/")) {
      fail(`${p.slug}: brochureUrl looks like a local path, got "${url}".`);
      badUrlCount++;
    }
  }
  if (badUrlCount === 0 && missingUrlCount === 0 && projects.length > 0) {
    ok("All brochureUrls are external.");
  } else if (badUrlCount === 0 && missingUrlCount > 0) {
    ok(`All present brochureUrls are external (${missingUrlCount} missing — allowed).`);
  }

  // -----------------------------------------------------------------------
  // 2. handover non-empty
  // -----------------------------------------------------------------------
  console.log("\n[2/5] handover populated");
  let emptyHandover = 0;
  for (const p of projects) {
    if (!p.handover || !p.handover.trim()) {
      emptyHandover++;
      warn(`${p.slug}: handover empty.`);
    }
  }
  if (emptyHandover === 0) {
    ok("All projects have a handover value.");
  } else {
    warn(`${emptyHandover} project(s) missing handover (allowed but not shippable long-term).`);
  }

  // -----------------------------------------------------------------------
  // 3. mapEmbedUrl valid
  // -----------------------------------------------------------------------
  console.log("\n[3/5] mapEmbedUrl valid");
  let badMap = 0;
  for (const p of projects) {
    const url = p.mapEmbedUrl ?? "";
    if (!url) {
      badMap++;
      fail(`${p.slug}: mapEmbedUrl missing.`);
      continue;
    }
    // Must be an https URL hosted on Google Maps (embed or maps).
    const validHost = /^https:\/\/(www\.)?google(\.[a-z]{2,}){1,}\/maps(\?|\/|$)/i.test(url);
    if (!validHost) {
      badMap++;
      fail(`${p.slug}: mapEmbedUrl not a Google Maps URL, got "${url}".`);
      continue;
    }
    if (!/[?&]output=embed\b/.test(url) && !/\/embed\b/.test(url)) {
      badMap++;
      fail(`${p.slug}: mapEmbedUrl missing output=embed param.`);
    }
  }
  if (badMap === 0 && projects.length > 0) {
    ok("All mapEmbedUrls valid.");
  }
}

// ---------------------------------------------------------------------------
// 4. cover sizes
// ---------------------------------------------------------------------------
console.log("\n[4/5] cover images <= 300KB");
if (!existsSync(COVERS_DIR)) {
  warn(`${relative(ROOT, COVERS_DIR)} not found — covers will be missing.`);
} else {
  const covers = readdirSync(COVERS_DIR).filter((f) => f.toLowerCase().endsWith(".webp"));
  if (covers.length === 0) {
    warn("No .webp covers found.");
  } else {
    let oversized = 0;
    for (const f of covers) {
      const full = join(COVERS_DIR, f);
      const size = statSync(full).size;
      if (size > MAX_COVER_BYTES) {
        oversized++;
        fail(`${relative(ROOT, full)} is ${(size / 1024).toFixed(0)}KB (limit 300KB).`);
      }
    }
    if (oversized === 0) {
      ok(`${covers.length} cover(s) within 300KB limit.`);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. No PDFs under public/
// ---------------------------------------------------------------------------
console.log("\n[5/5] no PDFs in public/");
function scanPdfs(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...scanPdfs(full));
    else if (extname(entry).toLowerCase() === ".pdf") out.push(full);
  }
  return out;
}
const pdfs = scanPdfs(PUBLIC_DIR);
if (pdfs.length === 0) {
  ok("No PDFs under public/.");
} else {
  for (const f of pdfs) fail(`${relative(ROOT, f)} must not be committed — PDFs live externally.`);
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log("\n[verify] summary");
console.log(`  failures: ${failures.length}`);
console.log(`  warnings: ${warnings.length}`);

if (failures.length > 0) {
  console.error("\n[verify] FAILED. Fix the issues above before deploying.\n");
  process.exit(1);
}
if (warnings.length > 0) {
  console.warn("\n[verify] Passed with warnings.\n");
} else {
  console.log("\n[verify] All checks passed.\n");
}
process.exit(0);
