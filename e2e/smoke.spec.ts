import { expect, test } from '@playwright/test';
import { KEY_ROUTES } from './helpers';

test.describe('key routes', () => {
  for (const route of KEY_ROUTES) {
    test(`${route} renders with one H1 and the skip link`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main-content')).toBeVisible();
      const skip = page.getByRole('link', { name: 'Skip to main content' });
      await expect(skip).toHaveCount(1);
      const html = await page.content();
      expect(html).not.toMatch(/lorem ipsum/i);
      expect(html).not.toMatch(/\+44|\b0\d{3}\s?\d{3}\s?\d{4}\b|tel:/i);
      // Nothing on the public site may read as provisional, seeded or awaiting verification.
      const text = await page.locator('body').innerText();
      expect(text).not.toMatch(
        /staging (build|record|placeholder|drawing)|placeholder|to be confirmed|awaiting verification|not verified|unverified|seed (content|record)|coming soon|under construction|replace with:|indicative drawing|before launch|\[[^\]]*\]/i,
      );
    });
  }

  test('404 renders the custom not-found page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('That page isn’t here.');
    await expect(page.getByRole('link', { name: 'View projects' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Return home' })).toBeVisible();
  });

  test('security headers and nonce-based CSP are applied', async ({ page, request }) => {
    const response = await request.get('/');
    const headers = response.headers();
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['permissions-policy']).toContain('camera=()');
    const csp = headers['content-security-policy'] ?? '';
    expect(csp).toContain("frame-ancestors 'none'");
    const nonce = /'nonce-([^']+)'/.exec(csp)?.[1];
    expect(nonce).toBeTruthy();
    const html = await response.text();
    const inline = html.match(/<script(?![^>]*\ssrc=)[^>]*>/g) ?? [];
    const withoutNonce = inline.filter(
      (tag) => !tag.includes('nonce=') && !tag.includes('application/ld+json'),
    );
    expect(withoutNonce, 'every inline script must carry the CSP nonce').toEqual([]);
    // No CSP violations while hydrating the page.
    const violations: string[] = [];
    page.on('console', (msg) => {
      if (/Content Security Policy/i.test(msg.text())) violations.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(violations).toEqual([]);
  });

  test('thank-you page is noindex and the sitemap excludes it', async ({ request }) => {
    const thanks = await request.get('/contact/thanks');
    expect(thanks.headers()['x-robots-tag']).toContain('noindex');
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).not.toContain('/contact/thanks');
    expect(xml).toContain('<loc>');
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
  });

  test('footer carries the fixed address and appointment wording, no phone', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toContainText('Office 1810');
    await expect(footer).toContainText('3 Fitzroy Place, 1/1 Sauchiehall Street');
    await expect(footer).toContainText('Glasgow G3 7RH');
    await expect(footer).toContainText('Meetings by appointment.');
    await expect(footer).toContainText('studio@brackenroe.co.uk');
    await expect(footer.getByRole('link', { name: /instagram|linkedin/i })).toHaveCount(0);
  });
});
