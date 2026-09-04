/**
 * Generates the social card (public/og-default.png) and Apple touch icon from inline SVG.
 * Plain typography only: no photographs, logos or AI-generated imagery. Run `npm run assets:brand`
 * after changing the verified headline copy in src/data/site.ts, then commit the output.
 */
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const out = (relative) => fileURLToPath(new URL(relative, import.meta.url));

const NAME = 'Palminder Dhariwal';
const HEADLINE = 'Microsoft Cloud & Infrastructure Engineer';
const LINE = 'Endpoint · Microsoft 365 · Identity · Azure · Automation';
const FOOTER = 'Scotland · UK fully remote · Evidence-led technical portfolio';
const FONT =
  "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif";
const MONO =
  "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', 'DejaVu Sans Mono', monospace";

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f8fa"/>
  <rect x="0" y="0" width="1200" height="14" fill="#0b5cad"/>
  <rect x="80" y="96" width="72" height="72" rx="14" fill="#0b5cad"/>
  <text x="116" y="144" text-anchor="middle" font-family="${MONO}" font-size="30" font-weight="700" fill="#ffffff">PD</text>
  <text x="176" y="146" font-family="${FONT}" font-size="34" font-weight="600" fill="#111827">${escape(NAME)}</text>
  <text x="80" y="300" font-family="${FONT}" font-size="54" font-weight="700" fill="#111827">${escape(HEADLINE)}</text>
  <text x="80" y="372" font-family="${MONO}" font-size="30" fill="#08437f">${escape(LINE)}</text>
  <line x1="80" y1="440" x2="1120" y2="440" stroke="#d8dee7" stroke-width="2"/>
  <text x="80" y="500" font-family="${FONT}" font-size="28" fill="#4b5563">${escape(FOOTER)}</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0b5cad"/>
  <text x="32" y="41" text-anchor="middle" font-family="${MONO}" font-size="26" font-weight="700" fill="#ffffff" letter-spacing="1">PD</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('../public/og-default.png'));
await sharp(Buffer.from(icon))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(out('../public/apple-touch-icon.png'));
console.log('Wrote public/og-default.png and public/apple-touch-icon.png');
