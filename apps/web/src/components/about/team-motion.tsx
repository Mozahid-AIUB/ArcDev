"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Entrance for the team section: each portrait is unveiled by a curtain wiping up, its text
 * rises in layers and the credentials pop in one by one. The markup is complete without it.
 */
export function TeamMotion({ children, className = "" }: { children: ReactNode; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!document.documentElement.hasAttribute("data-motion")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(rootRef);

      q("[data-team-card]").forEach((card) => {
        const photo = card.querySelector("[data-team-photo]");
        const curtain = card.querySelector("[data-team-curtain]");
        const lines = card.querySelectorAll("[data-team-line]");
        const chips = card.querySelectorAll("[data-team-chip]");

        gsap.set(card, { opacity: 0, y: 40 });
        if (curtain) gsap.set(curtain, { scaleY: 1, transformOrigin: "50% 0%" });
        if (photo) gsap.set(photo, { scale: 1.18 });
        if (lines.length) gsap.set(lines, { opacity: 0, y: 18 });
        if (chips.length) gsap.set(chips, { opacity: 0, scale: 0.7 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
          defaults: { ease: "power3.out" },
        });
        tl.to(card, { opacity: 1, y: 0, duration: 0.7 });
        if (curtain) tl.to(curtain, { scaleY: 0, duration: 1, ease: "power4.inOut" }, 0.15);
        if (photo) tl.to(photo, { scale: 1, duration: 1.4 }, 0.15);
        if (lines.length) tl.to(lines, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0.5);
        if (chips.length) {
          tl.to(chips, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.2)", stagger: 0.06 }, 0.85);
        }
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
