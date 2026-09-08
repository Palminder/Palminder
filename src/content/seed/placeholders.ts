import type { ImageAsset, MediaType } from '@/lib/content/types';

type Ratio = '16x10' | '4x3' | '3x2' | '4x5' | '1x1';
type Tone = 'sandstone' | 'stone' | 'paper' | 'moss' | 'ink';

const SIZES: Record<Ratio, [number, number]> = {
  '16x10': [1600, 1000],
  '4x3': [1600, 1200],
  '3x2': [1800, 1200],
  '4x5': [1200, 1500],
  '1x1': [1200, 1200],
};

/**
 * A staging placeholder. `intended` records what the real image must show so that the
 * layout can be reviewed honestly. Placeholders never pass the production gates.
 */
export function placeholder(
  ratio: Ratio,
  tone: Tone,
  intended: string,
  options: { mediaType?: MediaType; caption?: string } = {},
): ImageAsset {
  const [width, height] = SIZES[ratio];
  return {
    src: `/staging/placeholders/${ratio}-${tone}.svg`,
    width,
    height,
    alt: `Staging placeholder standing in for: ${intended}`,
    mediaType: options.mediaType ?? 'placeholder',
    caption: options.caption,
    intended,
    placeholder: true,
    rights: { sourceType: 'placeholder' },
  };
}

/** A committed staging drawing (SVG) at its natural sheet ratio. */
export function stagingDrawing(
  file: string,
  width: number,
  height: number,
  mediaType: MediaType,
  alt: string,
  drawing: { number?: string; title: string; note?: string },
  caption?: string,
): ImageAsset {
  return {
    src: `/staging/drawings/${file}`,
    width,
    height,
    alt,
    mediaType,
    drawing,
    caption,
    rights: {
      sourceType: 'synthetic',
      synthetic: true,
      creator: 'Bracken & Roe staging drawing set',
    },
  };
}
