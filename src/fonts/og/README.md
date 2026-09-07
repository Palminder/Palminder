# Fonts for generated Open Graph images

`next/og` (satori) renders from TTF/OTF/WOFF, not WOFF2, so static TTF instances are kept here
for the server-side image route only. Newsreader Regular and Inter 400/500 are licensed under the
SIL Open Font License 1.1 (see ../LICENSE-newsreader.txt and ../LICENSE-inter.txt). They are read
with `fs` at request time and never shipped to the browser.
