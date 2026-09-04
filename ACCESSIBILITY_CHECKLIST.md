# Accessibility checklist

Target: WCAG 2.2 Level AA. Automated checks (axe-core via Playwright, see `tests/a11y.spec.ts`)
run in CI on representative pages, but they cover only part of the standard. The manual checks
below must be completed before the first public launch and after any change to layouts, navigation,
the lab-library controls or the recruiter-pack print layout.

Do not display a WCAG conformance logo or claim absolute compliance unless the completed
production site has undergone a genuine conformance review.

## Implemented in the build

- Semantic landmarks: one `header`, one `nav` labelled "Main", one `main`, one `footer` with a
  labelled footer navigation; breadcrumbs in a labelled `nav`.
- Skip link as the first focusable element, moving focus to `main` (which has `tabindex="-1"`).
- Logical heading order: one `h1` per page, sections introduced by `h2`, cards by `h3`.
- Visible focus style on every interactive element (3px accent outline plus white halo), with
  `:focus-visible` so mouse users are not distracted.
- Colour contrast: text `#111827` and muted text `#4b5563` on `#f7f8fa`/`#ffffff`; accent
  `#0b5cad` on white (6.7:1); badge text/background pairs chosen for at least 4.5:1.
- No colour-only meaning: every badge and status carries text; proof icons have text labels.
- Touch targets: buttons, navigation links, pagination and filter controls are at least 44px tall.
- Mobile navigation uses a native `details`/`summary` disclosure, operable by keyboard without JavaScript.
- Lab-library search and filters are a normal form with labelled `input` and `select` controls, a
  visible Reset button, and a polite `role="status"` region announcing result counts.
- Without JavaScript the paginated list, category pages and technology pages remain available.
- Code blocks are focusable (`tabindex="0"`) and scroll horizontally inside the content column;
  tables are wrapped in a focusable, labelled scroll region.
- Images use alt text from content frontmatter; decorative images use an empty alt only when the
  caption conveys the information. Diagrams carry a written text alternative.
- Decorative SVG icons are `aria-hidden="true"`.
- No autoplaying media, no carousels, no animation; the only transitions are colour changes and
  they are disabled under `prefers-reduced-motion: reduce`.
- Text resizing and zoom: relative units throughout; no fixed-height containers that clip text.
- Print stylesheet keeps content selectable and readable, removes navigation, and prints link URLs.
- `lang="en-GB"` on every page.

## Manual checks before launch

Record the date, browser/assistive technology and result for each item.

### Keyboard

- [ ] Tab through every page: order is logical, nothing is skipped, nothing traps focus.
- [ ] Skip link appears on first Tab and moves focus to the main content.
- [ ] Mobile menu opens and closes with Enter/Space; links inside are reachable; Escape is not required but focus never gets lost.
- [ ] Lab-library filters: every control reachable, change applies, Reset works and returns focus to the search field.
- [ ] Pagination links and "Show more" button reachable and operable.
- [ ] Details/summary elements (diagram text alternative, browse by technology, automation "More detail") open by keyboard.

### Screen reader spot checks (NVDA with Firefox or Chrome; VoiceOver with Safari)

- [ ] Landmarks are announced and navigable (header, navigation, main, footer).
- [ ] Headings list gives a sensible outline of the home page, the evidence hub and a detail page.
- [ ] Evidence-type badges and the "IN PROGRESS — NOT YET EARNED" label are read as text.
- [ ] Search result count is announced after a filter change without moving focus.
- [ ] Card links are meaningful out of context (the link text is the item title).
- [ ] Figure captions and alt text are read; the diagram text alternative is discoverable.
- [ ] Table headers are associated with cells in a validation matrix.

### Zoom and reflow

- [ ] 200% browser zoom on a 1366px-wide window: no horizontal scrolling of the page, no clipped text, header and hero remain usable.
- [ ] 320px-wide viewport (or 400% zoom): content reflows into one column; tables and code scroll within their containers only.
- [ ] Text-only resize (browser minimum font size 24px): layout holds.

### Visual

- [ ] Contrast checked with a tool on every badge variant, the focus ring on each background, and link text on the off-white background.
- [ ] Focus indicator visible on the accent-blue primary button.
- [ ] Nothing relies on hover alone; no information appears only in tooltips.

### Print (recruiter pack)

- [ ] Print preview to A4 in Chrome and Firefox: two pages, no clipped content, links show URLs, headings not orphaned.
- [ ] Save as PDF and check the text is selectable and the reading order is correct.

### Automated

- [ ] `npm test` passes (axe on desktop and mobile projects).
- [ ] Lighthouse accessibility audit on Home, Evidence, Labs, Credentials and Recruiter pack scores at least 95 (a score is not a substitute for the manual checks above).

## Known limitations to re-check

- The native `details` menu has no automatic close-on-outside-click; it is a deliberate
  no-JavaScript trade-off and is keyboard-operable.
- Pagefind search results are rendered by script; the no-JavaScript fallback is the paginated list.
- axe cannot judge alt-text quality; review every caption and alt text by hand.
