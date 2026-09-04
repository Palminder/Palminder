# Shared assets

Optimised at build time by Astro when imported or referenced from content frontmatter.

- Evidence screenshots normally live next to their content entry
  (`src/content/labs/<slug>/index.md` with images alongside).
- Use this folder for images shared by several entries, for example a diagram reused across a
  series. Reference them with a relative path from the content file, e.g.
  `../../assets/diagrams/hybrid-identity.svg`.
- Every file here must have passed SANITISATION_CHECKLIST.md before it is committed.
