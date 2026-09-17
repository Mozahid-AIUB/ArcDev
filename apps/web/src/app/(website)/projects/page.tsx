import type { Metadata } from "next";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { ArrowRightIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Ongoing, upcoming and completed residential and commercial buildings by ArcDev Ltd in Dhaka, with land size, storeys, units, handover dates and construction progress.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Ongoing", value: projects.filter((project) => project.status === "ongoing").length },
    { label: "Completed", value: projects.filter((project) => project.status === "completed").length },
    { label: "Units", value: projects.reduce((sum, project) => sum + (project.units ?? 0), 0) },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
        title="Our projects"
        intro="Buildings under construction, about to start and already handed over across Dhaka, with the figures for each."
        image="/images/sample/city-night-towers.webp"
      >
        <dl className="grid max-w-3xl grid-cols-2 overflow-hidden rounded-lg border border-white/15 bg-navy-deep/60 backdrop-blur-sm sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-1 p-5 ${index % 2 === 1 ? "border-l border-white/10" : ""} ${
                index >= 2 ? "border-t border-white/10 sm:border-t-0" : ""
              } ${index === 2 ? "sm:border-l" : ""}`}
            >
              <dt className="text-sm text-white/65">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold tabular-nums text-white sm:text-4xl">
                <span data-count={stat.value}>{stat.value.toLocaleString("en-US")}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <section aria-label="Project list" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {projects.length > 0 ? (
            <ProjectsExplorer projects={projects} />
          ) : (
            <p className="text-lg text-ink-soft">Projects will be listed here soon.</p>
          )}
        </div>
      </section>

      <section aria-labelledby="projects-cta-heading" className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="flow-x absolute inset-x-0 top-0 h-0.5" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="max-w-2xl">
            <span data-reveal="fade" aria-hidden="true" className="block h-0.5 w-10 bg-gold" />
            <p data-reveal="" className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">
              Buy, share land or invest
            </p>
            <h2 id="projects-cta-heading" data-reveal="" className="mt-3 text-3xl font-bold leading-[1.1] sm:text-4xl">
              Interested in a flat, or in funding the next building?
            </h2>
            <p data-reveal="" className="mt-4 text-lg leading-relaxed text-white/75">
              Tell us what you are looking for and we will reply with availability, sizes and payment plans, or explain
              how investing in a project works.
            </p>
          </div>
          <div data-reveal="" className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/enquiry" className={buttonStyles.primary}>
              Make an enquiry
              <ArrowRightIcon />
            </Link>
            <Link href="/services/investment" className={buttonStyles.outlineOnDark}>
              How investment works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
