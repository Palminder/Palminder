# Pre-launch checklist

The site must not be recommended for public launch (Phase 2) until every item is complete.
Phase 1 (this build) is a private structure and preview only.

## Repository and hosting

- [ ] Move the site to a **private** repository owned by Palminder (for example `Palminder/portfolio-site`), keeping `main` as the default branch. The current branch lives in the GitHub profile repository, whose README is shown on the profile page; merging there would replace it.
  1. Create the private repository on GitHub (no README, no licence).
  2. `git clone https://github.com/Palminder/Palminder.git site && cd site && git checkout claude/new-session-p3u7to`
  3. `git remote set-url origin https://github.com/Palminder/<new-repo>.git && git push -u origin claude/new-session-p3u7to:main`
  4. Delete the branch from the profile repository once the new repository builds green.
- [ ] Enable branch protection on `main`: require the CI workflow and one review.
- [ ] Enable Dependabot and secret scanning in the repository settings.
- [ ] Connect the private repository to Cloudflare Pages per DEPLOYMENT.md; keep `PUBLIC_SITE_ENV=preview` in both environments until launch.
- [ ] Confirm the `pages.dev` preview is `noindex` and, optionally, behind a Cloudflare Access policy.

## Content that must exist before launch (Phase 2 gate)

- [ ] Verified Experience page: role titles, dates, scope and technologies for SSE, Wescot, Queen Margaret University, Prudential via Xtravirt and AVEVA copied from the approved CV; `verified: true` on each.
- [ ] Three strong integrated case studies published, each with diagram, decisions, test matrix, troubleshooting, rollback and lessons learned.
- [ ] At least two curated, sanitised public automation repositories (or one exceptionally substantial one), each with README, tests and safety controls, published as cards.
- [ ] Credentials page accurate: MD-102 shown only as in progress unless passed; every existing credential added from the official transcript with verification links.
- [ ] Recruiter pack reviewed, `recruiterPack.version` and `lastUpdated` bumped; approved recruiter-pack PDF and CV PDF placed in `public/downloads/` and referenced in `src/data/site.ts`.
- [ ] Contact routes supplied and approved: email at minimum; LinkedIn and GitHub only if confirmed. Update the privacy notice's contact section.
- [ ] Every screenshot checked at full resolution against SANITISATION_CHECKLIST.md.
- [ ] Every public claim traced to a supplied source (CV, transcript, repository, lab record).

## Quality gates

- [ ] `npm run qa` passes locally and CI is green on `main`.
- [ ] `PUBLIC_SITE_ENV=production PUBLIC_SITE_URL=<origin> npm run build && PUBLIC_SITE_ENV=production npm run verify:dist` passes.
- [ ] Manual accessibility checks in ACCESSIBILITY_CHECKLIST.md completed and recorded.
- [ ] Recruiter first-screen test at 1366×768, 1920×1080 and a 390px-wide phone.
- [ ] 200% zoom and text-resize test.
- [ ] Screen-reader spot check.
- [ ] All filters usable and clearable with keyboard and touch; no-JavaScript browsing works.
- [ ] Recruiter pack printed to A4: two pages, no clipping, links readable.
- [ ] All external links and downloads opened and checked.
- [ ] Lighthouse on Home, Evidence, Labs, Credentials, Recruiter pack: at least 95 in all four categories, treated as a floor rather than a target.
- [ ] `verify:dist` confirms the excluded former employer's name is absent from `dist/`.

## Launch steps

- [ ] Set `PUBLIC_SITE_ENV=production` and `PUBLIC_SITE_URL` in the Cloudflare production environment; redeploy.
- [ ] Confirm `/robots.txt` allows crawling and `<meta name="robots">` reads `index, follow`.
- [ ] Decide on the personal-name domain (see the build brief's domain strategy); purchase only with Palminder's explicit approval, in his own registrar account with MFA and WHOIS privacy.
- [ ] Connect the domain, enforce the canonical apex/`www` redirect, update `PUBLIC_SITE_URL`, redeploy.
- [ ] Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- [ ] Record the launch in CHANGELOG.md and tag the release.

## Standing rules after launch

- Review every published item's `lastReviewedDate` at least yearly; archive stale work.
- Add credentials only from official verification data.
- Publish organisation projects only with written permission; keep a process to amend or remove them.
- Never add analytics, forms or third-party scripts without updating the privacy notice and the CSP first.
