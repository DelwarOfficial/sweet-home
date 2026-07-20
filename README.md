# S & D Sweet Home - Official Showcase

## Project Overview
S & D Sweet Home is a premier real estate platform highlighting completed, ongoing, and upcoming residential developments in Dhaka and Chandpur. The project exhibits robust capabilities including multi-language support (English/Bengali), an immersive and dark-mode adaptable UX/UI, and fully dynamic routing configurations for dynamic project previews.

## Key Features
- **Bilingual Translation System (i18n):** Complete English and Bengali support across all routes and UI elements using a unified Zustand translation store and `t()` helpers.
- **Dynamic Projects Catalog (`/projects`):** Grouped project listings for Dhaka and Chandpur. Supports seamless client-side location toggling ("All Cities", "Dhaka", "Chandpur") and status filtering ("Ongoing", "Upcoming", "Completed") with smooth Framer Motion layout transitions.
- **Search Parameter Integration:** Projects page filters dynamically synchronize with search parameters (`location`, `status`, `size`) passed from the homepage search selector.
- **Landowners Ceremony Page (`/landowners`):** A dedicated, bilingual portal showcasing project signing ceremonies, featuring rich layouts, contextual event images, and translation toggling.
- **Bilingual EMI Calculator:** Interactive home loan planning calculator with dynamic breakdown tables, bilingual SVG donut chart calculations, and browser share capabilities.
- **Media & Reels Gallery (`/media`):** Integrates native Facebook reels, award ceremonies, and interactive lightboxes for project progress updates.
- **Spam-Protected Contact Form (`/contact`):** Custom validated form with bilingual feedback states, honeypot spam protection, and FormSubmit integration.
- **Strict Dark Theme Default:** Built with tailwindcss dark mode support, defaulting unconditionally to a premium Dark Mode theme using `next-themes` and a custom anti-flicker script.

## Tech Stack
- **Framework:** React + Vite + TypeScript (Single Page Application)
- **Routing:** React Router DOM (Dynamic handling for `/projects/:slug` & nested logic)
- **Styling:** Tailwind CSS + Custom CSS Variables for deep theme adaptation
- **State Management & i18n:** Zustand (Local store managing bilingual settings)
- **Theme:** Next-Themes (Optimized for class-attribute targeting and strict dark-mode-first overrides)
- **Components & Animation:** Shadcn UI + Radix Primitives + Framer Motion
- **Icons:** Lucide React

## Folder Structure
The architecture is designed to split feature-level concerns apart cleanly without heavy abstraction overhead:

```
src/
├── assets/          // Optimized hero backgrounds and static text imports
├── components/      // React standard components
│   ├── home/        // Page-specific slices (HeroSection, FeaturedProjects, TrustBadges, etc.)
│   └── ui/          // Base reusable atomic UI components (Shadcn primitives)
├── fonts/           // Customized regional typefaces (Times Bangla, etc.)
├── hooks/           // Shared logic and window event handlers (e.g. useMobile)
├── icons/           // Trusted cert seals and native logos
├── lib/             // Core logic (i18n, utils, data models, project catalog)
└── pages/           // Primary routed views (Index, About, Contact, Projects, etc.)
public/              // Heavily compressed static assets (brochures, partner logos)
```

## Setup & Installation Instructions

**Prerequisites:** 
- Node.js (v18 or higher recommended)

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd sweet-home-showcase
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development & Build Commands

- **Extract Brochure Data (LOCAL ONLY):**
  Extracts project data from PDF brochures and generates optimized cover images.
  ⚠️ Must be run locally before `npm run build`. PDFs are stored externally (Vercel Blob / GitHub Releases),
  not in `public/`. Set `GEMINI_API_KEY` environment variable for AI-powered data extraction.

  Required env vars (set in `.env.local`):
  - `GEMINI_API_KEY` — required, used to structure brochure text into the `ProjectBrochure` schema.
  - `BLOB_BASE_URL` — optional, e.g. `https://your-blob-store.vercel-storage.com/brochures`. Used as the host for `brochureUrl`. Defaults to the Vercel Blob pattern.
  - `GITHUB_BLOB_URLS` — optional, JSON map `{"slug": "https://...pdf"}` of remote PDFs used when a local file is missing from `brochures-source/`.

  Workflow:
  1. Drop `*.pdf` files into `brochures-source/` (gitignored, local-only).
  2. Run `npm run extract`. It reads each PDF, extracts text via `pdfjs-dist`,
     asks Gemini to produce structured JSON, renders a <300KB `.webp` cover to
     `public/covers/`, and writes the catalog to `src/lib/projects.json`.
     The full PDFs are **never** copied to `public/` or `dist/`; only `brochureUrl`
     (the external Blob / GitHub Releases URL) is recorded.
  3. Optionally set `GITHUB_BLOB_URLS` to fetch source PDFs from a GitHub release
     when the local file isn't present.
  ```bash
  npm run extract
  ```
- **Run Dev Server:**
  Starts the local development server at `http://localhost:8080`
  ```bash
  npm run dev
  ```
- **Build Production Bundle:**
  Compiles the TypeScript and processes styles down to a highly optimized `dist/` directory.
  > ⚠️ Run `npm run extract` locally first if `src/lib/projects.json` or `public/covers/`
  > are missing — the build does not generate them. (Both are gitignored.)
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  Hosts the compiled `dist/` files locally to verify performance thresholds.
  ```bash
  npm run preview
  ```

## Deployment Notes
Since this project uses Vite + React Router DOM with client-side routing, it generates a static bundle (`dist/`).
- **Vercel / Netlify:** Highly recommended. Simply connect your Git provider and select the "Vite" preset. Provide `npm run build` as the Build Command, and point the Publish directory to `dist/`.
- **Note on Client-Side Routing:** If deploying manually via Apache/Nginx, ensure all requests natively fall back to `index.html` (e.g., configuring `try_files $uri /index.html;`) so that direct visits to nested routes like `/projects/nurjahan-palace` do not throw 404 server errors.

## Asset Management Guidelines
To keep bundle sizes lean and PageSpeed scores pristine:
- Any static images or PDF brochures placed inside `public/` must be optimized. PNGs should contain compression, while heavy banner images should be transcoded to `.webp` or `mozjpeg` where applicable.
- Non-root static assets (e.g., icons inside the layout rendering) should be stored in `src/icons` or `src/assets` and explicitly imported as module dependencies to ensure Vite properly fingerprints them.

## SEO & Performance Notes
- **JSON-LD Schema Integration:** Core components dynamically inject native structural logic. For example, `FeaturedProjects` actively injects `ItemList` markup schemas to ensure Google natively parses the real estate items.
- **Code-Splitting Readiness:** The project retains strong encapsulation; large dependencies are grouped appropriately by standard component structuring protocols ensuring JS payloads arrive cleanly for hydration.
- **Performance Guardrails:** External 3rd-party carousel bloat has been thoroughly purged. Only native CSS horizontal snapping rules (`snap-x`) control the layout dynamics, ensuring mobile responsiveness doesn't drag memory limits.

## Contribution Guidelines
1. Ensure `npm run build` passes locally with **zero TypeScript errors (`tsc -b`)** prior to opening Pull Requests.
2. Adhere exclusively to standard Tailwind CSS utilities for layouts. Avoid using arbitrary values (`w-[38px]`) unless absolutely necessary.
3. Keep dark mode scaling (`dark:bg-white/5`) explicitly defined per component rendering, validating contrast shifts locally.
