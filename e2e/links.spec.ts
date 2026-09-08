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

/** Every page in the sitemap carries finished content: images resolve and nothing reads as provisional. */
test('every page is finished: images resolve and no provisional wording', async ({ request }) => {
  test.setTimeout(180_000);
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const paths = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
    (m) => new URL(m[1]!).pathname,
  );
  expect(paths.length).toBeGreaterThan(25);
  const problems: string[] = [];
  const checkedImages = new Set<string>();
  for (const path of paths) {
    const html = await (await request.get(path)).text();
    const text = html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ');
    const provisional = text.match(
      /staging (build|record|placeholder|drawing)|placeholder|to be confirmed|awaiting verification|not verified|unverified|seed (content|record)|coming soon|under construction|replace with:|indicative drawing|before launch|lorem ipsum|\[[^\]]*\]/i,
    );
    if (provisional) problems.push(`${path}: "${provisional[0]}"`);
    for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      const src = m[1]!.replace(/&amp;/g, '&');
      if (checkedImages.has(src)) continue;
      checkedImages.add(src);
      const res = await request.get(src);
      if (res.status() !== 200) problems.push(`${path}: image ${src} → ${res.status()}`);
    }
  }
  expect(problems, problems.join('\n')).toEqual([]);
  expect(checkedImages.size).toBeGreaterThan(20);
});
