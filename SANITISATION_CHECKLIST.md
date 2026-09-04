# Sanitisation checklist

Complete this checklist for every screenshot, diagram, code sample, PDF and organisation-project
text before it is committed. Unredacted source material must never be committed, even to a
private branch: keep it outside the repository (the `.gitignore` excludes `source-material/` and
`private/` as a safety net, not as a place to store it).

## 1. Screenshots

Inspect the image at full resolution, not the thumbnail.

- [ ] Real tenant names, primary domains and `onmicrosoft.com` domains removed or replaced.
- [ ] User principal names, display names of real people and personal email addresses removed.
- [ ] Tenant IDs, subscription IDs, object IDs, correlation IDs and request IDs removed.
- [ ] Device names, serial numbers, hardware hashes, IMEIs, MAC addresses and IP addresses removed.
- [ ] QR codes (enrolment, authenticator, Wi-Fi) removed or blurred beyond recovery.
- [ ] API keys, tokens, client secrets, certificates, thumbprints, licence keys and connection strings removed.
- [ ] Account avatars, profile photos and initials tiles removed.
- [ ] Browser tabs, bookmarks bar, extensions, address bar and notification areas cropped out.
- [ ] File paths containing a personal name or username removed.
- [ ] Any client or organisation data removed; for organisation projects, use synthetic or redacted data only.
- [ ] Image cropped to the relevant proof while keeping enough UI context to be credible.
- [ ] Redactions are solid boxes, not blur alone (blur can sometimes be reversed).
- [ ] Image metadata (EXIF, XMP, thumbnails, GPS) stripped. Astro's build re-encodes images, but strip the source file too.
- [ ] File name contains no personal name, tenant name or identifier.
- [ ] Alt text and caption written; alt text is empty only when the image is decorative and the caption conveys the information.

## 2. Diagrams

- [ ] Diagram source file stored under `diagrams/` and the rendered SVG or PNG under `src/assets/`.
- [ ] No real hostnames, IP ranges, tenant names or identifiers in labels.
- [ ] SVG exported without embedded fonts, scripts, external references or metadata blocks that name a person or machine.
- [ ] A plain-language text alternative (`diagram.textAlternative`) written.

## 3. Code and repositories

- [ ] No secrets in code, history, tests, fixtures, CI configuration or example files. Run a secret scanner over the whole history before making a repository public.
- [ ] Tenant, subscription and object identifiers replaced with placeholders such as `00000000-0000-0000-0000-000000000000`.
- [ ] Example values are clearly synthetic (`contoso.example`, `user@example.com`).
- [ ] README explains prerequisites, permissions required, safety controls (read-only default, explicit apply switch) and how it was tested.
- [ ] Every line can be explained. Generated code that cannot be explained is not published.

## 4. Text and frontmatter

- [ ] No `TEMPLATE`, `TODO` or `FIXME` markers.
- [ ] No reference person's name, email or phone number.
- [ ] No health, disability or autism details anywhere on the site.
- [ ] The excluded former employer from the build brief is not mentioned anywhere.
- [ ] Organisation projects: publication permission recorded in frontmatter, disclosure restrictions respected, relationship and paid status accurate.
- [ ] `sourceNote` fields contain nothing sensitive; they are not rendered but they are committed.

## 5. PDFs (recruiter pack, CV)

- [ ] Document properties (author, title, subject, keywords, comments, company) checked and cleaned.
- [ ] No embedded reference contact details, home address or personal phone number unless explicitly approved.
- [ ] Links inside the PDF point only to public pages.
- [ ] File saved to `public/downloads/` and referenced from `src/data/site.ts`.

## 6. Final checks before commit

- [ ] `npm run build && npm run verify:dist` passes.
- [ ] `git diff --stat` shows only the files you intended to add.
- [ ] Nothing under `source-material/` or `private/` is staged.
