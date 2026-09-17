"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import type { Project, ProjectStatus } from "@arcdev/shared";
import { ProjectCard } from "@/components/website/project-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Filter = "all" | ProjectStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

/**
 * Status tabs over the project grid. Every card stays mounted and non-matching ones are hidden,
 * so the page-wide scroll animations (reveal, progress bars) keep working after a change.
 */
export function ProjectFilter({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const listRef = useRef<HTMLUListElement>(null);
  const changed = useRef(false);

  const count = (value: Filter) =>
    value === "all" ? projects.length : projects.filter((project) => project.status === value).length;

  useGSAP(
    () => {
      if (!changed.current) return;
      // Cards moved; let scroll-triggered animations recalculate where they start.
      ScrollTrigger.refresh();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const visible = listRef.current?.querySelectorAll("li:not([hidden])");
      if (!visible?.length) return;
      gsap.fromTo(
        visible,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.06, overwrite: true },
      );
    },
    { dependencies: [filter], scope: listRef },
  );

  return (
    <div>
      <div role="group" aria-label="Filter projects by status" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="flex w-max gap-2">
          {FILTERS.map(({ value, label }) => {
            const selected = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  changed.current = true;
                  setFilter(value);
                }}
                className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                  selected
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-panel text-navy hover:border-navy"
                }`}
              >
                {label}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${selected ? "bg-white/15 text-white" : "bg-sand text-ink-soft"}`}
                >
                  {count(value)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {count(filter)} {count(filter) === 1 ? "project" : "projects"} shown
      </p>

      <ul ref={listRef} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.slug}
            data-reveal=""
            hidden={filter !== "all" && project.status !== filter}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      {count(filter) === 0 && <p className="mt-8 text-ink-soft">No projects in this group right now.</p>}
    </div>
  );
}
