import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SERVICES } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { FaqList } from "@/components/ui/faq-list";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChatIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  ServiceIcon,
} from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { HOME_FAQS } from "@/content/company";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or email ${SITE.name}, or send a request for the service you need.`,
  alternates: { canonical: "/contact" },
};

// SAMPLE office hours: confirm with ArcDev before launch.
const OFFICE_HOURS = "Saturday to Thursday, 10:00–18:00";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        title="Talk to ArcDev"
        intro="Call or message us, or send a request for the service you need and we'll get back to you."
        image="/images/projects/hai-residence-noakhali/exterior-facade-01.webp"
      />

      {/* Channels */}
      <section aria-labelledby="channels-heading" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading id="channels-heading" eyebrow="Get in touch" title="Reach us directly" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ChannelCard icon={<PhoneIcon className="size-6" />} label="Call" href={`tel:${SITE.phone}`}>
              <span className="tabular-nums">{SITE.phoneDisplay}</span>
            </ChannelCard>
            <ChannelCard icon={<ChatIcon className="size-6" />} label="WhatsApp" href={whatsappUrl} external>
              <span className="tabular-nums">{SITE.phoneDisplay}</span>
            </ChannelCard>
            <ChannelCard icon={<MailIcon className="size-6" />} label="Email" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </ChannelCard>
            <ChannelCard icon={<PinIcon className="size-6" />} label="Dhaka office">
              {SITE.address}
            </ChannelCard>
          </ul>
        </div>
      </section>

      {/* Request + office */}
      <section className="bg-panel py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <section aria-labelledby="request-heading">
            <SectionHeading
              id="request-heading"
              eyebrow="Send a request"
              title="Tell us what you need"
              intro="Choose a service and we'll call you back."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <li key={service.slug} data-reveal="">
                  <Link
                    href={`/services/${service.slug}#request`}
                    className="group flex h-full min-h-16 items-center gap-3 border border-line bg-ground px-4 py-3 transition-colors hover:border-navy"
                  >
                    <ServiceIcon slug={service.slug} className="size-6 shrink-0 text-gold-deep" />
                    <span className="flex-1 font-semibold text-navy">{service.cta}</span>
                    <ArrowRightIcon className="size-4 shrink-0 text-gold-deep transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <div data-reveal="" className="mt-8">
              <Link href="/enquiry" className={buttonStyles.primary}>
                Use the enquiry form
                <ArrowRightIcon />
              </Link>
            </div>
          </section>

          <aside
            aria-labelledby="office-heading"
            data-reveal="right"
            className="self-start border-t-4 border-gold bg-panel p-6 shadow-sm ring-1 ring-line sm:p-8"
          >
            <h2 id="office-heading" className="font-display text-2xl font-bold text-navy">
              Our offices
            </h2>
            <dl className="mt-5 divide-y divide-line">
              <div className="py-3">
                <dt className="text-sm text-ink-soft">Dhaka</dt>
                <dd className="mt-1 font-semibold text-ink">{SITE.address}</dd>
              </div>
              <div className="py-3">
                <dt className="text-sm text-ink-soft">Sylhet</dt>
                <dd className="mt-1 font-semibold text-ink">{SITE.addressSylhet}</dd>
              </div>
              <div className="py-3">
                <dt className="text-sm text-ink-soft">Office hours</dt>
                <dd className="mt-1 font-semibold text-ink">{OFFICE_HOURS}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="contact-faq-heading" className="bg-ground py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading id="contact-faq-heading" eyebrow="Before you call" title="Common questions" />
          <FaqList items={HOME_FAQS.slice(0, 3)} />
        </div>
      </section>
    </>
  );
}

function ChannelCard({
  icon,
  label,
  href,
  external = false,
  children,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-md bg-navy text-gold-bright">{icon}</span>
        {href && (
          <ArrowUpRightIcon className="size-5 text-gold-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </span>
      <span className="mt-6 block text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">{label}</span>
      <span className="mt-2 block text-xl font-bold wrap-break-word text-navy">{children}</span>
    </>
  );
  const className = "group flex h-full flex-col border-t-4 border-gold bg-panel p-6 shadow-sm transition";

  return (
    <li data-reveal="">
      {href ? (
        <a
          href={href}
          className={`${className} hover:-translate-y-1 hover:shadow-md`}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {body}
        </a>
      ) : (
        <div className={className}>{body}</div>
      )}
    </li>
  );
}
