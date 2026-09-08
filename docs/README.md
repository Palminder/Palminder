# Bracken & Roe website

Production implementation of the Bracken & Roe website: a Glasgow architectural practice working
across residential design, conservation and listed buildings, housing retrofit, and selected
commercial and community projects.

> The repository's top-level `README.md` is the GitHub profile README of the account that hosts
> this repository and has been left untouched. Project documentation lives here in `docs/`.

## Stack

| Layer      | Choice                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.3.4 (App Router, Turbopack), React 19, TypeScript `strict`                       |
| Styling    | Tailwind CSS v4 with brand tokens as CSS custom properties (`src/styles/globals.css`)       |
| Type       | Newsreader (display serif) and Inter (UI), self-hosted variable WOFF2 via `next/font/local` |
| Content    | Sanity (`next-sanity`, GROQ) with a local seed source used until a project is configured    |
| Validation | Zod (shared client/server)                                                                  |
| Enquiries  | Route Handler → Turnstile → rate limit → validation → optional scanned upload → Resend      |
| Tests      | Vitest (units), Playwright + axe (smoke, links, a11y, form), Lighthouse CI budget           |
| Hosting    | Vercel (preview + protected production), canonical `https://brackenroe.co.uk`               |

## Running locally

```bash
pnpm install
cp .env.example .env.local   # fill in what you have; everything is optional in development
pnpm dev                     # http://localhost:3000
```

Without Sanity credentials the site renders the seed content in `src/content/seed`. Without
`RESEND_API_KEY` the enquiry endpoint logs a redacted summary in development and returns 503 in
production. Without `TURNSTILE_SECRET_KEY` the verification step is skipped in development and
fails closed in production.

