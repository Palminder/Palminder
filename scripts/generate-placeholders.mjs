// Generates staging placeholder images. These are deliberately plain tonal fields with a
// visible "Staging placeholder" label so that they can never be mistaken for photography.
// They are flagged `placeholder: true` in the content layer and are hidden in production.
import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('public/staging/placeholders');
fs.mkdirSync(out, { recursive: true });

const ratios = {
  '16x10': [1600, 1000],
  '4x3': [1600, 1200],
  '3x2': [1800, 1200],
  '4x5': [1200, 1500],
  '1x1': [1200, 1200],
};
const tones = {
  sandstone: { fill: '#D5C2A3', ink: '#242722', label: 'rgba(36,39,34,0.62)' },
  stone: { fill: '#C8C2B6', ink: '#242722', label: 'rgba(36,39,34,0.62)' },
  paper: { fill: '#EAE5D9', ink: '#242722', label: 'rgba(36,39,34,0.62)' },
  moss: { fill: '#405448', ink: '#F3F0E8', label: 'rgba(243,240,232,0.72)' },
  ink: { fill: '#2E322C', ink: '#F3F0E8', label: 'rgba(243,240,232,0.72)' },
};

for (const [ratio, [w, h]] of Object.entries(ratios)) {
  for (const [tone, t] of Object.entries(tones)) {
    const inset = Math.round(Math.min(w, h) * 0.035);
    const fs1 = Math.round(Math.min(w, h) * 0.028);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Staging placeholder image">
<rect width="${w}" height="${h}" fill="${t.fill}"/>
<rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" fill="none" stroke="${t.ink}" stroke-opacity="0.22" stroke-width="2"/>
<line x1="${inset}" y1="${inset}" x2="${w - inset}" y2="${h - inset}" stroke="${t.ink}" stroke-opacity="0.12" stroke-width="2"/>
<line x1="${w - inset}" y1="${inset}" x2="${inset}" y2="${h - inset}" stroke="${t.ink}" stroke-opacity="0.12" stroke-width="2"/>
<text x="${inset * 1.6}" y="${h - inset * 1.7}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="${fs1}" letter-spacing="${(fs1 * 0.08).toFixed(1)}" fill="${t.label}">STAGING PLACEHOLDER · ${ratio.replace('x', ':')}</text>
</svg>
`;
    fs.writeFileSync(path.join(out, `${ratio}-${tone}.svg`), svg);
  }
}
console.log(`Wrote ${Object.keys(ratios).length * Object.keys(tones).length} placeholders to ${out}`);
