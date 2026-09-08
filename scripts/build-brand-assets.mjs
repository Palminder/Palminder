// Builds raster brand assets from the committed SVG masters:
//   public/icons/apple-touch-icon.png (180×180)
//   public/icons/favicon-16.png, favicon-32.png, favicon-48.png
//   public/favicon.ico (16/32/48 PNG-in-ICO)
//   public/brand/og-default.png (1200×630)
// Run with: node scripts/build-brand-assets.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const icons = path.join(root, 'public/icons');
const brand = path.join(root, 'public/brand');

const faviconSvg = fs.readFileSync(path.join(icons, 'favicon.svg'));
const wordmarkSvg = fs.readFileSync(path.join(brand, 'wordmark.svg'), 'utf8');

async function png(svg, size) {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain' })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const sizes = [16, 32, 48];
const buffers = {};
for (const s of sizes) {
  buffers[s] = await png(faviconSvg, s);
  fs.writeFileSync(path.join(icons, `favicon-${s}.png`), buffers[s]);
}
fs.writeFileSync(path.join(icons, 'apple-touch-icon.png'), await png(faviconSvg, 180));
fs.writeFileSync(path.join(icons, 'icon-192.png'), await png(faviconSvg, 192));
fs.writeFileSync(path.join(icons, 'icon-512.png'), await png(faviconSvg, 512));

// ICO container with PNG entries.
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);
  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  const blobs = [];
  entries.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
    blobs.push(data);
  });
  return Buffer.concat([header, dir, ...blobs]);
}
fs.writeFileSync(
  path.join(root, 'public/favicon.ico'),
  ico(sizes.map((size) => ({ size, data: buffers[size] }))),
);

// Default social image: Paper field, wordmark, positioning line drawn as a thin rule.
const vb = wordmarkSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
const vbW = Number(vb[1]);
const vbH = Number(vb[2]);
const targetW = 760;
const wordmarkPng = await sharp(Buffer.from(wordmarkSvg), { density: 300 })
  .resize({ width: targetW })
  .png()
  .toBuffer();
const wmH = Math.round((targetW * vbH) / vbW);
const og = sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F3F0E8' } });
const rule = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect x="96" y="96" width="1008" height="1" fill="#242722" fill-opacity="0.18"/><rect x="96" y="533" width="1008" height="1" fill="#242722" fill-opacity="0.18"/><rect x="96" y="452" width="56" height="2" fill="#8C4F3D"/></svg>`,
);
await og
  .composite([
    { input: rule, left: 0, top: 0 },
    { input: wordmarkPng, left: 96, top: Math.round(315 - wmH / 2 - 40) },
  ])
  .png({ compressionLevel: 9 })
  .toFile(path.join(brand, 'og-default.png'));
console.log('Brand assets built.');
