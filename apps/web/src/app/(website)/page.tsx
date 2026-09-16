import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { ArrowRightIcon, ChatIcon, PhoneIcon } from "@/components/website/icons";
import { JsonLd } from "@/components/website/json-ld";
import { ProjectCard } from "@/components/website/project-card";
import { ServiceTile } from "@/components/website/service-tile";
import { getProjects } from "@/lib/data";
import { organizationJsonLd } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

export default async function HomePage() {
  const ongoing = await getProjects("ongoing");

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">Real estate developer</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
            From land to handover, one developer.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            ArcDev funds construction, develops land with its owners, designs and engineers the building, manages
            the work, and brings investors along.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="#services" className={buttonStyles.primary}>
              Find the right service
            </Link>
            <Link
              href="/projects"
              className="inline-flex h-12 items-center gap-2 font-medium text-white hover:text-gold-bright"
            >
              See our projects
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="text-3xl font-bold text-navy sm:text-4xl">What we do</h2>
        <p className="mt-2 max-w-xl text-lg text-ink-soft">
          Six services. Pick the one that fits and send a request, and we&apos;ll call you.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <ServiceTile service={service} />
            </li>
          ))}
        </ul>
      </section>

      {ongoing.length > 0 && (
        <section className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <h2 className="text-3xl font-bold text-navy sm:text-4xl">Ongoing projects</h2>
              <Link
                href="/projects"
                className="inline-flex h-11 items-center gap-2 font-semibold text-gold-deep hover:text-navy"
              >
                All projects
                <ArrowRightIcon />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ongoing.slice(0, 3).map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-navy-deep text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Not sure which service fits?</h2>
            <p className="mt-2 text-white/75">Call or message us about your land, your flat or your plan.</p>
          </div>
          <div className="flex flex-wrap gap-3">
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
      </section>
    </>
  );
}
