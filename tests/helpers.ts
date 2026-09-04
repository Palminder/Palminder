import type { Page } from '@playwright/test';

export const contentRoutes = [
  '/',
  '/evidence/',
  '/evidence/case-studies/',
  '/evidence/automation/',
  '/labs/',
  '/experience/',
  '/credentials/',
  '/about/',
  '/recruiter-pack/',
  '/contact/',
  '/privacy/',
];

/** Collects console errors and page errors (including CSP violations) for the page. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  return errors;
}

/** URL of the first published lab or case study, if any, discovered from the lab library. */
export async function firstEvidenceUrl(page: Page): Promise<string | null> {
  await page.goto('/labs/');
  const links = page.locator('#library-list .evidence-card h3 a');
  if ((await links.count()) === 0) return null;
  return links.first().getAttribute('href');
}
