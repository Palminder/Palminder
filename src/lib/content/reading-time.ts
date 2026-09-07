import type { Block } from './types';

const WORDS_PER_MINUTE = 225;

export function blockText(block: Block): string {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
      return block.text;
    case 'quote':
      return `${block.text} ${block.attribution ?? ''}`;
    case 'callout':
      return `${block.title ?? ''} ${block.text}`;
    case 'list':
      return block.items.join(' ');
    case 'table':
      return [block.caption ?? '', ...block.header, ...block.rows.flat()].join(' ');
    case 'figure':
      return block.image.caption ?? '';
    default:
      return '';
  }
}

export function countWords(blocks: Block[]): number {
  return blocks
    .map(blockText)
    .join(' ')
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

/** Reading time in whole minutes computed from the actual word count (never an arbitrary value). */
export function readingTimeMinutes(blocks: Block[]): number {
  return Math.max(1, Math.round(countWords(blocks) / WORDS_PER_MINUTE));
}
