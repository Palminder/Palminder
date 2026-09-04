# Changelog

All notable changes to the portfolio site. Dates are ISO (YYYY-MM-DD).

## [0.1.0] — 2026-09-04

Phase 1: private structure and preview.

### Added

- Astro 7 static site with TypeScript strict mode, plain CSS design system (single light theme,
  system fonts, one accent), and directory-style routes with trailing slashes.
- Content collections with schema validation for case studies, labs, automation repositories,
  organisation projects, experience and credentials; draft-by-default with publication
  safeguards (permission gating, verified-only employment, no `planned` credential status).
- All routes from the specification: home, evidence hub, case studies, automation, conditional
  organisation projects, lab library with pagination, category and technology pages, experience,
  credentials, about, recruiter pack (A4 print stylesheet), contact, privacy, 404, robots.
- Evidence detail template (19 sections) with Pagefind search metadata, figures with lazy
  loading and full-size links, diagrams with text alternatives, series support and related items.
- Lab-library keyword search, filters (type, category, technology, role, year), sorting and URL
  state, built on a Pagefind index restricted to evidence pages; no-JavaScript fallback.
- Home page sections that render only from published content: evidence snapshot metrics,
  featured case studies, capability-to-evidence map, automation, experience proof, credentials
  and current study, organisation projects.
- Verified initial copy: hero, availability, MD-102 in-progress status, experience line,
  career-break wording (Experience page only), privacy notice.
- Draft templates for the seven flagship case-study themes, focused/validated labs and lab
  series, an automation repository, an organisation project, earned/historical credentials and
  an Applied Skill, and unverified experience entries.
- Security headers (`public/_headers`) with a strict Content Security Policy; Shiki highlighting
  converted to classes so no inline styles are needed.
- QA tooling: `verify-dist`, internal link check, header-aware static server, Playwright smoke,
  axe accessibility and print tests, GitHub Actions workflow with Gitleaks and npm audit,
  Dependabot configuration.
- Repository documentation: README, content guide, evidence standard, sanitisation checklist,
  deployment guide, accessibility checklist, content inventory, pre-launch checklist.
