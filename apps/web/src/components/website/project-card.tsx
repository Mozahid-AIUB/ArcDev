import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectStatus } from "@arcdev/shared";
import { ArrowUpRightIcon, BuildingIcon, PinIcon } from "./icons";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
};

const KIND_LABEL: Record<Project["kind"], string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  "hotel-resort": "Hotel & Resort",
  interior: "Interior",
};

const STATUS_STYLE: Record<ProjectStatus, string> = {
  ongoing: "bg-gold-bright text-navy",
  upcoming: "bg-white text-navy",
  completed: "bg-ok text-white",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-semibold uppercase tracking-wider ${STATUS_STYLE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/** The project's first photo, or a plain navy block when there is none. */
export function ProjectCover({
  project,
  sizes,
  priority = false,
  className = "aspect-4/3",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const cover = project.images[0];

  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      {cover ? (
        <Image
          src={cover}
          alt={`${project.name}, ${project.location}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-gold-bright/40">
          <BuildingIcon className="size-16" />
        </div>
      )}
    </div>
  );
}

/** Construction progress. The bar grows into place when scrolled into view. */
export function ProgressBar({
  value,
  tone = "light",
  className = "",
}: {
  value: number;
  tone?: "light" | "dark";
  className?: string;
}) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));
  const dark = tone === "dark";

  return (
    <div className={className}>
      <div className={`flex justify-between text-sm ${dark ? "text-white/65" : "text-ink-soft"}`}>
        <span>Construction</span>
        <span className={`font-semibold tabular-nums ${dark ? "text-white" : "text-ink"}`}>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Construction progress"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`mt-1.5 h-2 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-line"}`}
      >
        <div data-progress="" className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

/** Short facts for a card: "10 storeys · 36 units · 7.5 katha". */
export function projectKeyFacts(project: Project): string[] {
  const facts: string[] = [];
  if (project.storeys !== undefined) facts.push(`${project.storeys} storeys`);
  if (project.units !== undefined)
    facts.push(`${project.units} ${project.kind === "commercial" || project.kind === "industrial" ? "floors" : "units"}`);
  if (project.landKatha !== undefined) facts.push(`${project.landKatha} katha`);
  return facts;
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/10"
    >
      <div className="relative">
        <ProjectCover
          project={project}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3">
          <ProjectStatusBadge status={project.status} />
        </span>
        <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRightIcon />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">{KIND_LABEL[project.kind]}</p>
        <h3 className="mt-1 font-display text-xl font-bold text-navy">{project.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[15px] text-ink-soft">
          <PinIcon className="size-4 shrink-0" />
          {project.location}
        </p>
        <p className="mt-3 text-sm tabular-nums text-ink-soft">{projectKeyFacts(project).join(" · ")}</p>
        {project.progress !== undefined && <ProgressBar value={project.progress} className="mt-auto pt-4" />}
      </div>
    </Link>
  );
}
