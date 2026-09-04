import { expect, test } from '@playwright/test';
import { collectErrors, contentRoutes, firstEvidenceUrl } from './helpers';

test.describe('routes', () => {
  for (const route of contentRoutes) {
    test(`${route} renders with metadata and no console errors`, async ({ page }) => {
      const errors = collectErrors(page);
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en-GB');
      await expect(page).toHaveTitle(/Palminder Dhariwal/);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main')).toBeVisible();
      expect(await page.locator('meta[name="description"]').getAttribute('content')).not.toBe('');
      expect(await page.locator('link[rel="canonical"]').getAttribute('href')).toMatch(
        /^https?:\/\//,
      );
      expect(errors, errors.join('\n')).toEqual([]);
    });
  }

  test('unknown routes return the custom 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist/');
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
    await expect(page.locator('#main').getByRole('link', { name: 'Lab library' })).toBeVisible();
  });

  test('security headers are applied', async ({ request }) => {
    const response = await request.get('/');
    const headers = response.headers();
    expect(headers['content-security-policy']).toContain("script-src 'self' 'wasm-unsafe-eval'");
    expect(headers['content-security-policy']).toContain("style-src 'self'");
    expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['permissions-policy']).toContain('camera=()');
  });

  test('preview builds are not indexable', async ({ page, request }) => {
    await page.goto('/');
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    const isProduction = process.env.PUBLIC_SITE_ENV === 'production';
    expect(robots).toContain(isProduction ? 'index' : 'noindex');
    const robotsTxt = await (await request.get('/robots.txt')).text();
    expect(robotsTxt).toContain(isProduction ? 'Allow: /' : 'Disallow: /');
  });
});

test.describe('home page', () => {
  test('recruiter first screen is complete without scrolling on desktop', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Desktop viewport requirement only');
    await page.goto('/');
    const hero = page.locator('.hero');
    const checks = [
      page.locator('.site-header__name'),
      page.getByRole('heading', { level: 1, name: 'Microsoft Cloud & Infrastructure Engineer' }),
      hero.getByText('Endpoint · Microsoft 365 · Identity · Azure · Automation'),
      hero.getByText(/backed by enterprise infrastructure experience/),
      hero.getByText('Based in Scotland · Available for genuinely fully remote UK roles'),
      hero.getByText('IN PROGRESS — NOT YET EARNED'),
      hero.getByText(/Currently studying for Exam MD-102/),
      hero.getByRole('link', { name: 'View technical evidence' }),
      hero.getByRole('link', { name: 'Open recruiter pack' }),
      hero.getByText(
        'Previous experience includes SSE, Queen Margaret University, Prudential via Xtravirt, AVEVA and Wescot.',
      ),
    ];
    for (const locator of checks) {
      await expect(locator).toBeInViewport({ ratio: 1 });
    }
    await expect(hero).not.toContainText(/career break/i);
  });

  test('hero essentials are present on every viewport', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Microsoft Cloud & Infrastructure Engineer',
    );
    await expect(page.locator('.hero').getByText('IN PROGRESS — NOT YET EARNED')).toBeVisible();
    await expect(
      page.locator('.hero').getByRole('link', { name: 'Open recruiter pack' }),
    ).toBeVisible();
  });

  test('no zero-value evidence metrics are rendered', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-metric-value="0"]')).toHaveCount(0);
  });
});

test.describe('keyboard navigation', () => {
  test('skip link is the first focusable element and moves focus to main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#main')).toBeFocused();
  });

  test('main navigation is reachable and operable by keyboard', async ({ page }, testInfo) => {
    await page.goto('/');
    if (testInfo.project.name === 'mobile') {
      const toggle = page.locator('.site-nav__toggle');
      await expect(toggle).toBeVisible();
      await toggle.focus();
      await page.keyboard.press('Enter');
      await expect(
        page.locator('.site-nav__list--mobile').getByRole('link', { name: 'Labs' }),
      ).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(
        page.locator('.site-nav__list--mobile').getByRole('link', { name: 'Evidence' }),
      ).toBeFocused();
    } else {
      const evidence = page
        .locator('.site-nav__list--desktop')
        .getByRole('link', { name: 'Evidence' });
      await evidence.focus();
      await expect(evidence).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(/\/evidence\/$/);
      await expect(page.locator('.site-nav__list--desktop a[aria-current="page"]')).toHaveText(
        'Evidence',
      );
    }
  });
});

