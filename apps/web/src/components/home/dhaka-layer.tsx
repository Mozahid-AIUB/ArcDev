"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import {
  DHAKA_MAJOR_ROADS,
  DHAKA_RAIL,
  DHAKA_RIVERS,
  DHAKA_ROADS,
  DHAKA_VIEWBOX,
  DHAKA_WATER,
} from "@/content/dhaka-map";
import type { DhakaPin, MapLabel, MapPoint } from "./project-map-stage";

gsap.registerPlugin(useGSAP);

// A map marker with its tip at 0,0.
const MARKER = "M0 0C-4.2-5.2-7.5-8.4-7.5-12.3a7.5 7.5 0 1 1 15 0C7.5-8.4 4.2-5.2 0 0Z";

/**
 * Dhaka close-up, drawn from OpenStreetMap data: water, rivers, main roads and rail, then a
 * marker for every project. Loaded only when someone zooms in, so the page itself stays light.
 */
export function DhakaLayer({
  pins,
  hq,
  labels,
  active,
  hoveredPin,
  hoveredArea,
  onPinHover,
}: {
  pins: DhakaPin[];
  hq: MapPoint;
  labels: MapLabel[];
  active: boolean;
  hoveredPin: string | null;
  hoveredArea: string | null;
  onPinHover: (slug: string | null) => void;
}) {
  const rootRef = useRef<SVGSVGElement>(null);
  const played = useRef(false);

  useGSAP(
    () => {
      if (!active || played.current) return;
      played.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(rootRef);

      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .from(q("[data-dk-water]"), { opacity: 0, duration: 0.8 }, 0.2)
        .from(q("[data-dk-draw='river']"), { strokeDashoffset: 1, duration: 1.4 }, 0.2)
        .from(q("[data-dk-draw='major']"), { strokeDashoffset: 1, duration: 1.6 }, 0.35)
        .from(q("[data-dk-draw='road']"), { strokeDashoffset: 1, duration: 1.8 }, 0.5)
        .from(q("[data-dk-draw='rail']"), { strokeDashoffset: 1, duration: 1.2 }, 0.7)
        .from(q("[data-dk-label]"), { opacity: 0, duration: 0.6, stagger: 0.05 }, 1.1)
        .from(q("[data-dk-hq]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(2.5)" }, 1.3)
        .from(
          q("[data-dk-drop]"),
          { y: -34, opacity: 0, duration: 0.7, ease: "bounce.out", stagger: 0.07 },
          1.5,
        )
        .from(
          q("[data-dk-shadow]"),
          { scale: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.07 },
          1.7,
        );
    },
    { scope: rootRef, dependencies: [active] },
  );

  // Northern pins first, so the markers rain down the city from Uttara to Old Dhaka.
  const ordered = [...pins].sort((a, b) => a.y - b.y);

  return (
    <svg
      ref={rootRef}
      viewBox={DHAKA_VIEWBOX}
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label={`Map of Dhaka with ${pins.length} ArcDev project sites`}
    >
      <defs>
        <radialGradient id="dk-fade" cx="0.47" cy="0.45" r="0.62">
          <stop offset="0.6" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="dk-vignette">
          <rect width="400" height="480" fill="url(#dk-fade)" />
        </mask>
      </defs>

      <rect width="400" height="480" rx="14" className="fill-[#fbf9f4]" />
      <g mask="url(#dk-vignette)" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path data-dk-water="" d={DHAKA_WATER} className="fill-[#c9dcee]" stroke="none" />
        <path data-dk-draw="river" pathLength={1} strokeDasharray="1" d={DHAKA_RIVERS} stroke="#8db3d8" strokeWidth={1.3} />
        <path data-dk-draw="road" pathLength={1} strokeDasharray="1" d={DHAKA_ROADS} className="stroke-navy/25" strokeWidth={0.7} />
        <path data-dk-draw="major" pathLength={1} strokeDasharray="1" d={DHAKA_MAJOR_ROADS} className="stroke-navy/55" strokeWidth={1.3} />
        <path
          data-dk-draw="rail"
          pathLength={1}
          strokeDasharray="1"
          d={DHAKA_RAIL}
          className="stroke-gold-deep/60"
          strokeWidth={0.9}
        />
      </g>

      {labels.map((label) => (
        <text
          key={label.name}
          data-dk-label=""
          x={label.x}
          y={label.y}
          textAnchor="middle"
          className={
            label.river
              ? "fill-[#5f8fbf] font-sans text-[7px] font-semibold tracking-[0.3em] italic"
              : "fill-navy/35 font-sans text-[7.5px] font-bold tracking-[0.28em]"
          }
        >
          {label.name}
        </text>
      ))}

      {/* Head office */}
      <g transform={`translate(${hq.x} ${hq.y})`}>
        <g data-dk-hq="">
          <circle r="9" className="map-pulse fill-navy/25" />
          <rect x="-5.5" y="-5.5" width="11" height="11" rx="2" transform="rotate(45)" className="fill-navy stroke-gold-bright" strokeWidth={1.4} />
          <text x="11" y="3" className="fill-navy font-sans text-[8.5px] font-bold" stroke="#fbf9f4" strokeWidth={3} paintOrder="stroke">
            Head office · Uttara
          </text>
        </g>
      </g>

      {ordered.map((pin) => {
        const lit = hoveredPin === pin.slug || hoveredArea === pin.areaId;
        const dim = (hoveredPin || hoveredArea) && !lit;
        return (
          <a
            key={pin.slug}
            href={`/projects/${pin.slug}`}
            aria-label={`${pin.name}, ${pin.areaName}`}
            onMouseEnter={() => onPinHover(pin.slug)}
            onMouseLeave={() => onPinHover(null)}
            onFocus={() => onPinHover(pin.slug)}
            onBlur={() => onPinHover(null)}
            className="outline-none"
          >
            <g transform={`translate(${pin.x} ${pin.y})`}>
              <ellipse data-dk-shadow="" rx="4.5" ry="1.6" className="fill-navy-deep/25" />
              <g data-dk-drop="">
                <g
                  className={`transition-[transform,opacity] duration-300 ${lit ? "scale-[1.35]" : ""} ${dim ? "opacity-35" : ""}`}
                  style={{ transformOrigin: "0px 0px", transformBox: "view-box" }}
                >
                  <path d={MARKER} className={lit ? "fill-navy" : "fill-gold-bright"} stroke="#0e1a33" strokeWidth={1.1} />
                  <circle cy="-12.3" r="2.8" className={lit ? "fill-gold-bright" : "fill-navy-deep"} />
                </g>
              </g>
            </g>
          </a>
        );
      })}
    </svg>
  );
}
