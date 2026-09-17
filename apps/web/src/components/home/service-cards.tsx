import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { ArrowRightIcon, CheckIcon } from "@/components/website/icons";
import { SERVICE_CONTENT } from "@/content/services";

/** The six services as photo cards, each linking to its own page. */
export function ServiceCards() {
  return (
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((service, index) => {
        const content = SERVICE_CONTENT[service.slug];
        return (
          <li key={service.slug} data-reveal="">
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-panel transition-shadow duration-300 hover:shadow-xl hover:shadow-navy/10"
            >
              <div className="relative aspect-3/2 overflow-hidden bg-navy">
                <Image
                  src={content.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy-deep/70 to-transparent" />
                <p className="absolute bottom-4 left-5 flex items-baseline gap-3 text-white">
                  <span className="font-display text-3xl font-bold text-gold-bright">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.14em]">{service.name}</span>
                </p>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold leading-snug text-navy">{service.title}</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-ink-soft">{content.lead}</p>
                <ul className="mt-5 space-y-2 border-t border-line pt-5">
                  {content.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] text-ink">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 font-semibold text-gold-deep transition-colors group-hover:text-navy">
                  Explore {service.name}
                  <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
