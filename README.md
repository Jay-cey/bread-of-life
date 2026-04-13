# Bread of Life

Bread of Life is a multilingual, editorial-style Christian web experience built with Next.js 16, React 19, Tailwind CSS 4, and `next-intl`. It combines immersive storytelling, scripture discovery, devotional content, testimony pages, and journal reflections into a mobile-friendly Progressive Web App.

The project is designed to feel more like a guided spiritual experience than a conventional content site. It includes installable PWA support, social share image generation, locale-aware routing, and a Supabase-backed newsletter subscription endpoint.

## Features

- Immersive landing page with animated editorial sections
- Multilingual routing with English and Yoruba support
- Story, prayer, testimonies, journal, and verse discovery experiences
- Daily devotional content sourced from local JSON
- Dynamic journal article pages with generated metadata
- Open Graph image generation via `@vercel/og`
- Progressive Web App support with manifest, icons, service worker, and offline fallback
- Supabase-powered email subscription API

## Tech Stack

- Next.js `16.2.3`
- React `19.2.4`
- TypeScript
- Tailwind CSS `4`
- `next-intl` for localization
- `@supabase/supabase-js` for subscriptions
- `@vercel/og` for OG image generation
- `framer-motion` for page motion and editorial transitions

## Project Structure

```text
bread-of-life/
|-- app/
|   |-- [locale]/
|   |   |-- page.tsx
|   |   |-- layout.tsx
|   |   |-- loading.tsx
|   |   |-- daily/
|   |   |-- journal/
|   |   |-- link/
|   |   |-- offline/
|   |   |-- prayer/
|   |   |-- story/
|   |   |-- testimonies/
|   |   |-- verses/
|   |   `-- who-is-jesus/
|   |-- api/
|   |   |-- og/
|   |   `-- subscribe/
|   |-- favicon.ico
|   |-- globals.css
|   `-- manifest.ts
|-- components/
|-- i18n/
|-- lib/
|-- messages/
|-- public/
|   |-- images/
|   |-- sw.js
|   `-- icons and favicons
|-- proxy.ts
|-- next.config.ts
`-- README.md
```

## Routes

The app uses locale-aware routes under `app/[locale]` with `next-intl` configured in `proxy.ts`.

Main user-facing routes:

- `/` or `/en` - homepage
- `/yo` - Yoruba homepage
- `/daily` - daily devotional view
- `/story` - Gospel story experience
- `/verses` - scripture discovery
- `/verses/share` - verse sharing page
- `/journal` - journal listing
- `/journal/[slug]` - individual journal article
- `/who-is-jesus` - introduction to Jesus
- `/prayer` - prayer page
- `/testimonies` - testimony page
- `/link` - link hub
- `/offline` - offline fallback page

Because `localePrefix` is set to `as-needed`, English routes can remain clean at the root, while Yoruba routes are prefixed.

## Localization

Localization is implemented with `next-intl`.

- Supported locales live in [i18n/request.ts](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/i18n/request.ts:1)
- Translation messages live in [messages/en.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/messages/en.json:1) and [messages/yo.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/messages/yo.json:1)
- Routing middleware lives in [proxy.ts](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/proxy.ts:1)

If an unsupported locale is requested, the app currently falls back to English.

## Content Sources

Most content is sourced from local JSON files in `lib/`.

- [lib/daily.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/lib/daily.json:1) powers the daily devotional experience
- [lib/journal.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/lib/journal.json:1) powers the journal listing and dynamic article routes
- [lib/verses.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/lib/verses.json:1) powers verse discovery

Supabase client setup lives in [lib/supabase.ts](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/lib/supabase.ts:1).

## API Endpoints

### `GET /api/og`

Defined in [app/api/og/route.tsx](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/app/api/og/route.tsx:1).

This route generates Open Graph images dynamically using query params:

- `title`
- `verse`
- `type`

It is used by the app's metadata and journal article pages for social previews.

### `POST /api/subscribe`

Defined in [app/api/subscribe/route.ts](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/app/api/subscribe/route.ts:1).

Expected request body:

```json
{
  "email": "user@example.com"
}
```

Behavior:

- validates the email format
- inserts into the Supabase `subscribers` table
- returns a friendly success message if the email already exists

## Progressive Web App

The project is configured as a PWA with:

- generated manifest at [app/manifest.ts](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/app/manifest.ts:1)
- icons in `public/`
- service worker at [public/sw.js](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/public/sw.js:1)
- client registration component at [components/ServiceWorkerRegistration.tsx](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/components/ServiceWorkerRegistration.tsx:1)
- offline fallback page at [app/[locale]/offline/page.tsx](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/app/[locale]/offline/page.tsx:1)

`app/manifest.ts` is the single source of truth for the app manifest and is served by Next.js as `/manifest.webmanifest`.

Current PWA behavior includes:

- installable app manifest
- theme color and Apple web app metadata
- precached icons and offline pages
- locale-aware offline fallbacks
- caching of successful same-origin page requests for better repeat access

## Setup

### Prerequisites

- Node.js 20 or newer recommended
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create `.env.local` with the following values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The code also accepts `NEXT_PUBLIC_SUPABASE_ANON_KEY` as an alternative key name.

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

## Development Notes

### Important Next.js note

This repository includes an `AGENTS.md` rule that explicitly warns that this Next.js version has breaking changes. When editing route code, consult the local docs in `node_modules/next/dist/docs/` before relying on older Next.js patterns.

One important example already present in this codebase:

- dynamic route `params` are Promises in Next.js 16 server components and metadata functions
- you must `await params` before reading values like `slug` or `locale`

### Styling

- Tailwind CSS 4 is used for styling
- motion and page reveals are handled with `framer-motion`
- fonts are loaded through `next/font/google`

### Metadata

App-level metadata is defined in [app/[locale]/layout.tsx](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/app/[locale]/layout.tsx:1).

This includes:

- Open Graph defaults
- Twitter card defaults
- manifest linkage
- Apple web app metadata
- theme color via `viewport`

## Scripts

Available npm scripts from [package.json](C:/Users/olana/OneDrive/Documents/Christ/bread-of-life/package.json:1):

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - lint the codebase

## Known Issues

At the time of writing, there are existing lint issues in unrelated files across the repository, including:

- unescaped entities in JSX text
- `any` usage in TypeScript
- some React hook and effect warnings
- a few scratch utility files that do not pass lint

Depending on your environment, `next build` may also fail if Google Fonts cannot be fetched during build time.

## Deployment

This project is well suited for deployment on Vercel because it uses:

- Next.js App Router
- Edge-compatible OG image generation
- static assets and service worker from `public/`

Before deploying:

1. set the required Supabase environment variables
2. verify the `subscribers` table exists in Supabase
3. confirm PWA icons and manifest paths resolve correctly in production
4. test installability and offline fallback on a mobile browser

## Future Improvements

- clean up current lint violations
- add typed schemas for local JSON content
- strengthen offline caching strategy for additional content routes
- add analytics or event tracking for install and subscription flows

## License

No license file is currently included in this repository. Add one if you plan to distribute the project publicly.
