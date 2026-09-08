import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const isProductionDeploy =
  process.env.VERCEL_ENV === 'production' ||
  process.env.CONTENT_STAGE?.trim().toLowerCase() === 'production';

/** Static security headers. The Content-Security-Policy is set per request in src/proxy.ts. */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  // HSTS only on the production deployment, once every required subdomain serves HTTPS.
  // `preload` is deliberately omitted until the preload requirements are completed on purpose.
  ...(isProductionDeploy
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }]
    : []),
  // Preview and staging deployments must never be indexed.
  ...(!isProductionDeploy ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  typedRoutes: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [480, 640, 768, 960, 1280, 1600, 1920],
    imageSizes: [96, 160, 240, 320, 400],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' }],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/contact/thanks',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/brand/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/icons/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      // One canonical origin: the apex domain wins; www redirects permanently.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.brackenroe.co.uk' }],
        destination: 'https://brackenroe.co.uk/:path*',
        permanent: true,
      },
    ];
  },
  ...(isProd ? {} : {}),
};

export default nextConfig;
