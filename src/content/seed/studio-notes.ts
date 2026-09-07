import type { StudioNote } from '@/lib/content/types';
import { placeholder } from './placeholders';

/**
 * "From the Studio" is a CMS-curated editorial stream, not a social feed. Each note is one
 * image or drawing, a date, one concise observation and one category. Media are staging
 * placeholders until real images are supplied, so no note passes the production gate yet.
 */
export const studioNotes: StudioNote[] = [
  {
    id: 'note-01',
    date: '2026-08-27',
    category: 'Detail',
    text: 'Testing how a new window reveal meets existing sandstone before the typical detail is repeated.',
    media: placeholder('1x1', 'sandstone', 'Window reveal mock-up against existing sandstone'),
    relatedProjectSlug: 'north-glasgow-window-ventilation-programme',
    published: true,
  },
  {
    id: 'note-02',
    date: '2026-08-19',
    category: 'Drawing',
    text: 'Existing and proposed plans overlaid to check how little fabric needs to change.',
    media: placeholder('4x5', 'paper', 'Overlaid existing and proposed plans on a drawing board'),
    relatedProjectSlug: 'pollokshields-tenement-reordering',
    published: true,
  },
  {
    id: 'note-03',
    date: '2026-08-08',
    category: 'Material',
    text: 'A repair sample is useful because “matching stone” is not a single colour or texture.',
    media: placeholder('1x1', 'stone', 'Sandstone indent samples laid out for comparison'),
    relatedProjectSlug: 'shawlands-sandstone-repair',
    published: true,
  },
  {
    id: 'note-04',
    date: '2026-07-30',
    category: 'Glasgow',
    text: 'Deep window openings do a great deal of the visual work on a sandstone façade.',
    media: placeholder('3x2', 'sandstone', 'Deep window reveals on a Glasgow sandstone tenement'),
    published: true,
  },
  {
    id: 'note-05',
    date: '2026-07-17',
    category: 'Site',
    text: 'Opening up a ceiling to confirm joist direction before the structural opening is drawn.',
    media: placeholder('4x5', 'ink', 'Ceiling opened to reveal timber joists'),
    relatedProjectSlug: 'hyndland-roof-rooms',
    published: true,
  },
  {
    id: 'note-06',
    date: '2026-07-03',
    category: 'Material',
    text: 'Lime mortar sample panels left to weather for a fortnight before any joint is chosen.',
    media: placeholder('1x1', 'paper', 'Three lime mortar sample panels on a sandstone wall'),
    relatedProjectSlug: 'shawlands-sandstone-repair',
    published: true,
  },
  {
    id: 'note-07',
    date: '2026-06-20',
    category: 'Drawing',
    text: 'A section is the quickest way to see whether a rooflight will actually bring light where it is needed.',
    media: placeholder('4x5', 'stone', 'Hand-annotated section through a roof'),
    relatedProjectSlug: 'hyndland-roof-rooms',
    published: true,
  },
  {
    id: 'note-08',
    date: '2026-06-05',
    category: 'Glasgow',
    text: 'Finnieston shopfronts still read best where the original structural bays remain legible.',
    media: placeholder('3x2', 'moss', 'Row of Finnieston shopfronts beneath a sandstone tenement'),
    relatedProjectSlug: 'finnieston-shopfront-upper-floors',
    published: true,
  },
  {
    id: 'note-09',
    date: '2026-05-22',
    category: 'Site',
    text: 'Checking a sill junction on the first sample installation before the schedule is issued.',
    media: placeholder('1x1', 'ink', 'Sill junction of a newly installed window'),
    relatedProjectSlug: 'north-glasgow-window-ventilation-programme',
    published: true,
  },
];
