# DK Holidays V5 — Production Travel Company Website

A full-stack, production-ready travel company website and admin CMS built with Next.js, Supabase, and Firebase Authentication.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Auth:** Firebase Authentication (Email/Password, admin-only)
- **Database:** Supabase PostgreSQL (all content, images via storage)
- **Storage:** Supabase Storage (images, assets)
- **Deployment:** Vercel-ready

## Quick Start

```bash
npm install
cp .env.example .env.local   # Fill in your credentials
npm run dev                   # http://localhost:3000
```

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout with fonts & metadata
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Tailwind v4 theme
│   ├── not-found.tsx         # 404 page
│   ├── error.tsx             # 500 page
│   ├── robots.ts             # Dynamic robots.txt
│   ├── sitemap.ts            # Dynamic sitemap.xml
│   ├── about/
│   ├── services/
│   ├── fleet/
│   ├── gallery/
│   ├── blog/
│   │   ├── page.tsx          # Blog list (ISR 1hr)
│   │   └── [slug]/page.tsx   # Blog detail (SSG)
│   ├── contact/
│   └── admin/
│       ├── login/            # Firebase auth login
│       ├── page.tsx          # Dashboard
│       ├── fleet/            # CRUD fleet management
│       ├── services/         # CRUD services management
│       ├── gallery/          # Upload & manage gallery
│       ├── reviews/          # Approve/reject reviews
│       ├── enquiries/        # View & manage enquiries
│       ├── blog/             # CRUD blog posts
│       ├── settings/         # Site & SEO settings
│       └── users/            # Admin user management
├── components/
│   ├── ui/                   # Button, Input, Card, Badge
│   ├── layout/               # Header, Footer, PublicLayout
│   ├── public/               # Hero, Services, Fleet, Gallery etc.
│   └── admin/                # Admin-specific components
├── lib/
│   ├── types.ts              # All TypeScript interfaces
│   ├── supabase.ts           # Supabase client
│   ├── supabase-admin.ts     # All database CRUD functions
│   ├── supabase-storage.ts   # Image upload/delete
│   ├── firebase.ts           # Firebase client
│   ├── auth.ts               # Firebase auth helpers
│   ├── utils.ts              # cn(), formatDate(), slugify()
│   └── seo.ts                # JSON-LD schema
├── hooks/
│   └── useAdminAuth.ts       # Auth state hook
└── middleware.ts              # Route protection
supabase/
├── migration.sql             # Full database schema
└── seed.sql                  # Optional sample data
```

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `users` | Admin accounts (id, email, role) |
| `site_settings` | Company info, hero, SEO |
| `fleet` | Vehicles (title, description, image, capacity, type) |
| `services` | Travel services |
| `gallery` | Gallery images with categories |
| `reviews` | Customer reviews (requires approval) |
| `enquiries` | Contact form submissions |
| `blog_posts` | Blog content with SEO fields |

### Roles

- `super_admin` — Full access including user management
- `admin` — Content management
- `editor` — Content creation (no settings/users)

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open SQL Editor → paste `supabase/migration.sql` → Run
3. Create buckets in Storage:
   - `hero-images`, `gallery-images`, `fleet-images`
   - `service-images`, `blog-images`, `company-assets`
   - Set each bucket to **public**
4. Copy your Project URL and anon key to `.env.local`

## Firebase Setup

1. Create a project at [firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → **Sign-in method** → **Email/Password**
3. Add an admin user: **Users** → **Add user**
4. Get web app config: Project Settings → General → Your apps → Web
5. Copy config values to `.env.local`
6. **Important:** Add the admin user to the `users` table in Supabase:

```sql
INSERT INTO users (id, email, role)
VALUES ('FIREBASE_UID_HERE', 'admin@dkholidays.in', 'super_admin');
```

## Security

- Firebase Authentication for admin login only
- All content read/write goes through Supabase with RLS
- Public users can submit reviews and enquiries (insert only)
- Admins must be authenticated and registered in the `users` table
- Role-based permissions enforced client-side
- No localStorage or IndexedDB used

## Deployment (Vercel)

```bash
npm run build
vercel --prod
```

### Environment Variables

Set these in Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `NEXT_PUBLIC_SITE_URL` | `https://dkholidays.in` |
| `NEXT_PUBLIC_SITE_NAME` | `DK Holidays` |
| `NEXT_PUBLIC_CONTACT_PHONE` | `+919944890203` |
| `NEXT_PUBLIC_CONTACT_WHATSAPP` | `919944890203` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `info@dkholidays.in` |

## Post-Deployment Checklist

- [ ] Create Firebase admin account
- [ ] Insert admin user into Supabase `users` table
- [ ] Run SQL migration in Supabase SQL Editor
- [ ] Create storage buckets
- [ ] Add images to storage via admin panel
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Google Business Profile
- [ ] Set up custom domain
- [ ] Enable HTTPS

## Key Features

- All content editable from Admin Panel
- No hardcoded text or images on public pages
- Dynamic SEO (meta tags, OG, JSON-LD schema)
- Image upload with Supabase Storage (no base64, no IndexedDB)
- Blog with slug-based URLs and publish/unpublish
- Contact form saves to Supabase
- Customer reviews with admin approval workflow
- Fully responsive (mobile, tablet, desktop)
- 404, 500, and empty states handled
- TypeScript strict mode throughout
