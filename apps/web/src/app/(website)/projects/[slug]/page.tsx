import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Project } from "@arcdev/shared";
import { LightboxGallery } from "@/components/gallery/lightbox";
import { buttonStyles } from "@/components/ui/button";
import { FactList } from "@/components/ui/fact-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, ChatIcon, CheckIcon, PhoneIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { ProgressBar, ProjectCard, ProjectStatusBadge } from "@/components/website/project-card";
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

const sqft = (value: number) => value.toLocaleString("en-US");

const KIND_LABEL: Record<Project["kind"], string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  "hotel-resort": "Hotel & Resort",
  interior: "Interior",
};

function kindLabel(project: Project) {
  return KIND_LABEL[project.kind];
}

function projectFacts(project: Project): { label: string; value: string }[] {
  const commercial = project.kind === "commercial" || project.kind === "industrial";
  const facts: { label: string; value: string }[] = [];
  if (project.landKatha !== undefined) facts.push({ label: "Land", value: `${project.landKatha} katha` });
  if (project.storeys !== undefined) facts.push({ label: "Storeys", value: String(project.storeys) });
  if (project.units !== undefined) {
    facts.push({ label: commercial ? "Floors" : "Units", value: String(project.units) });
  }
  if (project.flatSizesSqft?.length) {
    facts.push({
      label: commercial ? "Floor sizes" : "Flat sizes",
      value: `${project.flatSizesSqft.map(sqft).join(", ")} sq ft`,
    });
  }
  if (project.handover) {
    facts.push({ label: project.status === "completed" ? "Handed over" : "Handover", value: project.handover });
  }
  facts.push({ label: "Type", value: kindLabel(project) });
  return facts;
}

type KeyNumber = { label: string; value: string; count?: number; decimals?: number; small?: boolean };

function keyNumbers(project: Project): KeyNumber[] {
  const numbers: KeyNumber[] = [];
  if (project.storeys !== undefined) {
    numbers.push({ label: "Storeys", value: String(project.storeys), count: project.storeys });
  }
  if (project.units !== undefined) {
    numbers.push({
      label: project.kind === "commercial" || project.kind === "industrial" ? "Floors" : "Units",
      value: String(project.units),
      count: project.units,
    });
  }
  if (project.landKatha !== undefined) {
    const decimals = Number.isInteger(project.landKatha) ? 0 : 1;
    numbers.push({
      label: "Katha of land",
      value: project.landKatha.toFixed(decimals),
      count: project.landKatha,
      decimals,
    });
  }
  if (project.handover) {
    numbers.push({
      label: project.status === "completed" ? "Handed over" : "Handover",
      value: project.handover,
      small: true,
    });
  }
  return numbers;
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = await getProject((await params).slug);
  if (!project) notFound();

  const facts = projectFacts(project);
  const numbers = keyNumbers(project);
  const others = (await getProjects()).filter((other) => other.slug !== project.slug).slice(0, 3);
  const photos = project.images.map((src, index) => ({
    src,
    alt: `${project.name}, ${project.location}: photo ${index + 1} of ${project.images.length}`,
  }));

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.name, href: `/projects/${project.slug}` },
        ]}
        eyebrow={
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">
              {kindLabel(project)}
            </span>
          </div>
        }
        title={project.name}
        intro={project.location}
        image={project.images[0]}
      >
        {numbers.length > 0 && (
          <dl className="inline-grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm sm:flex sm:flex-wrap">
            {numbers.map((item) => (
              <div
                key={item.label}
                className="flex flex-col-reverse justify-end gap-1 bg-navy-deep/70 p-5 last:odd:col-span-2 sm:min-w-36"
              >
                <dt className="text-sm text-white/65">{item.label}</dt>
                <dd
                  className={`font-display font-bold tabular-nums text-white ${
                    item.small ? "text-lg leading-tight sm:text-xl" : "text-3xl sm:text-4xl"
                  }`}
                >
                  {item.count !== undefined ? (
                    <span data-count={item.count} data-decimals={item.decimals || undefined}>
                      {item.value}
                    </span>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </PageHeader>

      <section aria-labelledby="overview-heading" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading id="overview-heading" eyebrow="Overview" title="About the project" />
            <p data-reveal="" className="mt-8 font-display text-xl leading-snug text-navy sm:text-2xl">
              {project.summary}
            </p>
            <p data-reveal="" className="mt-6 max-w-prose text-lg leading-relaxed text-ink">
              {project.description}
            </p>

            {photos.length > 0 && (
              <div className="mt-14 border-t border-line pt-8">
                <h3 data-reveal="" className="font-display text-xl font-bold text-navy">
                  Photos <span className="font-normal tabular-nums text-ink-soft">({photos.length})</span>
                </h3>
                <div data-reveal="" className="mt-6">
                  <LightboxGallery photos={photos} sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, 50vw" />
                </div>
              </div>
            )}
          </div>

          <aside aria-labelledby="facts-heading" className="lg:sticky lg:top-24 lg:self-start">
            <div data-reveal="right" className="rounded-lg border-t-4 border-gold bg-panel p-6 shadow-sm shadow-navy/5">
              <h2 id="facts-heading" className="font-display text-xl font-bold text-navy">
                Project facts
              </h2>
              <FactList facts={facts} className="mt-3" />
              {project.progress !== undefined && <ProgressBar value={project.progress} className="mt-5" />}
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/enquiry" className={buttonStyles.primary}>
                  Ask about this project
                  <ArrowRightIcon />
                </Link>
                <a href={`tel:${SITE.phone}`} className={buttonStyles.outline}>
                  <PhoneIcon />
                  Call {SITE.phoneDisplay}
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonStyles.outline} hover:border-whatsapp`}
                >
                  <ChatIcon className="size-5 text-whatsapp" />
                  WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {project.amenities && project.amenities.length > 0 && (
        <section aria-labelledby="amenities-heading" className="bg-sand py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading id="amenities-heading" eyebrow="Amenities" title="What the building includes" />
            <ul className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.amenities.map((amenity) => (
                <li key={amenity} data-reveal="" className="flex items-start gap-3 border-t border-line pt-6">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-navy text-gold-bright">
                    <CheckIcon className="size-5" />
                  </span>
                  <span className="pt-1.5 text-lg font-medium text-ink">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {project.updates && project.updates.length > 0 && (
        <section aria-labelledby="updates-heading" className="bg-panel py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <SectionHeading
              id="updates-heading"
              eyebrow="Construction updates"
              title="Progress on site"
              intro="Milestones reached so far, newest first."
            />
            <ol className="relative">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-line" />
              <span data-line="y" aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-gold" />
              {project.updates.map((update, index) => (
                <li key={`${update.date}-${update.title}`} data-reveal="" className="relative pb-10 pl-10 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 size-4 rounded-full border-2 border-gold ${
                      index === 0 ? "bg-gold" : "bg-panel"
                    }`}
                  />
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">{update.date}</p>
                  <p className="mt-1 font-display text-xl font-bold text-navy sm:text-2xl">{update.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="others-heading" className="bg-ground py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading id="others-heading" eyebrow="More from ArcDev" title="Other projects" />
              <Link href="/projects" className={`${buttonStyles.outline} self-start sm:self-auto`}>
                All projects
                <ArrowRightIcon />
              </Link>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug} data-reveal="">
                  <ProjectCard project={other} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
