# Content collections

| Folder                   | Collection             | Route                                   |
| ------------------------ | ---------------------- | --------------------------------------- |
| `case-studies/`          | `caseStudies`          | `/evidence/case-studies/<id>/`          |
| `labs/`                  | `labs`                 | `/labs/<id>/`                           |
| `automation/`            | `automationProjects`   | `/evidence/automation/` (cards)         |
| `organisation-projects/` | `organisationProjects` | `/evidence/organisation-projects/<id>/` |
| `experience/`            | `experience`           | `/experience/`                          |
| `credentials/`           | `credentials`          | `/credentials/`                         |

Rules that the build enforces (see `src/content.config.ts`):

- `draft` defaults to `true`. Nothing is published until an entry says `draft: false`.
- Files or folders starting with `_` are ignored entirely.
- Entries named `template-*` are draft-only starting points. Copy one, rename it, then edit.
- Draft entries never appear in routes, navigation, search, sitemaps, structured data or counts.

See `CONTENT_GUIDE.md` in the repository root for the full authoring walkthrough.
