import { NextResponse, type NextRequest } from 'next/server';
import { buildCsp, generateNonce } from '@/lib/security/csp';

/**
 * Per-request Content Security Policy with a nonce. Next.js reads the `x-nonce`
 * request header and applies it to its own inline scripts. Pages are therefore
 * rendered per request; content reads are cached and tag-revalidated in the
 * content layer, which keeps CMS traffic low while allowing a strict script-src.
 */
export function proxy(request: NextRequest) {
  const nonce = generateNonce();
  const csp = buildCsp(nonce, { isDev: process.env.NODE_ENV !== 'production' });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('content-security-policy', csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Skip static assets, images and prefetches; everything else gets a CSP.
      source: '/((?!_next/static|_next/image|brand/|icons/|staging/|favicon.ico|robots.txt|sitemap.xml).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
