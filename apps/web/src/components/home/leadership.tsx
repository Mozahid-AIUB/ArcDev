import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon } from "@/components/website/icons";
import { ABOUT } from "@/content/company";

/** The two architects who lead ArcDev, then the technical team behind them. */
export function Leadership() {
  return (
    <section aria-labelledby="leadership-title" className="overflow-hidden bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionHeading
            id="leadership-title"
            eyebrow="Led by architects"
            title="The people behind every drawing"
            intro="Registered architects and planners, trained in Dhaka, Oxford, Harvard and MIT, who stay with your project from the first sketch to the keys."
          />
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-gold-deep hover:text-navy"
          >
            About ArcDev
            <ArrowRightIcon />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {ABOUT.leadership.map((person, index) => (
            <li
              key={person.name}
              data-reveal={index === 0 ? "left" : "right"}
              className="group relative grid overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/10 sm:grid-cols-[minmax(0,15rem)_1fr]"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-sand sm:aspect-auto sm:min-h-80">
                <Image
                  src={person.photo}
                  alt={person.name}
                  fill
                  sizes="(min-width: 640px) 240px, 100vw"
                  className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-linear-to-r from-gold-deep to-gold-bright transition-transform duration-700 group-hover:scale-x-100"
                />
              </div>
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-gold-deep uppercase">{person.role}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">{person.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{person.bio}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {person.credentials.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-xs font-semibold text-gold-deep"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-14 text-sm font-semibold tracking-[0.14em] text-ink-soft uppercase">Technical team</h3>
        <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {ABOUT.team.map((member) => (
            <li key={member.name} data-reveal="" className="group">
              <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-sand">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <p className="mt-3 font-semibold leading-snug text-navy">{member.name}</p>
              <p className="text-sm text-ink-soft">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