Checks a contributor runs before pushing:

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm build
pnpm test:e2e            # needs a production build; runs `pnpm start` itself
```

## Publication gates (the authenticity rule, enforced in code)

Every person, project, insight, studio note and testimonial passes through
`src/lib/content/publication.ts` before it can render. The gate is evaluated in the content API
(`src/lib/content/index.ts`) for both the seed source and the Sanity source, and again in Sanity
Studio as document validation (a document that fails cannot be published).

| Record                                | Held back unless                                                                                                                                                                                                     |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Team member                           | `verificationStatus: verified`; role using the protected title **architect** also needs `protectedTitleVerified`; a stated qualification (e.g. Part II) needs `qualificationVerified`; portrait is not a placeholder |
| Project (`real-project`)              | `verificationStatus: verified` and a non-placeholder hero                                                                                                                                                            |
| Project (design/representative study) | status must be `study`; the label **Design study** / **Representative study** renders beside the status automatically                                                                                                |
| Insight                               | verified; regulation-sensitive guidance has a `reviewedAt` date                                                                                                                                                      |
| Studio note                           | published with a non-placeholder image                                                                                                                                                                               |
| Testimonial                           | verified **and** consent confirmed (in every stage)                                                                                                                                                                  |
| Image                                 | has alt text; synthetic imagery is never labelled _Completed view_; licensed imagery carries rights metadata                                                                                                         |

`CONTENT_STAGE` selects the behaviour: `staging` (default outside a production deployment)
renders held records with a conspicuous "Staging record — not verified" label and a site-wide
staging banner; `production` (default when `VERCEL_ENV=production`) removes them entirely,
including from the sitemap.

All seed records ship as `pending`. **Nothing in the seed can appear on the public site until the
practice verifies it.**

## Content

- `src/lib/content/types.ts` — the content model.
- `src/content/seed/` — staging records: team, projects (with drawing contracts), services,
  studio notes, six Insight articles, legal documents.
- `src/sanity/schemas/` — Sanity schema with the same fields and validation gates;
  `sanity.config.ts` at the root runs the Studio (`pnpm studio`). Approved page-body modules only;
  there is no free-form page builder.
- `src/lib/content/sanity.ts` — the Sanity source adapter (GROQ → content model). Reads are cached
  and tagged; `POST /api/revalidate` (signature-checked) revalidates by document type.
- Draft preview: `GET /api/draft?secret=…&path=/…` enables draft mode (noindex banner shown);
  `/api/draft/disable` exits.

## Images

- Staging placeholders (`public/staging/placeholders`, generated by `scripts/generate-placeholders.mjs`)
  are flat tonal fields with a visible label; they can never pass a production gate. Page-level
  placeholder slots (the homepage hero and section images, the practice page's working-method
  pair) go through `stagingImage()` from the content API, which returns `null` in production so
  the page renders a plain Sandstone `MaterialField` instead until verified photography is supplied.
- Staging drawings (`public/staging/drawings`) are legible SVG plans, sections and details for the
  seed projects, labelled as a staging drawing set. Replace with real project drawings on verification.
- Real photography should be supplied at ≥2400 px on the long edge with photographer and rights
  recorded in the CMS. Context photography must be marked `contextOnly` and is never presented as
  practice work.

## Security

- Per-request nonce CSP from `src/proxy.ts` (`script-src 'self' 'nonce-…' 'strict-dynamic'` plus the
  Turnstile origin; `img-src` limited to self, data/blob and the Sanity CDN; `frame-ancestors 'none'`).
  Pages render dynamically so that Next.js applies the nonce; content reads are cached in the data
  layer instead. `style-src 'unsafe-inline'` is the single framework-required exception (inline
  `style` attributes written by `next/image`).
- Static headers in `next.config.ts`: `nosniff`, `Referrer-Policy`, `Permissions-Policy`,
  `X-Frame-Options: DENY` and `X-Robots-Tag: noindex` on `/contact/thanks`. HSTS (production only,
  no `preload`) and the `X-Robots-Tag: noindex` for non-production deployments and draft preview
  are set per request in `src/proxy.ts`, and `robots.ts`/`sitemap.ts` are evaluated per request,
  so all of them follow the deployment signal (`VERCEL_ENV` or `CONTENT_STAGE`) rather than the build.
- Enquiry endpoint order: method → size → origin → Zod → honeypot/interval → rate limit →
  Turnstile → extension/signature/size → malware scan → idempotency → notify → acknowledge.
  Uploads are disabled unless `ENQUIRY_UPLOADS_ENABLED=true` **and** `MALWARE_SCAN_ENDPOINT` are set.
  Vercel functions accept request bodies up to 4.5 MB; set `ENQUIRY_MAX_UPLOAD_MB=4` there or adopt a
  client-side upload flow before enabling uploads.
- Secrets live only in environment settings; `.env.example` documents names, never values.

## Verification

`pnpm test` covers the publication gates (including a production-stage run of the content API),
the enquiry schema, file signatures, rate limiting, origin checks, reading time and the CSP.
`pnpm test:e2e` runs Playwright against the production build: smoke and header checks on every
key route, axe (WCAG 2.2 AA tags) on every template, mobile-menu focus management, the project
filter, an internal link crawl from the sitemap, and the enquiry form including a real submission.
`lighthouserc.json` holds the mobile budget; on a staging build the SEO category is deliberately
depressed by the `noindex` rule, and the performance category depends on the machine running it.

## Brand assets

`public/brand` holds the outlined wordmark (light/reverse/caps) and monogram SVGs. `public/icons`
and `public/favicon.ico` are built from `public/icons/favicon.svg` by
`node scripts/build-brand-assets.mjs`, which also renders `public/brand/og-default.png`.

## Launch checklist (in addition to the specification's acceptance table)

1. Verify every team, project, note and article record in the CMS; nothing publishes otherwise.
2. Confirm the legal entity name, company number (if any), lawful basis, retention periods, processors
   and complaints wording in the Privacy notice; the seed document marks each item to confirm.
3. Configure Sanity, Resend (sending identity on a verified domain/subdomain; keep the existing MX
   for `studio@brackenroe.co.uk`; add SPF/DKIM/DMARC without overwriting an existing SPF record),
   Turnstile keys, and a rate-limit store.
4. Set `NEXT_PUBLIC_SITE_URL=https://brackenroe.co.uk`, point `www` at the apex redirect, enable HTTPS,
   then submit the sitemap to Search Console.
5. Update dependencies to the latest patched compatible releases immediately before launch.
