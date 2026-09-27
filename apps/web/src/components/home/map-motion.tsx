"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Animates the server-rendered project map once it scrolls into view: land, then the country
 * outline inked in, rivers, pins dropping in, and the links out from the head office. Also ties
 * each region in the list to its pin on hover. The markup is complete without this.
 */
export function MapMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      // Hover a region in the list or on the map, and both light up together.
      const setActive = (region: string | null) => {
        root.querySelectorAll<HTMLElement | SVGElement>("[data-region]").forEach((el) => {
          el.classList.toggle("is-active", el.dataset.region === region);
        });
      };
      const onOver = (event: Event) => {
        const target = (event.target as Element).closest<HTMLElement | SVGElement>("[data-region]");
        setActive(target?.dataset.region ?? null);
      };
      const onLeave = () => setActive(null);
      root.addEventListener("pointerover", onOver);
      root.addEventListener("pointerleave", onLeave);
      root.addEventListener("focusin", onOver);
      root.addEventListener("focusout", onLeave);

      const cleanup = () => {
        root.removeEventListener("pointerover", onOver);
        root.removeEventListener("pointerleave", onLeave);
        root.removeEventListener("focusin", onOver);
        root.removeEventListener("focusout", onLeave);
      };

      if (!document.documentElement.hasAttribute("data-motion")) return cleanup;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup;

      const q = gsap.utils.selector(root);
      gsap.set(q("[data-map-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q("[data-map-fill]"), { fillOpacity: 0 });
      gsap.set(q("[data-map-fade]"), { opacity: 0 });
      gsap.set(q("[data-map-pin]"), { scale: 0, transformOrigin: "50% 50%" });

      gsap
        .timeline({ scrollTrigger: { trigger: q("[data-map-svg]")[0], start: "top 70%", once: true } })
        .to(q('[data-map-fade="land"]'), { opacity: 1, duration: 0.8, ease: "power1.out" })
        .to(q('[data-map-draw="outline"]'), { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" }, 0.1)
        .to(q("[data-map-fill]"), { fillOpacity: 1, duration: 0.8, ease: "power1.out" }, 1.6)
        .to(q('[data-map-draw="river"]'), { strokeDashoffset: 0, duration: 1.4, ease: "power1.inOut" }, 1.7)
        .to(q("[data-map-pin]"), { scale: 1, duration: 0.6, ease: "back.out(2.5)", stagger: 0.14 }, 2.5)
        .to(q('[data-map-draw="link"]'), { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", stagger: 0.12 }, 2.9)
        .to(q('[data-map-fade="label"]'), { opacity: 1, duration: 0.5, stagger: 0.08 }, 3.1)
        .to(q('[data-map-fade="furniture"]'), { opacity: 1, duration: 0.6 }, 3.2);

      return cleanup;
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
