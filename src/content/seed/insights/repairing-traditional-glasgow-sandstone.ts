import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

/** STUB — replaced by the full article. */
export const repairingTraditionalGlasgowSandstone: Insight = {
  id: 'insight-repairing-traditional-glasgow-sandstone',
  slug: 'repairing-traditional-glasgow-sandstone',
  title: 'Repairing traditional Glasgow sandstone',
  dek: 'Good masonry repair starts with water, condition and compatibility, not with making every stone look new.',
  category: 'Masonry repair',
  body: [
    {
      type: 'paragraph',
      text: 'Good masonry repair starts with water, condition and compatibility, not with making every stone look new.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-01',
  reviewedAt: '2026-09-01',
  hero: placeholder('16x10', 'stone', 'Hero image for Repairing traditional Glasgow sandstone'),
  officialSources: [],
  relatedServiceSlugs: ['conservation-listed-buildings'],
  relatedProjectSlugs: [],
  touchesRegulation: true,
  verificationStatus: 'pending',
};
