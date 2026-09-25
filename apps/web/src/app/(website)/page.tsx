import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { PartnerFlow } from "@/components/home/partner-flow";
import { ProjectCarousel } from "@/components/home/project-carousel";
import { ServiceFlipGrid } from "@/components/home/service-flip-grid";
import { Marquee } from "@/components/motion/marquee";
import { SplitWords } from "@/components/motion/split-words";
import { buttonStyles } from "@/components/ui/button";
import { FactList } from "@/components/ui/fact-list";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, ChatIcon, PhoneIcon } from "@/components/website/icons";
import { JsonLd } from "@/components/website/json-ld";
import { AREAS, COMPANY_FACTS, COMPANY_STATS, HOME_FAQS, PROCESS } from "@/content/company";
import { getProjects } from "@/lib/data";
import { organizationJsonLd } from "@/lib/seo";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "Arc Development Pvt. Ltd. is a Dhaka firm of architects, engineers and construction managers: construction funding and joint development for landowners, engineering and interior design, project management, and managed investment.",
  alternates: { canonical: "/" },
};

function formatStat(value: number, decimals = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export default async function HomePage() {
  const projects = await getProjects();
  const ongoing = projects.filter((project) => project.status === "ongoing");
  const completed = projects.filter((project) => project.status === "completed");
  const upcoming = projects.filter((project) => project.status === "upcoming");

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      {/* 1. Hero */}
      <HeroSlideshow>
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-bright">
            Architects, Engineers & Construction Managers · Dhaka
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            <SplitWords text="From land to handover, one developer." />
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            ArcDev funds construction, develops land with its owners, designs and engineers the building, manages the
            work, and brings investors along.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/enquiry" className={buttonStyles.primary}>
              Send an enquiry
              <ArrowRightIcon />
            </Link>
            <Link href="/projects" className={buttonStyles.outlineOnDark}>
              See our projects
            </Link>
          </div>
        </div>
      </HeroSlideshow>

      {/* 2. Partners */}
      <section aria-labelledby="partners-title" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div>
              <SectionHeading id="partners-title" eyebrow="How we work" title="One developer, three partners" />
              <p data-reveal="" className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Landowners bring the plot, investors bring capital, and families and businesses buy the finished
                flats. ArcDev sits in the middle: it designs the building, handles approvals and manages construction,
                so each of them deals with one team from the first visit to the last key.
              </p>
              <Link
                href="/about"
                data-reveal=""
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-gold-deep hover:text-navy"
              >
                About ArcDev
                <ArrowRightIcon />
              </Link>
            </div>
            <div data-reveal="right" className="self-start rounded-lg border border-line border-t-2 border-t-gold bg-panel p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">ArcDev at a glance</h3>
              <FactList facts={COMPANY_FACTS} className="mt-3" />
            </div>
          </div>

          <PartnerFlow />
        </div>
      </section>

      {/* 3. Services */}
      <section aria-labelledby="services-title" className="bg-sand py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="services-title"
            eyebrow="What we offer"
            title="Six services, one team"
            intro="Pick the one that fits your land, your flat or your plan. Each has its own page with the steps, what's included and a request form."
          />
          <ServiceFlipGrid />
        </div>
      </section>

      {/* 4. Stats */}
      <section aria-label="ArcDev in numbers" className="bg-navy-deep py-16 text-white sm:py-20">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-0">
          {COMPANY_STATS.map((stat, index) => (
            <li
              key={stat.label}
              data-reveal=""
              className={`lg:border-l lg:border-white/15 lg:px-8 lg:first:border-l-0 lg:first:pl-0 ${
                index === COMPANY_STATS.length - 1 ? "col-span-2 lg:col-span-1" : ""
              }`}
            >
              <p className="font-display text-5xl font-bold leading-none tabular-nums text-gold-bright sm:text-6xl xl:text-7xl">
                {stat.prefix && <span>{stat.prefix}</span>}
                <span data-count={stat.value} data-decimals={stat.decimals}>
                  {formatStat(stat.value, stat.decimals)}
                </span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </p>
              <p className="mt-3 text-[17px] text-white/75">{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Projects, one status per section, each swiped one project at a time */}
      <section aria-labelledby="ongoing-title" className="overflow-hidden bg-ground py-20 sm:py-28">
        <SectionHeading
          id="ongoing-title"
          align="center"
          eyebrow="Under construction"
          title="Ongoing projects"
          intro="Buildings ArcDev is designing and building right now."
          className="px-4"
        />
        <ProjectCarousel projects={ongoing} label="Ongoing projects" />
      </section>

      <section aria-labelledby="completed-title" className="overflow-hidden bg-navy-deep py-20 sm:py-28">
        <SectionHeading
          id="completed-title"
          align="center"
          tone="dark"
          eyebrow="Handed over"
          title="Completed projects"
          intro="Homes, offices, factories and interiors, finished and in use."
          className="px-4"
        />
        <ProjectCarousel projects={completed} label="Completed projects" tone="dark" />
      </section>

      <section aria-labelledby="upcoming-title" className="overflow-hidden bg-sand py-20 sm:py-28">
        <SectionHeading
          id="upcoming-title"
          align="center"
          eyebrow="Coming next"
          title="Upcoming projects"
          intro="Developments in planning, from a Sylhet condominium to a 46-acre township."
          className="px-4"
        />
        <ProjectCarousel projects={upcoming} label="Upcoming projects" />
        <div className="mt-10 flex justify-center px-4">
          <Link href="/projects" className={buttonStyles.outline}>
            See all projects
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* 6. Process */}
      <section aria-labelledby="process-title" className="bg-panel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="process-title"
            eyebrow="How a project runs"
            title="From land to handover"
            intro="Five stages, each with a clear end point, so you always know where your building stands."
          />
          <div className="relative mt-14">
            <span
              aria-hidden="true"
              data-line="y"
              className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 bg-gold lg:hidden"
            />
            <span
              aria-hidden="true"
              data-line="x"
              className="absolute left-6 right-[calc((100%_-_8rem)/5_-_1.5rem)] top-6 hidden h-0.5 bg-gold lg:block"
            />
            <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-8">
              {PROCESS.map((step, index) => (
                <li key={step.title} data-reveal="" className="relative flex gap-5 lg:block">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-bold text-white ring-8 ring-panel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="font-display text-xl font-bold text-navy">{step.title}</h3>
                    <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{step.text}</p>
                    <span className="mt-4 inline-flex h-8 items-center rounded-full bg-sand px-3 text-sm font-semibold tabular-nums text-navy">
                      {step.duration}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Areas */}
      <section aria-labelledby="areas-title" className="overflow-hidden bg-navy py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p id="areas-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">
            Where we build
          </p>
        </div>
        <Marquee
          items={AREAS}
          duration={45}
          className="mt-6"
          itemClassName="font-display text-4xl font-bold sm:text-6xl lg:text-7xl"
          dotClassName="bg-gold-bright"
        />
      </section>

      {/* 8. FAQ */}
      <section aria-labelledby="faq-title" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="faq-title"
              eyebrow="Questions"
              title="Before you get in touch"
              intro="The things landowners, buyers and investors ask us first."
            />
            <Link
              href="/contact"
              data-reveal=""
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-gold-deep hover:text-navy"
            >
              Ask us something else
              <ArrowRightIcon />
            </Link>
          </div>
          <FaqList items={HOME_FAQS} />
        </div>
      </section>

      {/* 9. Closing call to action */}
      <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-navy-deep text-white">
        <div data-parallax="8" className="absolute inset-x-0 top-[-10%] -z-20 h-[120%]">
          <Image src="/images/projects/anlima-purbachal/entrance-night-01.webp" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/80" />
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span data-reveal="fade" aria-hidden="true" className="mx-auto block h-0.5 w-10 bg-gold-bright" />
          <h2 id="cta-title" className="mt-6 text-3xl font-bold leading-[1.1] sm:text-5xl">
            <SplitWords text="Have land, a flat in mind or money to invest?" />
          </h2>
          <p data-reveal="" className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Tell us about your plot, your home or your plan, and ArcDev will call you back.
          </p>
          <div data-reveal="" className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/enquiry" className={buttonStyles.primary}>
              Send an enquiry
              <ArrowRightIcon />
            </Link>
            <a href={`tel:${SITE.phone}`} className={buttonStyles.outlineOnDark}>
              <PhoneIcon />
              Call {SITE.phoneDisplay}
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
