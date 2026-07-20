/**
 * Sitemap generator.
 *
 * Pure helpers — no deps, isomorphic (works in Node build script or browser).
 * Produces a `<urlset>` XML string from the static route list plus every
 * project slug in `projects.json`.
 *
 * Expose the result at `/sitemap.xml` by writing the output during the Vite
 * build (e.g. via a small `postbuild` step) or by serving it from an edge
 * function. The XML itself lives here so there's a single source of truth.
 */

import type { ProjectBrochure } from "./types";

/** Static routes that always exist (no params). */
export const STATIC_ROUTES = [
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
] as const;

/** Render a single <url> entry. */
function urlEntry(loc: string, origin: string, lastmod?: string, priority = "0.7"): string {
  const url = `${origin}/${loc}`.replace(/\/+$/, "") || origin;
  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

/** XML-escape a string for safe embedding. */
function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export interface BuildSitemapOptions {
  /** Absolute site origin, e.g. "https://sdsweethome.com". No trailing slash. */
  origin: string;
  /** Optional ISO date stamp applied to all entries. */
  lastmod?: string;
}

/**
 * Build a complete sitemap.xml document from the static routes + the supplied
 * project catalog. Accepts the raw `ProjectBrochure[]` shape so it can run
 * without pulling in the frontend adapter.
 */
export function buildSitemap(
  projects: Pick<ProjectBrochure, "slug">[],
  opts: BuildSitemapOptions
): string {
  const origin = opts.origin.replace(/\/+$/, "");
  const entries: string[] = [];

  for (const route of STATIC_ROUTES) {
    entries.push(urlEntry(route, origin, opts.lastmod, "0.8"));
  }
  for (const p of projects) {
    if (!p.slug) continue;
    entries.push(urlEntry(`projects/${p.slug}`, origin, opts.lastmod, "0.9"));
  }

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}
