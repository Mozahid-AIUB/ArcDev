import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SERVICES } from "@arcdev/shared";
import { ChatIcon, MailIcon, PhoneIcon, PinIcon, ServiceIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, message or visit ${SITE.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        title="Talk to ArcDev"
        intro="Call or message us, or send a request for the service you need."
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-10 sm:px-6 sm:py-14">
        <ul className="grid gap-3 sm:grid-cols-2">
          <ContactItem icon={<PhoneIcon className="size-6" />} label="Call" href={`tel:${SITE.phone}`}>
            <span className="tabular-nums">{SITE.phoneDisplay}</span>
          </ContactItem>
          <ContactItem icon={<ChatIcon className="size-6" />} label="WhatsApp" href={whatsappUrl} external>
            <span className="tabular-nums">{SITE.phoneDisplay}</span>
          </ContactItem>
          <ContactItem icon={<MailIcon className="size-6" />} label="Email" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </ContactItem>
          <ContactItem icon={<PinIcon className="size-6" />} label="Office">
            {SITE.address}
          </ContactItem>
        </ul>

        <section aria-labelledby="request-heading">
          <h2 id="request-heading" className="text-2xl font-bold text-navy">
            Send a request
          </h2>
          <p className="mt-1 text-ink-soft">Choose a service and we&apos;ll call you back.</p>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex h-full min-h-14 items-center gap-3 rounded-lg border border-line bg-panel px-4 py-3 hover:border-navy"
                >
                  <ServiceIcon slug={service.slug} className="size-6 shrink-0 text-gold-deep" />
                  <span className="font-medium text-navy">{service.cta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function ContactItem({
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
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-navy text-gold-bright">{icon}</span>
      <span className="flex min-w-0 flex-col">
        <span className="text-sm text-ink-soft">{label}</span>
        <span className="break-words text-lg font-medium text-ink">{children}</span>
      </span>
    </>
  );
  const className = "flex h-full items-center gap-4 rounded-lg border border-line bg-panel p-4";

  return (
    <li>
      {href ? (
        <a
          href={href}
          className={`${className} hover:border-navy`}
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
