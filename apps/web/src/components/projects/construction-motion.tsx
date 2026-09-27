"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Plays the construction-status drawing once it scrolls into view: planned floors sketched in,
 * then each cast floor rising in order, the crane and scaffold, and the working-level marker.
 */
export function ConstructionMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !document.documentElement.hasAttribute("data-motion")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(root);
      gsap.set(q("[data-cs-planned]"), { opacity: 0 });
      gsap.set(q("[data-cs-floor]"), { opacity: 0, y: 14 });
      gsap.set(q("[data-cs-draw]"), { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(q("[data-cs-fade]"), { opacity: 0 });
      gsap.set(q("[data-cs-pop]"), { opacity: 0, scale: 0.6, transformOrigin: "0% 50%" });

      gsap
        .timeline({ scrollTrigger: { trigger: q("[data-cs-svg]")[0], start: "top 72%", once: true } })
        .to(q("[data-cs-planned]"), { opacity: 1, duration: 0.6, stagger: 0.05 })
        .to(q("[data-cs-floor]"), { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.17 }, 0.4)
        .to(q("[data-cs-draw]"), { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.1 }, 1.2)
        .to(q("[data-cs-fade]"), { opacity: 1, duration: 0.5, stagger: 0.08 }, 1.8)
        .to(q("[data-cs-pop]"), { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" }, 2.2);
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
