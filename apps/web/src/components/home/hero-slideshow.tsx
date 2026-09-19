"use client";

import Image from "next/image";
import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@/components/website/icons";

const SLIDE_SECONDS = 6;

const SLIDES = [
  {
    image: "/images/projects/imperial-commercial-center/exterior-01.webp",
    alt: "Imperial Commercial Center, a 13-storey tower on Satmasjid Road",
    label: "Landowners",
    line: "Construction funding and joint development on land you already own.",
  },
  {
    image: "/images/projects/habitus-fashion/exterior-01.webp",
    alt: "Habitus Fashion Ltd factory under a clear sky in Gazipur",
    label: "Construction",
    line: "Engineering design and site management from foundation to finishing.",
  },
  {
    image: "/images/projects/hai-residence-noakhali/exterior-facade-01.webp",
    alt: "Hai Residence, a triplex family home in Noakhali",
    label: "Homes and investment",
    line: "Finished flats for families, and managed returns for investors.",
  },
] as const;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * Full-bleed hero: crossfading photos behind server-rendered text (passed as children).
 * Slides advance when the tab's progress bar finishes, so pausing the bar pauses the slideshow.
 */
export function HeroSlideshow({ children }: { children: ReactNode }) {
  const baseId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // How many times each slide has been shown; keys restart the zoom and the bar.
  const [runs, setRuns] = useState<number[]>(() => SLIDES.map((_, i) => (i === 0 ? 1 : 0)));
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  const paused = userPaused || hovered || keyboardFocus;

  const goTo = (index: number) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
    setRuns((counts) => counts.map((count, i) => (i === index ? count + 1 : count)));
  };

  const handleBarEnd = () => {
    // Reduced motion shortens every animation to ~0ms; never auto-advance then.
    if (window.matchMedia(REDUCED_QUERY).matches) return;
    goTo((active + 1) % SLIDES.length);
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="ArcDev at work"
      className="relative isolate flex min-h-144 flex-col overflow-hidden bg-navy-deep text-white lg:min-h-184"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onFocus={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setKeyboardFocus(true);
      }}
      onBlur={(event) => {
        if (!sectionRef.current?.contains(event.relatedTarget as Node | null)) setKeyboardFocus(false);
      }}
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === active;
        const zooming = !reducedMotion && (isActive || index === previous);
        return (
          <div
            key={slide.image}
            id={`${baseId}-slide-${index}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 -z-20 transition-opacity duration-1000 ease-out ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <div key={runs[index]} className={`absolute inset-0 ${zooming ? "ken-burns" : ""}`}>
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-navy-deep/95 via-navy-deep/75 to-navy-deep/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-navy-deep via-navy-deep/60 to-transparent"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20">{children}</div>

      <div className="border-t border-white/15 bg-navy-deep/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-stretch gap-3 px-4 sm:gap-6 sm:px-6">
          <div className="grid flex-1 grid-cols-3 gap-x-4 sm:gap-6" role="group" aria-label="Choose a slide">
            {SLIDES.map((slide, index) => {
              const isActive = index === active;
              return (
                <button
                  key={slide.label}
                  type="button"
                  aria-controls={`${baseId}-slide-${index}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`group relative min-h-16 py-4 text-left transition-colors ${isActive ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 overflow-hidden bg-white/20">
                    {isActive &&
                      (reducedMotion ? (
                        <span className="block h-full w-full bg-gold-bright" />
                      ) : (
                        <span
                          key={runs[index]}
                          onAnimationEnd={handleBarEnd}
                          className="fill-x block h-full w-full bg-gold-bright"
                          style={{
                            ["--fill-duration" as string]: `${SLIDE_SECONDS}s`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                        />
                      ))}
                  </span>
                  <span className="block text-[11px] font-semibold uppercase leading-snug tracking-[0.06em] sm:text-sm sm:tracking-[0.12em]">
                    {slide.label}
                  </span>
                  <span className="mt-1 hidden text-[15px] leading-snug text-white/70 md:block">{slide.line}</span>
                </button>
              );
            })}
          </div>
          {!reducedMotion && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setUserPaused((value) => !value)}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
              >
                {userPaused ? <PlayIcon /> : <PauseIcon />}
              </button>
            </div>
          )}
        </div>
        <p aria-live={paused ? "polite" : "off"} className="mx-auto max-w-7xl px-4 pb-4 text-[15px] text-white/75 sm:px-6 md:sr-only">
          {SLIDES[active].line}
        </p>
      </div>
    </section>
  );
}
