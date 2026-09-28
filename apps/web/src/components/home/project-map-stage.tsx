"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectStatus } from "@arcdev/shared";
import { ArrowRightIcon } from "@/components/website/icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DhakaLayer = dynamic(() => import("./dhaka-layer").then((m) => m.DhakaLayer), { ssr: false });

export interface MapPoint {
  x: number;
  y: number;
}
export interface MapLabel extends MapPoint {
  name: string;
  river?: boolean;
}
export interface CountryRegion {
  id: string;
  name: string;
  detail: string;
  office?: string;
  count: number;
}
export interface DhakaGroup {
  id: string;
  name: string;
  count: number;
}
export interface DhakaPin extends MapPoint {
  slug: string;
  name: string;
  areaId: string;
  areaName: string;
  status: ProjectStatus;
  image?: string;
}

type View = "bd" | "dhaka";

const STATUS_LABEL: Record<ProjectStatus, string> = { ongoing: "Ongoing", completed: "Completed", upcoming: "Upcoming" };
const W = 400;
const H = 480;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The project map: Bangladesh draws itself on scroll, then the camera flies into Dhaka, where
 * every project has its own marker. A toggle switches between the two; hovering a marker or an
 * area in the list shows the project.
 */
export function ProjectMapStage({
  heading,
  country,
  dhakaAt,
  regions,
  groups,
  pins,
  hq,
  labels,
  unpinned,
}: {
  heading: ReactNode;
  country: ReactNode;
  /** Dhaka's position on the country map, the point the camera zooms into. */
  dhakaAt: MapPoint;
  regions: CountryRegion[];
  groups: DhakaGroup[];
  pins: DhakaPin[];
  hq: MapPoint;
  labels: MapLabel[];
  unpinned: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);
  const dhakaRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<View>("bd");
  const [dhakaMounted, setDhakaMounted] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);
  const touched = useRef(false);
  const firstView = useRef(true);

  const go = (next: View, byUser = true) => {
    if (byUser) touched.current = true;
    if (next === "dhaka") setDhakaMounted(true);
    setView(next);
    setHoveredPin(null);
    setHoveredArea(null);
  };

  // Country intro, then one automatic flight into Dhaka unless the visitor has taken over.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !document.documentElement.hasAttribute("data-motion") || reducedMotion()) return;
      const q = gsap.utils.selector(countryRef);
      gsap.set(q("[data-map-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q("[data-map-fill]"), { fillOpacity: 0 });
      gsap.set(q("[data-map-fade]"), { opacity: 0 });
      gsap.set(q("[data-map-pin]"), { scale: 0, transformOrigin: "50% 50%" });

      gsap
        .timeline({
          scrollTrigger: { trigger: countryRef.current, start: "top 70%", once: true },
          onComplete: () => {
            window.setTimeout(() => {
              if (!touched.current) go("dhaka", false);
            }, 1600);
          },
        })
        .to(q('[data-map-fade="land"]'), { opacity: 1, duration: 0.8, ease: "power1.out" })
        .to(q('[data-map-draw="outline"]'), { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.1)
        .to(q("[data-map-fill]"), { fillOpacity: 1, duration: 0.8, ease: "power1.out" }, 1.6)
        .to(q('[data-map-draw="river"]'), { strokeDashoffset: 0, duration: 1.4, ease: "power1.inOut" }, 1.7)
        .to(q("[data-map-pin]"), { scale: 1, duration: 0.6, ease: "back.out(2.5)", stagger: 0.14 }, 2.5)
        .to(q('[data-map-draw="link"]'), { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 }, 2.9)
        .to(q('[data-map-fade="label"]'), { opacity: 1, duration: 0.5, stagger: 0.08 }, 3.1)
        .to(q('[data-map-fade="furniture"]'), { opacity: 1, duration: 0.6 }, 3.2);
    },
    { scope: rootRef },
  );

  // The camera: zoom the country map into Dhaka while the city map rises to meet it.
  useGSAP(
    () => {
      if (firstView.current) {
        firstView.current = false;
        return;
      }
      const toDhaka = view === "dhaka";
      const origin = `${(dhakaAt.x / W) * 100}% ${(dhakaAt.y / H) * 100}%`;
      const duration = reducedMotion() ? 0 : 1.2;
      gsap.to(countryRef.current, {
        scale: toDhaka ? 7 : 1,
        opacity: toDhaka ? 0 : 1,
        transformOrigin: origin,
        duration,
        ease: "power3.inOut",
      });
      gsap.fromTo(
        dhakaRef.current,
        toDhaka ? { opacity: 0, scale: 0.55 } : { opacity: 1, scale: 1 },
        {
          opacity: toDhaka ? 1 : 0,
          scale: toDhaka ? 1 : 0.55,
          duration,
          delay: toDhaka ? duration * 0.35 : 0,
          ease: "power3.inOut",
        },
      );
    },
    { scope: rootRef, dependencies: [view] },
  );

  // Country pins: hovering one lights its row; clicking Dhaka flies in.
  useEffect(() => {
    const pinsOnMap = countryRef.current?.querySelectorAll<SVGElement>("svg [data-region]") ?? [];
    const cleanups: (() => void)[] = [];
    pinsOnMap.forEach((el) => {
      const enter = () => setHoveredRegion(el.dataset.region ?? null);
      const leave = () => setHoveredRegion(null);
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
      });
      if (el.dataset.region === "dhaka") {
        const zoom = () => {
          touched.current = true;
          setDhakaMounted(true);
          setView("dhaka");
        };
        el.style.cursor = "zoom-in";
        el.addEventListener("click", zoom);
        cleanups.push(() => el.removeEventListener("click", zoom));
      }
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Hovering an area in the country list lights up its pin on the map.
  useEffect(() => {
    countryRef.current?.querySelectorAll<SVGElement>("[data-region]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.region === hoveredRegion);
    });
  }, [hoveredRegion]);

  const pin = pins.find((p) => p.slug === hoveredPin);
  const dhakaTotal = pins.length + unpinned;

  return (
    <div ref={rootRef} className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div>
        {heading}

        <div className="mt-8 inline-flex rounded-full border border-line bg-panel p-1 shadow-sm" role="group" aria-label="Map view">
          {(
            [
              ["bd", "Bangladesh"],
              ["dhaka", `Inside Dhaka · ${dhakaTotal}`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={view === id}
              onClick={() => go(id)}
              className={`h-10 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
                view === id ? "bg-navy text-white shadow" : "text-navy hover:text-gold-deep"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {view === "bd" ? (
          <ul key="bd" className="map-list mt-6 divide-y divide-line border-y border-line">
            {regions.map((region) => (
              <li
                key={region.id}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`map-region relative flex items-start gap-4 py-4 pl-4 transition-colors duration-300 ${
                  hoveredRegion === region.id ? "is-active" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="map-region-bar absolute top-3 bottom-3 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-gold transition-transform duration-300"
                />
                <span className="w-14 shrink-0 font-display text-3xl leading-none font-bold text-navy tabular-nums">
                  {String(region.count).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-display text-lg font-bold text-navy">{region.name}</span>
                    {region.office && (
                      <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-gold-deep uppercase">
                        {region.office}
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[15px] leading-snug text-ink-soft">{region.detail}</span>
                </span>
                {region.id === "dhaka" && (
                  <button
                    type="button"
                    onClick={() => go("dhaka")}
                    className="ml-auto shrink-0 self-center text-sm font-semibold text-gold-deep hover:text-navy"
                  >
                    Zoom in →
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul key="dhaka" className="map-list mt-6 grid gap-x-6 border-t border-line sm:grid-cols-2">
            {groups.map((group) => (
              <li
                key={group.id}
                onMouseEnter={() => setHoveredArea(group.id)}
                onMouseLeave={() => setHoveredArea(null)}
                className={`map-region relative flex items-center gap-3 border-b border-line py-3 pl-3 transition-colors duration-300 ${
                  hoveredArea === group.id ? "is-active" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="map-region-bar absolute top-2 bottom-2 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-gold transition-transform duration-300"
                />
                <span className="w-7 shrink-0 font-display text-xl font-bold text-navy tabular-nums">{group.count}</span>
                <span className="text-[15px] leading-snug text-ink">{group.name}</span>
              </li>
            ))}
            {unpinned > 0 && (
              <li className="py-3 text-sm text-ink-soft sm:col-span-2">
                Plus {unpinned} more {unpinned === 1 ? "site" : "sites"} in Dhaka not shown on the map. Markers show the
                neighbourhood, not the exact plot.
              </li>
            )}
          </ul>
        )}
      </div>

      <figure className="relative order-first mx-auto w-full max-w-135 lg:order-0">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            ref={countryRef}
            aria-hidden={view === "dhaka" || undefined}
            inert={view === "dhaka"}
            className="relative will-change-transform"
          >
            {country}
          </div>
          <div
            ref={dhakaRef}
            aria-hidden={view === "bd" || undefined}
            inert={view === "bd"}
            className="absolute inset-0 opacity-0 will-change-transform"
          >
            {dhakaMounted && (
              <DhakaLayer
                pins={pins}
                hq={hq}
                labels={labels}
                active={view === "dhaka"}
                hoveredPin={hoveredPin}
                hoveredArea={hoveredArea}
                onPinHover={setHoveredPin}
              />
            )}
          </div>
        </div>

        {view === "dhaka" && (
          <button
            type="button"
            onClick={() => go("bd")}
            className="absolute top-3 left-3 inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-panel/90 px-3 text-xs font-semibold text-navy shadow-sm backdrop-blur hover:border-navy"
          >
            <ArrowRightIcon className="size-3.5 rotate-180" />
            Bangladesh
          </button>
        )}

        {/* Hover card for a Dhaka marker */}
        {view === "dhaka" && pin && (
          <Link
            href={`/projects/${pin.slug}`}
            onMouseEnter={() => setHoveredPin(pin.slug)}
            onMouseLeave={() => setHoveredPin(null)}
            className="map-card absolute z-20 w-56 overflow-hidden rounded-xl border border-line bg-panel shadow-2xl shadow-navy/20"
            style={{
              left: `${(pin.x / W) * 100}%`,
              top: `${(pin.y / H) * 100}%`,
              transform: `translate(${pin.x > W * 0.6 ? "calc(-100% - 14px)" : "14px"}, ${pin.y > H * 0.6 ? "calc(-100% + 8px)" : "-30%"})`,
            }}
          >
            {pin.image && (
              <span className="relative block aspect-16/10 bg-sand">
                <Image src={pin.image} alt="" fill sizes="224px" className="object-cover" />
              </span>
            )}
            <span className="block p-3">
              <span className="text-[10px] font-semibold tracking-[0.16em] text-gold-deep uppercase">
                {STATUS_LABEL[pin.status]} · {pin.areaName}
              </span>
              <span className="mt-1 block font-display text-[15px] leading-snug font-bold text-navy">{pin.name}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep">
                View project <ArrowRightIcon className="size-3.5" />
              </span>
            </span>
          </Link>
        )}
      </figure>
    </div>
  );
}
