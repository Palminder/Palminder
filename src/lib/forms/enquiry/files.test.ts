import { describe, expect, it } from 'vitest';
import { detectMime, extensionOf, sanitiseFilename, validateUpload } from './files';

const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
const pdf = new TextEncoder().encode('%PDF-1.7 rest');
const jpg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 0]);

describe('file signatures', () => {
  it('detects real content types from leading bytes', () => {
    expect(detectMime(png)?.mime).toBe('image/png');
    expect(detectMime(pdf)?.mime).toBe('application/pdf');
    expect(detectMime(jpg)?.mime).toBe('image/jpeg');
    expect(detectMime(new TextEncoder().encode('MZ\0\0'))).toBeNull();
  });
  it('rejects a file whose contents do not match its extension', async () => {
    const f = new File([png], 'photo.pdf', { type: 'application/pdf' });
    const r = await validateUpload(f);
    expect(r.ok).toBe(false);
  });
  it('rejects disallowed extensions and oversized files', async () => {
    expect((await validateUpload(new File([pdf], 'x.exe'))).ok).toBe(false);
    const big = new File([new Uint8Array(2 * 1024 * 1024)], 'x.png');
    expect((await validateUpload(big, 1024 * 1024)).ok).toBe(false);
  });
  it('accepts a valid PNG and renames it', async () => {
    const r = await validateUpload(new File([png], 'My Sketch (1).PNG'));
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.storedName).toMatch(/^[0-9a-f-]{36}\.png$/);
      expect(r.originalName).toBe('My Sketch _1_.PNG');
    }
  });
  it('helpers', () => {
    expect(extensionOf('a.b.JPEG')).toBe('jpeg');
    expect(sanitiseFilename('../../etc/passwd')).not.toContain('/');
  });
});
