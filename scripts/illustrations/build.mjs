// Builds the illustration set into public/illustrations from every scene module in ./scenes.
// Run: node scripts/illustrations/build.mjs [--png] [--only=name]   (PREVIEW_DIR overrides where PNGs go)
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const here = path.dirname(new URL(import.meta.url).pathname);
const scenesDir = path.join(here, 'scenes');
const out = path.resolve('public/illustrations');
fs.mkdirSync(out, { recursive: true });
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7);
const png = process.argv.includes('--png');
const sharp = png ? (await import('sharp')).default : null;

const files = fs
  .readdirSync(scenesDir)
  .filter((f) => f.endsWith('.mjs'))
  .sort();
for (const file of files) {
  const name = file.replace(/\.mjs$/, '');
  if (only && !name.startsWith(only)) continue;
  const mod = await import(pathToFileURL(path.join(scenesDir, file)).href);
  const build = Object.values(mod).find((v) => typeof v === 'function');
  if (!build) throw new Error(`${file} exports no scene function`);
  const svg = build().render();
  if (/<text[\s>]/.test(svg)) throw new Error(`${file} contains text; illustrations must not`);
  fs.writeFileSync(path.join(out, `${name}.svg`), svg);
  if (sharp) {
    const dir = process.env.PREVIEW_DIR ?? out;
    fs.mkdirSync(dir, { recursive: true });
    await sharp(Buffer.from(svg))
      .resize({ width: 1200 })
      .png()
      .toFile(path.join(dir, `${name}.png`));
  }
  console.log('wrote', `${name}.svg`, `${(svg.length / 1024).toFixed(0)} KB`);
}
