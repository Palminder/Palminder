// Renders one scene module to SVG and a 1200px PNG preview for visual checking.
// Usage: node scripts/illustrations/preview.mjs scripts/illustrations/scenes/<name>.mjs [out-dir]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const file = process.argv[2];
if (!file) throw new Error('scene module path required');
const outDir = path.resolve(process.argv[3] ?? path.dirname(file));
fs.mkdirSync(outDir, { recursive: true });
const mod = await import(pathToFileURL(path.resolve(file)).href);
const build = Object.values(mod).find((v) => typeof v === 'function');
if (!build) throw new Error('scene module must export a function returning a Scene');
const scene = build();
const svg = scene.render();
const base = path.basename(file, '.mjs');
fs.writeFileSync(path.join(outDir, `${base}.svg`), svg);
const sharp = (await import('sharp')).default;
await sharp(Buffer.from(svg))
  .resize({ width: 1200 })
  .png()
  .toFile(path.join(outDir, `${base}.png`));
console.log(
  `${base}: ${scene.w}x${scene.h}, ${(svg.length / 1024).toFixed(0)} KB svg → ${path.join(outDir, `${base}.png`)}`,
);
