# S & D Sweet Home - Official Showcase

## Project Overview
S & D Sweet Home is a premier real estate platform highlighting completed, ongoing, and upcoming residential developments in Dhaka and Chandpur. The project exhibits robust capabilities including multi-language support (English/Bengali), an immersive and dark-mode adaptable UX UI, and fully dynamic routing configurations for dynamic project previews.

## Tech Stack
- **Framework:** React + Vite (Configured as a Single Page Application)
- **Routing:** React Router DOM (Dynamic handling for `/projects/:slug` & protected logic)
- **Styling:** Tailwind CSS + Custom CSS Variables for deep theme adaptation.
- **Components:** Shadcn UI + Radix Primitives
- **Animation:** Framer Motion (Optimized for minimal main-thread blocking)
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

- **Run Dev Server:**
  Starts the local development server at `http://localhost:8080`
  ```bash
  npm run dev
  ```
- **Build Production Bundle:**
  Compiles the TypeScript and processes styles down to a highly optimized `dist/` directory.
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
