import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { MilestoneTimeline } from "@/components/about/milestone-timeline";
import { buttonStyles } from "@/components/ui/button";
import { FactList } from "@/components/ui/fact-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, ArrowUpRightIcon, ServiceIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { ABOUT, COMPANY_FACTS, COMPANY_STATS } from "@/content/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "ArcDev began as an engineering practice in Dhaka and grew into a developer that takes projects from an empty plot to finished flats, with one team from first visit to last key.",
  alternates: { canonical: "/about" },
};

function formatNumber(value: number, decimals = 0) {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** "Deanna Alam" -> "DA": first letters of each name, for the fallback avatar. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
        eyebrow={<p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">About ArcDev</p>}
        title="Building Dhaka, one plot at a time"
        intro="Architects, engineers and construction managers delivering commercial towers, homes, factories and interiors across Dhaka and Sylhet."
        image="/images/projects/imperial-commercial-center/exterior-01.webp"
      />

      {/* Story */}
      <section aria-labelledby="story-heading" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              id="story-heading"
              eyebrow="Our story"
              title="An engineering practice that became a developer"
            />
            <div className="mt-8 max-w-2xl space-y-5">
              {ABOUT.story.map((paragraph, index) => (
                <p
                  key={paragraph}
                  data-reveal=""
                  className={
                    index === 0
                      ? "text-xl leading-relaxed text-ink sm:text-2xl"
                      : "text-lg leading-relaxed text-ink-soft"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside
            data-reveal="right"
            aria-labelledby="glance-heading"
            className="self-start border-t-4 border-gold bg-panel p-6 shadow-sm sm:p-8"
          >
            <h3 id="glance-heading" className="font-display text-xl font-bold text-navy">
              ArcDev at a glance
            </h3>
            <FactList facts={COMPANY_FACTS} className="mt-4" />
          </aside>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="ArcDev in numbers" className="bg-navy-deep py-16 text-white sm:py-20">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-0">
          {COMPANY_STATS.map((stat, index) => (
            <li
              key={stat.label}
              data-reveal=""
              className={`last:col-span-2 lg:last:col-span-1 lg:px-6 ${index > 0 ? "lg:border-l lg:border-white/15" : ""}`}
            >
              <p className="font-display text-5xl font-bold leading-none text-white tabular-nums sm:text-6xl">
                {stat.prefix && <span className="text-gold-bright">{stat.prefix}</span>}
                <span data-count={stat.value} data-decimals={stat.decimals ?? 0}>
                  {formatNumber(stat.value, stat.decimals)}
                </span>
                {stat.suffix && <span className="text-gold-bright">{stat.suffix}</span>}
              </p>
              <p className="mt-3 text-base text-white/70">{stat.label}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-panel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading id="values-heading" eyebrow="What we stand by" title="How we work" />
          <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {ABOUT.values.map((value, index) => (
              <li key={value.title} data-reveal="" className="border-t border-line pt-6">
                <span className="font-display text-sm font-bold text-gold-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy">{value.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Milestones */}
      <section aria-labelledby="milestones-heading" className="overflow-hidden bg-ground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="milestones-heading"
            eyebrow="Milestones"
            title="From design practice to developer"
            align="center"
          />
          <div className="mx-auto mt-14 max-w-5xl">
            <MilestoneTimeline milestones={ABOUT.milestones} />
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-heading" className="bg-sand py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="leadership-heading"
            eyebrow="Leadership"
            title="The people accountable for your project"
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ABOUT.leadership.map((person) => (
              <li
                key={person.name}
                data-reveal=""
                className="flex flex-col gap-5 border-t-4 border-gold bg-panel p-6 shadow-sm sm:flex-row sm:items-start"
              >
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="size-20 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="grid size-20 shrink-0 place-items-center rounded-full bg-navy font-display text-2xl font-bold text-gold-bright"
                  >
                    {initials(person.name)}
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-navy">{person.name}</h3>
                  <p className="mt-1 font-semibold text-gold-deep">{person.role}</p>
                  {person.bio && <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{person.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="services-heading" className="bg-panel py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading id="services-heading" eyebrow="What we do" title="Six services, one team" />
            <Link href="/enquiry" className={`${buttonStyles.outline} self-start lg:self-auto`}>
              Send an enquiry
              <ArrowRightIcon />
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.slug} data-reveal="">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-start gap-4 border-t border-line py-6 transition-colors hover:border-gold"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-navy text-gold-bright">
                    <ServiceIcon slug={service.slug} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold text-navy group-hover:text-gold-deep">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-ink-soft">{service.title}</span>
                  </span>
                  <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="about-cta-heading" className="relative isolate overflow-hidden bg-navy text-white">
        <div data-parallax="8" className="absolute inset-x-0 top-[-10%] -z-20 h-[120%]">
          <Image src="/images/projects/hai-residence-noakhali/exterior-facade-01.webp" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-deep/80" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            id="about-cta-heading"
            tone="dark"
            eyebrow="Work with us"
            title="Have land, want a flat or looking to invest?"
            intro="Tell us what you have in mind and one team will take it from the first visit to the last key."
          />
          <div data-reveal="" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/enquiry" className={buttonStyles.primary}>
              Send an enquiry
              <ArrowRightIcon />
            </Link>
            <Link href="/projects" className={buttonStyles.outlineOnDark}>
              See our projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
