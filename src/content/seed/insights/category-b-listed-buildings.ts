import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

/** STUB — replaced by the full article. */
export const categoryBListedBuildings: Insight = {
  id: 'insight-understanding-category-b-listed-buildings-in-scotland',
  slug: 'understanding-category-b-listed-buildings-in-scotland',
  title: 'Understanding Category B listed buildings in Scotland',
  dek: 'What Category B means, why listing is more than a façade designation, and how an alteration can begin with significance rather than style.',
  category: 'Listed buildings',
  body: [
    {
      type: 'paragraph',
      text: 'What Category B means, why listing is more than a façade designation, and how an alteration can begin with significance rather than style.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-01',
  reviewedAt: '2026-09-01',
  hero: placeholder(
    '16x10',
    'stone',
    'Hero image for Understanding Category B listed buildings in Scotland',
  ),
  officialSources: [],
  relatedServiceSlugs: ['conservation-listed-buildings'],
  relatedProjectSlugs: [],
  touchesRegulation: true,
  verificationStatus: 'pending',
};
