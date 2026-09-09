# Deployment brief — Bracken & Roe

This is an execution brief for a Claude Code session running **on a machine with open
network and browser access**. It was written from a remote container whose egress policy
blocks every provider needed to deploy (see _Why this brief exists_), so the work below is
prepared and verified but not executed.

Read it top to bottom and execute in order. Everything in _Already verified_ is done; do not
redo it. Everything under _Points that need the account owner_ is where you must stop and ask.

---

## Repository state

|           |                                                          |
| --------- | -------------------------------------------------------- |
| Repo      | `Palminder/Palminder`                                    |
| Branch    | `claude/bracken-roe-website-spec-3do0dk`                 |
| Framework | Next.js 16 App Router, React 19, TypeScript strict, pnpm |
| Node      | 22                                                       |

The design and content are **approved and frozen**. Do not redesign, restyle, regenerate
imagery, or alter copy. Deployment configuration only.

## Already verified (do not repeat)

Run against the production build with `VERCEL_ENV=production CONTENT_STAGE=production
NEXT_PUBLIC_SITE_URL=https://brackenroe.co.uk`:

- `pnpm lint`, `pnpm typecheck`, `pnpm prettier --check` — clean.
- `pnpm test` — 43 unit tests pass.
- `pnpm build` — compiles; 24 routes; no errors.
- `pnpm test:e2e` — 94 Playwright tests pass on desktop and mobile, including axe
  accessibility, an internal link crawl, and a check that every image resolves.
- Canonical `https://brackenroe.co.uk`, `og:url`, `og:image`, sitemap (27 URLs) and
  `robots.txt` all emit the production origin correctly.
- Security headers present: `Strict-Transport-Security` (production only),
  nonce-based CSP, `X-Content-Type-Options`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy`. `/contact/thanks` returns
  `X-Robots-Tag: noindex, nofollow`.
- The enquiry endpoint fails closed: wrong method → 405, wrong content type → 415,
  wrong origin → 403, and Turnstile unconfigured → rejected rather than silently dropped.

So if the live site misbehaves after deploy, suspect configuration, not the application.

---

## Points that need the account owner

Stop at each of these and ask; resume immediately after.

1. **Vercel login** — `vercel login` opens a browser. Needs their credentials and 2FA.
2. **one.com login** — DNS is managed there. Needs their credentials and 2FA.
3. **Resend account** — creating it, and confirming any paid tier if the free tier is
   insufficient. Do not purchase anything without explicit approval.
4. **Cloudflare account** — for Turnstile. Turnstile is free; account creation still needs them.
5. **Upstash account** — optional (see step G). Free tier is normally sufficient.
6. **Any DNS record you intend to change or delete.** Inspect first, explain why, get approval.

---

## Step A — Vercel project

```bash
npm i -g vercel
vercel login                     # browser auth — account owner
cd <repo root>
vercel link                      # create or link the project
```

Settings (Vercel usually infers all of these correctly for Next.js):

| Setting           | Value                                                            |
| ----------------- | ---------------------------------------------------------------- |
| Framework preset  | Next.js                                                          |
| Build command     | `pnpm build`                                                     |
| Install command   | `pnpm install`                                                   |
| Output            | (leave default)                                                  |
| Node version      | 22                                                               |
| Production branch | `claude/bracken-roe-website-spec-3do0dk` (or `main` after merge) |

There is no `vercel.json`; Next.js needs none here. Do not add one.

## Step B — Production environment variables

Set these in **Vercel → Settings → Environment Variables → Production**. Never commit any of
them to Git. Use `vercel env add <NAME> production` or the dashboard.

**Required — the site is wrong without these**

| Variable                         | Value                      | Notes                                                     |
| -------------------------------- | -------------------------- | --------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | `https://brackenroe.co.uk` | No trailing slash. Drives canonical, sitemap, robots, OG. |
| `RESEND_API_KEY`                 | from Resend                | Secret.                                                   |
| `ENQUIRY_FROM_EMAIL`             | `website@brackenroe.co.uk` | Must be on a Resend-verified domain.                      |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | from Cloudflare            | Public by design.                                         |
| `TURNSTILE_SECRET_KEY`           | from Cloudflare            | Secret.                                                   |

