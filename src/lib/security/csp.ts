/**
 * Content Security Policy builder. A per-request nonce is generated in proxy.ts and
 * applied to Next.js' own inline scripts. No broad wildcards: every third-party
 * origin is named and justified in comments.
 */
const SANITY_CDN = 'https://cdn.sanity.io';
const SANITY_API = 'https://*.api.sanity.io'; // draft-mode preview requests only
const TURNSTILE = 'https://challenges.cloudflare.com';

export function buildCsp(nonce: string, options: { isDev: boolean }): string {
  const { isDev } = options;
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'object-src': ["'none'"],
    'frame-ancestors': ["'none'"],
    'form-action': ["'self'"],
    'img-src': ["'self'", 'data:', 'blob:', SANITY_CDN],
    'font-src': ["'self'"],
    'connect-src': ["'self'", SANITY_API, TURNSTILE],
    'frame-src': [TURNSTILE],
    // 'strict-dynamic' lets the nonce-approved Next.js loader import its chunks.
    // 'unsafe-inline' is ignored by browsers that understand nonces and only serves
    // as a fallback for legacy CSP2 clients.
    'script-src': ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'", TURNSTILE, "'unsafe-inline'"],
    // next/image writes inline style attributes; attributes cannot be nonced, so this is
    // the minimal framework-required exception noted in the specification.
    'style-src': ["'self'", "'unsafe-inline'"],
    'worker-src': ["'self'", 'blob:'],
    'manifest-src': ["'self'"],
    'media-src': ["'self'"],
    'upgrade-insecure-requests': [],
  };
  if (isDev) {
    // Turbopack dev overlay / HMR use eval and websockets in development only.
    directives['script-src']?.push("'unsafe-eval'");
    directives['connect-src']?.push('ws:', 'wss:');
    delete directives['upgrade-insecure-requests'];
  }
  return Object.entries(directives)
    .map(([k, v]) => (v.length ? `${k} ${v.join(' ')}` : k))
    .join('; ');
}

export function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}
