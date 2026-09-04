# Evidence standard

This document defines what may be published on the portfolio, how it is labelled, and the
threshold an item must meet before it leaves draft. The build enforces the mechanical parts
(schemas, draft exclusion, forbidden strings); the judgement parts are listed here so they are
applied consistently.

## Purpose

The site is a candidate-evidence asset for UK recruiters and technical hiring managers. Every
public claim must trace to something a reader can inspect: a documented lab, a public repository,
an official credential record, an approved CV, or an authorised organisation project.

## Evidence taxonomy

Every technical item carries exactly one context label, displayed prominently on its card and
detail page. Labels are factual descriptions, never self-awarded scores.

| Label                             | Meaning                                                                                                | Typical proof                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Focused lab**                   | A bounded technical task completed in a lab environment.                                               | Objective, result, one or two screenshots, notes on what was learned.          |
| **Validated lab**                 | A completed implementation with explicit tests and recorded evidence.                                  | Test matrix with expected and actual results, screenshots, optional code.      |
| **Integrated case study**         | A multi-component scenario designed and documented as an end-to-end environment or operational change. | Architecture diagram, decisions, implementation, test results, rollback, code. |
| **External organisation project** | Authorised work in a genuine organisational environment, published with written permission.            | Written permission, sanitised facts, measured result, reference availability.  |

Rules:

- A lab can never silently become "professional experience". Labs and case studies are lab work
  and are always labelled as such.
- Public automation repositories are labelled with the evidence type that describes how they
  were produced (normally a validated lab) and are always described as repositories.
- The four labels are the only public evidence labels. Do not add difficulty ratings, percentage
  scores, radar charts or self-assessed proficiency levels.

## Publication threshold

An item may move from `draft: true` to `draft: false` only when all of the following are true.

### All technical items

1. The work is complete. Partially finished exercises stay in draft.
2. The item has a one-sentence problem/result summary and, where relevant, a one-sentence outcome.
3. `completedDate` and `lastReviewedDate` are accurate. `platformVersion` is recorded where it
   matters (OS build, service release, module version).
4. Every screenshot and diagram has passed the [sanitisation checklist](SANITISATION_CHECKLIST.md).
5. No `TEMPLATE`, `TODO` or `FIXME` text remains. The build fails if any reaches `dist/`.
6. Every claim in the text is something Palminder can explain and defend at interview.
7. Nothing implies commercial or production experience that did not happen.

### Focused lab

- Scenario, objective, implementation summary, outcome and at least one lesson learned.

### Validated lab

- Everything required of a focused lab, plus a validation plan with actual recorded results
  (`testEvidence: true` only when results are in the page) and a troubleshooting section, even
  if it records that nothing went wrong.

### Integrated case study

- All nineteen sections of the detail template, with the frontmatter supplying the snapshot,
  gallery, related items and sanitisation statement.
- One clear architecture or process diagram with a text alternative.
- Design decisions with alternatives considered, a test matrix with results, troubleshooting,
  and a change/rollback/teardown approach.
- Automation or code where the scenario involves repeatable work, published in a public,
  sanitised repository.
- Four to eight high-value screenshots, cropped to the relevant proof.

### Automation repository

- Public, sanitised repository with a useful README, working code and no secrets, tenant
  identifiers or personal data.
- The card states the problem, approach, safety controls (for example read-only by default,
  least-privilege permissions), how the code was tested, and usage notes.
- Palminder can explain every line. Generated code that cannot be explained is not published.

### External organisation project

- Written authority to perform the work, agreed scope and exclusions, and written permission to
  publish. The schema refuses to publish without `publication.permissionStatus: granted` and an
  `approvedDate`.
- Synthetic or redacted screenshots and data only. No logos without permission, no reference
  contact details, no internal information.
- Relationship type and paid/unpaid status stated accurately. Never imply an unpaid project was paid.
- Feedback quoted only with permission, attributed to a role or organisation, never to contact details.
- A process exists to amend or remove the case study if permission changes (see
  [CONTENT_GUIDE.md](CONTENT_GUIDE.md)).

### Credentials

- Added only from an official transcript, badge or certificate. Status is one of
  `earned-current`, `earned-expired`, `historical` or `in-progress`.
- In-progress study is always labelled "IN PROGRESS — NOT YET EARNED". A `planned` status does
  not exist publicly and fails the build.
- Applied Skills are listed only once earned and verifiable.

### Experience

- Role titles, dates, scope, technologies and responsibilities come from the approved CV. Until
  then an organisation name may be listed, but nothing else may be inferred.
- The career break is acknowledged once, briefly, on the Experience page only, using the approved
  wording. Health, disability and autism details are not published anywhere.
- The excluded former employer named in the build brief is never listed, implied or used as
  experience. The build checks the output for the name.

## Freshness and archiving

- Every item records `lastReviewedDate`. Review published items at least every twelve months and
  after any material product change.
- If a product or interface has materially changed and the work has not been revalidated, set
  `archived: true`. Archived items display "Archived evidence — retained for historical context",
  are removed from featured areas, home-page counts and the sitemap, and are marked `noindex`.
- Archived items cannot be `featured`; the schema rejects that combination.

## Counts and metrics

- Public counts are computed at build time from published, non-archived entries.
- Drafts, private notes, screenshots and substeps are never counted.
- A metric with a value of zero is not rendered. The build fails if one is.
- No aspirational counts (planned certifications, target lab totals) are published.

## Language

Use concrete technical nouns and evidence. Do not use "digital transformation expert",
"innovative solutions", "passionate IT professional", "technology guru", "thought leader",
"rockstar", "ninja", or unsupported "expert", "architect" or "senior" claims. The site speaks
in the first person singular; there is no "we".
