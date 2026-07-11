// Replace local PDF brochure paths in source with GitHub release URLs.
// Matches release assets by exact file size (bulletproof) and rewrites references.
import { spawnSync } from "node:child_process";
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPO = "DelwarOfficial/sweet-home";
const TAG = "v1.0.0-assets";

function gh(args) {
  const res = spawnSync("gh", args, { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`gh failed: ${res.stderr || res.stdout}`);
  return res.stdout;
}

// 1. Get release assets with their real download URLs + sizes
const release = JSON.parse(gh(["api", `repos/DelwarOfficial/sweet-home/releases/tags/${TAG}`]));
const assetBySize = new Map();
for (const a of release.assets) assetBySize.set(a.size, a.browser_download_url);
console.log(`Release has ${release.assets.length} assets.`);

// 2. Scan local public PDFs, match each to an asset by size
function scan(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...scan(full));
    else if (e.toLowerCase().endsWith(".pdf")) out.push(full);
  }
  return out;
}
const pdfs = scan("public");
const map = [];
for (const file of pdfs) {
  const size = statSync(file).size;
  const url = assetBySize.get(size);
  if (!url) throw new Error(`No release asset matches size ${size} for ${file}`);
  const rel = "/" + file.split(/[\\/]/).slice(1).join("/"); // public-relative path
  map.push({ local: rel, url });
  console.log(`  ${rel}  ->  ${url}`);
}

// 3. Replace references across all source files
function walk(dir, acc) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx|js|jsx)$/.test(e)) acc.push(full);
  }
  return acc;
}
const files = walk("src", []);
let changed = 0;
for (const f of files) {
  let content = readFileSync(f, "utf8");
  let c = content;
  for (const { local, url } of map) {
    if (c.includes(local)) {
      c = c.split(local).join(url);
      changed++;
    }
  }
  if (c !== content) writeFileSync(f, c);
}
console.log(`\nReplaced ${changed} reference(s) across ${files.length} source file(s).`);
