import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectStatus } from "@arcdev/shared";
import { BuildingIcon } from "./icons";

const STATUS_LABEL: Record<ProjectStatus, string> = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  completed: "Completed",
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

/** The project's first photo, or a plain navy block until photos arrive. */
export function ProjectCover({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  const cover = project.images[0];

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-navy">
      {cover ? (
        <Image src={cover} alt={project.name} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-gold-bright/40">
          <BuildingIcon className="size-16" />
        </div>
      )}
    </div>
  );
}

export function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  const percent = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className={className}>
      <div className="flex justify-between text-sm text-ink-soft">
        <span>Construction</span>
        <span className="font-medium tabular-nums text-ink">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label="Construction progress"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-line"
      >
        <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel transition hover:shadow-md"
    >
      <div className="relative">
        <ProjectCover project={project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        <span className="absolute left-3 top-3">
          <ProjectStatusBadge status={project.status} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-lg font-semibold text-navy group-hover:underline">{project.name}</h3>
        <p className="text-[15px] text-ink-soft">{project.location}</p>
        {project.progress !== undefined && <ProgressBar value={project.progress} className="mt-auto pt-3" />}
      </div>
    </Link>
  );
}
