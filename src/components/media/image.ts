import type { ImageAsset } from '@/lib/content/types';

/** Local SVG assets (illustrations, drawings) bypass the optimiser; raster and CMS images use it. */
export function isUnoptimised(image: ImageAsset): boolean {
  return image.src.endsWith('.svg');
}

export function aspectRatio(image: ImageAsset): string {
  return `${image.width} / ${image.height}`;
}
