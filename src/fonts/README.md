# Self-hosted web fonts

Both families are licensed under the SIL Open Font License 1.1 (see the LICENSE files
alongside) and are self-hosted so that no request leaves the site's origin for type.

| File | Family | Axes | Subset | Source |
|---|---|---|---|---|
| `newsreader-latin-variable-normal.woff2` | Newsreader | `opsz` 6–72, `wght` 200–800 | latin | `@fontsource-variable/newsreader` 5.3.0 (`newsreader-latin-standard-normal.woff2`) |
| `newsreader-latin-variable-italic.woff2` | Newsreader Italic | `opsz`, `wght` | latin | `@fontsource-variable/newsreader` 5.3.0 |
| `inter-latin-variable-normal.woff2` | Inter | `wght` 100–900 | latin | `@fontsource-variable/inter` 5.3.0 (`inter-latin-wght-normal.woff2`) |
| `inter-latin-variable-italic.woff2` | Inter Italic | `wght` | latin | `@fontsource-variable/inter` 5.3.0 |

They are loaded through `next/font/local` in `src/styles/fonts.ts` with `font-display: swap`
and size-adjusted fallback metrics, so there is no flash-induced layout jump.

The Bracken & Roe wordmark is a separate outlined SVG in `public/brand` and does not depend
on these files at runtime.
