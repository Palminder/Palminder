import { describe, expect, it } from 'vitest';
import { isTrustedOrigin } from './origin';

const site = 'https://brackenroe.co.uk';

describe('origin check', () => {
  it('accepts same-origin fetches and matching Origin headers', () => {
    expect(isTrustedOrigin(new Headers({ 'sec-fetch-site': 'same-origin' }), site)).toBe(true);
    expect(isTrustedOrigin(new Headers({ origin: site }), site)).toBe(true);
  });
  it('rejects cross-site requests and foreign origins', () => {
    expect(
      isTrustedOrigin(new Headers({ 'sec-fetch-site': 'cross-site', origin: site }), site),
    ).toBe(false);
    expect(isTrustedOrigin(new Headers({ origin: 'https://evil.example' }), site)).toBe(false);
    expect(isTrustedOrigin(new Headers({ referer: 'https://evil.example/x' }), site)).toBe(false);
  });
});
