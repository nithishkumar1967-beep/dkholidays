# DK Holidays V5 — Project Guide

This is a Next.js 16 (App Router) project with Supabase + Firebase Auth.

## Key Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Start production server
```

## Architecture

- **Auth:** Firebase Auth (client-side only). Admin users must exist in both Firebase Auth and Supabase `users` table.
- **Database:** All data in Supabase PostgreSQL. No localStorage or IndexedDB.
- **Storage:** Images in Supabase Storage (public buckets). Only URLs stored in DB.
- **Admin:** Protected at the layout level with `useAdminAuth` hook. Client-side role check.
- **SEO:** Dynamic robots.ts, sitemap.ts. JSON-LD schema in lib/seo.ts.

## Important Conventions

- All env vars require `NEXT_PUBLIC_` prefix
- Public pages fetch data from Supabase server components when possible
- Admin pages are all client components (useEffect data fetching)
- Images use `<img>` tag (not Next.js Image) for simplicity with external storage
- Tailwind v4 with `@theme` directive (no tailwind.config.js)
