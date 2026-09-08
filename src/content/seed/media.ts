import type { DrawingMeta, ImageAsset, MediaType } from '@/lib/content/types';

/**
 * Site imagery. Every image is committed to the repository as an SVG produced by the practice:
 * context illustrations in the brand palette (`public/illustrations`, built by
 * `scripts/illustrations/build.mjs`) and project drawings (`public/drawings`, built by
 * `scripts/drawings/build.mjs`). Nothing is sourced from a third party.
 */

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
