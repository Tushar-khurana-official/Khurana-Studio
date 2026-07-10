# Khurana Studio

A premium luxury photography studio website for Khurana Studio — cinematic, editorial, and full-featured.

## Run & Operate

- `pnpm --filter @workspace/khurana-studio run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (pre-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, TailwindCSS v4, Framer Motion, Lenis smooth scroll, Swiper.js, wouter
- Fonts: Cormorant Garamond (headings), Poppins (body), Inter (buttons) — loaded from Google Fonts
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — single source of truth for all API contracts
- `lib/db/src/schema/` — Drizzle tables: bookings, services, portfolio, testimonials, blog, contact
- `artifacts/api-server/src/routes/` — Express route handlers (bookings, services, portfolio, testimonials, blog, contact, stats)
- `artifacts/khurana-studio/src/` — React frontend
  - `pages/` — Home, Portfolio, Services, Book, Contact, Blog, Blog Post, Admin dashboard/bookings, 404
  - `components/sections/` — Hero, About, Services, Portfolio Preview, Process, Pricing, Testimonials, Instagram, FAQ, Contact CTA
  - `components/` — Navbar, Footer, CustomCursor, LoadingScreen, FadeIn, admin/Sidebar
  - `hooks/` — useLenis (smooth scroll), useToast
- `artifacts/khurana-studio/public/images/` — AI-generated images (hero, about, services, portfolio, blog, avatars)

## Architecture decisions

- OpenAPI-first: all types generated from `lib/api-spec/openapi.yaml`; never hand-write types that codegen produces
- Logo is a text mark ("KS / KHURANA STUDIO" in Cormorant Garamond) — swap to real logo by updating `/public/images/logo.png` and the `Navbar`/`LoadingScreen` components
- Admin dashboard at `/admin` is a placeholder shell — no auth yet; wire Firebase Auth when ready
- Color system: metallic silver (#C0C0C0) accent on warm ivory (#F7F7F5) background, dark bg #111111
- All API integrations (booking, CRM, payment, Instagram, Cloudinary) are abstracted as service files — plug in without redesign

## Product

- Public site: Hero → About (animated stats) → Services (12 categories) → Portfolio preview (masonry + lightbox) → Process timeline → Pricing tiers → Testimonials carousel → Instagram grid → Blog → FAQ → Contact CTA → Footer
- Booking form at `/book` with full validation and animated success state
- Contact form at `/contact` with studio address and map placeholder
- Admin dashboard at `/admin` shows live booking stats, pending inquiries table, status updates

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After any OpenAPI spec change, re-run `pnpm --filter @workspace/api-spec run codegen` then `pnpm run typecheck:libs` before checking frontend types
- `useListPortfolio` and `useListTestimonials` take params directly (not wrapped in `{ params: {} }`)
- Lenis v1 does not support `smoothTouch` option — remove it if upgrading
- The `@studio-freight/lenis` package is used (not `lenis` directly)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
