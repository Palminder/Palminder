import type { DrawingMeta, ImageAsset, MediaType } from '@/lib/content/types';

/**
 * Site imagery, all committed to the repository and none sourced from a third party.
 *
 * Three sets, each with its own helper below:
 *  - `photograph()` — photorealistic imagery in `public/photos` for the homepage hero and the
 *    project heroes. These are synthetic, so every record carries `synthetic: true` and is
 *    labelled *Visualisation* or *Context*; the publication gate refuses to let synthetic
 *    imagery be described as a completed view, an existing condition or construction progress.
 *  - `illustration()` — flat-colour context illustrations in `public/illustrations`, built by
 *    `scripts/illustrations/build.mjs`, used for supporting project imagery, Insights,
 *    From the Studio and material studies.
 *  - `drawing()` — project plans, sections and details in `public/drawings`, built by
 *    `scripts/drawings/build.mjs`.
 */

const PHOTOGRAPHS = {
  'context/home-glasgow-sandstone-street': [1424, 801],
  'projects/kelvinside-garden-room-hero': [1448, 1086],
  'projects/pollokshields-tenement-reordering-hero': [1448, 1086],
  'projects/hyndland-roof-rooms-hero': [1448, 1086],
  'projects/finnieston-shopfront-upper-floors-hero': [1448, 1086],
  'projects/shawlands-sandstone-repair-hero': [1448, 1086],
  'projects/north-glasgow-window-ventilation-programme-hero': [1448, 1086],
  'projects/drumchapel-fabric-upgrade-hero': [1448, 1086],
  'projects/southside-corner-rooms-hero': [1448, 1086],
} as const satisfies Record<string, readonly [number, number]>;

export type PhotographName = keyof typeof PHOTOGRAPHS;

/**
 * A photorealistic image from the practice's set. Synthetic, so it may be labelled
 * `visualisation` or `context` but never as photography of a completed building.
 */
export function photograph(
  name: PhotographName,
  mediaType: 'visualisation' | 'context',
  alt: string,
  options: { caption?: string } = {},
): ImageAsset {
  const [width, height] = PHOTOGRAPHS[name];
  return {
    src: `/photos/${name}.webp`,
    width,
    height,
    alt,
    mediaType,
    caption: options.caption,
    rights: { sourceType: 'synthetic', creator: 'Bracken & Roe', synthetic: true },
  };
}

/** A square team portrait from `public/photos/team`, shown only as a small thumbnail. */
export function portrait(slug: string, name: string): ImageAsset {
  return {
    src: `/photos/team/${slug}.webp`,
    width: 640,
    height: 640,
    alt: `Portrait of ${name}.`,
    mediaType: 'portrait',
    rights: { sourceType: 'synthetic', creator: 'Bracken & Roe', synthetic: true },
  };
}

const ILLUSTRATIONS = {
  'glasgow-tenement-street': [1600, 1000],
  'sandstone-window-reveal': [1200, 1500],
  'sandstone-coursing': [1200, 1200],
  'finnieston-shopfronts': [1800, 1200],
  'tenement-roofscape': [1600, 1000],
  'postwar-housing-blocks': [1600, 1200],
  'garden-room-elevation': [1600, 1000],
  'corner-cafe-elevation': [1600, 1000],
  'tenement-close-section': [1200, 1500],
  'drawing-board-overlay': [1600, 1200],
  'lime-mortar-samples': [1200, 1200],
  'window-installation-study': [1600, 1000],
  'consent-drawings-study': [1600, 1000],
  'site-inspection-reveal': [1600, 1200],
  'sandstone-elevation-repair': [1600, 1000],
  'garden-room-interior': [1600, 1200],
  'tenement-kitchen-opening': [1600, 1200],
  'roof-room-interior': [1600, 1200],
  'shopfront-detail': [1200, 1500],
  'stone-indent-detail': [1200, 1200],
  'window-sill-junction': [1200, 1200],
  'housing-block-entrance': [1600, 1000],
  'housing-block-window-programme': [1600, 1000],
  'cafe-interior': [1600, 1200],
  'listed-villa-doorway': [1600, 1000],
} as const satisfies Record<string, readonly [number, number]>;

export type IllustrationName = keyof typeof ILLUSTRATIONS;

/** A context illustration from the practice's set, labelled with its media type. */
export function illustration(
  name: IllustrationName,
  mediaType: MediaType,
  alt: string,
  options: { caption?: string } = {},
): ImageAsset {
  const [width, height] = ILLUSTRATIONS[name];
  return {
    src: `/illustrations/${name}.svg`,
    width,
    height,
    alt,
    mediaType,
    caption: options.caption,
    rights: { sourceType: 'practice', creator: 'Bracken & Roe', synthetic: true },
  };
}

/** A project drawing (SVG) at its natural sheet ratio. */
export function drawing(
  file: string,
  width: number,
  height: number,
  mediaType: MediaType,
  alt: string,
  meta: DrawingMeta,
  caption?: string,
): ImageAsset {
  return {
    src: `/drawings/${file}`,
    width,
    height,
    alt,
    mediaType,
    drawing: meta,
    caption,
    rights: { sourceType: 'practice', creator: 'Bracken & Roe' },
  };
}
