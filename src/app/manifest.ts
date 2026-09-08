import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/** Minimal web application manifest. Paper is the page ground and the browser theme colour. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    start_url: '/',
    display: 'browser',
    background_color: '#F3F0E8',
    theme_color: '#F3F0E8',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
