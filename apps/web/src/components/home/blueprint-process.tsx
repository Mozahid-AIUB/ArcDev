"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS } from "@/content/company";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Front elevation, viewBox 0 0 400 500. The building spans x 100–300 and y 130–440 (ground), in
// the same proportions as the Runner Apartment Complex render that is revealed at handover.
const GROUND = 440;
const LEFT = 100;
const RIGHT = 300;
const ROOF = 130;
const STOREYS = 9;
const FLOOR_H = (GROUND - ROOF) / STOREYS;
const LEVEL_M = 3.2;
const UPPER_FLOORS = Array.from({ length: STOREYS - 1 }, (_, i) => ROOF + i * FLOOR_H);
const WINDOW_X = [112, 160, 208, 256];
const AXES = [LEFT, 167, 233, RIGHT];
const OVERSHOOT = 7;

// Where the render sits so its building lines up with the drawn one (render is 1192 × 1402,
// building bounding box 135–760 × 120–1085 in render pixels).
const PHOTO_SCALE = (GROUND - ROOF) / (1085 - 120);
const PHOTO = {
  x: LEFT - 135 * PHOTO_SCALE,
  y: ROOF - 120 * PHOTO_SCALE,
  width: 1192 * PHOTO_SCALE,
  height: 1402 * PHOTO_SCALE,
};
const FRAME = { x: 57, y: 92, width: 329, height: 360 };

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

/** A crane mast or jib drawn as a lattice: two chords with a zigzag between them. */
function lattice(x1: number, y1: number, x2: number, y2: number, depth: number, bays: number) {
  const horizontal = y1 === y2;
  const points: string[] = [];
  for (let i = 0; i <= bays; i++) {
    const t = i / bays;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    const offset = i % 2 === 0 ? 0 : depth;
    points.push(horizontal ? `${x} ${y + offset}` : `${x + offset} ${y}`);
  }
  const chordB = horizontal ? `M${x1} ${y1 + depth}H${x2}` : `M${x1 + depth} ${y1}V${y2}`;
  const chordA = horizontal ? `M${x1} ${y1}H${x2}` : `M${x1} ${y1}V${y2}`;
  return `${chordA}${chordB}M${points.join("L")}`;
}

/** Stroke that draws itself: every drawn path is normalised to length 1. */
function Line({ d, stage, className = "" }: { d: string; stage: number; className?: string }) {
  return <path d={d} pathLength={1} data-draw={stage} className={className} />;
}

/**
 * "From land to handover": an architect's front elevation that draws itself as the five stages
 * scroll past, then gives way to the finished building at handover. Without JavaScript, or with
 * reduced motion, the completed drawing and every step are simply shown.
 */
