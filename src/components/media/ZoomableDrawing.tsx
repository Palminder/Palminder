'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { ImageAsset } from '@/lib/content/types';
import { isUnoptimised } from './image';

/**
 * Keyboard-accessible enlarged view of a drawing using a native <dialog>, which traps focus,
 * closes on Escape and returns focus to the trigger. Scrolling happens inside the dialog.
 */
export function ZoomableDrawing({ image, label }: { image: ImageAsset; label: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="type-meta mt-2 inline-flex min-h-11 items-center gap-2 underline decoration-ink/40 underline-offset-[0.2em] hover:decoration-ink"
        onClick={() => ref.current?.showModal()}
      >
        View larger drawing
        <span className="visually-hidden"> — {label}</span>
      </button>
      <dialog
        ref={ref}
        className="m-auto h-[100dvh] max-h-[100dvh] w-screen max-w-[100vw] bg-paper p-0 text-ink backdrop:bg-deep-ink/80"
        aria-label={`Enlarged drawing: ${label}`}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-ink/20 px-5 py-3">
            <p className="type-meta font-medium">{label}</p>
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center px-3 text-[0.9375rem] font-medium underline-offset-[0.2em] hover:underline"
              onClick={() => ref.current?.close()}
            >
              Close
            </button>
          </div>
          <div className="scroll-x grow overflow-auto p-5">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              unoptimized={isUnoptimised(image)}
              sizes="200vw"
              className="h-auto max-w-none"
              style={{ width: Math.max(image.width, 1600) }}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
