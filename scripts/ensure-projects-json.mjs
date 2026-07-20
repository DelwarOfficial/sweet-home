/**
 * Prebuild guard.
 *
 * `src/lib/projects.json` is committed so Vercel can build without running
 * the extractor — but if a contributor regenerates it locally and forgets to
 * commit, or removes it, the Vite build fails with an opaque Rollup
 * "Could not resolve ./projects.json" error. This script fails fast with a
 * clear instruction instead.
 *
 * Wired via the `prebuild` npm lifecycle hook so `npm run build` (and thus
 * Vercel) runs it automatically.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { relative } from "node:path";

const FILE = new URL("../src/lib/projects.json", import.meta.url);
const FILE_PATH = fileURLToPath(FILE);
const REL = relative(process.cwd(), FILE_PATH);

if (!existsSync(FILE_PATH)) {
  console.error(
    `\n[prebuild] ERROR: ${REL} not found.\n` +
      `            Run \`npm run extract -- --local\` first, then commit the file.\n`
  );
  process.exit(1);
}

console.log(`[prebuild] OK: ${REL} present.`);
