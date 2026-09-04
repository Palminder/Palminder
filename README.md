# Palminder Dhariwal — technical portfolio

Evidence-led professional portfolio for Palminder Dhariwal, Microsoft Cloud & Infrastructure
Engineer based in Scotland, aimed at UK recruiters and technical hiring managers recruiting for
genuinely fully remote Microsoft/cloud infrastructure roles.

The site is fully static (Astro 7, TypeScript strict, plain CSS, Pagefind search), first-party
only (no analytics, cookies, forms, CDNs or third-party scripts) and built so that nothing
unverified can reach the public output: every content entry is a draft until it explicitly says
otherwise, schemas validate every entry, and a post-build verifier rejects drafts, template
markers, zero-value metrics, inline styles and forbidden strings.

## Local setup

Requirements: Node.js 22 (see `.nvmrc`; `>=22.12.0`) and npm 10.

```bash
npm ci                # install exactly the locked dependencies
npm run dev           # http://localhost:4321 (search index is not built in dev)
npm run build         # astro build + Pagefind index → dist/
npm run serve:dist    # serve dist/ locally with the Cloudflare _headers rules applied
```

Copy `.env.example` to `.env` to change `PUBLIC_SITE_ENV` (`preview` by default) or set
`PUBLIC_SITE_URL`. Production builds require `PUBLIC_SITE_URL`.

## Commands

| Command                | What it does                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `npm run dev`          | Astro dev server with content hot reload.                                                 |
| `npm run build`        | Validates content schemas, builds `dist/`, then indexes evidence pages with Pagefind.     |
| `npm run preview`      | Astro's preview server for `dist/` (no custom headers).                                   |
| `npm run serve:dist`   | Node static server for `dist/` applying `public/_headers` (CSP etc.).                     |
| `npm run check`        | `astro check`: TypeScript and Astro template diagnostics.                                 |
| `npm run format`       | Prettier write. `npm run format:check` verifies.                                          |
| `npm run verify:dist`  | Post-build content and security checks (see `scripts/verify-dist.mjs`).                   |
| `npm run check:links`  | Internal link and fragment check across `dist/`.                                          |
| `npm test`             | Playwright smoke, axe accessibility and print tests against `dist/` (desktop and mobile). |
| `npm run qa`           | The full sequence: format check, type check, build, verify, links, tests.                 |
| `npm run assets:brand` | Regenerates the social card and touch icon from the verified headline copy.               |
| `npm run assets:shiki` | Regenerates the class-based syntax-highlighting stylesheet from the Shiki theme.          |

## Architecture

```
astro.config.mjs        Static output, trailing slashes, external stylesheets (strict CSP),
                        sitemap (drafts never built; archived entries excluded), Sätteri Markdown
                        with a table-scroll plugin and a Shiki inline-style→class transformer.
public/                 _headers (security headers), favicon, social card, downloads/ slot.
scripts/                Build and QA scripts: Pagefind indexing, dist verification, link check,
                        header-aware static server, asset generators.
src/content.config.ts   Content collections and zod schemas with publication safeguards.
src/content/            case-studies, labs, automation, organisation-projects, experience,
                        credentials. Markdown + frontmatter. `template-*` files are drafts.
src/data/               Verified site copy and feature flags (site.ts), taxonomy (taxonomy.ts),
                        capability-to-evidence map (capabilities.ts).
src/lib/                Content queries and counts, pagination, formatting, SEO/JSON-LD, env flag,
                        Markdown plugins.
src/layouts/            BaseLayout (head, header, footer), PageLayout (intro, breadcrumbs),
                        EvidenceDetailLayout (19-section evidence template with search metadata).
src/components/         Header/footer, hero, cards, badges, capability map, snapshot metrics,
                        lab filters, listing, pagination, figures, CTA band.
src/pages/              Routes (see below). robots.txt is generated per environment.
src/scripts/            The only client-side script: lab-library search/filter/sort (Pagefind).
src/styles/             global.css (tokens, base, components, print), shiki.css (generated).
tests/                  Playwright smoke, accessibility (axe) and print tests.
.github/workflows/      CI: format, check, build, verify, links, Playwright, Gitleaks, npm audit.
```

