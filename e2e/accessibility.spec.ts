import { test } from '@playwright/test';
import { expectNoAxeViolations, KEY_ROUTES } from './helpers';

test.describe('axe on key templates', () => {
  for (const route of KEY_ROUTES) {
    test(`${route} has no serious axe violations`, async ({ page }) => {
      await page.goto(route);
      await expectNoAxeViolations(page);
    });
  }
  test('404 has no serious axe violations', async ({ page }) => {
    await page.goto('/nowhere');
    await expectNoAxeViolations(page);
  });
});
