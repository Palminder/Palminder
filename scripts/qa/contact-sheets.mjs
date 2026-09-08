// Visual QA: screenshots every route at desktop, tablet and mobile, then tiles viewport-height
// chunks into legible sheets. Usage: node scripts/qa/contact-sheets.mjs <base-url> <out-dir> [route-filter]
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] ?? 'http://localhost:3000';
const out = path.resolve(process.argv[3] ?? 'qa-shots');
const only = process.argv[4];
fs.mkdirSync(out, { recursive: true });

const routes = [
  '/',
  '/practice',
  '/services',
  '/services/residential',
  '/services/conservation-listed-buildings',
  '/services/housing-retrofit',
  '/services/commercial-community',
  '/projects',
  '/projects/kelvinside-garden-room',
  '/projects/pollokshields-tenement-reordering',
  '/projects/hyndland-roof-rooms',
  '/projects/finnieston-shopfront-upper-floors',
  '/projects/shawlands-sandstone-repair',
  '/projects/north-glasgow-window-ventilation-programme',
  '/projects/drumchapel-fabric-upgrade',
  '/projects/southside-corner-rooms',
  '/insights',
  '/insights/altering-a-glasgow-tenement-where-to-begin',
  '/insights/understanding-category-b-listed-buildings-in-scotland',
  '/insights/energy-upgrades-in-traditional-buildings',
  '/insights/planning-permission-and-building-warrant-are-not-the-same-thing',
  '/insights/repairing-traditional-glasgow-sandstone',
  '/insights/ventilation-when-making-a-home-more-airtight',
  '/contact',
  '/contact/thanks',
  '/privacy',
  '/cookies',
  '/accessibility',
  '/this-page-does-not-exist',
];
// cols x rows of viewport-sized chunks per sheet
const viewports = [
  { name: 'desktop', width: 1440, height: 900, cols: 1, rows: 2 },
  { name: 'tablet', width: 834, height: 1112, cols: 2, rows: 2 },
  { name: 'mobile', width: 390, height: 844, cols: 4, rows: 2 },
];

const browser = await chromium.launch();
for (const route of routes) {
  if (only && !route.includes(only)) continue;
  const slug = route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '__');
  const summary = [];
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const res = await page.goto(base + route, { waitUntil: 'networkidle' });
    if (!res) throw new Error('no response ' + route);
    // Scroll through the page so lazily loaded images and reveal animations settle.
    await page.evaluate(async () => {
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(400);
    const buf = await page.screenshot({ fullPage: true });
    await context.close();
    const meta = await sharp(buf).metadata();
    const chunks = Math.ceil(meta.height / vp.height);
    const perSheet = vp.cols * vp.rows;
    const gap = 16;
    for (let s = 0; s * perSheet < chunks; s++) {
      const composite = [];
      for (let i = 0; i < perSheet; i++) {
        const c = s * perSheet + i;
        if (c >= chunks) break;
        const top = c * vp.height;
        const h = Math.min(vp.height, meta.height - top);
        const piece = await sharp(buf)
          .extract({ left: 0, top, width: vp.width, height: h })
          .png()
          .toBuffer();
        const col = i % vp.cols,
          row = Math.floor(i / vp.cols);
        composite.push({
          input: piece,
          left: gap + col * (vp.width + gap),
          top: gap + row * (vp.height + gap),
        });
      }
      const W = gap + vp.cols * (vp.width + gap);
      const H = gap + vp.rows * (vp.height + gap);
      await sharp({ create: { width: W, height: H, channels: 3, background: '#6b6b6b' } })
        .composite(composite)
        .png()
        .toFile(path.join(out, `${slug}--${vp.name}-${String(s + 1).padStart(2, '0')}.png`));
    }
    summary.push(
      `${vp.name}:${res.status()}:${meta.height}px/${Math.ceil(chunks / perSheet)} sheets`,
    );
  }
  console.log(slug, summary.join(' '));
}
await browser.close();
