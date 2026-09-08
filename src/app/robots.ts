import type { MetadataRoute } from 'next';
import { isProductionDeployment } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';

/**
 * Only the production deployment (VERCEL_ENV === 'production') may be crawled.
 * Preview and staging deployments disallow every user agent; next.config.ts also
 * sends `X-Robots-Tag: noindex, nofollow` on those deployments as a second guard.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment()) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/contact/thanks'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
