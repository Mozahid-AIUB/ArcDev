"use client";

import { useEffect, useState } from "react";

/** The homepage's full screens, in the client's order. Ids match the FullScreen sections. */
export const HOME_SCREENS = [
  { id: "ongoing", label: "Ongoing projects" },
  { id: "offer", label: "What we offer" },
  { id: "completed", label: "Completed projects" },
  { id: "upcoming", label: "Upcoming projects" },
  { id: "contact", label: "Contact us" },
] as const;

export type HomeScreenId = (typeof HOME_SCREENS)[number]["id"];

/**
 * Dots for the homepage's full-screen sections: shows which one is on screen and jumps to any of
 * them. "header" sits in the mobile header (the three dots in the client's sketch); "rail" runs
 * down the right edge on desktop.
 */
export function ScreenDots({ variant }: { variant: "header" | "rail" }) {
  const [active, setActive] = useState<string>(HOME_SCREENS[0].id);
  const [pastScreens, setPastScreens] = useState(false);

  // Once the last screen has scrolled away, the dots have nothing left to point at.
  useEffect(() => {
    const last = document.getElementById(HOME_SCREENS[HOME_SCREENS.length - 1].id);
    if (!last) return;
    const observer = new IntersectionObserver(([entry]) =>
      setPastScreens(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(last);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const screen of HOME_SCREENS) {
      const el = document.getElementById(screen.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const rail = variant === "rail";

  return (
    <nav
      aria-label="Page sections"
      aria-hidden={pastScreens || undefined}
      inert={pastScreens}
      className={`transition-opacity duration-500 ${pastScreens ? "opacity-0" : "opacity-100"} ${
        rail
          ? "fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 flex-col gap-1 rounded-full border border-white/15 bg-navy-deep/55 px-1.5 py-2 backdrop-blur-md lg:flex"
          : "flex items-center"
      }`}
    >
      {HOME_SCREENS.map((screen) => {
        const current = screen.id === active;
        return (
          <a
            key={screen.id}
            href={`#${screen.id}`}
            aria-label={screen.label}
            aria-current={current ? "true" : undefined}
            title={screen.label}
            onClick={(event) => {
              event.preventDefault();
              document.getElementById(screen.id)?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              });
            }}
            className={`group grid place-items-center ${rail ? "size-6" : "h-8 w-4 sm:w-6"}`}
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                current
                  ? `bg-gold-bright ${rail ? "h-5 w-2" : "h-2 w-3.5 sm:w-5"}`
                  : "size-1.5 bg-white/40 group-hover:bg-white/70 sm:size-2"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