`VERCEL_ENV=production` is set by Vercel automatically; do not set it yourself. It is what
switches on HSTS, the Turnstile requirement and the strict content gates.

**Optional**

| Variable                                            | Default if unset                                                                             |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `ENQUIRY_TO_EMAIL`                                  | falls back to `studio@brackenroe.co.uk` — already correct, so you may omit it                |
| `CONTENT_STAGE`                                     | `production` — omit it                                                                       |
| `RATE_LIMIT_UPSTASH_REDIS_REST_URL` / `..._TOKEN`   | in-memory limiter per instance (see step G)                                                  |
| `ENQUIRY_SEND_ACKNOWLEDGEMENT`                      | `false`                                                                                      |
| `ENQUIRY_UPLOADS_ENABLED` + `MALWARE_SCAN_ENDPOINT` | uploads disabled; **both** are required to enable them                                       |
| `SANITY_*`                                          | unset → the site renders its committed content. Only set these if moving content to the CMS. |
| `SOCIAL_INSTAGRAM_URL` / `SOCIAL_LINKEDIN_URL`      | unset → the links are hidden entirely                                                        |

**Gating facts, verified in the code**

- Turnstile is mandatory whenever `VERCEL_ENV=production`. With no `TURNSTILE_SECRET_KEY`
  the verifier returns `not-configured` and every submission is refused. Both Turnstile keys
  must be set before the form can work in production.
- Email sends only when `RESEND_API_KEY` **and** `ENQUIRY_FROM_EMAIL` are both present.
- `ENQUIRY_TO_EMAIL` defaults to the address in `src/lib/site.ts`, which is already
  `studio@brackenroe.co.uk`.

## Step C — Domains

In Vercel → Settings → Domains:

1. Add `brackenroe.co.uk` and set it as the **primary** production domain.
2. Add `www.brackenroe.co.uk` and configure it to **redirect** to the apex.

Vercel issues and renews TLS automatically once DNS resolves. Do not buy a certificate.

## Step D — one.com DNS

**Read the exact records from Vercel first.** Apex and CNAME targets are now per-project and
dynamic, so any value copied from a guide may be wrong:

```bash
vercel domains inspect brackenroe.co.uk
```

Use what that prints, or what the domain card in the dashboard shows. Historically these were
`76.76.21.21` and `cname.vercel-dns.com`, but newer projects get anycast addresses such as
`216.198.79.1` and per-project targets like `xxxx.vercel-dns-017.com`. Treat the dashboard as
the only source of truth.

Then, in the one.com DNS editor:

- Add an `A` record for the apex (`@`) with the value Vercel shows.
- Add a `CNAME` for `www` with the target Vercel shows.

**Before touching any existing record:**

- List the current zone and record it, so there is a rollback point.
- If an existing `A`, `AAAA` or `CNAME` on `@` or `www` points at one.com's own web hosting
  or a parking page, it must be replaced, because two answers for the same name will make
  the site resolve inconsistently. Explain that to the owner and get approval first.
- **Do not touch `MX` records or any existing mail-related `TXT`.** Those carry the
  practice's existing email. Nothing in this deployment requires changing them.
- Leave every unrelated record alone.

## Step E — Resend and email authentication

1. Create or open the Resend account.
2. Add and verify the sending domain. Prefer a **subdomain** such as `send.brackenroe.co.uk`
   so that its SPF and DKIM are independent of the existing mailbox provider. If you use the
   apex instead, you must merge SPF rather than replace it (see below).
3. Add the DKIM and SPF records Resend generates, at one.com.

Email-record rules:

- **SPF**: a domain may have only one `TXT` SPF record. If one already exists on the name you
  are configuring, **merge** Resend's `include:` into it. Never add a second SPF record and
  never overwrite the existing one without showing the owner the before and after.
