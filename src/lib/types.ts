/**
 * Shared types for the brochure extraction pipeline.
 * These types bridge the extraction script and the frontend.
 */

/**
 * Represents a project with brochure data extracted from PDFs.
 * - brochureUrl: External URL (Vercel Blob / GitHub Releases) — NEVER a local path.
 * - coverImage: Local small webp image in public/covers/ for Vercel deployment.
 */
export interface ProjectBrochure {
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
  /** External URL to the full PDF brochure (Vercel Blob / GitHub Releases) */
  brochureUrl: string;
  /** Local path to optimized cover image (e.g., "/covers/slug.webp") */
  coverImage: string;
  /** Handover date as free text (e.g. "Dec 2026"). Empty until manually filled. */
  handover?: string;
  /** Google Maps embed URL derived from the location string. */
  mapEmbedUrl?: string;
}
