import { expect, test } from '@playwright/test';

/** Crawls internal links starting from the sitemap and the homepage; every internal link must resolve. */
test('no broken internal links', async ({ request, baseURL }) => {
  test.setTimeout(180_000);
  const origin = new URL(baseURL ?? 'http://localhost:3000').origin;
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const seeds = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
    (m) => new URL(m[1]!).pathname,
  );
  const queue = ['/', ...seeds];
  const seen = new Set<string>();
  const broken: string[] = [];
  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() >= 400) {
      broken.push(`${path} → ${res.status()}`);
      continue;
    }
    if (!(res.headers()['content-type'] ?? '').includes('text/html')) continue;
    const html = await res.text();
    for (const m of html.matchAll(/href="([^"#?]+)(?:[#?][^"]*)?"/g)) {
      const href = m[1]!;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      let url: URL;
      try {
        url = new URL(href, origin);
      } catch {
        continue;
      }
      if (url.origin !== origin) continue;
      if (
        /\.(svg|png|ico|xml|txt|webmanifest|woff2?)$/.test(url.pathname) ||
        url.pathname.startsWith('/_next/')
      )
        continue;
      if (!seen.has(url.pathname)) queue.push(url.pathname);
    }
  }
  expect(broken, broken.join('\n')).toEqual([]);
  expect(seen.size).toBeGreaterThan(15);
});
