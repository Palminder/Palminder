import type { Block, ImageAsset } from './types';

/** Minimal Portable Text shapes we convert into the shared block model. */
export interface PTSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}
export interface PTBlock {
  _type: 'block';
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PTSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
}
export interface PTCallout {
  _type: 'moduleCallout';
  title?: string;
  text: string;
}
export interface PTFacts {
  _type: 'moduleFacts';
  caption?: string;
  items?: Array<{ term: string; detail: string }>;
}
export type PTNode = PTBlock | PTCallout | PTFacts | { _type: string; [key: string]: unknown };

function spanText(block: PTBlock): string {
  return (block.children ?? []).map((c) => c.text).join('');
}

/**
 * Convert constrained Portable Text into Block[]. Inline marks are flattened to text;
 * the editorial voice does not rely on inline styling, and links live in "Sources".
 */
export function portableTextToBlocks(
  nodes: PTNode[] | undefined | null,
  toImage: (node: unknown) => ImageAsset | null,
): Block[] {
  const out: Block[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (list) out.push({ type: 'list', ordered: list.ordered, items: list.items });
    list = null;
  };
  for (const node of nodes ?? []) {
    if (node._type === 'block') {
      const b = node as PTBlock;
      const text = spanText(b).trim();
      if (b.listItem) {
        const ordered = b.listItem === 'number';
        if (!list || list.ordered !== ordered) {
          flush();
          list = { ordered, items: [] };
        }
        list.items.push(text);
        continue;
      }
      flush();
      if (!text) continue;
      if (b.style === 'h2') out.push({ type: 'heading', level: 2, text });
      else if (b.style === 'h3') out.push({ type: 'heading', level: 3, text });
      else if (b.style === 'blockquote') out.push({ type: 'quote', text });
      else out.push({ type: 'paragraph', text });
      continue;
    }
    flush();
    if (node._type === 'moduleCallout') {
      const c = node as PTCallout;
      out.push({ type: 'callout', title: c.title, text: c.text });
    } else if (node._type === 'moduleFacts') {
      const f = node as PTFacts;
      out.push({
        type: 'table',
        caption: f.caption,
        header: ['Item', 'Detail'],
        rows: (f.items ?? []).map((i) => [i.term, i.detail]),
      });
    } else if (node._type === 'imageWithMeta') {
      const img = toImage(node);
      if (img) out.push({ type: 'figure', image: img });
    }
  }
  flush();
  return out;
}

export function portableTextToParagraphs(nodes: PTNode[] | undefined | null): string[] {
  return portableTextToBlocks(nodes, () => null)
    .filter((b): b is Extract<Block, { type: 'paragraph' }> => b.type === 'paragraph')
    .map((b) => b.text);
}