test.describe('credentials', () => {
  test('MD-102 is unmistakably in progress', async ({ page }) => {
    await page.goto('/credentials/');
    const card = page.locator('[data-credential-status="in-progress"]').first();
    await expect(card).toContainText('IN PROGRESS — NOT YET EARNED');
    await expect(card).toContainText('MD-102');
    await expect(card.locator('dt', { hasText: 'Earned' })).toHaveCount(0);
    await expect(page.locator('[data-credential-status="planned"]')).toHaveCount(0);
  });
});

test.describe('lab library', () => {
  test('filters are usable, reflected in the URL and clearable', async ({ page }) => {
    await page.goto('/labs/');
    const form = page.locator('#library-filters');
    await expect(form).toBeVisible();
    const cards = page.locator('#library-list .evidence-card');
    const count = await cards.count();
    if (count === 0) {
      await expect(page.locator('#library-list .empty-state')).toBeVisible();
      await expect(page.locator('#filter-type option')).toHaveCount(1);
      return;
    }
    const typeSelect = page.locator('#filter-type');
    const firstOption = await typeSelect.locator('option').nth(1).getAttribute('value');
    expect(firstOption).toBeTruthy();
    await typeSelect.selectOption(firstOption as string);
    const status = page.locator('#library-status');
    await expect(status).toContainText(/of \d+ item/);
    await expect(page).toHaveURL(/type=/);
    await expect(page.locator('#library-list .evidence-card').first()).toBeVisible();

    await page.locator('#filter-q').fill('zzzz-no-such-term-zzzz');
    await expect(status).toContainText(/^0 of/);
    await expect(page.locator('#library-list .empty-state')).toBeVisible();

    await page.getByRole('button', { name: 'Reset filters' }).click();
    await expect(status).toContainText('Filters cleared');
    await expect(page).not.toHaveURL(/\?/);
    await expect(page.locator('#library-list .evidence-card')).toHaveCount(count);
    await expect(page.locator('#filter-q')).toBeFocused();
  });

  test('query parameters restore filters on load', async ({ page }) => {
    await page.goto('/labs/');
    const count = await page.locator('#library-list .evidence-card').count();
    test.skip(count === 0, 'No published evidence to filter yet');
    const value = await page.locator('#filter-category option').nth(1).getAttribute('value');
    await page.goto(`/labs/?category=${encodeURIComponent(value as string)}`);
    await expect(page.locator('#filter-category')).toHaveValue(value as string);
    await expect(page.locator('#library-status')).toContainText(/of \d+ item/);
  });

  test('library works without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/labs/');
    await expect(page.locator('#library-filters')).toBeHidden();
    await expect(page.getByText(/Keyword search and filters need JavaScript/)).toBeVisible();
    const cards = page.locator('#library-list .evidence-card');
    if ((await cards.count()) > 0) {
      const categoryLink = page.locator('.library__browse a[href^="/labs/category/"]').first();
      await expect(categoryLink).toBeVisible();
      await categoryLink.click();
      await expect(page).toHaveURL(/\/labs\/category\//);
      await expect(page.locator('#library-list .evidence-card').first()).toBeVisible();
    } else {
      await expect(page.locator('#library-list .empty-state')).toBeVisible();
    }
    await context.close();
  });

  test('evidence detail pages display the context label and snapshot', async ({ page }) => {
    const url = await firstEvidenceUrl(page);
    test.skip(!url, 'No published evidence yet');
    const errors = collectErrors(page);
    await page.goto(url as string);
    await expect(page.locator('.evidence-detail__labels .badge')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Snapshot' })).toBeVisible();
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();
    await expect(page.locator('[style]')).toHaveCount(0);
    expect(errors, errors.join('\n')).toEqual([]);
  });
});
