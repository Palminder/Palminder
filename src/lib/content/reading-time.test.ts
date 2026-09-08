import { describe, expect, it } from 'vitest';
import { countWords, readingTimeMinutes } from './reading-time';

describe('reading time', () => {
  it('counts words across block types', () => {
    expect(
      countWords([
        { type: 'paragraph', text: 'one two three' },
        { type: 'list', items: ['four', 'five six'] },
        { type: 'heading', level: 2, text: 'seven' },
      ]),
    ).toBe(7);
  });
  it('never reports less than one minute and rounds from real counts', () => {
    expect(readingTimeMinutes([{ type: 'paragraph', text: 'short' }])).toBe(1);
    const long = {
      type: 'paragraph' as const,
      text: Array.from({ length: 1125 }, () => 'word').join(' '),
    };
    expect(readingTimeMinutes([long])).toBe(5);
  });
});
