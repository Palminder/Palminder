/**
 * Upload validation. Only one file, only PDF/JPG/JPEG/PNG, validated by extension AND
 * by content signature, capped in size. Filenames are replaced server-side with random
 * identifiers; the sanitised original name is kept only as private metadata.
 */
export const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png'] as const;
export type AllowedExtension = (typeof ALLOWED_EXTENSIONS)[number];

export const DEFAULT_MAX_UPLOAD_MB = 8;

export function maxUploadBytes(): number {
  const mb = Number(process.env.ENQUIRY_MAX_UPLOAD_MB ?? DEFAULT_MAX_UPLOAD_MB);
  return Math.max(1, Number.isFinite(mb) ? mb : DEFAULT_MAX_UPLOAD_MB) * 1024 * 1024;
}

const SIGNATURES: Record<AllowedExtension, { bytes: number[]; offset?: number; mime: string }[]> = {
  pdf: [{ bytes: [0x25, 0x50, 0x44, 0x46, 0x2d], mime: 'application/pdf' }], // %PDF-
  jpg: [{ bytes: [0xff, 0xd8, 0xff], mime: 'image/jpeg' }],
  jpeg: [{ bytes: [0xff, 0xd8, 0xff], mime: 'image/jpeg' }],
  png: [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], mime: 'image/png' }],
};

export function extensionOf(filename: string): string {
  const i = filename.lastIndexOf('.');
  return i === -1 ? '' : filename.slice(i + 1).toLowerCase();
}

export function isAllowedExtension(ext: string): ext is AllowedExtension {
  return (ALLOWED_EXTENSIONS as readonly string[]).includes(ext);
}

/** Detect the real content type from the leading bytes. Returns null when unrecognised. */
export function detectMime(bytes: Uint8Array): { ext: AllowedExtension; mime: string } | null {
  for (const ext of ALLOWED_EXTENSIONS) {
    for (const sig of SIGNATURES[ext]) {
      const off = sig.offset ?? 0;
      if (bytes.length < off + sig.bytes.length) continue;
      let ok = true;
      for (let i = 0; i < sig.bytes.length; i++) {
        if (bytes[off + i] !== sig.bytes[i]) {
          ok = false;
          break;
        }
      }
      if (ok) return { ext: ext === 'jpeg' ? 'jpg' : ext, mime: sig.mime };
    }
  }
  return null;
}

/** Keep only safe characters; used for private metadata, never as a storage name. */
export function sanitiseFilename(name: string): string {
  return name.replace(/[^\w.\- ]+/g, '_').replace(/\s+/g, ' ').trim().slice(0, 120) || 'file';
}

export type FileCheck =
  | { ok: true; ext: AllowedExtension; mime: string; bytes: Uint8Array; originalName: string; storedName: string }
  | { ok: false; message: string };

export async function validateUpload(file: File, maxBytes = maxUploadBytes()): Promise<FileCheck> {
  if (file.size === 0) return { ok: false, message: 'The selected file is empty.' };
  if (file.size > maxBytes) {
    return { ok: false, message: `The file is too large. The maximum size is ${Math.round(maxBytes / 1024 / 1024)} MB.` };
  }
  const ext = extensionOf(file.name);
  if (!isAllowedExtension(ext)) {
    return { ok: false, message: 'Please attach a PDF, JPG or PNG file.' };
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const detected = detectMime(bytes);
  if (!detected) return { ok: false, message: 'The file does not appear to be a valid PDF, JPG or PNG.' };
  const normalisedExt = ext === 'jpeg' ? 'jpg' : ext;
  if (detected.ext !== normalisedExt) {
    return { ok: false, message: 'The file contents do not match its file type.' };
  }
  const storedName = `${crypto.randomUUID()}.${detected.ext}`;
  return { ok: true, ext: detected.ext, mime: detected.mime, bytes, originalName: sanitiseFilename(file.name), storedName };
}
