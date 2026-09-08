import { expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** Runs axe on the current page and fails on any serious or critical violation. */
export async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const serious = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical',
  );
  expect(
    serious,
    serious
      .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`)
      .join('\n'),
  ).toEqual([]);
}

export const KEY_ROUTES = [
  '/',
  '/practice',
  '/projects',
  '/projects/kelvinside-garden-room',
  '/services',
  '/services/residential',
  '/services/conservation-listed-buildings',
  '/services/housing-retrofit',
  '/services/commercial-community',
  '/insights',
  '/insights/altering-a-glasgow-tenement-where-to-begin',
  '/contact',
  '/contact/thanks',
  '/privacy',
  '/cookies',
  '/accessibility',
];
