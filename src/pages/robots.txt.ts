import type { APIRoute } from 'astro';
import { isProduction } from '@/lib/env';

/**
 * Production allows crawling and advertises the sitemap. Every other build (preview, local)
 * disallows all crawlers. robots.txt is a courtesy signal only: confidential files are never
 * deployed in the first place.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('/sitemap-index.xml', site ?? 'http://localhost:4321').toString();
  const body = isProduction
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
