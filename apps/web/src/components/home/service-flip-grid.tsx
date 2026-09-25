"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES, type Service } from "@arcdev/shared";
import { ArrowRightIcon, ServiceIcon } from "@/components/website/icons";

/** Seconds between one tile turning and the next, as the flip travels across the grid. */
const STEP_MS = 1100;
const FIRST_FLIP_MS = 1400;

const FRONT_IMAGE: Record<Service["slug"], { src: string; position: string }> = {
  fund: { src: "/images/services/fund.webp", position: "50% 30%" },
  landshare: { src: "/images/services/landshare.webp", position: "50% 35%" },
  interior: { src: "/images/services/interior.webp", position: "50% 55%" },
  engineering: { src: "/images/services/engineering.webp", position: "50% 45%" },
  management: { src: "/images/services/management.webp", position: "45% 40%" },
  investment: { src: "/images/services/investment.webp", position: "58% 55%" },
};

const BACK_TONES = [
  { face: "from-navy to-navy-deep", text: "text-white", accent: "text-gold-bright", button: "bg-gold-bright text-navy-deep" },
  { face: "from-gold-bright to-gold", text: "text-navy-deep", accent: "text-navy-deep", button: "bg-navy-deep text-white" },
  { face: "from-ink to-navy", text: "text-white", accent: "text-gold-bright", button: "bg-gold-bright text-navy-deep" },
  { face: "from-gold to-gold-deep", text: "text-white", accent: "text-navy-deep", button: "bg-navy-deep text-white" },
  { face: "from-navy-deep to-ink", text: "text-white", accent: "text-gold-bright", button: "bg-gold-bright text-navy-deep" },
  { face: "from-gold-deep to-ink", text: "text-white", accent: "text-gold-bright", button: "bg-gold-bright text-navy-deep" },
] as const;

/** Staggered bento placement: two columns on phones (the client's sketch), three on desktop. */
const PLACEMENT = [
  "col-start-1 row-start-1 row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-3",
  "col-start-2 row-start-1 row-span-3 lg:col-start-2 lg:row-start-1 lg:row-span-2",
  "col-start-1 row-start-3 row-span-2 lg:col-start-3 lg:row-start-1 lg:row-span-3",
  "col-start-2 row-start-4 row-span-2 lg:col-start-1 lg:row-start-4 lg:row-span-2",
  "col-start-1 row-start-5 row-span-3 lg:col-start-2 lg:row-start-3 lg:row-span-3",
  "col-start-2 row-start-6 row-span-2 lg:col-start-3 lg:row-start-4 lg:row-span-2",
] as const;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The six services as 3D flip tiles. They turn on their own, one after another, between a photo
 * face (the service) and a colour face (the client's request line) — never on mouse-over, per the
 * client's brief. Hovering holds a tile still; keyboard focus turns it to its request side.
 */
export function ServiceFlipGrid() {
  const listRef = useRef<HTMLUListElement>(null);
  const [flipped, setFlipped] = useState<boolean[]>(() => SERVICES.map(() => false));
  const held = useRef<Set<number>>(new Set());
  const [focused, setFocused] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;

    let step = 0;
    let visible = false;
    let timer: number | undefined;

    const tick = () => {
      const index = step % SERVICES.length;
      step++;
      if (!held.current.has(index)) {
        setFlipped((current) => current.map((value, i) => (i === index ? !value : value)));
      }
      timer = window.setTimeout(tick, STEP_MS);
    };
    const start = (delay: number) => {
      if (timer === undefined) timer = window.setTimeout(tick, delay);
    };
    const stop = () => {
      window.clearTimeout(timer);
      timer = undefined;
    };
    const sync = () => (visible && !document.hidden ? start(FIRST_FLIP_MS) : stop());

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(list);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <ul
      ref={listRef}
      className="mt-12 grid auto-rows-[92px] grid-cols-2 gap-3 sm:auto-rows-[124px] sm:gap-4 lg:auto-rows-[118px] lg:grid-cols-3 lg:gap-5 xl:auto-rows-[128px]"
    >
      {SERVICES.map((service, index) => (
        <li key={service.slug} data-reveal="scale" className={PLACEMENT[index]}>
          <FlipTile
            service={service}
            index={index}
            flipped={focused === index || flipped[index]}
            onHold={(hold) => (hold ? held.current.add(index) : held.current.delete(index))}
            onFocusChange={(isFocused) => setFocused(isFocused ? index : null)}
          />
        </li>
      ))}
    </ul>
  );
}

