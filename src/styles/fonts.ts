import localFont from 'next/font/local';

/**
 * Self-hosted fonts (see src/fonts/README.md). Newsreader carries the editorial serif voice
 * at its regular weight; Inter carries navigation, labels, body copy, forms and metadata.
 * The wordmark is an outlined SVG and never depends on these.
 */
export const newsreader = localFont({
  src: [{ path: '../fonts/newsreader-regular.woff2', style: 'normal', weight: '400' }],
  variable: '--font-newsreader',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Times New Roman',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

/** Italic is used sparingly (project location, pull quote) so it is not preloaded. */
export const newsreaderItalic = localFont({
  src: [{ path: '../fonts/newsreader-italic.woff2', style: 'italic', weight: '400' }],
  variable: '--font-newsreader-italic',
  display: 'swap',
  preload: false,
  adjustFontFallback: 'Times New Roman',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

export const inter = localFont({
  src: [{ path: '../fonts/inter-variable.woff2', style: 'normal', weight: '100 900' }],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

export const fontClassName = `${newsreader.variable} ${newsreaderItalic.variable} ${inter.variable}`;
