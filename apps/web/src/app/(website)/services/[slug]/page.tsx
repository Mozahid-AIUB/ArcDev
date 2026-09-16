import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@arcdev/shared";
import { ServiceIcon } from "@/components/website/icons";
import { PageHeader } from "@/components/website/page-header";
import { RequestForm } from "@/components/website/request-form";
import { SERVICE_CONTENT } from "@/content/services";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return {
    title: service.title,
    description: `${service.summary} Send a request and ArcDev will call you.`,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const content = SERVICE_CONTENT[service.slug];
  const others = SERVICES.filter((other) => other.slug !== service.slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", href: "/" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
        eyebrow={
          <span className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-md bg-white/10 text-gold-bright">
              <ServiceIcon slug={service.slug} />
            </span>
            <span className="text-sm font-semibold uppercase tracking-wider text-gold-bright">{service.name}</span>
          </span>
        }
        title={service.title}
        intro={service.summary}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:py-14">
        {/* On phones the form comes first: that's what the visitor came to do. */}
        <aside className="lg:order-2">
          <div className="rounded-lg border border-line bg-panel p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-semibold text-navy">{service.cta}</h2>
            <p className="mt-1 text-[15px] text-ink-soft">Leave your number and we&apos;ll call you back.</p>
            <div className="mt-5">
              <RequestForm service={service} />
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-12 lg:order-1">
          {content ? (
            <div className="flex max-w-prose flex-col gap-4 text-lg leading-relaxed text-ink">
              {content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-line p-5">
              <p className="font-medium text-ink">Service details coming soon</p>
              <p className="mt-1 text-[15px] text-ink-soft">
                How this service works with ArcDev, its terms and past work will be described here.
              </p>
            </div>
          )}

          <section aria-labelledby="other-services">
            <h2 id="other-services" className="text-xl font-semibold text-navy">
              Other services
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-panel px-4 text-[15px] font-medium text-navy hover:border-navy"
                  >
                    <ServiceIcon slug={other.slug} className="size-5 text-gold-deep" />
                    {other.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
