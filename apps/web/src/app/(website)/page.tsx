import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BlueprintProcess } from "@/components/home/blueprint-process";
import { FullScreen } from "@/components/home/full-screen";
import { LandAssessmentForm } from "@/components/home/land-assessment-form";
import { PartnerFlow } from "@/components/home/partner-flow";
import { ProjectMap } from "@/components/home/project-map";
import { ProjectCarousel } from "@/components/home/project-carousel";
import { ScreenDots } from "@/components/home/screen-dots";
import { ServiceFlipGrid } from "@/components/home/service-flip-grid";
import { Credentials, Testimonials, TrustedBy } from "@/components/home/trust-sections";
import { Marquee } from "@/components/motion/marquee";
import { SplitWords } from "@/components/motion/split-words";
import { FactList } from "@/components/ui/fact-list";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, ChatIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/website/icons";
import { JsonLd } from "@/components/website/json-ld";
import { AREAS, COMPANY_FACTS, COMPANY_STATS, HOME_FAQS } from "@/content/company";
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

function ScreenTitle({ id, children, tone = "light" }: { id: string; children: string; tone?: "light" | "dark" }) {
  return (
    <h2
      id={id}
      className={`px-4 text-center font-display text-2xl font-bold tracking-[0.04em] uppercase sm:text-4xl lg:text-[2.6rem] ${
        tone === "dark" ? "text-white" : "text-navy"
      }`}
    >
      <SplitWords text={children} />
    </h2>
  );
}

export default async function HomePage() {
  const projects = await getProjects();
  const ongoing = projects.filter((project) => project.status === "ongoing");
  const completed = projects.filter((project) => project.status === "completed");
  const upcoming = projects.filter((project) => project.status === "upcoming");

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <h1 className="sr-only">
        {SITE.name}: architects, engineers and construction managers in Dhaka. Construction funding, joint land
        development, interior and engineering design, project management and managed investment.
      </h1>
      <ScreenDots variant="rail" />

      {/* The client's sketch: five full screens, in this order. */}
      <FullScreen
        id="ongoing"
        label="Ongoing projects"
        tone="dark"
        next={{ id: "offer", label: "What we offer" }}
        className="bg-navy-deep"
      >
        <h2 id="ongoing-title" className="sr-only">
          Ongoing projects
        </h2>
        <ProjectCarousel projects={ongoing} label="Ongoing projects" tone="dark" tall className="" />
      </FullScreen>

      <FullScreen
        id="offer"
        label="What we offer"
        next={{ id: "completed", label: "Completed projects" }}
        className="bg-sand"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <ScreenTitle id="offer-title">What we offer</ScreenTitle>
          <ServiceFlipGrid />
        </div>
      </FullScreen>

      <FullScreen
        id="completed"
        label="Completed projects"
        tone="dark"
        next={{ id: "upcoming", label: "Upcoming projects" }}
        className="bg-navy-deep"
      >
        <ScreenTitle id="completed-title" tone="dark">
          Completed projects
        </ScreenTitle>
        <ProjectCarousel projects={completed} label="Completed projects" tone="dark" />
      </FullScreen>

      <FullScreen
        id="upcoming"
        label="Upcoming projects"
        next={{ id: "contact", label: "Contact us" }}
        className="bg-ground"
      >
        <ScreenTitle id="upcoming-title">Upcoming projects</ScreenTitle>
        <ProjectCarousel projects={upcoming} label="Upcoming projects" />
      </FullScreen>

      <FullScreen id="contact" label="Contact us" tone="dark" className="isolate bg-navy-deep text-white">
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          <Image
            src="/images/projects/anlima-purbachal/entrance-night-01.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-navy-deep via-navy-deep/85 to-navy-deep" />

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <ScreenTitle id="contact-title" tone="dark">
            Contact us
          </ScreenTitle>
          <p data-reveal="" className="mx-auto mt-3 max-w-xl text-center text-base text-white/75 sm:text-lg">
            Tell us about your land, your home or your plan, and ArcDev will call you back.
          </p>

          <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
            <div className="order-2 flex flex-col gap-3 lg:order-1">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <ContactCard
                  href={`tel:${SITE.phone}`}
                  icon={<PhoneIcon />}
                  label="Call us"
                  value={SITE.phoneDisplay}
                  shortValue="Call now"
                />
                <ContactCard href={whatsappUrl} external icon={<ChatIcon />} label="WhatsApp" value="Message us" />
                <ContactCard
                  href={`mailto:${SITE.email}`}
                  icon={<MailIcon />}
                  label="Email"
                  value={SITE.email}
                  className="col-span-2 sm:col-span-1"
                />
              </ul>
              <ul className="grid gap-3 sm:grid-cols-2">
                <OfficeCard label="Dhaka office" address={SITE.address} />
                <OfficeCard label="Sylhet office" address={SITE.addressSylhet} />
              </ul>
              <Link
                href="/enquiry"
                className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-gold-bright hover:text-white"
              >
                Buying, investing or need a design? Send a detailed enquiry
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>

            <div
              data-reveal="right"
              className="relative order-1 overflow-hidden rounded-2xl border border-gold-bright/30 lg:order-2 bg-linear-to-br from-navy to-navy-deep shadow-2xl shadow-black/40"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-gold-deep via-gold-bright to-gold-deep"
              />
              <span aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-gold-bright/10 blur-3xl" />
              <div className="relative h-full">
                <LandAssessmentForm />
              </div>
            </div>
          </div>
        </div>
      </FullScreen>

      {/* More about ArcDev, below the client's five screens. */}
      <TrustedBy />
      <Credentials />

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

      <ProjectMap projects={projects} />

      <Testimonials />

      <BlueprintProcess />

      {/* Neighbourhood names as a decorative band; the map above carries the same information. */}
      <div aria-hidden="true" className="overflow-hidden bg-gold-bright py-5 text-navy-deep sm:py-6">
        <Marquee
          items={AREAS}
          duration={50}
          itemClassName="font-display text-lg font-semibold tracking-[0.04em] uppercase sm:text-xl lg:text-2xl"
          dotClassName="bg-navy-deep/60"
        />
      </div>

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
    </>
  );
}

function OfficeCard({ label, address }: { label: string; address: string }) {
  return (
    <li data-reveal="" className="flex gap-3 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
      <PinIcon className="mt-0.5 size-5 shrink-0 text-gold-bright" />
      <p>
        <span className="block text-xs font-semibold tracking-[0.16em] text-gold-bright uppercase">{label}</span>
        <span className="mt-1 block text-sm leading-snug text-white/85">{address}</span>
      </p>
    </li>
  );
}

function ContactCard({
  href,
  icon,
  label,
  value,
  external = false,
  className = "",
  shortValue,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
  className?: string;
  /** Shown instead of the value on phones, where the full value would wrap. */
  shortValue?: string;
}) {
  return (
    <li data-reveal="" className={className}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex h-full items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3 backdrop-blur-sm transition-colors duration-300 hover:border-gold-bright/60 hover:bg-white/10 sm:gap-4 sm:p-4"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-bright text-navy-deep transition-transform duration-300 group-hover:scale-110 sm:size-11">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-[11px] font-semibold tracking-[0.16em] text-gold-bright uppercase sm:text-xs">
            {label}
          </span>
          <span className="mt-0.5 block text-sm font-semibold break-all text-white tabular-nums sm:text-base">
            {shortValue ? (
              <>
                <span className="sm:hidden">{shortValue}</span>
                <span className="max-sm:hidden">{value}</span>
              </>
            ) : (
              value
            )}
          </span>
        </span>
      </a>
    </li>
  );
}
