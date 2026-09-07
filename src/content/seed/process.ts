import type { ProcessStage } from '@/lib/content/types';

/** An architectural working sequence, not a proprietary framework. */
export const processStages: ProcessStage[] = [
  {
    title: 'Survey & brief',
    copy: 'Understand the building, site, constraints and what the project needs to achieve.',
  },
  {
    title: 'Design',
    copy: 'Test layouts, material approaches and the relationship between new work and existing fabric.',
  },
  {
    title: 'Consent & technical',
    copy: 'Prepare the information appropriate to planning, listed-building consent and/or building warrant, then develop coordinated technical detail.',
  },
  {
    title: 'Construction support',
    copy: 'Where appointed, support tendering and construction with specifications, site information and responses to issues that arise.',
  },
];

export const processNote = 'Scope varies by project. We agree the services required before work begins.';