- **DKIM**: add as given; it is a new selector and will not collide.
- **DMARC**: if `_dmarc` does not exist, adding `v=DMARC1; p=none; rua=mailto:studio@brackenroe.co.uk`
  is a safe, non-enforcing start. If one already exists, leave it alone and tell the owner.
- Changing `ENQUIRY_FROM_EMAIL` to match the verified domain is a Vercel env change, not a
  DNS change.

## Step F — Cloudflare Turnstile

1. Cloudflare dashboard → Turnstile → add a widget.
2. Hostnames: `brackenroe.co.uk` and `www.brackenroe.co.uk`.
3. Put the site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the secret in
   `TURNSTILE_SECRET_KEY`, both in Vercel Production.
4. The CSP already allows Turnstile; no code change is needed.

## Step G — Rate limiting

The limiter defaults to 5 submissions per 15 minutes and 20 per day. Without Upstash it is
in-memory and therefore **per serverless instance**, which is weak on Vercel because
instances scale out. Recommended: create an Upstash Redis database and set
`RATE_LIMIT_UPSTASH_REDIS_REST_URL` and `RATE_LIMIT_UPSTASH_REDIS_REST_TOKEN`. The free tier
is normally sufficient; confirm before accepting any paid plan.

## Step H — Deploy and verify live

```bash
vercel --prod
```

Then verify, and report actual observed output rather than assumptions:

```bash
# resolution and TLS
dig +short brackenroe.co.uk
dig +short www.brackenroe.co.uk
curl -sI https://brackenroe.co.uk | head -1
curl -sI https://www.brackenroe.co.uk | grep -iE "^HTTP|^location"   # expect redirect to apex

# headers
curl -sI https://brackenroe.co.uk | grep -iE "strict-transport|content-security-policy|x-frame|x-content-type|referrer-policy|permissions-policy"

# metadata
curl -s https://brackenroe.co.uk | grep -oE '<link rel="canonical"[^>]*>|<meta property="og:(url|image)"[^>]*>'
curl -s https://brackenroe.co.uk/robots.txt
curl -s https://brackenroe.co.uk/sitemap.xml | grep -c "<loc>"        # expect 27
curl -sI https://brackenroe.co.uk/contact/thanks | grep -i x-robots   # expect noindex
```

Then, in a browser:

1. Load the site on desktop and on a phone viewport. Check the homepage hero, Projects,
   one project page, Practice and Contact.
2. Submit a real enquiry through `/contact`. Confirm the Turnstile widget appears and that
   you land on `/contact/thanks`.
3. Confirm the message arrives at `studio@brackenroe.co.uk`, and check that it did not land
   in spam. If it did, revisit SPF/DKIM alignment in step E.
4. Check the Vercel function logs for the enquiry route; the code deliberately logs a
   reference, project type and whether a file was attached, and never the message body.

Report: live URL, apex and www resolution, TLS status, header and metadata results, the
contact-form result including where the email landed, and anything still outstanding.

---

## Safety rules

- Never commit an API key, token or `.env` file. Only `.env.example` belongs in Git.
- Inspect any DNS record before changing it, and explain why it must change.
- Do not alter `MX` records or existing mail `TXT` records; this deployment does not need to.
- Do not purchase anything without explicit approval.
- Preserve the approved design and content exactly.

## Why this brief exists

The session that prepared this work runs in a managed remote container whose egress policy
returns `403` to `CONNECT` for `vercel.com`, `api.vercel.com`, `api.resend.com`,
`api.cloudflare.com`, `api.upstash.com` and `one.com`. The Vercel CLI was installed and
`vercel login` was attempted; it failed with `fetch failed`, and the proxy recorded three
rejected connections to `api.vercel.com`. That container also has no browser automation, so
there was no dashboard to drive either. The block is an organization policy, not a
misconfiguration, and the proxy documentation states such denials must be reported rather
than worked around.
