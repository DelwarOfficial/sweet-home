/**
 * Ambient declaration for the generated catalog.
 *
 * `src/lib/projects.json` is produced by `npm run extract` and is gitignored,
 * so TypeScript can't see it on a fresh clone. Declaring the module here lets
 * `import projects from "./projects.json"` type-check even when the file is
 * absent; Vite's JSON loader supplies the real contents at build time.
 *
 * Keep the shape in sync with `ProjectBrochure` in `src/lib/types.ts`.
 */
declare module "*/projects.json" {
  import type { ProjectBrochure } from "@/lib/types";
  const data: ProjectBrochure[];
  export default data;
}

// Match the relative `./projects.json` import inside src/lib/projects.ts too.
declare module "./projects.json" {
  import type { ProjectBrochure } from "@/lib/types";
  const data: ProjectBrochure[];
  export default data;
}
