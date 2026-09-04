# Content guide

How to add labs, case studies, automation repositories, credentials, experience entries and
organisation projects safely. Read [EVIDENCE_STANDARD.md](EVIDENCE_STANDARD.md) for what may be
published and [SANITISATION_CHECKLIST.md](SANITISATION_CHECKLIST.md) before adding any image.

## How publishing works

- Content lives in `src/content/<collection>/` as Markdown with YAML frontmatter.
- Every entry starts as a draft. `draft` defaults to `true`; an entry is published only when the
  frontmatter says `draft: false`.
- Drafts are never built into routes, navigation, search, sitemaps, structured data or counts.
  `npm run verify:dist` fails if a draft leaks into `dist/`.
- The schemas in `src/content.config.ts` validate every entry at build time, drafts included, so
  a template that is half-finished still has to be structurally valid.
- Files or folders beginning with `_` are ignored entirely. Use them for private notes.
- Taxonomy values (categories, technologies, target roles) are fixed lists in
  `src/data/taxonomy.ts`. Add a new key there first; the build rejects unknown values.
- Verified site copy (hero, availability, experience line, contact routes, downloads, feature
  flags) lives in `src/data/site.ts`. Nothing there may be inferred.

Local workflow for every change:

```bash
npm run dev          # http://localhost:4321 — drafts are still hidden here
npm run build        # validates schemas, builds dist/, builds the search index
npm run verify:dist  # draft, template, forbidden-string, metric and CSP checks
npm test             # smoke, accessibility and print tests against dist/
```

Search and filters work only against a built site (`npm run build` then `npm run serve:dist`);
in `npm run dev` the filter form reports that the index is unavailable and the plain list is used.

## Walkthrough 1: add a lab

1. Copy `src/content/labs/template-validated-lab.md` (or `template-focused-lab.md`) to a new file
   named after the lab, for example `src/content/labs/intune-compliance-baseline.md`. The file
   name becomes the URL: `/labs/intune-compliance-baseline/`.
   If the lab has images, use a folder instead: `src/content/labs/intune-compliance-baseline/index.md`
   with the images alongside it. The URL is the same.
2. Fill in the frontmatter:
   - `title`, `summary` (one sentence: problem and result), `outcome` (one sentence).
   - `evidenceType`: `focused-lab` or `validated-lab` (see the evidence standard).
   - `category`: one key from `categories` in `src/data/taxonomy.ts`.
   - `technologies`: one to twelve keys; the first four appear on cards.
   - `targetRoles`: one to six keys.
   - `completedDate`, `publishedDate`, `lastReviewedDate` as `YYYY-MM-DD`.
   - `platformVersion` where meaningful.
   - `links.repository` and `links.tests` when they exist (https only).
   - `testEvidence: true` only when the page contains a validation plan with actual results.
   - `gallery`: each image needs `image` (relative path), `alt` and `caption`. Set
     `decorative: true` and an empty `alt` only when the caption fully conveys the information.
   - `diagram`: optional for labs; `image`, `alt`, `caption` and a `textAlternative`.
   - `related`: references such as `labs/other-lab` or `case-studies/some-study`. Unknown or draft
     references are dropped silently.
   - `sanitisationStatement`: what the environment was and what was removed from screenshots.
   - `series` (optional): group several small exercises into one narrative with `name` and `parts`.
3. Write the body under the template headings. Remove headings that do not apply to a focused lab;
   keep all of them for a validated lab. Delete every guidance comment and `TEMPLATE` marker.
4. Run the sanitisation checklist on every image, then `npm run build && npm run verify:dist`.
5. Set `draft: false` and `featured: true` only if it belongs among the strongest items.
6. Preview with `npm run serve:dist`, check the card in `/labs/`, the detail page, and that search
   finds it. Commit on a branch and open a pull request; the CI preview URL is for final review.

## Walkthrough 2: add an integrated case study

1. Start from one of the seven draft templates in `src/content/case-studies/` (they map to the
   flagship themes in the build brief) or copy one to a new name.
2. Frontmatter is the same as a lab plus `evidenceType` fixed to `integrated-case-study`.
   A case study should normally include a `diagram` and four to eight `gallery` images.
3. Complete all body sections: scenario, objectives and success criteria, scope, environment and
   architecture, design decisions and alternatives, implementation summary, automation and code,
   security and access, validation plan and results (a real test matrix), troubleshooting,
   change/rollback/teardown, outcome, lessons learned.
4. Publish the accompanying repository first (see walkthrough 3) and link it from
   `links.repository`.
5. Build, verify, sanitise, then set `draft: false`. The home page shows the three most recently
   reviewed featured case studies; set `featured: true` deliberately.

## Walkthrough 3: add an automation repository

1. Make the repository public only after a full-history secret scan and the sanitisation
   checklist. The README must explain prerequisites, permissions, safety controls and testing.
