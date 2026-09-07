import 'server-only';
import { createClient } from '@sanity/client';

export const sanityConfig = {
  projectId: process.env.SANITY_PROJECT_ID ?? '',
  dataset: process.env.SANITY_DATASET ?? 'production',
  apiVersion: process.env.SANITY_API_VERSION ?? '2026-09-01',
};

/** Public, CDN-backed read client for published content. */
export const sanityClient = createClient({
  ...sanityConfig,
  useCdn: true,
  perspective: 'published',
});

/** Server-only client for draft-mode preview. The token never reaches the browser. */
export function previewClient() {
  const token = process.env.SANITY_READ_TOKEN;
  if (!token) throw new Error('SANITY_READ_TOKEN is required for draft preview.');
  return sanityClient.withConfig({ useCdn: false, token, perspective: 'drafts' });
}
