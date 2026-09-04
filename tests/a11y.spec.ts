import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { contentRoutes, firstEvidenceUrl } from './helpers';

/**
 * Automated WCAG 2.2 AA checks with axe-core on representative pages. Automated tests catch
 * only part of WCAG; the manual checks in ACCESSIBILITY_CHECKLIST.md are still required.
 */
const routes = [...contentRoutes, '/this-page-does-not-exist/'];

for (const route of routes) {
  test(`axe: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const summary = results.violations.map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
    );
    expect(summary, summary.join('\n')).toEqual([]);
  });
}

test('axe: lab library with the mobile menu open', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Mobile menu only');
  await page.goto('/labs/');
  await page.locator('.site-nav__toggle').click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test('axe: first evidence detail page', async ({ page }) => {
  const url = await firstEvidenceUrl(page);
  test.skip(!url, 'No published evidence yet');
  await page.goto(url as string);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const summary = results.violations.map((v) => `${v.id}: ${v.help}`);
  expect(summary, summary.join('\n')).toEqual([]);
});

test('axe: lab library with an active search', async ({ page }) => {
  await page.goto('/labs/');
  const count = await page.locator('#library-list .evidence-card').count();
  test.skip(count === 0, 'No published evidence yet');
  await page.locator('#filter-q').fill('lab');
  await expect(page.locator('#library-status')).toContainText(/item/);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
