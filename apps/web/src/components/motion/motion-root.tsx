"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatCount(value: number, decimals: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Everything already on screen when the page opens is shown straight away, not on scroll. */
function isInView(el: Element) {
  const box = el.getBoundingClientRect();
  return box.top < window.innerHeight * 0.95 && box.bottom > 0;
}

/**
 * Runs every scroll animation on the public site, driven by data attributes so pages stay
 * server components. Server HTML is always complete; this only animates it into view.
 *
 *   data-reveal[="fade"|"left"|"right"|"scale"]  fade and slide in when scrolled into view
 *   data-words + data-word                         headline words rise in (see SplitWords)
 *   data-count="38" data-decimals="1"             number counts up from zero
 *   data-progress                                  bar grows from the left
 *   data-line="x"|"y"                              connector draws as you scroll past it
 *   data-parallax="10"                             moves by ±10% while scrolling past
 *
 * Nothing here may leave content invisible: the reveal states live in CSS behind
 * html[data-motion], and revealAll() below clears them if anything goes wrong.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      const html = document.documentElement;
      if (!html.hasAttribute("data-motion")) return;

      const revealAll = () => {
        gsap.set("[data-reveal]", { opacity: 1, x: 0, y: 0, scale: 1, overwrite: true });
        gsap.set("[data-word]", { yPercent: 0, y: 0, overwrite: true });
        gsap.set("[data-progress]", { scaleX: 1, overwrite: true });
        gsap.set('[data-line="x"]', { scaleX: 1, overwrite: true });
        gsap.set('[data-line="y"]', { scaleY: 1, overwrite: true });
      };

      // Last resort: if anything above throws or a trigger never fires, show everything.
      const safety = window.setTimeout(revealAll, 6000);

      try {
        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const onScreen = reveals.filter(isInView);
        const below = reveals.filter((el) => !isInView(el));

        gsap.to(onScreen, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          overwrite: true,
        });

        ScrollTrigger.batch(below, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
          const words = el.querySelectorAll("[data-word]");
          const vars: gsap.TweenVars = { yPercent: 0, y: 0, duration: 1, ease: "power4.out", stagger: 0.05 };
          if (isInView(el)) gsap.to(words, vars);
          else gsap.to(words, { ...vars, scrollTrigger: { trigger: el, start: "top 94%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          if (!Number.isFinite(end)) return;
          const counter = { value: 0 };
          const vars: gsap.TweenVars = {
            value: end,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = formatCount(counter.value, decimals);
            },
          };
          el.textContent = formatCount(0, decimals);
          if (isInView(el)) gsap.to(counter, vars);
          else gsap.to(counter, { ...vars, scrollTrigger: { trigger: el, start: "top 94%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-progress]").forEach((el) => {
          const vars: gsap.TweenVars = { scaleX: 1, duration: 1.4, ease: "power3.out" };
          if (isInView(el)) gsap.to(el, vars);
          else gsap.to(el, { ...vars, scrollTrigger: { trigger: el, start: "top 96%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
          const vars = el.dataset.line === "y" ? { scaleY: 1 } : { scaleX: 1 };
          gsap.to(el, {
            ...vars,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top 85%", end: "bottom 55%", scrub: 0.6 },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 10);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      } catch (error) {
        console.error("Scroll animations failed; showing everything instead.", error);
        revealAll();
      }

      html.setAttribute("data-motion", "ready");
      // Images and fonts change positions after they load; recalculate trigger points then.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.clearTimeout(safety);
        window.removeEventListener("load", refresh);
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return <>{children}</>;
}
