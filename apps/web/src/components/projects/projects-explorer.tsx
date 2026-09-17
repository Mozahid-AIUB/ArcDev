"use client";

import { useState } from "react";
import type { Project, ProjectStatus } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { BuildingIcon } from "@/components/website/icons";
import { ProjectCard } from "@/components/website/project-card";

type StatusFilter = "all" | ProjectStatus;
type KindFilter = "all" | Project["kind"];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ongoing", label: "Ongoing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
];

const KIND_OPTIONS: { value: KindFilter; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

function FilterButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition ${
        active ? "border-navy bg-navy text-white" : "border-line bg-panel text-navy hover:border-navy"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`text-sm tabular-nums ${active ? "text-gold-bright" : "text-ink-soft"}`}>{count}</span>
      )}
    </button>
  );
}

/** Status and type filters over the project list. */
export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [kind, setKind] = useState<KindFilter>("all");
  // Cards shown after a filter change mount after the page's scroll animations ran,
  // so their progress bars are shown at full width instead of waiting for GSAP.
  const [touched, setTouched] = useState(false);

  const byKind = kind === "all" ? projects : projects.filter((project) => project.kind === kind);
  const visible = status === "all" ? byKind : byKind.filter((project) => project.status === status);

  const statusCount = (value: StatusFilter) =>
    value === "all" ? byKind.length : byKind.filter((project) => project.status === value).length;
  const kindCount = (value: KindFilter) =>
    value === "all" ? projects.length : projects.filter((project) => project.kind === value).length;

  const update = (next: { status?: StatusFilter; kind?: KindFilter }) => {
    if (next.status !== undefined) setStatus(next.status);
    if (next.kind !== undefined) setKind(next.kind);
    setTouched(true);
  };

  const summary = [
    status === "all" ? null : STATUS_OPTIONS.find((option) => option.value === status)?.label.toLowerCase(),
    kind === "all" ? null : kind,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              active={status === option.value}
              label={option.label}
              count={statusCount(option.value)}
              onClick={() => update({ status: option.value })}
            />
          ))}
        </div>
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
          {KIND_OPTIONS.map((option) => (
            <FilterButton
              key={option.value}
              active={kind === option.value}
              label={option.label}
              count={kindCount(option.value)}
              onClick={() => update({ kind: option.value })}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 text-ink-soft" aria-live="polite">
        Showing <span className="font-semibold tabular-nums text-ink">{visible.length}</span>
        {summary && ` ${summary}`} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length > 0 ? (
        <ul
          key={`${status}-${kind}`}
          className={`mt-8 grid gap-6 transition-opacity duration-500 starting:opacity-0 sm:grid-cols-2 lg:grid-cols-3 ${
            touched ? "[&_[data-progress]]:transform-none!" : ""
          }`}
        >
          {visible.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} priority={!touched && index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed border-line bg-panel px-6 py-16 text-center transition-opacity duration-500 starting:opacity-0">
          <BuildingIcon className="size-12 text-gold-deep" />
          <p className="mt-4 font-display text-xl font-bold text-navy">No projects match these filters</p>
          <p className="mt-2 text-ink-soft">Try another status or type, or show every project.</p>
          <button
            type="button"
            onClick={() => update({ status: "all", kind: "all" })}
            className={`mt-6 ${buttonStyles.outline}`}
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
