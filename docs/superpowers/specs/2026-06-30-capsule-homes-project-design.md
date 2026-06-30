# Capsule Homes Project — Design Spec

Date: 2026-06-30

## Background

EAG's `/projects` page currently shows 6 placeholder case-study cards (title, tag, year only — gradient visuals, not clickable). We're adding a real case study: a modular **Capsule Home (X6 model)** delivered to **Retrofit, Masaki — Dar es Salaam**, sourced for design/content reference from [fabtoolshomes.com/capsule-homes](https://fabtoolshomes.com/capsule-homes/), which presents each capsule model with a spec table, interior gallery, floor-plan display, and on-site project photos.

Assets available in `src/assets/project_real_estate/`:

| File | Content | Matches X6 spec (9500×3300×3200mm)? |
| --- | --- | --- |
| `last.jpeg` | Real photo — capsule unit on a flatbed truck, Tanzania roadside | N/A (real on-site photo) |
| `02.png` | Dimensioned CAD floor plan, labeled "X6 太空舱平面图-9.5x3.3m" | Yes — exact match |
| `one.jpg` | Rendered top-down plan: 1 living room, 1 bedroom, 1 bathroom | Yes — matches layout |
| `02.jpg` | Rendered top-down plan, twin-bed configuration | No — different layout |
| `03.jpg` | Rendered top-down plan: bedroom + outdoor terrace seating | No — different shape/size |
| `04.png` | Dimensioned CAD floor plan, 5600mm wide | No — smaller model |

Product specs (given):
- External dimensions: 9500 × 3300 × 3200 mm
- Product area: ~31 m²
- Total weight: ~7 T
- Power consumption: 10 KW
- Occupancy: 2–4 people
- Layout: 1 bedroom, 1 living room, 1 bathroom
- Customizable: kitchen, furniture, appliances, curtains, etc.

## Goals

- Add this capsule home as a real, detailed project case study under `/projects`.
- Make the underlying data structure shared between the grid and detail views, so future case studies follow the same pattern without rebuilding routing.
- Keep the existing 6 placeholder cards working exactly as today, just now clickable into a minimal stub detail page (no fabricated content).
- Visually distinguish images that exactly match the delivered unit's spec from images used purely as design inspiration.

## Non-goals

- No CMS / admin UI for managing projects — data lives in a typed source file.
- No backfilling of real content for the 5 other placeholder projects.
- No quote-request form — CTA reuses the existing `/contact` page.

## Architecture

### Data layer: `src/data/projects.ts`

```ts
export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption: string;
  isExactMatch: boolean; // true = matches this unit's literal spec, false = design inspiration
}

export interface ProjectRecord {
  slug: string;
  title: string;
  tag: string;
  year: string;
  location?: string;
  summary?: string;
  specs?: ProjectSpec[];
  floorPlans?: ProjectGalleryImage[];   // exact-match floor plan / layout images
  inspiration?: ProjectGalleryImage[];  // non-matching design inspiration images
  sitePhoto?: { src: string; alt: string; caption: string };
  cta?: { label: string; href: string };
}

export const projects: ProjectRecord[];
```

The 6 existing placeholders become records with only `slug`, `title`, `tag`, `year` set. The new capsule entry sets every field.

### Routing

- `src/routes/projects/index.tsx` (moved from flat `projects.tsx`) — renders the grid by mapping over `projects`. Each card becomes a `Link` to `/projects/$slug`. Cards with a `sitePhoto` use it as the card image; cards without one keep today's gradient-pattern visual.
- `src/routes/projects/$slug.tsx` — new dynamic route.
  - Loader looks up the record by slug param; calls TanStack Router's `notFound()` if no match.
  - `head()` builds per-project meta tags (title/description/og:image) from the loaded record, falling back to generic copy for thin records.
  - Component renders:
    - **Rich layout** (when `specs` and `floorPlans` are present): hero with site/cover photo, eyebrow + location, summary, specs grid, floor plan section (exact-match images only), inspiration gallery section (clearly labeled "Design inspiration"), on-site photo section, CTA.
    - **Minimal fallback layout** (thin records): title, tag, year, the same gradient visual used on the grid card, a "Full case study coming soon" note, and a back-link to `/projects`.

### Capsule Homes record content

- `slug`: `capsule-homes-masaki`
- `title`: "Capsule Homes — Retrofit, Masaki"
- `tag`: "Real Estate · Modular Living"
- `year`: "2026"
- `location`: "Retrofit, Masaki — Dar es Salaam"
- `summary`: Positioning copy — compact, fully-furnished modular living, engineered for fast deployment without compromising design.
- `specs`: the 6 spec rows listed above, plus a customization note.
- `floorPlans`: `02.png` (dimensioned CAD plan) and `one.jpg` (matching rendered plan), both `isExactMatch: true`.
- `inspiration`: `02.jpg`, `03.jpg`, `04.png`, all `isExactMatch: false`, each captioned as an alternate/inspiration concept.
- `sitePhoto`: `last.jpeg`, captioned "Delivered to Retrofit, Masaki" — used both as the grid card image and the detail hero/closing section.
- `cta`: "Interested in a capsule for your site?" → `/contact`.

## Visual style

Reuse existing design tokens and patterns rather than introducing new ones:
- Card/border/surface colors: `var(--card)`, `var(--border)`, `var(--navy-ink)`, `var(--cyan-flow)` as used in `projects.tsx` and `PageHero.tsx`.
- Motion: `framer-motion` `whileInView` fade/slide-up patterns already used throughout routes.
- Typography: `font-display` for headings, existing uppercase/tracked-out eyebrow label style.
- The specs grid follows the same "label small/uppercase, value larger" treatment used nowhere else yet, but should match the visual weight of the existing tag/title pairing in project cards (small uppercase label, readable value).
- No new shadcn/ui primitives needed — hand-rolled sections, consistent with how the rest of `routes/` is built.

## SEO

Per-project `head()`: title `"{title} — East Africa Internet Group"`, description from `summary` (or generic fallback for thin records), `og:image` using `sitePhoto` when present, else the existing default OG image. Canonical URL `https://eastafricainternetgroup.com/projects/{slug}`.

## Testing / verification

- Manual: visit `/projects`, confirm grid renders all 7 cards, capsule card links to `/projects/capsule-homes-masaki` and shows the real photo; other 6 cards link to their stub pages.
- Manual: visit a placeholder slug directly, confirm minimal fallback renders without errors.
- Manual: visit an invalid slug, confirm 404/not-found behavior.
- Type-check (`tsc`) passes on the new data file and routes.
