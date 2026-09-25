"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Project, ProjectStatus } from "@arcdev/shared";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PinIcon } from "@/components/website/icons";
import { projectKeyFacts } from "@/components/website/project-card";

const AUTOPLAY_MS = 5500;
/** After a swipe, tap or key press, wait this long before auto-advancing again. */
const RESUME_AFTER_MS = 9000;
/** Beyond this many slides, a counter and progress line replace the dots. */
const MAX_DOTS = 8;

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  completed: "Completed",
  upcoming: "Upcoming",
};

const KIND_LABEL: Record<Project["kind"], string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  "hotel-resort": "Hotel & Resort",
  interior: "Interior",
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * One project at a time, full width, with the neighbours peeking in. Swipes natively on touch
 * (scroll snap), steps with the arrows, dots or arrow keys, and advances on its own while in view.
 */
export function ProjectCarousel({
  projects,
  label,
  tone = "light",
}: {
  projects: readonly Project[];
  label: string;
  tone?: "light" | "dark";
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [cycle, setCycle] = useState(0);
  const visible = useRef(false);
  const hovered = useRef(false);
  const focusWithin = useRef(false);
  const lastInteraction = useRef(0);
  const count = projects.length;
  const dark = tone === "dark";

  const goTo = useCallback((index: number, smooth = true) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior: smooth && !reducedMotion() ? "smooth" : "auto",
    });
  }, []);

  const step = useCallback(
    (direction: 1 | -1, byUser = true) => {
      if (byUser) lastInteraction.current = Date.now();
      goTo((active + direction + count) % count);
    },
    [active, count, goTo],
  );

  // Work out which slide sits in the middle as the track scrolls (swipe, arrows or snap).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const centre = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let best = Infinity;
        Array.from(track.children).forEach((child, index) => {
          const el = child as HTMLElement;
          const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - centre);
          if (distance < best) {
            best = distance;
            closest = index;
          }
        });
        setActive(closest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Autoplay only while the carousel is on screen, the tab is visible and nobody is using it.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2 || reducedMotion()) return;

    const sync = () =>
      setPlaying(visible.current && !document.hidden && !hovered.current && !focusWithin.current);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.45 },
    );
    observer.observe(track);
    document.addEventListener("visibilitychange", sync);
    const region = track.parentElement;
    const enter = () => ((hovered.current = true), sync());
    const leave = () => ((hovered.current = false), sync());
    region?.addEventListener("pointerenter", enter);
    region?.addEventListener("pointerleave", leave);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      region?.removeEventListener("pointerenter", enter);
      region?.removeEventListener("pointerleave", leave);
    };
  }, [count]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (Date.now() - lastInteraction.current < RESUME_AFTER_MS) {
        setCycle((value) => value + 1);
        return;
      }
      step(1, false);
      setCycle((value) => value + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, cycle, step]);

  if (count === 0) return null;

  const arrowClass = `absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition-colors sm:grid ${
    dark
      ? "border-white/25 bg-white/10 text-white hover:bg-gold-bright hover:text-navy-deep"
      : "border-navy/15 bg-white/80 text-navy shadow-lg hover:bg-navy hover:text-white"
  }`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="relative mt-10 sm:mt-12"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      onFocus={() => {
        focusWithin.current = true;
        setPlaying(false);
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        focusWithin.current = false;
        setPlaying(count > 1 && visible.current && !document.hidden && !hovered.current && !reducedMotion());
      }}
    >
      <ul
        ref={trackRef}
        onPointerDown={() => (lastInteraction.current = Date.now())}
        onWheel={() => (lastInteraction.current = Date.now())}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[7%] sm:gap-5 sm:px-[10%] lg:px-[13%]"
      >
        {projects.map((project, index) => (
          <li
            key={project.slug}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className="w-full shrink-0 snap-center snap-always"
          >
            <Slide
              project={project}
              index={index}
              count={count}
              isActive={index === active}
              onFocus={() => goTo(index)}
            />
          </li>
        ))}
      </ul>

      {count > 1 && (
        <>
          <button type="button" aria-label="Previous project" onClick={() => step(-1)} className={`${arrowClass} left-[2%] lg:left-[5%]`}>
            <ChevronLeftIcon className="size-5" />
          </button>
          <button type="button" aria-label="Next project" onClick={() => step(1)} className={`${arrowClass} right-[2%] lg:right-[5%]`}>
            <ChevronRightIcon className="size-5" />
          </button>

          <div className="mt-7 flex items-center justify-center gap-4 px-4">
            {count <= MAX_DOTS ? (
              <div className="flex items-center gap-2">
                {projects.map((project, index) => {
                  const current = index === active;
                  return (
                    <button
                      key={project.slug}
                      type="button"
                      aria-label={`Show ${project.name}`}
                      aria-current={current}
                      onClick={() => {
                        lastInteraction.current = Date.now();
                        goTo(index);
                      }}
                      className="grid h-6 place-items-center"
                    >
                      <span
                        className={`relative block h-2 overflow-hidden rounded-full transition-all duration-500 ${
                          current ? "w-10" : "w-2"
                        } ${dark ? "bg-white/25" : "bg-navy/20"}`}
                      >
                        {current && (
                          <span
                            key={`${active}-${cycle}`}
                            className={`absolute inset-0 rounded-full bg-gold ${playing ? "fill-x" : ""}`}
                            style={{ "--fill-duration": `${AUTOPLAY_MS}ms` } as CSSProperties}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex w-full max-w-xs items-center gap-4">
                <span className={`font-display text-sm font-bold tabular-nums ${dark ? "text-white" : "text-navy"}`}>
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className={`relative h-0.5 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/20" : "bg-navy/15"}`}>
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gold transition-[width] duration-500"
                    style={{ width: `${((active + 1) / count) * 100}%` }}
                  />
                </span>
                <span className={`font-display text-sm font-bold tabular-nums ${dark ? "text-white/50" : "text-ink-soft"}`}>
                  {String(count).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {projects[active]?.name}, {active + 1} of {count}
      </p>
    </div>
  );
}

function Slide({
  project,
  index,
  count,
  isActive,
  onFocus,
}: {
  project: Project;
  index: number;
  count: number;
  isActive: boolean;
  onFocus: () => void;
}) {
  const cover = project.images[0];
  const facts = projectKeyFacts(project);
  if (project.handover) facts.push(project.status === "completed" ? `Handed over ${project.handover}` : `Handover ${project.handover}`);

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`${project.name}, ${project.location}. More details`}
      onFocus={onFocus}
      draggable={false}
      className={`group relative block aspect-3/4 overflow-hidden rounded-2xl bg-navy-deep shadow-2xl shadow-navy-deep/30 transition-[transform,opacity] duration-700 ease-out select-none sm:aspect-4/3 lg:aspect-21/10 ${
        isActive ? "scale-100 opacity-100" : "scale-[0.92] opacity-45"
      }`}
    >
      {cover && (
        <Image
          src={cover}
          alt=""
          fill
          draggable={false}
          sizes="(min-width: 1024px) 74vw, (min-width: 640px) 80vw, 86vw"
          className={`object-cover transition-transform duration-6000 ease-out ${isActive ? "scale-100" : "scale-110"}`}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/35 to-navy-deep/10" />
      <div className="absolute inset-0 bg-linear-to-r from-navy-deep/50 via-transparent to-transparent max-lg:hidden" />
      <span className="pointer-events-none absolute inset-3 rounded-xl border border-white/15 transition-colors duration-500 group-hover:border-gold-bright/50 sm:inset-4" />

      {/* Status on top, as in the client's sketch. */}
      <div className="absolute inset-x-0 top-6 flex justify-center sm:top-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-navy-deep/45 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md">
          <span className="relative flex size-2">
            {project.status === "ongoing" && (
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-bright opacity-75" />
            )}
            <span className="relative size-2 rounded-full bg-gold-bright" />
          </span>
          {STATUS_LABEL[project.status]}
        </span>
      </div>
      <span className="absolute top-7 right-7 hidden font-display text-sm font-bold tracking-[0.12em] text-white/70 tabular-nums sm:top-9 sm:right-9 sm:block">
        {String(index + 1).padStart(2, "0")} <span className="text-white/35">/ {String(count).padStart(2, "0")}</span>
      </span>

      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col items-center p-6 pb-8 text-center text-white transition-[transform,opacity] delay-150 duration-700 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:p-12 lg:text-left ${
          isActive ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold-bright uppercase">{KIND_LABEL[project.kind]}</p>
          <h3 className="mt-2 font-display text-3xl leading-[1.05] font-bold text-balance sm:text-4xl lg:text-5xl">
            {project.name}
          </h3>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[15px] text-white/80 lg:justify-start">
            <PinIcon className="size-4 shrink-0 text-gold-bright" />
            {project.location}
          </p>
          {facts.length > 0 && (
            <p className="mt-2 text-sm text-white/65 tabular-nums">{facts.join("  ·  ")}</p>
          )}
          {project.progress !== undefined && (
            <div className="mx-auto mt-4 max-w-xs lg:mx-0">
              <div className="flex justify-between text-xs text-white/70">
                <span>Construction</span>
                <span className="font-semibold text-white tabular-nums">{project.progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full origin-left rounded-full bg-gold-bright transition-transform delay-300 duration-1000 ease-out"
                  style={{ width: `${project.progress}%`, transform: `scaleX(${isActive ? 1 : 0})` }}
                />
              </div>
            </div>
          )}
        </div>
        <span className="mt-6 inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-gold-bright bg-gold-bright/10 px-6 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-gold-bright group-hover:text-navy-deep lg:mt-0">
          More Details
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