2. Copy `src/content/automation/template-automation-repository.md` to a new file.
3. Fill in `title`, `summary`, `problem`, `approach`, `safetyControls` (list), `tests`, `usage`,
   `repositoryUrl` (required to publish), `technologies`, `targetRoles`, dates and versions.
   The optional Markdown body appears in a "More detail" disclosure on the card.
4. Set `draft: false`. Cards appear on `/evidence/automation/`; the two strongest (featured first)
   appear on the home page.

## Walkthrough 4: add a credential

1. Have the official transcript, badge or certificate open. Copy the matching template in
   `src/content/credentials/`:
   - `template-earned-certification.md` for a current certification,
   - `template-historical-certification.md` for an expired or retired one,
   - `template-applied-skill.md` for a Microsoft Applied Skill.
2. Use the exact title from the issuer, the issuer name, `credentialType`, `status`, `earnedDate`,
   `renewalOrExpiryDate` (if any), `verificationUrl` (the issuer's share link), `examCode` and a
   `description` limited to what the credential validates.
3. Valid statuses are `earned-current`, `earned-expired`, `historical` and `in-progress`. There is
   no `planned` status; the build rejects it. Do not add future or aspirational entries.
4. When MD-102 is passed: edit `md-102-endpoint-administrator.md`, change `credentialType` to
   `certification`, `status` to `earned-current`, add `earnedDate`, `renewalOrExpiryDate` and
   `verificationUrl`, remove the body note, and update the hero wording in `src/data/site.ts`
   (`currentDevelopment` and the in-progress label usage) to reflect the next verified fact.
5. Set `draft: false`, build and verify.

## Walkthrough 5: complete the experience entries

1. Open the approved CV. For each of `wescot.md`, `queen-margaret-university.md`,
   `prudential-via-xtravirt.md`, `aveva.md` and `sse.md` in `src/content/experience/`, copy the role
   title, dates (`startDate`, `endDate` or `current: true`), `summary`, `responsibilities` and
   `technologies` exactly as approved. Do not add anything the CV does not support.
2. Set `verified: true` and `draft: false`. The schema refuses to publish an employment entry
   that is not marked verified.
3. Set `order` so entries display in the intended sequence (lower first).
4. The career-break entry (`career-break.md`) uses the approved wording from `src/data/site.ts`
   and needs no changes.

## Walkthrough 6: add an organisation project

1. Before any work: written authority to perform it, agreed scope and exclusions, and an agreed
   statement of what may be documented.
2. Copy `src/content/organisation-projects/template-organisation-project.md`.
3. Complete every required field: organisation (approved name or anonymised descriptor, type and
   size only when permitted), `relationshipType`, `paid`, and the narrative fields from problem
   through documentation and handover. Use synthetic or redacted screenshots and data only.
4. Draft the text, then obtain approval of the public wording. Record it in
   `publication.permissionStatus: granted`, `publication.approvedDate` and, optionally,
   `publication.approvedBy` (role only) and `disclosureRestrictions`.
5. Add `feedback` only with `permissionGranted: true`; attribute it to a role or organisation,
   never to an email or phone number. Set `referenceAvailable` truthfully.
6. Set `draft: false`. The build refuses to publish without granted permission and an approval
   date. Once one project is published, the `/evidence/organisation-projects/` route, its navigation
   links and the home-page section appear automatically.
7. If permission is later withdrawn or changed: set `draft: true` (or edit the text), commit,
   push, confirm the deployment, then request removal of cached copies (see DEPLOYMENT.md).

## Enabling optional site features

All in `src/data/site.ts`:

- `contact.email`, `contact.linkedin`, `contact.github`: set each only when Palminder supplies and
  approves it. The hero GitHub link, contact page, footer and recruiter pack update automatically.
- `downloads.recruiterPackPdf`, `downloads.cvPdf`: paths under `public/` to approved PDFs.
- `projectEnquiries.enabled`: keep `false` until explicitly approved; the wording is already stored.
- `headshot`: optional approved professional photograph.
- `recruiterPack.version` and `recruiterPack.lastUpdated`: bump on every recruiter-pack change.

## Archiving stale evidence

When a product or interface has materially changed and the item has not been revalidated, set
`archived: true`. The item shows an "Archived evidence — retained for historical context" notice,
leaves featured areas, counts and the sitemap, and is marked `noindex`. Archived items cannot be
`featured`.

## Diagrams

Keep editable sources (draw.io, Excalidraw, Mermaid text) in `diagrams/`. Export a sanitised SVG or
PNG into the content folder or `src/assets/` and reference it from `diagram.image`. Astro optimises
the raster output at build time. Never export a diagram with embedded fonts, scripts or metadata.

## Adding a taxonomy value

Edit `src/data/taxonomy.ts`: add the key and label to `technologies`, `targetRoles` or
`categories`. Category pages and technology pages are generated only for values that published
items actually use, so adding a key has no visible effect until content uses it. Only create the
Linux and Containers category content when real work exists.
