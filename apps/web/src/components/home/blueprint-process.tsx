"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { PROCESS } from "@/content/company";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Drawing geometry (viewBox 0 0 400 500). Building spans x 110–290, ground at y 440.
const GROUND = 440;
const LEFT = 110;
const RIGHT = 290;
const ROOF = 130;
const FLOOR_H = 31;
const FLOORS = Array.from({ length: 9 }, (_, i) => ROOF + i * FLOOR_H);
const WINDOW_X = [120, 163, 206, 249];
const AXES = [LEFT, 170, 230, RIGHT];

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

/** Stroke that draws itself: every drawn path is normalised to length 1. */
function Line({ d, stage, className = "" }: { d: string; stage: number; className?: string }) {
  return <path d={d} pathLength={1} data-draw={stage} className={className} />;
}

/**
 * "From land to handover": an architect's elevation that draws itself as the five stages scroll
 * past, from surveying the plot to lit windows at handover. Without JavaScript, or with reduced
 * motion, the finished drawing and every step are simply shown.
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
      gsap.set(q("[data-pop]"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q("[data-glow]"), { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stepsRef.current, start: "top 95%", end: "bottom 80%", scrub: 0.8 },
      });

      for (let stage = 0; stage < PROCESS.length; stage++) {
        const at = stage;
        const draws = q(`[data-draw="${stage}"]`);
        if (draws.length) tl.to(draws, { strokeDashoffset: 0, duration: 0.8, stagger: 0.4 / draws.length }, at);
        const fades = q(`[data-fade="${stage}"]`);
        if (fades.length) tl.to(fades, { opacity: 1, duration: 0.4, stagger: 0.05 }, at + 0.3);
        const pops = q(`[data-pop="${stage}"]`);
        if (pops.length) tl.to(pops, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, at + 0.55);
      }
      // Handover: the crane leaves and the building lights up.
      tl.to(q("[data-crane]"), { opacity: 0, duration: 0.4 }, 4);
      tl.to(q("[data-glow]"), { opacity: 1, duration: 0.6, stagger: { each: 0.02, from: "random" } }, 4.1);
      tl.to({}, { duration: 0.3 });

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
        <div className="sticky top-16 z-10 -mx-4 h-[42svh] self-start lg:col-start-1 lg:row-span-2 lg:row-start-1 bg-navy-deep/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:top-20 lg:mx-0 lg:h-[calc(100svh-5rem)] lg:bg-transparent lg:px-0 lg:py-10 lg:backdrop-blur-none">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full h-10 bg-linear-to-b from-navy-deep/95 to-transparent lg:hidden"
          />
          <div className="relative flex h-full items-center justify-center">
            <svg
              viewBox="0 0 400 500"
              role="img"
              aria-label="Architectural elevation of a ten-storey building, drawn stage by stage from survey to handover"
              className="h-full max-h-full w-auto overflow-visible"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* 1. Land assessment: ground, survey flags, plot width */}
              <g stroke="currentColor" className="text-white/80" strokeWidth={1.6}>
                <Line stage={0} d={`M20 ${GROUND}H380`} />
                <Line stage={0} d={`M90 ${GROUND}V402l16 7-16 7`} className="text-gold-bright" />
                <Line stage={0} d={`M310 ${GROUND}V402l16 7-16 7`} className="text-gold-bright" />
                <Line stage={0} d={`M90 466H310M90 460v12M310 460v12M98 462l-8 4 8 4M302 462l8 4-8 4`} />
              </g>
              <text
                data-fade="0"
                x="200"
                y="488"
                textAnchor="middle"
                className="fill-gold-bright font-sans text-[11px] font-semibold tracking-[0.2em]"
              >
                PLOT SURVEYED
              </text>

              {/* 2. Agreement: the column grid everyone signs off on */}
              <g stroke="currentColor" className="text-white/30" strokeWidth={1}>
                {AXES.map((x) => (
                  <Line key={x} stage={1} d={`M${x} 62V${GROUND}`} />
                ))}
              </g>
              <g stroke="currentColor" className="text-gold-bright" strokeWidth={1.3}>
                {AXES.map((x) => (
                  <Line key={x} stage={1} d={circle(x, 50, 10)} />
                ))}
              </g>
              {AXES.map((x, i) => (
                <text
                  key={x}
                  data-fade="1"
                  x={x}
                  y="54"
                  textAnchor="middle"
                  className="fill-gold-bright font-sans text-[11px] font-bold"
                >
                  {"ABCD"[i]}
                </text>
              ))}

              {/* 3. Design and approval: the building itself, then the stamp */}
              <g stroke="currentColor" className="text-white" strokeWidth={2}>
                <Line stage={2} d={`M${LEFT} ${GROUND}V${ROOF}H${RIGHT}V${GROUND}`} />
                <Line stage={2} d={`M${LEFT - 6} ${ROOF}H${RIGHT + 6}M172 ${ROOF}V104H238V${ROOF}`} />
              </g>
              <g stroke="currentColor" className="text-white/55" strokeWidth={1.1}>
                {FLOORS.slice(1).map((y) => (
                  <Line key={y} stage={2} d={`M${LEFT} ${y}H${RIGHT}`} />
                ))}
                <Line stage={2} d={`M${LEFT} ${GROUND - 30}H${RIGHT}`} />
              </g>
              <g transform="rotate(-14 56 190)">
                <g data-pop="2">
                  <path d={circle(56, 190, 34)} stroke="currentColor" className="text-gold-bright" strokeWidth={2} />
                  <path d={circle(56, 190, 28)} stroke="currentColor" className="text-gold-bright" strokeWidth={1} />
                  <text
                    x="56"
                    y="194"
                    textAnchor="middle"
                    className="fill-gold-bright font-sans text-[10px] font-bold tracking-[0.12em]"
                  >
                    APPROVED
                  </text>
                </g>
              </g>

              {/* 4. Construction: windows, entrance and a tower crane */}
              <g stroke="currentColor" className="text-white/75" strokeWidth={1.2}>
                {FLOORS.map((y) =>
                  WINDOW_X.map((x) => <Line key={`${x}-${y}`} stage={3} d={`M${x} ${y + 8}h31v15h-31z`} />),
                )}
                <Line stage={3} d={`M150 ${GROUND}V${GROUND - 24}H250V${GROUND}M200 ${GROUND}V${GROUND - 24}`} />
              </g>
              <g data-crane="" stroke="currentColor" className="text-gold-bright" strokeWidth={1.6}>
                <Line stage={3} d={`M344 ${GROUND}V62M352 ${GROUND}V62`} />
                <Line stage={3} d="M344 72H396M300 72H344M300 62H396M348 36L300 62M348 36L396 62M348 36V62" />
                <Line stage={3} d="M318 72V150M311 150h14v10h-14z" />
              </g>

              {/* 5. Handover: lit windows, trees, keys */}
              {FLOORS.map((y) =>
                WINDOW_X.map((x) => (
                  <rect
                    key={`glow-${x}-${y}`}
                    data-glow=""
                    x={x}
                    y={y + 8}
                    width={31}
                    height={15}
                    className="fill-gold-bright/70"
                  />
                )),
              )}
              <g stroke="currentColor" className="text-white/70" strokeWidth={1.4}>
                <Line stage={4} d={`M62 ${GROUND}V418${circle(62, 404, 14)}`} />
                <Line stage={4} d={`M366 ${GROUND}V420${circle(366, 407, 12)}`} />
              </g>
              <text
                data-pop="4"
                x="200"
                y="20"
                textAnchor="middle"
                className="fill-gold-bright font-sans text-[11px] font-semibold tracking-[0.2em]"
              >
                HANDED OVER
              </text>
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
