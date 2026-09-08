# Build conventions

This file is the working contract for anyone composing pages on the Bracken & Roe site.
The product specification is the authority on content and behaviour; this document explains
how the codebase implements it so that new pages stay coherent with the existing ones.

## Fixed facts (never vary)

- Brand name: **Bracken & Roe**. Positioning: **Architecture rooted in Glasgow.**
- Public email: `studio@brackenroe.co.uk`. There is **no telephone number** anywhere. Never add one.
- Office address is rendered only through `OfficeAddress` / `OfficeBlock` (from `src/lib/site.ts`)
  and always carries **Meetings by appointment.** Never describe the office as staffed or walk-in.
- No founding year, employee count, awards, accreditations, client names, logos, testimonials,
  performance statistics or programme quantities unless a verified record supplies them.
- Tone: calm, specific, informed, unshowy, direct. Concrete architectural nouns (stone, lime mortar,
  rooflight, window reveal, tenement, stair, section, fabric, threshold). Never “award-winning”,
  “industry-leading”, “best-in-class”, “passionate”, “bespoke solutions”, “dream home”,
  “transformational”, unqualified “sustainable”, or any unsupported superlative.
- Scottish terminology: planning permission, building warrant, listed-building consent,
  conservation area, Category A/B/C. Never promise a consent outcome.

## Stack

Next.js 16 App Router (`src/app`), TypeScript strict, Tailwind v4 with tokens in
`src/styles/globals.css`, `typedRoutes: true` (every `href` must be a real route; template
literals like `` `/projects/${slug}` `` are fine). Server Components by default. Client Components
only where the specification justifies them (mobile menu, project filter, form, drawing zoom).

## Content layer

Always read content through `src/lib/content/index.ts` (`getProjects`, `getProject`,
`getFeaturedProjects`, `getAdjacentProjects`, `getTeam`, `getServices`, `getService`,
`getInsights`, `getInsight`, `getStudioNotes`, `getTestimonials`, `getLegalDocument`,
`getRelatedProjects`, `getRelatedInsights`, `getProjectsForService`, `getInsightsForService`,
`stage`). Records come back as `Gated<T>` with a `gate` describing why a record would be held
back; held records are filtered out before they reach a page. Never import seed records directly
from a page; pages may import `illustration()` from `src/content/seed/media.ts` for page-level
context imagery.

Types live in `src/lib/content/types.ts`. Rich bodies use the `Block[]` model rendered by
`RichText`.

## Components (all under `src/components`)

| Component                                        | Use                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| `editorial/PageHero`                             | Page opener: eyebrow, H1, lead, optional image (copy first on mobile).                |
| `editorial/EditorialIntro`                       | Eyebrow + serif H2 + body copy (+ link). `layout="split"` or `"stacked"`.             |
| `editorial/SectionHeading`                       | Eyebrow + H2 with optional action link on the right.                                  |
| `editorial/Button`                               | `variant="primary"                                                                    | "secondary" | "text"`. `href` must be a typed route. |
| `editorial/Breadcrumbs`                          | `items=[{label, href}]`, `current="…"`; emits BreadcrumbList JSON-LD.                 |
| `editorial/ServiceRow`                           | Numbered full-width discipline row with image and arrow link.                         |
| `editorial/ProcessSequence`                      | The four-stage working sequence section (self-contained).                             |
| `editorial/CTASection`                           | Final enquiry call to action (`tight` for inner pages).                               |
| `editorial/Callout`                              | Restrained guidance note.                                                             |
| `editorial/RichText`                             | Renders `Block[]` (paragraphs, headings, lists, quotes, callouts, figures, tables).   |
| `editorial/TeamCard`                             | Portrait + role + bio (`compact` for teasers).                                        |
| `editorial/InsightCard`, `editorial/ArticleMeta` | Insight listing card; article metadata list.                                          |
| `editorial/StudioNoteCard`                       | One studio note.                                                                      |
| `editorial/Testimonial` (`Testimonials`)         | Renders nothing unless verified records exist.                                        |
| `editorial/OfficeBlock`                          | Contact-page office information.                                                      |
| `editorial/EmptyState`                           | Calm empty state; never debug wording.                                                |
| `media/MediaFigure`                              | Image/drawing with media-type label and caption. Pass `sizes`; use `ratio` for cards. |
| `media/ImagePair`                                | Two complementary figures.                                                            |
| `media/DrawingFigure`                            | Drawings at natural sheet ratio on Paper, with “Drawing 03 — …” caption and zoom.     |
| `projects/ProjectCard`, `projects/ProjectGrid`   | Cards and grids (`variant="featured"` = 7/5 asymmetric).                              |
| `projects/ProjectFacts`                          | Definition list of location, sector, status, building, services.                      |
| `projects/ProjectFilter`                         | Client filter wrapper for the index grid (grid stays server rendered).                |
| `forms/EnquiryForm`                              | The enquiry form (client). Props: `uploadsEnabled`, `maxUploadMb`, `serverOutcome`.   |
| `seo/JsonLd`                                     | JSON-LD script.                                                                       |

Layout and metadata:

- Every page exports `metadata` via `pageMetadata({ title, description, path })` from
  `src/lib/seo/metadata.ts` with the exact `<title>` strings from the specification.
- Sections: `<section className="section rule">` (or `section-tight`) wrapping
  `<div className="container-site">` and, where columns are needed, `<div className="grid-site">`
  with `col-span-4 md:col-span-8 xl:col-span-N` children. Mobile is always one column.
- Typography classes: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-h4`, `type-lead`,
  `type-body-lg`, `type-body`, `type-meta`, `type-label`, `serif-italic`, `measure`.
- Colour: Paper background, Ink text. `text-moss` for eyebrows and primary actions,
  `text-terracotta` only for rare drawing/caption cues. Never Stone or Sandstone for text.
- No drop shadows, no rounded cards, no icon grids, no carousels, no hover-only information.
- One H1 per page; heading levels never skip. Use `aria-labelledby` on sections.
- Links: descriptive text; external links get `rel="noopener noreferrer"` and a visually hidden
  “(opens in a new tab)”.
- Images: always through `MediaFigure`/`DrawingFigure` with a correct `sizes` attribute.
  Only the hero gets `priority`.

See `src/app/(site)/page.tsx` for a complete worked example.
