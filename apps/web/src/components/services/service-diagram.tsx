"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface DiagramBeat {
  title: string;
  text: string;
}

const BEAT_SECONDS = 1.7;

/**
 * Plays a service's diagram beat by beat when it scrolls into view, lighting the matching
 * caption as it goes. Diagram elements opt in with data attributes:
 *
 *   data-sd="2"            which beat the element belongs to (0-based)
 *   data-sd-type="draw"    stroke draws itself (needs pathLength={1})
 *                "rise"    grows up from its base      "grow"  grows from its left edge
 *                "pop"     scales in with a bounce     "fade"  fades in (default)
 *
 * Without JavaScript or with reduced motion, the finished diagram and every caption show.
 */
export function ServiceDiagram({
  heading,
  beats,
  children,
}: {
  heading: ReactNode;
  beats: DiagramBeat[];
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!document.documentElement.hasAttribute("data-motion")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(rootRef);
      const figure = q("[data-sd-figure]")[0];
      if (!figure) return;

      const tl = gsap.timeline({
        paused: true,
        onComplete: () => setActive(beats.length),
      });

      beats.forEach((_, beat) => {
        const at = beat * BEAT_SECONDS;
        tl.call(() => setActive(beat), undefined, at);
        const items = q(`[data-sd="${beat}"]`);
        const byType = (type: string) =>
          items.filter((el) => (el.getAttribute("data-sd-type") ?? "fade") === type);

        const draw = byType("draw");
        const rise = byType("rise");
        const grow = byType("grow");
        const pop = byType("pop");
        const fade = byType("fade");
        const each = (list: Element[], total: number) => (list.length > 1 ? total / list.length : 0);

        if (draw.length) {
          tl.fromTo(draw, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: each(draw, 0.5) }, at);
        }
        if (rise.length) {
          tl.fromTo(rise, { scaleY: 0, transformOrigin: "50% 100%" }, { scaleY: 1, duration: 0.45, ease: "power3.out", stagger: each(rise, 0.9) }, at + 0.1);
        }
        if (grow.length) {
          tl.fromTo(grow, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.6, ease: "power2.out", stagger: each(grow, 0.9) }, at + 0.1);
        }
        if (pop.length) {
          tl.fromTo(pop, { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.4)", stagger: each(pop, 0.6) }, at + 0.3);
        }
        if (fade.length) {
          tl.fromTo(fade, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: each(fade, 0.4) }, at + 0.2);
        }
      });
      tl.to({}, { duration: 0.6 });

      // Hide everything until it plays, so the first frame is an empty sheet.
      tl.progress(1).progress(0);
      setActive(-1);
      tlRef.current = tl;

      ScrollTrigger.create({ trigger: figure, start: "top 70%", once: true, onEnter: () => tl.play(0) });
    },
    { scope: rootRef },
  );

  const replay = () => {
    setActive(-1);
    tlRef.current?.play(0);
  };

  return (
    <div ref={rootRef} className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      <figure data-sd-figure="" className="relative mx-auto w-full max-w-xl">
        <div className="rounded-2xl bg-navy-deep/60 p-3 ring-1 ring-white/10 sm:p-5">{children}</div>
      </figure>

      <div>
        {heading}
        <ol className="mt-8 space-y-1">
          {beats.map((beat, index) => {
            const state = active === null || active > index ? "done" : active === index ? "now" : "next";
            return (
              <li
                key={beat.title}
                className={`relative rounded-xl border-l-2 py-3 pr-3 pl-5 transition-[background-color,border-color,opacity] duration-500 ${
                  state === "now"
                    ? "border-gold-bright bg-white/[0.06]"
                    : state === "done"
                      ? "border-gold-bright/40"
                      : "border-white/10 opacity-45"
                }`}
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold text-gold-bright tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold">{beat.title}</span>
                </p>
                <p className="mt-1 pl-8 text-[15px] leading-relaxed text-white/70">{beat.text}</p>
              </li>
            );
          })}
        </ol>
        {active !== null && (
          <button
            type="button"
            onClick={replay}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white/80 transition-colors hover:border-gold-bright hover:text-gold-bright"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Replay
          </button>
        )}
      </div>
    </div>
  );
}
