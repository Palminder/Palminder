import { expect, test } from '@playwright/test';

/** The recruiter pack must print to roughly two A4 pages with navigation removed. */
test('recruiter pack prints to at most two A4 pages without site chrome', async ({ page }) => {
  await page.goto('/recruiter-pack/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.site-footer')).toBeHidden();
  await expect(page.locator('.pack__print')).toBeHidden();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const pdf = await page.pdf({ format: 'A4', printBackground: false });
  const pageCount = (pdf.toString('latin1').match(/\/Type\s*\/Page(?!s)/g) ?? []).length;
  expect(pageCount).toBeGreaterThan(0);
  expect(pageCount).toBeLessThanOrEqual(2);
});
