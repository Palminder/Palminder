import type { Insight } from '@/lib/content/types';
import { placeholder } from '../placeholders';

/** STUB — replaced by the full article. */
export const energyUpgradesInTraditionalBuildings: Insight = {
  id: 'insight-energy-upgrades-in-traditional-buildings',
  slug: 'energy-upgrades-in-traditional-buildings',
  title: 'Energy upgrades in traditional buildings',
  dek: 'Traditional buildings can often be improved, but moisture, ventilation and existing fabric need to be considered alongside headline thermal performance.',
  category: 'Retrofit',
  body: [
    {
      type: 'paragraph',
      text: 'Traditional buildings can often be improved, but moisture, ventilation and existing fabric need to be considered alongside headline thermal performance.',
    },
  ],
  author: { type: 'studio' },
  publishedAt: '2026-06-01',
  reviewedAt: '2026-09-01',
  hero: placeholder('16x10', 'stone', 'Hero image for Energy upgrades in traditional buildings'),
  officialSources: [],
  relatedServiceSlugs: ['housing-retrofit'],
  relatedProjectSlugs: [],
  touchesRegulation: true,
  verificationStatus: 'pending',
};