export function BlueprintProcess() {
  const rootRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !document.documentElement.hasAttribute("data-motion")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(root);
      gsap.set(q("[data-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q("[data-fade]"), { opacity: 0 });
      gsap.set(q("[data-pop]"), { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" });
      gsap.set(q("[data-curtain]"), { attr: { y: FRAME.y + FRAME.height, height: 0 } });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        // One time unit per step, so each stage starts as its step scrolls up to the reading line.
        scrollTrigger: { trigger: stepsRef.current, start: "top 80%", end: "bottom 80%", scrub: 0.8 },
      });

      for (let stage = 0; stage < PROCESS.length - 1; stage++) {
        const draws = q(`[data-draw="${stage}"]`);
        if (draws.length) tl.to(draws, { strokeDashoffset: 0, duration: 0.8, stagger: 0.4 / draws.length }, stage);
        const fades = q(`[data-fade="${stage}"]`);
        if (fades.length) tl.to(fades, { opacity: 1, duration: 0.4, stagger: 0.04 }, stage + 0.3);
        const pops = q(`[data-pop="${stage}"]`);
        // A stamp lands: it drops from above and settles with a small bounce.
        if (pops.length) tl.to(pops, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, stage + 0.55);
      }

      // Handover: the crane and stamp go, the finished building rises out of the drawing and
      // the linework stays behind as a faint overlay.
      const handover = PROCESS.length - 1;
      tl.to(q("[data-crane], [data-stamp]"), { opacity: 0, duration: 0.25 }, handover + 0.15);
      tl.to(
        q("[data-curtain]"),
        { attr: { y: FRAME.y, height: FRAME.height }, duration: 0.6, ease: "power1.inOut" },
        handover + 0.3,
      );
      tl.to(q("[data-lines]"), { opacity: 0.22, duration: 0.4 }, handover + 0.5);
      tl.to(q(`[data-fade="${handover}"]`), { opacity: 1, duration: 0.2, stagger: 0.05 }, handover + 0.8);

      q("[data-step]").forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => self.isActive && setActive(index),
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} aria-labelledby="process-title" className="blueprint-bg relative bg-navy-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-x-16 px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24 lg:grid-cols-[1.05fr_1fr]">
        <SectionHeading
          id="process-title"
          tone="dark"
          eyebrow="How a project runs"
          title="From land to handover"
          intro="Five stages, each with a clear end point. Scroll to watch a building come off the drawing board."
          className="mb-6 lg:col-start-2 lg:row-start-1 lg:mb-0"
        />

        {/* The drawing stays pinned while the steps scroll past. */}
        <div className="sticky top-16 z-10 -mx-4 h-[44svh] self-start bg-navy-deep/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-20 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:h-[calc(100svh-5rem)] lg:bg-transparent lg:px-0 lg:py-10 lg:backdrop-blur-none">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-10 bg-linear-to-b from-navy-deep/95 to-transparent lg:hidden"
          />
          <div className="relative flex h-full items-center justify-center">
            <svg
              viewBox="0 0 400 500"
              role="img"
              aria-label="Front elevation of a nine-storey building, drawn stage by stage from survey to handover, then shown as the finished building"
              className="h-full max-h-full w-auto overflow-visible font-mono"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <defs>
                <pattern id="bp-earth" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <path d="M0 0V6" stroke="currentColor" strokeWidth="0.6" className="text-white/35" />
                </pattern>
                <clipPath id="bp-frame">
                  <rect data-curtain="" x={FRAME.x} y={FRAME.y} width={FRAME.width} height={0} rx={6} />
                </clipPath>
                <filter id="bp-ink" x="-10%" y="-10%" width="120%" height="120%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
                  <feDisplacementMap in="SourceGraphic" scale="0.9" />
                </filter>
                <path id="bp-stamp-ring" d={circle(0, 0, 25)} />
              </defs>

              {/* Handover: the finished building, lined up with the drawing, rising floor by floor. */}
              <g clipPath="url(#bp-frame)">
                <image
                  href="/images/process/runner-reveal.webp"
                  x={PHOTO.x}
                  y={PHOTO.y}
                  width={PHOTO.width}
                  height={PHOTO.height}
                  preserveAspectRatio="xMidYMid slice"
                />
                <rect
                  x={FRAME.x}
                  y={FRAME.y}
                  width={FRAME.width}
                  height={FRAME.height}
                  className="fill-navy-deep/10"
                />
              </g>

              <g data-lines="">
                {/* 1. Land assessment: ground and earth hatch, survey flags */}
                <g stroke="currentColor" className="text-white/85" strokeWidth={1.8}>
                  <Line stage={0} d={`M16 ${GROUND}H384`} />
                </g>
                <rect data-fade="0" x="16" y={GROUND + 1} width="368" height="10" fill="url(#bp-earth)" />
                <g stroke="currentColor" className="text-gold-bright" strokeWidth={1.2} strokeLinecap="round">
                  <Line stage={0} d={`M82 ${GROUND}V404l14 6-14 6`} />
                  <Line stage={0} d={`M318 ${GROUND}V404l14 6-14 6`} />
                </g>

                {/* 2. Agreement: the structural grid */}
                <g stroke="currentColor" className="text-white/25" strokeWidth={0.7}>
                  {AXES.map((x) => (
                    <Line key={x} stage={1} d={`M${x} 62V${GROUND + 6}`} />
                  ))}
                </g>
                <g stroke="currentColor" className="text-gold-bright" strokeWidth={1}>
                  {AXES.map((x) => (
                    <Line key={x} stage={1} d={circle(x, 50, 9)} />
                  ))}
                </g>
                {AXES.map((x, i) => (
                  <text
                    key={x}
                    data-fade="1"
                    x={x}
                    y="53.5"
                    textAnchor="middle"
                    className="fill-gold-bright text-[9px] font-bold"
                  >
                    {i + 1}
                  </text>
                ))}

                {/* 3. Design and approval: outline with drafting overshoot, slabs, parapet, levels */}
                <g stroke="currentColor" className="text-white" strokeWidth={2.2}>
                  <Line stage={2} d={`M${LEFT} ${GROUND + OVERSHOOT}V${ROOF - OVERSHOOT}`} />
                  <Line stage={2} d={`M${RIGHT} ${GROUND + OVERSHOOT}V${ROOF - OVERSHOOT}`} />
                  <Line stage={2} d={`M${LEFT - OVERSHOOT - 6} ${ROOF}H${RIGHT + OVERSHOOT + 6}`} />
                  <Line stage={2} d={`M${LEFT - 4} ${ROOF - 5}H${RIGHT + 4}`} />
                  <Line stage={2} d={`M168 ${ROOF - 5}V104H232V${ROOF - 5}`} />
                </g>
                <g stroke="currentColor" className="text-white/50" strokeWidth={0.9}>
                  {[...UPPER_FLOORS.slice(1), GROUND - FLOOR_H].map((y) => (
                    <Line key={y} stage={2} d={`M${LEFT - 3} ${y}H${RIGHT + 3}`} />
                  ))}
                </g>
                {[3, 6, STOREYS].map((floor) => {
                  const y = GROUND - floor * FLOOR_H;
                  const level = floor * LEVEL_M;
                  return (
                    <g key={floor} data-fade="2">
                      <path
                        d={`M${RIGHT + 4} ${y}H316M312 ${y - 5}l4 5 4-5z`}
                        stroke="currentColor"
                        strokeWidth={0.7}
                        className="text-white/60"
                      />
                      <text x="323" y={y + 2.5} className="fill-white/60 text-[7px]">
                        +{level.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* 4. Construction: windows with mullions and sills, entrance canopy, tower crane */}
                <g stroke="currentColor" className="text-white/80" strokeWidth={1}>
                  {UPPER_FLOORS.map((y) =>
                    WINDOW_X.map((x) => (
                      <Line
                        key={`${x}-${y}`}
                        stage={3}
                        d={`M${x} ${y + 8}h32v18h-32zM${x + 16} ${y + 8}v18M${x - 3} ${y + 27.5}h38`}
                      />
                    )),
                  )}
                  <Line stage={3} d={`M126 ${GROUND - 26}H274M146 ${GROUND}V${GROUND - 22}H254V${GROUND}M200 ${GROUND - 22}V${GROUND}`} />
                </g>
                <g data-crane="" stroke="currentColor" className="text-gold-bright" strokeWidth={0.9}>
                  <Line stage={3} d={lattice(352, GROUND, 352, 66, 8, 30)} />
                  <Line stage={3} d={lattice(312, 62, 398, 62, 7, 12)} />
                  <Line stage={3} d="M356 36L312 62M356 36L398 62M356 36V62" />
                  <Line stage={3} d="M328 69V158M322 158h12v8h-12z" />
                </g>

                {/* The approval stamp: ring text, slightly rough, like ink on paper */}
                <g transform="translate(52 214) rotate(-14)" data-stamp="">
                  <g data-pop="2" filter="url(#bp-ink)" className="text-gold-bright">
                    <path d={circle(0, 0, 33)} stroke="currentColor" strokeWidth={2} />
                    <path d={circle(0, 0, 19)} stroke="currentColor" strokeWidth={0.8} />
                    <text className="fill-current font-sans text-[6px] font-bold tracking-[0.22em]">
                      <textPath href="#bp-stamp-ring" startOffset="0">
                        FOR CONSTRUCTION · A-201 ·
                      </textPath>
                    </text>
                    <text y="2" textAnchor="middle" className="fill-current font-sans text-[6px] font-bold tracking-[0.06em]">
                      APPROVED
                    </text>
                  </g>
                </g>
              </g>

              {/* Plot width, title block and captions stay crisp above everything */}
              <g stroke="currentColor" className="text-white/70" strokeWidth={0.8}>
                <Line stage={0} d={`M82 468H318M82 462v12M318 462v12M78 472l8-8M314 472l8-8`} />
              </g>
              <text data-fade="0" x="200" y="464" textAnchor="middle" className="fill-white/70 text-[7px]">
                SITE BOUNDARY
              </text>
              <text
                data-fade="0"
                x="200"
                y="490"
                textAnchor="middle"
                className="fill-gold-bright font-sans text-[9px] font-semibold tracking-[0.26em]"
              >
                FRONT ELEVATION
              </text>
              <g data-fade="0" className="text-white/60">
                <rect x="4" y="4" width="94" height="36" stroke="currentColor" strokeWidth={0.7} />
                <path d="M4 18H98M58 18V40" stroke="currentColor" strokeWidth={0.5} />
                <text x="8" y="14" className="fill-white/80 text-[7px] font-bold tracking-[0.08em]">
                  ARC DEVELOPMENT
                </text>
                <text x="8" y="27" className="fill-white/55 text-[5.5px]">
                  DRAWING
                </text>
                <text x="8" y="35" className="fill-white/80 text-[6.5px] font-bold">
                  A-201
                </text>
                <text x="62" y="27" className="fill-white/55 text-[5.5px]">
                  SCALE
                </text>
                <text x="62" y="35" className="fill-white/80 text-[6.5px] font-bold">
                  1:100
                </text>
              </g>
              <g data-fade="4">
                <text
                  x="245"
                  y="15"
                  textAnchor="middle"
                  className="fill-gold-bright font-sans text-[9px] font-semibold tracking-[0.26em]"
                >
                  HANDED OVER
                </text>
                <text x="245" y="28" textAnchor="middle" className="fill-white/75 font-sans text-[7.5px]">
                  Runner Apartment Complex, Dhaka
                </text>
              </g>
            </svg>

            <p className="absolute right-0 bottom-2 hidden font-display text-sm font-bold tracking-[0.2em] text-white/40 tabular-nums lg:block">
              {String(active + 1).padStart(2, "0")} / {String(PROCESS.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <ol ref={stepsRef} className="relative mt-6 lg:col-start-2 lg:row-start-2 lg:mt-4">
          {PROCESS.map((step, index) => {
            const current = index === active;
            return (
              <li
                key={step.title}
                data-step=""
                className="flex min-h-[48svh] items-center border-l border-white/10 py-8 pl-6 sm:pl-10 lg:min-h-[62svh]"
              >
                <div
                  className={`relative transition-[opacity,transform] duration-500 ${
                    current ? "translate-x-0 opacity-100" : "opacity-45 lg:translate-x-2"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 -left-[calc(1.5rem+5px)] size-2.5 rounded-full transition-colors duration-500 sm:-left-[calc(2.5rem+5px)] ${
                      current ? "bg-gold-bright shadow-[0_0_0_6px_rgb(210_171_85/0.2)]" : "bg-white/30"
                    }`}
                  />
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-gold-bright">
                    STAGE {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{step.title}</h3>
                  <p className="mt-3 max-w-md text-[17px] leading-relaxed text-white/75">{step.text}</p>
                  <span className="mt-5 inline-flex h-8 items-center rounded-full border border-white/15 bg-white/5 px-3 text-sm font-semibold text-white tabular-nums">
                    {step.duration}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