function FlipTile({
  service,
  index,
  flipped,
  onHold,
  onFocusChange,
}: {
  service: Service;
  index: number;
  flipped: boolean;
  onHold: (hold: boolean) => void;
  onFocusChange: (focused: boolean) => void;
}) {
  const liftRef = useRef<HTMLDivElement>(null);
  const frontShineRef = useRef<HTMLSpanElement>(null);
  const backShineRef = useRef<HTMLSpanElement>(null);
  const firstRender = useRef(true);

  const tone = BACK_TONES[index % BACK_TONES.length];
  const image = FRONT_IMAGE[service.slug];
  const number = String(index + 1).padStart(2, "0");

  // Each turn: the card dips back mid-flip, then light sweeps the face that arrives.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    liftRef.current?.animate(
      [
        { transform: "translateZ(0) scale(1)" },
        { transform: "translateZ(-70px) scale(0.95)", offset: 0.5 },
        { transform: "translateZ(0) scale(1)" },
      ],
      { duration: 1000, easing: "cubic-bezier(0.7, 0, 0.2, 1)" },
    );
    const shine = flipped ? backShineRef.current : frontShineRef.current;
    shine?.animate([{ transform: "translateX(-110%)" }, { transform: "translateX(110%)" }], {
      duration: 1100,
      delay: 450,
      easing: "cubic-bezier(0.3, 0, 0.2, 1)",
    });
  }, [flipped]);

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`${service.name}: ${service.cta}`}
      data-axis={index % 2 === 0 ? "y" : "x"}
      className="flip3d group block size-full rounded-xl focus-visible:outline-offset-4"
      onMouseEnter={() => onHold(true)}
      onMouseLeave={() => onHold(false)}
      onFocus={() => onFocusChange(true)}
      onBlur={() => onFocusChange(false)}
    >
      <div ref={liftRef} className="flip3d-lift size-full">
        <div data-flipped={flipped} className="flip3d-card relative size-full">
          {/* Front: the service over a project photo. */}
          <div aria-hidden="true" className="flip3d-face absolute inset-0 rounded-xl">
            <div className="absolute inset-0 overflow-hidden rounded-xl bg-navy-deep shadow-xl shadow-navy-deep/25">
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1280px) 420px, (min-width: 1024px) 33vw, 50vw"
                style={{ objectPosition: image.position }}
                className="slow-zoom object-cover transition-[filter] duration-700 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/45 to-navy-deep/5" />
              <div className="absolute inset-0 bg-linear-to-br from-navy-deep/40 via-transparent to-transparent" />
              <span ref={frontShineRef} className="flip3d-shine pointer-events-none absolute inset-0" />
            </div>
            <span className="pointer-events-none absolute inset-2 rounded-lg border border-gold-bright/30 transition-colors duration-500 group-hover:border-gold-bright/70 sm:inset-3" />

            <div className="flip3d-depth absolute inset-0 flex flex-col justify-between p-4 text-white sm:p-6">
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.12em] text-gold-bright sm:text-base">
                  {number}
                  <span className="h-px w-5 bg-gold-bright/70 sm:w-8" />
                </span>
                <span className="grid size-9 place-items-center rounded-full border border-gold-bright/40 bg-navy-deep/45 backdrop-blur-md sm:size-11">
                  <ServiceIcon slug={service.slug} className="size-4 text-gold-bright sm:size-5" />
                </span>
              </div>
              <div>
                <p className="font-display text-[1.1rem] leading-none font-bold tracking-tight min-[400px]:text-xl sm:text-4xl">
                  {service.name}
                </p>
                <p className="mt-2 hidden max-w-[28ch] text-sm leading-snug text-white/75 sm:block">{service.title}</p>
              </div>
            </div>
          </div>

          {/* Back: the client's own request line, in the customer's voice. */}
          <div aria-hidden="true" className={`flip3d-back flip3d-face absolute inset-0 rounded-xl ${tone.text}`}>
            <div
              className={`absolute inset-0 overflow-hidden rounded-xl bg-linear-to-br shadow-xl shadow-navy-deep/25 ${tone.face}`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                style={{ objectPosition: image.position }}
                className="object-cover opacity-[0.1] grayscale mix-blend-luminosity"
              />
              <div className="absolute -top-1/3 -right-1/4 size-3/4 rounded-full bg-white/15 blur-3xl" />
              <span
                className={`flip3d-outline-number absolute -right-2 -bottom-6 font-display text-[7rem] leading-none font-bold opacity-25 sm:text-[10rem] ${tone.accent}`}
              >
                {number}
              </span>
              <span ref={backShineRef} className="flip3d-shine pointer-events-none absolute inset-0" />
            </div>
            <span className="pointer-events-none absolute inset-2 rounded-lg border border-current/20 sm:inset-3" />

            <div className="flip3d-depth absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
              <p
                className={`flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase sm:text-xs ${tone.accent}`}
              >
                <ServiceIcon slug={service.slug} className="size-4" />
                {service.name}
              </p>
              <p className="font-display text-[0.95rem] leading-[1.15] font-bold tracking-tight text-balance uppercase min-[400px]:text-base sm:text-2xl xl:text-[1.7rem]">
                {service.cta}
              </p>
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${tone.button}`}
              >
                <span className="sm:hidden">Start</span>
                <span className="hidden sm:inline">Start your request</span>
                <ArrowRightIcon className="size-3.5 sm:size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
