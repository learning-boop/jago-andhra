# Jago Andhra — Website

**A Movement for a Constitutional Andhra Pradesh**

React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion · Lucide React · React Router 6

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Deploy to Vercel

1. Push this folder to a Git repo and import it in Vercel.
2. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output `dist`.
3. `vercel.json` already rewrites all routes to `index.html` so React Router deep links work.
4. Update the domain in `index.html` (canonical / OG URLs), `public/robots.txt` and `public/sitemap.xml` if not `jagoandhra.org`.

## Languages (English / Telugu)

- Toggle lives in the navbar (EN / తెలుగు) and footer. Choice is saved in `localStorage` and the
  browser's Telugu locale is auto-detected on first visit.
- **UI strings** → `src/i18n/en.js` and `src/i18n/te.js` (same keys). Use `const { t } = useLang()` → `t('nav.home')`.
- **Content data** (events, updates, documents, timeline, demands…) carries bilingual fields
  `{ en: '…', te: '…' }`. Render with `tr(value)` from `useLang()`.
- The **logo swaps automatically**: `logo.webp` (English) ↔ `logo-te.webp` (Telugu).
- `<html lang>` and the document title switch per language; a `.lang-te` class on `<html>` applies
  Noto Sans Telugu and relaxes uppercase/letter-spacing.
- For the PHP API, return the same `{en, te}` objects (e.g. store `title_en` / `title_te` columns and
  shape them in PHP) — no front-end changes needed.
- Telugu copy was machine-drafted; have a native Telugu editor review `te.js` and the `te` fields before launch.

## District map

`src/data/apMap.js` holds real boundaries for all 26 districts (post-2022), simplified from
Census-derived GeoJSON (udit-001/india-maps-data) into SVG paths plus a centroid per district.
`src/data/districts.js` holds names (bilingual), region and coordinator placeholders, keyed by the same `id`.

## Project structure

```
src/
  components/   Navbar, Hero, WhyJago, IssueTimeline, Order2025, Demands, Events,
                DistrictMap, Updates, Media, Gallery, Documents, JoinMovement,
                SocialMedia, Contact, Footer, PageHeader, ui.jsx (shared helpers)
  pages/        Home, About, Issue, EventsPage, UpdatesPage, DocumentsPage,
                ContactPage, Legal (privacy/terms/disclaimer), NotFound
  data/         events.js, updates.js, documents.js, gallery.js, media.js,
                districts.js, apMap.js, site.js   ← local mock data (bilingual) + static copy
  i18n/         LanguageContext.jsx, en.js, te.js  ← language toggle + dictionaries
  services/     api.js                     ← single data-access layer
  hooks/        useFetch.js
  assets/       logo.webp / logo-te.webp (web), logo-original.png / logo-te-original.png (as supplied)
public/         favicon.png, og-logo.png, robots.txt, sitemap.xml
```

## Connecting the PHP + MySQL backend

Nothing in the components touches the mock files directly — everything goes through
`src/services/api.js`. To go live:

1. Copy `.env.example` → `.env` and set `VITE_API_BASE_URL=https://your-domain/api`.
2. Implement the endpoints listed at the top of `api.js` (`events.php`, `updates.php`,
   `documents.php`, `gallery.php`, `media.php`, `districts.php`, `members.php`, `contact.php`).
3. Return JSON in the record shapes documented at the bottom of `api.js` — they match the
   mock files, so the UI needs no changes.

Suggested MySQL tables map 1:1 to those shapes: `events`, `updates`, `documents`, `gallery`,
`media`, `districts`, `members`, `contact_messages`.

## Content rules baked into the UI

- Every statement is labelled **Fact**, **APGEA's Position**, **Campaign Position** or
  **Placeholder** via `<PositionTag />` (`src/components/ui.jsx`).
- No venues, attendance numbers, quotes or legal conclusions are invented; all such
  fields read `[Placeholder …]` until the admin supplies them.
- Document links are `#` until real PDF URLs are added. The timeline's "official source"
  links are also placeholders.
- Animated counters were intentionally **not** added — add them only once verified
  figures are supplied.

## Replacing placeholders

| What | Where |
|---|---|
| Office address, phone, email, hours | `src/data/site.js` → `siteConfig.contact` |
| Social links | `src/data/site.js` → `siteConfig.social` |
| Events / venues | `src/data/events.js` (or the API) |
| District coordinators | `src/data/districts.js` → `contact` |
| Gallery / update images | `src/data/gallery.js`, `src/data/updates.js` (Unsplash placeholders) |
| YouTube videos | `src/data/media.js` → `youtubeId` |
| Legal page text | `src/pages/Legal.jsx` |

## Logo

Both official logos (English and Telugu) are used unmodified. The `.webp` files are only resized
(800 px) copies for faster loading; the `*-original.png` files are as supplied.
