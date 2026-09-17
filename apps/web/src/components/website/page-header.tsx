import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SplitWords } from "@/components/motion/split-words";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./json-ld";

interface PageHeaderProps {
  /** From Home to this page. The last crumb is the current page. */
  crumbs: readonly Crumb[];
  eyebrow?: ReactNode;
  title: string;
  intro?: string;
  /** Background photo. Without one the band is plain navy. */
  image?: string;
  /** Extra content under the intro: badges, key facts, buttons. */
  children?: ReactNode;
}

/** The navy band at the top of every inner page: breadcrumb, animated title, optional photo. */
export function PageHeader({ crumbs, eyebrow, title, intro, image, children }: PageHeaderProps) {
  const trail = crumbs.slice(0, -1);

  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      {image && (
        <>
          <div data-parallax="8" className="absolute inset-x-0 top-[-10%] -z-20 h-[120%]">
            <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-linear-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40"
          />
        </>
      )}

      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${image ? "py-16 sm:py-24 lg:py-28" : "py-12 sm:py-16"}`}>
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

        {eyebrow && (
          <div data-reveal="" className="mt-8">
            {eyebrow}
          </div>
        )}
        <h1
          className={`${eyebrow ? "mt-4" : "mt-8"} max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl`}
        >
          <SplitWords text={title} />
        </h1>
        {intro && (
          <p data-reveal="" className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {intro}
          </p>
        )}
        {children && (
          <div data-reveal="" className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
