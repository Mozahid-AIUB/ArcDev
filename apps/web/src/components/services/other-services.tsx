import Link from "next/link";
import type { Service } from "@arcdev/shared";
import { ArrowUpRightIcon, ServiceIcon } from "@/components/website/icons";

/** Compact link cards to the other service pages. */
export function OtherServices({ services }: { services: readonly Service[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {services.map((service) => (
        <li key={service.slug} data-reveal="">
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-gold-bright/60 hover:bg-white/10"
          >
            <span className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-md bg-white/10 text-gold-bright">
                <ServiceIcon slug={service.slug} />
              </span>
              <ArrowUpRightIcon className="size-5 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-bright" />
            </span>
            <span className="mt-5 font-display text-lg font-bold text-white">{service.name}</span>
            <span className="mt-1 text-[15px] leading-snug text-white/70">{service.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
