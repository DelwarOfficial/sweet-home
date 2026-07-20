/**
 * Postbuild step: render /sitemap.xml into dist/.
 *
 * Imports the pure `buildSitemap` helper + the committed projects.json so the
 * catalog of project URLs stays in sync with the rest of the app. Writes the
 * XML straight to dist/sitemap.xml (Vite copies `public/` first, so this runs
 * after and lands in the published output).
 *
 * Wired via the `postbuild` npm lifecycle hook.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const ORIGIN = process.env.SITE_ORIGIN ?? "https://sdsweethome.com";
const DIST_DIR = join(ROOT, "dist");
const PROJECTS_JSON = join(ROOT, "src", "lib", "projects.json");

if (!existsSync(DIST_DIR)) {
  console.warn("[write-sitemap] dist/ not found — skipping. Run after `vite build`.");
  process.exit(0);
}
if (!existsSync(PROJECTS_JSON)) {
  console.warn(`[write-sitemap] ${PROJECTS_JSON} not found — generating sitemap with static routes only.`);
}

// Inline the sitemap builder so this Node script doesn't have to transpile TS.
// Mirrors src/lib/sitemap.ts: STATIC_ROUTES + buildSitemap.
const STATIC_ROUTES = [
  "",
  "about",
  "projects",
  "projects/location/dhaka",
  "projects/location/chandpur",
  "enterprises",
  "media",
  "contact",
  "managing-director-message",
  "blog",
  "landowners",
];

const escapeXml = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function urlEntry(loc, origin, lastmod, priority) {
  const url = `${origin}/${loc}`.replace(/\/+$/, "") || origin;
  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function buildSitemap(projects, origin, lastmod) {
  const entries = [];
  for (const r of STATIC_ROUTES) entries.push(urlEntry(r, origin, lastmod, "0.8"));
  for (const p of projects) {
    if (!p.slug) continue;
    entries.push(urlEntry(`projects/${p.slug}`, origin, lastmod, "0.9"));
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

let projects = [];
if (existsSync(PROJECTS_JSON)) {
  try {
    projects = JSON.parse(readFileSync(PROJECTS_JSON, "utf8"));
  } catch (err) {
    console.error(`[write-sitemap] Failed to parse ${PROJECTS_JSON}:`, err.message);
    process.exit(1);
  }
}

const lastmod = new Date().toISOString().slice(0, 10);
const xml = buildSitemap(projects, ORIGIN.replace(/\/+$/, ""), lastmod);

mkdirSync(DIST_DIR, { recursive: true });
writeFileSync(join(DIST_DIR, "sitemap.xml"), xml, "utf8");
console.log(`[write-sitemap] wrote dist/sitemap.xml (${projects.length} project routes, origin=${ORIGIN})`);