### Routes

| Route                                       | Source                                                                                                 |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/`                                         | `src/pages/index.astro`                                                                                |
| `/evidence/`                                | `src/pages/evidence/index.astro`                                                                       |
| `/evidence/case-studies/` and `/[slug]/`    | `src/pages/evidence/case-studies/`                                                                     |
| `/evidence/automation/`                     | `src/pages/evidence/automation/index.astro`                                                            |
| `/evidence/organisation-projects/` (+ slug) | `src/pages/evidence/organisation-projects/[...slug].astro`, generated only when a project is published |
| `/labs/`, `/labs/page/N/`, `/labs/[slug]/`  | `src/pages/labs/`                                                                                      |
| `/labs/category/[category]/` (+ pages)      | `src/pages/labs/category/[category]/[...page].astro`                                                   |
| `/labs/technology/[technology]/` (+ pages)  | `src/pages/labs/technology/[technology]/[...page].astro`                                               |
| `/experience/`, `/credentials/`, `/about/`  | `src/pages/<name>/index.astro`                                                                         |
| `/recruiter-pack/`                          | `src/pages/recruiter-pack/index.astro` (print stylesheet)                                              |
| `/contact/`, `/privacy/`                    | `src/pages/<name>/index.astro`                                                                         |
| `/404.html`, `/robots.txt`                  | `src/pages/404.astro`, `src/pages/robots.txt.ts`                                                       |

### Content and publication safeguards

- `draft` defaults to `true`; published entries need `publishedDate`.
- Organisation projects cannot publish without granted permission and an approval date.
- Employment entries cannot publish unless `verified: true`.
- Credential statuses exclude `planned`; in-progress entries cannot carry an earned date or
  verification link.
- Archived entries cannot be featured; they are `noindex` and excluded from the sitemap.
- Evidence metrics, capability cards, featured sections and the organisation-project area render
  only from published content and disappear when empty.
- `scripts/verify-dist.mjs` fails the build on drafts, `TEMPLATE`/`TODO` markers, fake testimonial
  markers, zero-value metrics, planned credentials, inline styles, third-party resources, missing
  SEO metadata, indexing signals that do not match the environment, and the excluded former
  employer's name.

### Security

- Strict Content Security Policy in `public/_headers`: `script-src 'self' 'wasm-unsafe-eval'`
  (WebAssembly is needed by Pagefind), `style-src 'self'`, `frame-ancestors 'none'`.
  Stylesheets are never inlined and Shiki output uses classes instead of inline styles.
- No client JavaScript except the lab-library controls, which load Pagefind on interaction.
- Gitleaks runs in CI; `.gitignore` excludes environment files and source material.

## Documentation

- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) — adding labs, case studies, credentials, experience and organisation projects.
- [EVIDENCE_STANDARD.md](EVIDENCE_STANDARD.md) — taxonomy and publication threshold.
- [SANITISATION_CHECKLIST.md](SANITISATION_CHECKLIST.md) — privacy and security review before publishing an artefact.
- [ACCESSIBILITY_CHECKLIST.md](ACCESSIBILITY_CHECKLIST.md) — WCAG 2.2 AA implementation and manual checks.
- [DEPLOYMENT.md](DEPLOYMENT.md) — Cloudflare Pages setup, environment variables and rollback.
- [CONTENT_INVENTORY.md](CONTENT_INVENTORY.md) — status of every content item.
- [PRELAUNCH_CHECKLIST.md](PRELAUNCH_CHECKLIST.md) — what must be true before public launch.
- [CHANGELOG.md](CHANGELOG.md).

## Repository note

The build brief asks for the site to live in a **private** repository. This code was developed on
a branch of the GitHub profile repository because that was the repository made available to the
build session. Before merging to `main`, move the site to a private repository (see
PRELAUNCH_CHECKLIST.md): the profile repository's `README.md` is displayed on the GitHub profile
page, and this README would replace it.
