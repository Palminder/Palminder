# Self-hosted web fonts

Both families are licensed under the SIL Open Font License 1.1 (see the LICENSE files
alongside) and are self-hosted so that no request leaves the site's origin for type.

| File | Family | Weight | Subset | Derived from |
|---|---|---|---|---|
| `newsreader-regular.woff2` | Newsreader | static 400 | Latin-1 + punctuation | `@fontsource-variable/newsreader` 5.3.0, instanced at `wght` 400 with fontTools |
| `newsreader-italic.woff2` | Newsreader Italic | static 400 | Latin-1 + punctuation | as above |
| `inter-variable.woff2` | Inter | variable `wght` 100–900 | Latin-1 + punctuation | `@fontsource-variable/inter` 5.3.0, subset with fontTools |

The display serif is used at its regular weight only, so Newsreader ships as static Regular and
Italic instances (21 KB and 23 KB) rather than the 130 KB variable files. Inter keeps its weight
axis for labels and buttons at 500. Together the two preloaded faces are under 60 KB, which is
what keeps the largest contentful paint of a serif headline inside budget on a mobile connection.

Subset: `U+0020-007E, U+00A0-00FF, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
U+2000-206F, U+20AC, U+2122, U+2212, U+FEFF, U+FFFD`, keeping `kern`, `liga`, `calt`, `locl`,
`pnum` and `tnum`. Rebuild with fontTools (`instancer` + `subset`, flavor woff2) if the glyph
coverage ever needs to grow.

They are loaded through `next/font/local` in `src/styles/fonts.ts` with `font-display: swap`
and size-adjusted fallback metrics, so there is no flash-induced layout jump. Inter is loaded in
its upright face only; the interface never sets Inter in italic.

The Bracken & Roe wordmark is a separate outlined SVG in `public/brand` and does not depend
on these files at runtime.
