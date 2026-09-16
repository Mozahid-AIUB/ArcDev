import type { Metadata } from "next";
import type { ProjectStatus } from "@arcdev/shared";
import { PageHeader } from "@/components/website/page-header";
import { ProjectCard } from "@/components/website/project-card";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing, upcoming and completed projects by ArcDev Ltd.",
  alternates: { canonical: "/projects" },
};

const GROUPS: { status: ProjectStatus; heading: string }[] = [
  { status: "ongoing", heading: "Ongoing" },
  { status: "upcoming", heading: "Upcoming" },
  { status: "completed", heading: "Completed" },
];

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
        title="Our projects"
        intro="Buildings under construction, about to start, and already handed over."
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-10 sm:px-6 sm:py-14">
        {GROUPS.map(({ status, heading }) => {
          const group = projects.filter((project) => project.status === status);
          if (group.length === 0) return null;

          return (
            <section key={status} aria-labelledby={`${status}-heading`}>
              <h2 id={`${status}-heading`} className="text-2xl font-bold text-navy">
                {heading} <span className="font-normal tabular-nums text-ink-soft">({group.length})</span>
              </h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((project) => (
                  <li key={project.slug}>
                    <ProjectCard project={project} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {projects.length === 0 && <p className="text-lg text-ink-soft">Projects will be listed here soon.</p>}
      </div>
    </>
  );
}
