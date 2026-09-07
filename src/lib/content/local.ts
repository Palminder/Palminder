import type { ContentSource } from './source';
import { projects } from '@/content/seed/projects';
import { team } from '@/content/seed/team';
import { services } from '@/content/seed/services';
import { insights } from '@/content/seed/insights';
import { studioNotes } from '@/content/seed/studio-notes';
import { testimonials } from '@/content/seed/testimonials';
import { legalDocuments } from '@/content/seed/legal';

/** Local seed source used when no Sanity project is configured. */
export const localSource: ContentSource = {
  name: 'local',
  projects: async () => projects,
  team: async () => team,
  services: async () => services,
  insights: async () => insights,
  studioNotes: async () => studioNotes,
  testimonials: async () => testimonials,
  legalDocument: async (type) => legalDocuments.find((d) => d.type === type) ?? null,
};
