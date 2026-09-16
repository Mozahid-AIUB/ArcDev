import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./json-ld";

interface PageHeaderProps {
  /** From Home to this page. The last crumb is the current page. */
  crumbs: readonly Crumb[];
  eyebrow?: ReactNode;
  title: string;
  intro?: string;
}

/** The navy band at the top of every inner page, with a breadcrumb. */
export function PageHeader({ crumbs, eyebrow, title, intro }: PageHeaderProps) {
  const trail = crumbs.slice(0, -1);

  return (
    <section className="bg-navy text-white">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-white/65">
            {trail.map((crumb) => (
              <li key={crumb.href} className="flex items-center gap-2">
                <Link href={crumb.href} className="hover:text-white">
                  {crumb.name}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="text-white/90">
              {crumbs.at(-1)?.name}
            </li>
          </ol>
        </nav>

        {eyebrow && <div className="mt-6">{eyebrow}</div>}
        <h1 className={`${eyebrow ? "mt-3" : "mt-6"} max-w-3xl text-3xl font-bold leading-tight sm:text-4xl`}>
          {title}
        </h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-white/80">{intro}</p>}
      </div>
    </section>
  );
}
