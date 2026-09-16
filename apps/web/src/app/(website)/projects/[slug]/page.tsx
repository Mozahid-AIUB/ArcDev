import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Project } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { ChatIcon, PhoneIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { ProgressBar, ProjectCover, ProjectStatusBadge } from "@/components/website/project-card";
import { getProject, getProjects } from "@/lib/data";
import { SITE, whatsappUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};

  const cover = project.images[0];
  return {
    title: `${project.name}, ${project.location}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: cover ? { images: [cover] } : undefined,
  };
}

function projectFacts(project: Project): { label: string; value: string }[] {
  const facts: { label: string; value: string }[] = [];
  if (project.landKatha !== undefined) facts.push({ label: "Land", value: `${project.landKatha} katha` });
  if (project.storeys !== undefined) facts.push({ label: "Storeys", value: String(project.storeys) });
  if (project.units !== undefined) facts.push({ label: "Units", value: String(project.units) });
  if (project.flatSizesSqft?.length) {
    const sizes = project.flatSizesSqft.map((size) => size.toLocaleString("en-US")).join(", ");
    facts.push({ label: "Flat sizes", value: `${sizes} sq ft` });
  }
  if (project.handover) {
    facts.push({ label: project.status === "completed" ? "Handed over" : "Handover", value: project.handover });
  }
  return facts;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const facts = projectFacts(project);
  const [, ...morePhotos] = project.images;

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
        eyebrow={<ProjectStatusBadge status={project.status} />}
        title={project.name}
        intro={project.location}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-14">
        <div className="flex flex-col gap-8">
          <div className="overflow-hidden rounded-lg">
            <ProjectCover project={project} sizes="(min-width: 1024px) 66vw, 100vw" priority />
          </div>

          {morePhotos.length > 0 && (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {morePhotos.map((photo, index) => (
                <li key={photo} className="relative aspect-[4/3] overflow-hidden rounded-md bg-navy">
                  <Image
                    src={photo}
                    alt={`${project.name}, photo ${index + 2}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          )}

          <p className="max-w-prose text-lg leading-relaxed text-ink">{project.description}</p>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          {(facts.length > 0 || project.progress !== undefined) && (
            <div className="rounded-lg border border-line bg-panel p-5">
              {facts.length > 0 && (
                <dl className="divide-y divide-line">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex justify-between gap-4 py-2.5">
                      <dt className="text-ink-soft">{fact.label}</dt>
                      <dd className="text-right font-medium tabular-nums text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project.progress !== undefined && <ProgressBar value={project.progress} className="mt-4" />}
            </div>
          )}

          <div className="rounded-lg bg-navy p-5 text-white">
            <h2 className="text-lg font-semibold">Interested in this project?</h2>
            <p className="mt-1 text-[15px] text-white/75">Ask about available flats, prices and payment plans.</p>
            <div className="mt-4 flex flex-col gap-2">
              <a href={`tel:${SITE.phone}`} className={buttonStyles.primary}>
                <PhoneIcon />
                Call us
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.outlineOnDark}>
                <ChatIcon />
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
