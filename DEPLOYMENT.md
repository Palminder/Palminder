# Deployment

Production host: **Cloudflare Pages** (static site, no Pages Functions). Nothing in this
document purchases a domain or a service. No deployment has been performed from this repository
yet; the steps below are the exact configuration to use.

## Build facts

| Setting                | Value                                                                  |
| ---------------------- | ---------------------------------------------------------------------- |
| Framework preset       | Astro                                                                  |
| Build command          | `npm run build` (runs `astro build` then the Pagefind indexing script) |
| Build output directory | `dist`                                                                 |
| Node.js version        | `22` (pinned in `.nvmrc`; `package.json` engines requires `>=22.12.0`) |
| Production branch      | `main`                                                                 |
| Preview deployments    | All non-production branches and pull requests                          |

Environment variables (Pages → Settings → Variables and Secrets):

| Variable          | Production                                                          | Preview                                    |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| `PUBLIC_SITE_ENV` | `production`                                                        | `preview`                                  |
| `PUBLIC_SITE_URL` | `https://<project>.pages.dev` (or the custom domain once connected) | leave unset (falls back to `CF_PAGES_URL`) |
| `NODE_VERSION`    | optional, `22`; `.nvmrc` already pins it                            | same                                       |

A production build **fails deliberately** if `PUBLIC_SITE_URL` is missing, because canonical
URLs, Open Graph URLs and the sitemap depend on it.

Preview builds output `<meta name="robots" content="noindex, nofollow">` on every page and a
`robots.txt` that disallows all crawling. Cloudflare also adds an `X-Robots-Tag: noindex` header to
preview deployments automatically.

## First-time setup (Git integration)

1. In the Cloudflare dashboard open **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorise access to the GitHub account and select the (private) site repository.
3. Configure the build:
   - Production branch: `main`
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add the environment variables from the table above for **Production** and **Preview** separately.
5. Save and deploy. The first deployment produces a `https://<project-name>.pages.dev` URL; this is
   the temporary preview address until a custom domain is approved and connected.
6. Confirm the deployment log ends with `pagefind-index: indexed N evidence page(s)` and that the
   Astro build reported no schema errors.
7. Open the `pages.dev` URL and run the post-deployment checks below.

Until Palminder approves the preview, keep the project unpublished from search engines: preview
builds are `noindex` already, and the production environment variable `PUBLIC_SITE_ENV` can stay
at `preview` even on `main` until launch. Switch it to `production` only at launch.

## Post-deployment checks

- `curl -I https://<project>.pages.dev/` shows the `Content-Security-Policy`,
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and
  `Cross-Origin-*` headers from `public/_headers`.
- `/robots.txt` disallows crawling on preview, allows it and lists the sitemap on production.
- `/sitemap-index.xml` exists and contains only published, non-archived pages.
- Lab library search works (this proves the CSP allows Pagefind's WebAssembly).
- `/evidence/organisation-projects/` returns the 404 page until a project is published.
- Browser console shows no CSP violations on Home, Labs and a detail page.

## Rollback

Cloudflare Pages keeps every deployment.

1. **Instant rollback:** Workers & Pages → the project → **Deployments** → open the last good
   production deployment → **Rollback to this deployment**. Production traffic switches immediately;
   no rebuild is needed.
2. **Code rollback:** revert the offending commit on `main` (`git revert <sha>`), push, and let
   Cloudflare rebuild. Use this when the bad change must not resurface on the next deploy.
3. **Content emergency (permission withdrawn, identifier found):** set `draft: true` on the entry
   (or delete it and its images), commit, push, and confirm the new deployment. Then request
   purge of cached copies if the item was indexed: Google Search Console → Removals, and
   Cloudflare → Caching → Purge for the specific URLs.

## Branch previews and pull requests

Every pull request receives its own preview URL (`https://<hash>.<project>.pages.dev`). Use it for
content review before merging. Preview URLs are `noindex` and not linked from anywhere, but they are
public to anyone with the link, so never push unsanitised material to any branch.

Optional: enable **Access policy for preview deployments** (Pages → Settings → General → Access
policy) to require a Cloudflare Access login for preview URLs. This is free for a small number of
users and is recommended while draft content is being reviewed.

## Custom domain (after approval only)

Not part of the initial build. When Palminder approves the completed preview:

1. Register the chosen personal-name domain in Palminder's own registrar account with MFA
   enabled, WHOIS privacy on, auto-renew on, and a recovery email that is independent of the
   hosting provider.
2. Pages → the project → **Custom domains** → add the apex domain (for example
   `palminderdhariwal.co.uk`) and the `www` subdomain.
3. If the domain's DNS is on Cloudflare, records are created automatically; otherwise add the
   CNAME records shown in the dashboard.
4. Enforce one canonical host: Cloudflare Pages redirects the secondary custom domain to the
   primary automatically when both are added; verify with `curl -I https://www.<domain>/`.
5. Update `PUBLIC_SITE_URL` in the production environment to the canonical `https://` origin and
   redeploy so canonical links and the sitemap use the domain.
6. Enable HSTS only after confirming HTTPS works on both hosts.
7. Submit the sitemap in Google Search Console and Bing Webmaster Tools once `PUBLIC_SITE_ENV`
   is `production`.

## Fallback hosts

GitHub Pages, Netlify and Vercel can serve the same `dist/` output. Only introduce one if
Cloudflare Pages fails a real requirement; the `_headers` file is Cloudflare/Netlify syntax and would
need translating for other hosts.

## Local production check

```bash
PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=https://example.pages.dev npm run build
PUBLIC_SITE_ENV=production npm run verify:dist
npm run serve:dist   # http://127.0.0.1:4321 with the _headers rules applied
```
