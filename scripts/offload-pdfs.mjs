// Offload heavy PDF brochures from ./public to a GitHub release.
// Usage: node scripts/offload-pdfs.mjs
import { spawnSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const REPO = "DelwarOfficial/sweet-home";
const TAG = "v1.0.0-assets";
const PUBLIC_ROOT = "public";

function gh(args) {
  const res = spawnSync("gh", ["--repo", REPO, ...args], { encoding: "utf8" });
  if (res.status !== 0) {
    throw new Error(`gh ${args.join(" ")} failed:\n${res.stderr || res.stdout}`);
  }
  return (res.stdout || "").trim();
}

// 1. Recursively scan ./public for *.pdf (paths may contain spaces, &, commas)
function scan(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...scan(full));
    else if (entry.toLowerCase().endsWith(".pdf")) out.push(full);
  }
  return out;
}

const pdfs = scan(PUBLIC_ROOT).sort();
console.log(`Found ${pdfs.length} PDF file(s):`);
pdfs.forEach((p) => console.log("  " + p));

// 2. Ensure release exists
try {
  gh(["release", "view", TAG]);
  console.log(`\nRelease ${TAG} already exists.`);
} catch {
  console.log(`\nCreating release ${TAG}...`);
  gh([
    "release", "create", TAG,
    "--title", "Project Assets",
    "--notes", "Heavy PDF Brochures Storage",
  ]);
  console.log(`Release ${TAG} created.`);
}

// 3. Upload each PDF (gh uses the file basename as the asset name)
const map = [];
for (const file of pdfs) {
  console.log(`\nUploading: ${file}`);
  gh(["release", "upload", TAG, file, "--clobber"]);
  const base = file.split(/[\\/]/).pop(); // basename
  const encoded = encodeURIComponent(base).replace(/%20/g, "%20");
  const url = `https://github.com/${REPO}/releases/download/${TAG}/${encoded}`;
  map.push({ local: file, basename: base, url });
  console.log(`  -> ${url}`);
}

// 4. Write mapping for the next step (link replacement)
const fs = await import("node:fs");
fs.writeFileSync("pdf-asset-map.json", JSON.stringify(map, null, 2));
console.log(`\nWrote pdf-asset-map.json with ${map.length} entries.`);
