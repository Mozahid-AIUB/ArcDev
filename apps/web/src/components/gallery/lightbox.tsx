"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "@/components/website/icons";

export interface LightboxPhoto {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LightboxGalleryProps {
  photos: readonly LightboxPhoto[];
  /** "grid": even 4:3 tiles. "masonry": columns that keep each photo's own shape (needs width/height). */
  layout?: "grid" | "masonry";
  /** `sizes` for the thumbnails. */
  sizes?: string;
  className?: string;
}

const DEFAULT_SIZES = {
  grid: "(min-width: 1024px) 33vw, 50vw",
  masonry: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
} as const;

/** Thumbnail grid that opens a full-screen photo viewer (native <dialog>). */
export function LightboxGallery({ photos, layout = "grid", sizes, className = "" }: LightboxGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const count = photos.length;
  const current = index !== null && index < count ? photos[index] : undefined;

  const open = (i: number, button: HTMLButtonElement) => {
    openerRef.current = button;
    setIndex(i);
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null || count === 0 ? i : (i + delta + count) % count)),
    [count],
  );

  // Lock page scroll while the viewer is open.
  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  const onClose = () => {
    setIndex(null);
    openerRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  const onBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) close();
  };

  if (count === 0) return null;

  const masonry = layout === "masonry";
  const odd = count % 2 === 1;

  return (
    <>
      <ul
        className={
          masonry ? `columns-1 gap-4 sm:columns-2 lg:columns-3 ${className}` : `grid grid-cols-2 gap-3 ${className}`
        }
      >
        {photos.map((photo, i) => (
          <li
            key={`${photo.src}-${i}`}
            className={masonry ? "mb-4 break-inside-avoid" : i === 0 && odd ? "col-span-2" : undefined}
          >
            <button
              type="button"
              onClick={(event) => open(i, event.currentTarget)}
              aria-label={`Open photo ${i + 1} of ${count}: ${photo.alt}`}
              className="group relative block w-full overflow-hidden rounded-lg bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep"
            >
              {masonry && photo.width && photo.height ? (
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={sizes ?? DEFAULT_SIZES.masonry}
                  className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <span className={`relative block ${!masonry && i === 0 && odd ? "aspect-16/9" : "aspect-4/3"}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={sizes ?? DEFAULT_SIZES[layout]}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </span>
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-navy-deep/0 transition-colors duration-300 group-hover:bg-navy-deep/30"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ExpandIcon className="size-5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={onClose}
        onKeyDown={onKeyDown}
        onClick={onBackdropClick}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-navy-deep/95 p-0 text-white backdrop:bg-navy-deep/80"
      >
        {current && (
          <div className="flex h-full flex-col" onClick={onBackdropClick}>
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="font-display text-sm tabular-nums tracking-wider text-white/80" aria-live="polite">
                {index! + 1} / {count}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close photo viewer"
                className="grid size-12 place-items-center rounded-full text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-gold-bright"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center" onClick={onBackdropClick}>
              <div className="relative mx-auto h-full w-full max-w-6xl px-14 sm:px-20" onClick={onBackdropClick}>
                <div className="relative h-full w-full">
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="object-contain transition-opacity duration-300 starting:opacity-0"
                  />
                </div>
              </div>

              {count > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-gold-bright sm:left-4"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-gold-bright sm:right-4"
                  >
                    <ChevronRightIcon />
                  </button>
                </>
              )}
            </div>

            <p className="mx-auto max-w-3xl px-4 py-4 text-center text-base text-white/80 sm:py-6" onClick={onBackdropClick}>
              {current.alt}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
