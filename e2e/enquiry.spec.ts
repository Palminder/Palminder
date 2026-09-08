import { expect, test } from '@playwright/test';

test.describe('enquiry form', () => {
  test('shows an error summary, moves focus to it and keeps entered values', async ({ page }) => {
    await page.goto('/contact');
    const form = page.locator('form[action="/api/enquiry"]');
    await expect(form).toBeVisible();
    await form.getByLabel('Name', { exact: true }).fill('A');
    await form.getByLabel('Email', { exact: true }).fill('not-an-email');
    await form.getByRole('button', { name: 'Send project enquiry' }).click();
    const alert = form.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Name');
    await expect(alert).toContainText('Email');
    await expect(alert).toBeFocused();
    await expect(form.getByLabel('Name', { exact: true })).toHaveValue('A');
    await expect(form.getByLabel('Name', { exact: true })).toHaveAttribute('aria-invalid', 'true');
  });

  test('rejects an unsupported method and cross-site posts at the endpoint', async ({
    request,
  }) => {
    const get = await request.get('/api/enquiry');
    expect(get.status()).toBe(405);
    const post = await request.post('/api/enquiry', {
      multipart: { name: 'x' },
      headers: {
        origin: 'https://evil.example',
        'sec-fetch-site': 'cross-site',
        accept: 'application/json',
      },
    });
    expect(post.status()).toBe(403);
  });

  test('a valid submission reaches the thank-you page', async ({ page }) => {
    test.skip(!!process.env.TURNSTILE_SECRET_KEY, 'Turnstile cannot be completed in automation');
    await page.goto('/contact');
    const form = page.locator('form[action="/api/enquiry"]');
    await form.getByLabel('Name', { exact: true }).fill('Test Enquirer');
    await form.getByLabel('Email', { exact: true }).fill('test@example.com');
    await form.getByLabel('Project postcode or area').fill('G12');
    await form.getByLabel('Project type').selectOption('Residential');
    await form.getByLabel('Project stage').selectOption('Exploring feasibility');
    await form
      .getByLabel('Short project description')
      .fill(
        'A tenement flat in the West End with a small rear kitchen that we would like to open up into the dining room.',
      );
    await form.getByLabel(/I have read the/).check();
    await page.waitForTimeout(3200); // minimum plausible submission interval
    await form.getByRole('button', { name: 'Send project enquiry' }).click();
    await expect(page).toHaveURL(/\/contact\/thanks$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Thank you. Your enquiry has been sent to Bracken & Roe.',
    );
  });
});
