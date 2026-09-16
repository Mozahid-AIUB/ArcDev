import Link from "next/link";
import type { Service } from "@arcdev/shared";
import { ServiceIcon } from "./icons";

export function ServiceTile({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex h-full flex-col gap-3 rounded-lg border border-line bg-panel p-4 transition hover:border-gold hover:shadow-md sm:p-5"
    >
      <span className="grid size-11 place-items-center rounded-md bg-navy text-gold-bright">
        <ServiceIcon slug={service.slug} />
      </span>
      <span className="text-sm font-semibold uppercase tracking-wider text-navy">{service.name}</span>
      <span className="text-[15px] leading-snug text-ink-soft">{service.title}</span>
    </Link>
  );
}
