import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { ReactElement, ReactNode } from 'react';
import { WORDMARK_PAD, WORDMARK_PATH, WORDMARK_VIEWBOX } from '@/components/brand/paths';

/**
 * Shared renderer for the generated Open Graph images (1200×630). Purely typographic:
 * Paper ground, a thin Ink rule top and bottom, the wordmark top-left, eyebrow in Moss,
 * a Newsreader title and an Inter meta line with a short Terracotta rule above it.
 * No photograph is ever composited, so nothing unverified can be presented as practice work.
 */

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** Brand colours, mirrored from src/styles/globals.css (satori cannot read CSS custom properties). */
const PAPER = '#F3F0E8';
const INK = '#242722';
const MOSS = '#405448';
const TERRACOTTA = '#8C4F3D';
/** Ink at 18%, the site's `--rule` token. */
const RULE = 'rgba(36, 39, 34, 0.18)';

const PAD_X = 64;
const PAD_Y = 48;

const WORDMARK_WIDTH = 260;

export interface OgImageInput {
  /** Main line, set in Newsreader; wrapped and clamped to three lines. */
  title: string;
  /** Small uppercase label above the title, e.g. "Project" or an insight category. */
  eyebrow: string;
  /** Bottom-left detail line, e.g. "Kelvinside, Glasgow · Residential · Completed 2025". */
  meta: string;
}

interface OgFont {
  data: Buffer;
  name: string;
  weight: 400 | 500;
  style: 'normal';
}

/** Font files are read once per server process and reused across every image request. */
let fontsPromise: Promise<OgFont[]> | undefined;

function loadFonts(): Promise<OgFont[]> {
  fontsPromise ??= Promise.all([
    readFile(join(process.cwd(), 'src/fonts/og/Newsreader-Regular.ttf')),
    readFile(join(process.cwd(), 'src/fonts/og/Inter-400.ttf')),
    readFile(join(process.cwd(), 'src/fonts/og/Inter-500.ttf')),
  ]).then(([newsreader, inter400, inter500]) => [
    { data: newsreader, name: 'Newsreader', weight: 400, style: 'normal' },
    { data: inter400, name: 'Inter', weight: 400, style: 'normal' },
    { data: inter500, name: 'Inter', weight: 500, style: 'normal' },
  ]);
  return fontsPromise;
}

function wordmarkHeight(width: number): number {
  const [, , w, h] = WORDMARK_VIEWBOX.split(' ').map(Number);
  return Math.round(((h ?? 100) / (w ?? 607)) * width);
}

function Wordmark({ width }: { width: number }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} width={width} height={wordmarkHeight(width)}>
      <path fill={INK} transform={`translate(${WORDMARK_PAD} 0)`} d={WORDMARK_PATH} />
    </svg>
  );
}

function Rule() {
  return <div style={{ width: '100%', height: 2, backgroundColor: RULE }} />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: PAPER,
        color: INK,
        padding: `${PAD_Y}px ${PAD_X}px`,
        fontFamily: 'Inter',
      }}
    >
      <Rule />
      {children}
      <Rule />
    </div>
  );
}

async function respond(element: ReactElement): Promise<ImageResponse> {
  const fonts = await loadFonts();
  return new ImageResponse(element, { width: OG_WIDTH, height: OG_HEIGHT, fonts });
}

/** Typographic share image for a project, insight or service page. */
export function renderOgImage({ title, eyebrow, meta }: OgImageInput): Promise<ImageResponse> {
  return respond(
    <Frame>
      <div style={{ display: 'flex', paddingTop: 30 }}>
        <Wordmark width={WORDMARK_WIDTH} />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 22,
            lineHeight: 1.3,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: MOSS,
          }}
        >
          {eyebrow}
        </div>
        {/* satori clamps only with the -webkit-box + vertical + ellipsis combination; on its own WebkitLineClamp is ignored. */}
        <div
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            marginTop: 18,
            maxWidth: 1040,
            fontFamily: 'Newsreader',
            fontWeight: 400,
            fontSize: 64,
            lineHeight: 1.1,
            color: INK,
          }}
        >
          {title}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 30 }}>
        <div style={{ width: 56, height: 2, backgroundColor: TERRACOTTA }} />
        <div
          style={{
            marginTop: 16,
            fontFamily: 'Inter',
            fontWeight: 400,
            fontSize: 26,
            lineHeight: 1.3,
            color: INK,
          }}
        >
          {meta}
        </div>
      </div>
    </Frame>,
  );
}

/** Wordmark-only fallback, used when a record cannot be found rather than throwing. */
export function renderDefaultOgImage(): Promise<ImageResponse> {
  return respond(
    <Frame>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Wordmark width={520} />
      </div>
    </Frame>,
  );
}
