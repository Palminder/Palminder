import { expect, test } from '@playwright/test';

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, traps focus, closes on Escape and returns focus to the trigger', async ({
    page,
  }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Menu' });
    await expect(trigger).toBeVisible();
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'Site navigation' });
    await expect(dialog).toBeVisible();
    await expect(page.locator('body')).toHaveAttribute('data-menu-open', 'true');
    await expect(dialog.getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'Discuss a project' })).toBeVisible();
    await expect(dialog.getByRole('link', { name: 'studio@brackenroe.co.uk' })).toBeVisible();

    // Focus stays inside the dialog while tabbing through all its controls.
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(() => {
        const dialogEl = document.querySelector('[role="dialog"]');
        return Boolean(
          dialogEl && document.activeElement && dialogEl.contains(document.activeElement),
        );
      });
      expect(inside).toBe(true);
    }

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('body')).not.toHaveAttribute('data-menu-open', 'true');
    await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused();
  });

  test('closes when navigating', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
});

test.describe('desktop navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('marks the active section and the wordmark returns home', async ({ page }) => {
    await page.goto('/projects');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(nav.getByRole('link', { name: 'Home' })).toHaveCount(0);
    await page.getByRole('link', { name: 'Bracken & Roe — home' }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('skip link is the first focusable element and lands on main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#main-content')).toBeFocused();
  });
});

test.describe('project filter', () => {
  test('filters on the client with announced state and keyboard operation', async ({ page }) => {
    await page.goto('/projects');
    const all = page.getByRole('button', { name: 'All' });
    await expect(all).toHaveAttribute('aria-pressed', 'true');
    const total = await page.locator('main li[data-sector]').count();
    expect(total).toBeGreaterThan(0);
    const conservation = page.getByRole('button', { name: 'Conservation' });
    await conservation.focus();
    await page.keyboard.press('Enter');
    await expect(conservation).toHaveAttribute('aria-pressed', 'true');
    await expect(all).toHaveAttribute('aria-pressed', 'false');
    const visible = page.locator('main li[data-sector]:visible');
    await expect(visible.first()).toBeVisible();
    const visibleCount = await visible.count();
    expect(visibleCount).toBeLessThan(total);
    for (const li of await visible.all())
      await expect(li).toHaveAttribute('data-sector', 'conservation');
    await expect(page.getByRole('status')).toContainText('Conservation');
  });
});
