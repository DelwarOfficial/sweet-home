/**
 * Ambient declarations for static asset imports.
 *
 * Vite handles these at build time (returns the resolved URL string), but
 * TypeScript needs to know the module shape or it errors on
 * `import x from "@/icons/foo.png"`.
 *
 * Mirrors `vite/client` types but is declared locally so consumers don't need
 * to wire up the triple-slash reference in every file.
 */

declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}
declare module "*.avif" {
  const src: string;
  export default src;
}
declare module "*.ico" {
  const src: string;
  export default src;
}
