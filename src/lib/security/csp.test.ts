import { describe, expect, it } from 'vitest';
import { buildCsp } from './csp';

describe('content security policy', () => {
  const csp = buildCsp('abc123', { isDev: false });
  it('names every third party explicitly and never uses a wildcard host', () => {
    expect(csp).toContain("script-src 'self' 'nonce-abc123' 'strict-dynamic' https://challenges.cloudflare.com");
    expect(csp).toContain('img-src \'self\' data: blob: https://cdn.sanity.io');
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).not.toMatch(/https?:\/\/\*(\s|;|$)/);
    expect(csp).not.toContain("'unsafe-eval'");
  });
  it('adds dev-only relaxations only in development', () => {
    expect(buildCsp('n', { isDev: true })).toContain("'unsafe-eval'");
  });
});
