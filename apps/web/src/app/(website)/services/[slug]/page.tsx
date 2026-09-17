import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@arcdev/shared";
import { OtherServices } from "@/components/services/other-services";
import { relatedProjects, SERVICE_SECOND_PHOTO } from "@/components/services/service-extras";
import { ServiceSteps } from "@/components/services/service-steps";
import { buttonStyles } from "@/components/ui/button";
import { FactList } from "@/components/ui/fact-list";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckIcon, PhoneIcon, ServiceIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { ProjectCard } from "@/components/website/project-card";
import { RequestForm } from "@/components/website/request-form";
import { SERVICE_CONTENT } from "@/content/services";
import { getProjects } from "@/lib/data";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${SERVICE_CONTENT[service.slug].lead} ${service.summary} Send a request and ArcDev will call you.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

const container = "mx-auto max-w-7xl px-4 sm:px-6";

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[service.slug];
  const photo = SERVICE_SECOND_PHOTO[service.slug];
  const others = SERVICES.filter((other) => other.slug !== service.slug);
  const projects = relatedProjects(service.slug, await getProjects());
  const [firstParagraph, ...moreParagraphs] = content.overview;

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4">
            <span className="grid size-9 place-items-center rounded-full bg-gold-bright text-navy">
              <ServiceIcon slug={service.slug} className="size-5" />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">{service.name}</span>
          </span>
        }
        title={service.title}
        intro={content.lead}
        image={content.image}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#request" className={buttonStyles.primary}>
            {service.cta}
          </a>
          <a href={`tel:${SITE.phone}`} className={buttonStyles.outlineOnDark}>
            <PhoneIcon />
            Call us
          </a>
        </div>
      </PageHeader>

      {/* Overview and the fact sheet */}
      <section aria-labelledby="overview-title" className="bg-ground py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20`}>
          <div>
            <SectionHeading id="overview-title" eyebrow="Overview" title={`How ${service.name} works`} />
            <div className="mt-8 flex max-w-3xl flex-col gap-5">
              {firstParagraph && (
                <p data-reveal="" className="text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">
                  {firstParagraph}
                </p>
              )}
              {moreParagraphs.map((paragraph) => (
                <p key={paragraph} data-reveal="" className="text-lg leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside
            data-reveal=""
            aria-labelledby="facts-title"
            className="self-start rounded-lg border border-line border-t-4 border-t-gold bg-panel p-6 shadow-sm sm:p-8"
          >
            <h2 id="facts-title" className="font-display text-xl font-bold text-navy">
              {service.name} at a glance
            </h2>
            <FactList facts={content.facts} className="mt-4" />
          </aside>
        </div>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="for-who-title" className="bg-panel py-20 sm:py-28">
        <div className={container}>
          <SectionHeading id="for-who-title" eyebrow="Who it's for" title="Is this service for you?" />
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {content.forWho.map((item) => (
              <li key={item} data-reveal="" className="flex gap-4 border-t border-line pt-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand text-gold-deep">
                  <CheckIcon />
                </span>
                <p className="pt-1.5 text-lg font-medium leading-snug text-ink">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="steps-title" className="bg-ground py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="steps-title"
            eyebrow="How it works"
            title="What happens, step by step"
            align="center"
          />
          <div className="mt-14 sm:mt-16">
            <ServiceSteps steps={content.steps} />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="includes-title" className="bg-sand py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
          <div>
            <SectionHeading id="includes-title" eyebrow="What's included" title="What you get" />
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {content.includes.map((item) => (
                <li key={item} data-reveal="" className="flex items-center gap-4 py-4">
                  <CheckIcon className="size-5 shrink-0 text-gold-deep" />
                  <span className="text-lg text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="scale" className="group relative aspect-4/5 overflow-hidden rounded-lg bg-navy sm:aspect-4/3 lg:aspect-4/5">
            <div data-parallax="8" className="absolute inset-x-0 top-[-10%] h-[120%]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1280px) 596px, (min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {projects.length > 0 && (
        <section aria-labelledby="projects-title" className="bg-ground py-20 sm:py-28">
          <div className={container}>
            <SectionHeading
              id="projects-title"
              eyebrow="Our projects"
              title="See the kind of work we do"
              intro="Buildings ArcDev is working on or has delivered."
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.slug} data-reveal="">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ and request form */}
      <section aria-labelledby="faq-title" className="bg-panel py-20 sm:py-28">
        <div className={`${container} grid gap-14 lg:grid-cols-[minmax(0,1fr)_28rem] lg:gap-16`}>
          <div>
            <SectionHeading id="faq-title" eyebrow="Questions" title="What people ask us" />
            <FaqList items={content.faqs} className="mt-10" />
          </div>

          <div>
            <div
              id="request"
              className="scroll-mt-28 rounded-lg border border-line border-t-4 border-t-gold bg-panel p-6 shadow-xl shadow-navy/5 sm:p-8 lg:sticky lg:top-28"
            >
              <h2 className="font-display text-2xl font-bold text-navy">{service.cta}</h2>
              <p className="mt-2 text-[17px] text-ink-soft">
                Leave your number and a few details. Someone from ArcDev will call you back.
              </p>
              <div className="mt-6">
                <RequestForm service={service} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="other-services-title" className="bg-navy-deep py-20 text-white sm:py-28">
        <div className={container}>
          <SectionHeading id="other-services-title" eyebrow="More from ArcDev" title="Other services" tone="dark" />
          <div className="mt-12">
            <OtherServices services={others} />
          </div>
        </div>
      </section>
    </>
  );
}
