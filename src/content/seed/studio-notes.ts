import type { StudioNote } from '@/lib/content/types';
import { drawing, illustration } from './media';

/**
 * "From the Studio" is a CMS-curated editorial stream, not a social feed. Each note is one
 * image or drawing, a date, one concise observation and one category.
 */
export const studioNotes: StudioNote[] = [
  {
    id: 'note-01',
    date: '2026-08-27',
    category: 'Detail',
    text: 'Testing how a new window reveal meets existing sandstone before the typical detail is repeated.',
    media: illustration(
      'window-installation-study',
      'context',
      'A tenement bay window during replacement, with new timber sashes fitted below the older windows above.',
    ),
    relatedProjectSlug: 'north-glasgow-window-ventilation-programme',
    published: true,
  },
  {
    id: 'note-02',
    date: '2026-08-19',
    category: 'Drawing',
    text: 'Existing and proposed plans overlaid to check how little fabric needs to change.',
    media: illustration(
      'drawing-board-overlay',
      'context',
      'Existing and proposed plans overlaid on tracing paper at the drawing board, with a scale rule and pencil.',
    ),
    relatedProjectSlug: 'pollokshields-tenement-reordering',
    published: true,
  },
  {
    id: 'note-03',
    date: '2026-08-08',
    category: 'Material',
    text: 'A repair sample is useful because “matching stone” is not a single colour or texture.',
    media: illustration(
      'stone-indent-detail',
      'material-study',
      'A sandstone indent repair in progress, with the new stone half inserted and tools on the scaffold board.',
    ),
    relatedProjectSlug: 'shawlands-sandstone-repair',
    published: true,
  },
  {
    id: 'note-04',
    date: '2026-07-30',
    category: 'Glasgow',
    text: 'Deep window openings do a great deal of the visual work on a sandstone façade.',
    media: illustration(
      'sandstone-window-reveal',
      'context',
      'A sash window set deep within a red-sandstone wall, with a projecting sill and dressed margins.',
    ),
    published: true,
  },
  {
    id: 'note-05',
    date: '2026-07-17',
    category: 'Site',
    text: 'Opening up the outer wall to confirm its build-up before the insulation detail is drawn.',
    media: illustration(
      'site-inspection-reveal',
      'context',
      'A sandstone wall with an area of the outer stone opened up to show the rubble core.',
    ),
    relatedProjectSlug: 'drumchapel-fabric-upgrade',
    published: true,
  },
  {
    id: 'note-06',
    date: '2026-07-03',
    category: 'Material',
    text: 'Lime mortar sample panels left to weather for a fortnight before any joint is chosen.',
    media: illustration(
      'lime-mortar-samples',
      'material-study',
      'A board of nine lime mortar sample panels with sandstone offcuts and a pointing trowel.',
    ),
    relatedProjectSlug: 'shawlands-sandstone-repair',
    published: true,
  },
  {
    id: 'note-07',
    date: '2026-06-20',
    category: 'Drawing',
    text: 'A section is the quickest way to see whether a rooflight will actually bring light where it is needed.',
    media: drawing(
      'hyndland-roof-rooms-02-section.svg',
      1600,
      900,
      'section',
      'Section through the roof rooms showing the new stair and the rooflights within the slate pitch.',
      { title: 'Section through the roof rooms' },
    ),
    relatedProjectSlug: 'hyndland-roof-rooms',
    published: true,
  },
  {
    id: 'note-08',
    date: '2026-06-05',
    category: 'Glasgow',
    text: 'Finnieston shopfronts still read best where the original structural bays remain legible.',
    media: illustration(
      'finnieston-shopfronts',
      'context',
      'Three painted timber shopfronts beneath a sandstone tenement, each within its own structural bay.',
    ),
    relatedProjectSlug: 'finnieston-shopfront-upper-floors',
    published: true,
  },
  {
    id: 'note-09',
    date: '2026-05-22',
    category: 'Site',
    text: 'Checking a sill junction on the first sample installation before the schedule is issued.',
    media: illustration(
      'window-sill-junction',
      'material-study',
      'Close view of a new timber sash window meeting its stone sill, with a trickle ventilator at the head.',
    ),
    relatedProjectSlug: 'north-glasgow-window-ventilation-programme',
    published: true,
  },
];
