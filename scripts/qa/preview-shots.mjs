// Full-page screenshots of a handful of routes for a quick preview. Usage: node scripts/qa/preview-shots.mjs <base> <outDir>
import { chromium } from '@playwright/test';
import path from 'node:path';
const base = process.argv[2] ?? 'http://localhost:3000';
const out = path.resolve(process.argv[3] ?? 'preview');
const shots = [
  ['01-homepage-desktop', '/', 1440, 900],
  ['02-projects-desktop', '/projects', 1440, 900],
  ['03-project-kelvinside-desktop', '/projects/kelvinside-garden-room', 1440, 900],
  ['04-practice-team-desktop', '/practice', 1440, 900],
  ['05-conservation-desktop', '/services/conservation-listed-buildings', 1440, 900],
  ['06-housing-retrofit-desktop', '/services/housing-retrofit', 1440, 900],
  ['07-contact-desktop', '/contact', 1440, 900],
  ['08-homepage-mobile', '/', 390, 844],
];
const browser = await chromium.launch();
for (const [name, route, width, height] of shots) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const res = await page.goto(base + route, { waitUntil: 'networkidle' });
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
  await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: true });
  console.log(name, res?.status());
  await context.close();
}
await browser.close();
