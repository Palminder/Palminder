# Content inventory

Status of every content item and site feature as of 2026-09-04 (build 0.1.0).

Statuses: **published** (in the production output), **draft awaiting evidence** (template or
partial entry, excluded from output), **blocked awaiting permission** (cannot publish without
written permission or supplied data), **not required** (deliberately absent in version 1).

## Site copy and configuration (`src/data/site.ts`)

| Item                                                               | Status                           | Notes                                                                                          |
| ------------------------------------------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------------- |
| Eyebrow, H1, capability line, subheadline, evidence intro          | published                        | Verbatim from the specification.                                                               |
| Availability line (Scotland, fully remote UK)                      | published                        |                                                                                                |
| MD-102 current-development wording and in-progress label           | published                        | Hero, credentials page, recruiter pack.                                                        |
| Experience line (SSE, QMU, Prudential via Xtravirt, AVEVA, Wescot) | published                        | Organisations only; no titles or dates inferred.                                               |
| Background line (enterprise infrastructure, Windows, VDI)          | published                        |                                                                                                |
| Career-break wording                                               | published (Experience page only) | Approved heading and body; nowhere else.                                                       |
| Project-enquiry wording                                            | not required (stored, disabled)  | `projectEnquiries.enabled: false`; renders only when enabled.                                  |
| Contact email                                                      | blocked awaiting permission      | No address supplied for publication; contact page shows an honest holding note.                |
| LinkedIn URL                                                       | blocked awaiting permission      | Not supplied.                                                                                  |
| GitHub profile URL                                                 | blocked awaiting permission      | Not confirmed for publication; the profile README also needs tidying before it is linked.      |
| Recruiter-pack PDF download                                        | draft awaiting evidence          | Slot exists (`downloads.recruiterPackPdf`); generate from the HTML page once content is final. |
| CV PDF download                                                    | blocked awaiting permission      | Approved CV not supplied.                                                                      |
| Professional headshot                                              | not required                     | Optional; slot exists (`headshot`).                                                            |
| Privacy notice                                                     | published                        | Written from actual behaviour; update if contact email is added.                               |

## Credentials (`src/content/credentials/`)

| Entry                                                                           | Status                  | Notes                                                             |
| ------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| MD-102 → Endpoint Administrator Associate                                       | published (in progress) | Labelled IN PROGRESS — NOT YET EARNED everywhere.                 |
| template-earned-certification                                                   | draft awaiting evidence | Populate from official transcript for any existing certification. |
| template-historical-certification                                               | draft awaiting evidence | For expired/retired credentials from the transcript.              |
| template-applied-skill                                                          | draft awaiting evidence | Only once an Applied Skill is earned.                             |
| Any planned certification (AZ-104, SC-300, AZ-802, Terraform Associate, AB-650) | not required            | Never published; private planning stays outside the repository.   |

## Experience (`src/content/experience/`)

| Entry                                                       | Status                  | Notes                                                       |
| ----------------------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| Career break and structured technical return (2023–present) | published               | Approved wording.                                           |
| SSE — 3rd Line Infrastructure Support                       | published (title only)  | Dates, scope, technologies await the approved CV.           |
| Wescot                                                      | draft awaiting evidence | Role, dates and responsibilities from the approved CV only. |
| Queen Margaret University                                   | draft awaiting evidence | As above.                                                   |
| Prudential via Xtravirt                                     | draft awaiting evidence | As above.                                                   |
| AVEVA                                                       | draft awaiting evidence | As above.                                                   |
| Excluded former employer named in the brief                 | not required            | Never listed; `verify:dist` checks the output for the name. |

## Integrated case studies (`src/content/case-studies/`)

All seven are **draft awaiting evidence**: the work has not been performed. Each template carries the
full 19-section structure and theme-specific technology tags.

| Template                                    | Theme                                                                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| endpoint-provisioning-and-security-baseline | Intune, Autopilot, compliance, CA, BitLocker, ASR, Defender, apps, updates, remediation, Graph |
| cross-platform-endpoint-lifecycle           | Windows, Android Enterprise, iOS; MDM/MAM decisions                                            |
| identity-and-privileged-access              | Entra ID, authentication, CA, PIM, break-glass, monitoring                                     |
| hybrid-windows-infrastructure               | AD DS, DNS, DHCP, Group Policy, virtualisation, backup, monitoring                             |
| azure-administration-foundation             | Resource organisation, RBAC/PIM, Policy, networking, compute, storage, backup, cost            |
| terraform-driven-azure-environment          | Modules, remote state, validation, policy checks, plan, rollback/teardown                      |
| azure-virtual-desktop-scenario              | Only if it demonstrates genuine depth                                                          |

## Labs (`src/content/labs/`)

| Entry                  | Status                  | Notes                            |
| ---------------------- | ----------------------- | -------------------------------- |
| template-focused-lab   | draft awaiting evidence | Copy per lab.                    |
| template-validated-lab | draft awaiting evidence | Includes a test-matrix skeleton. |
| template-lab-series    | draft awaiting evidence | For grouped small exercises.     |

No lab is published. The lab library renders its empty state and the search index is empty.

## Automation repositories (`src/content/automation/`)

| Entry                          | Status                  | Notes                                                     |
| ------------------------------ | ----------------------- | --------------------------------------------------------- |
| template-automation-repository | draft awaiting evidence | Publish only with a public, sanitised, tested repository. |

## Organisation projects (`src/content/organisation-projects/`)

| Entry                         | Status                      | Notes                                                              |
| ----------------------------- | --------------------------- | ------------------------------------------------------------------ |
| template-organisation-project | blocked awaiting permission | Requires written authority, agreed scope and publication approval. |

The `/evidence/organisation-projects/` route, its navigation links and home-page section are absent
from the build until one project is published.

## Site sections driven by published content (current state)

| Section                                  | Current render                                                                                     |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Evidence snapshot metrics (home)         | hidden (all counts are zero)                                                                       |
| Featured case studies (home)             | hidden                                                                                             |
| Capability-to-evidence map (home)        | hidden (no supporting evidence yet)                                                                |
| Automation highlights (home)             | hidden                                                                                             |
| Organisation projects (home, hub, route) | hidden                                                                                             |
| Evidence hub highlights                  | honest empty state and taxonomy explanation                                                        |
| Lab library                              | filters present, empty state, empty search index                                                   |
| Credentials page                         | MD-102 in progress only                                                                            |
| Experience page                          | career-break entry, SSE title, verified organisation line, note that dates follow the approved CV  |
| Recruiter pack                           | summary, availability, MD-102 status, experience line, references statement; no evidence links yet |

## Not required in version 1

Skills page, testimonials/references page, project-enquiries page, articles/blog, RSS, analytics,
contact form, scheduling widgets, custom domain, Pages Functions, dark theme, MDX.
