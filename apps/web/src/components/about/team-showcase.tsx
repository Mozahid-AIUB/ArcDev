import Image from "next/image";
import { SectionHeading } from "@/components/ui/section-heading";
import { ABOUT } from "@/content/company";
import { TeamMotion } from "./team-motion";
import { TiltCard } from "./tilt-card";

/** Leadership and the technical team, as animated portrait cards. */
export function TeamShowcase() {
  return (
    <section aria-labelledby="leadership-heading" className="relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <TeamMotion className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="leadership-heading"
          tone="dark"
          eyebrow="Led by architects"
          title="The people behind every drawing"
          intro="Registered architects and planners, trained in Dhaka, Oxford, Harvard and MIT, who stay with your project from the first sketch to the keys."
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {ABOUT.leadership.map((person, index) => (
            <li key={person.name} data-team-card="" className="[perspective:1400px]">
              <TiltCard className="team-card group relative grid h-full overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 sm:grid-cols-[minmax(0,16rem)_1fr]">
                <div className="relative aspect-4/5 overflow-hidden bg-navy sm:aspect-auto sm:min-h-96">
                  <div data-team-photo="" className="absolute inset-0">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      sizes="(min-width: 640px) 256px, 100vw"
                      className="object-cover object-top contrast-105 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gold-bright opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30" />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-deep/70 via-transparent to-transparent sm:bg-linear-to-r sm:from-transparent sm:via-transparent sm:to-navy-deep/40" />
                  <span data-team-curtain="" aria-hidden="true" className="absolute inset-0 origin-top scale-y-0 bg-gold-bright" />
                </div>

                <div className="relative flex flex-col p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute top-5 right-6 font-display text-5xl leading-none font-bold text-white/10 transition-colors duration-700 group-hover:text-gold-bright/30"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p data-team-line="" className="text-xs font-semibold tracking-[0.18em] text-gold-bright uppercase">
                    {person.role}
                  </p>
                  <h3 data-team-line="" className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                    {person.name}
                  </h3>
                  <span
                    data-team-line=""
                    aria-hidden="true"
                    className="mt-4 block h-px w-12 bg-gold-bright transition-[width] duration-700 group-hover:w-24"
                  />
                  <p data-team-line="" className="mt-4 text-[15px] leading-relaxed text-white/70">
                    {person.bio}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                    {person.credentials.map((item) => (
                      <li
                        key={item}
                        data-team-chip=""
                        className="rounded-full border border-gold-bright/30 bg-gold-bright/10 px-3 py-1 text-xs font-semibold text-gold-bright"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex items-center gap-4">
          <h3 className="text-sm font-semibold tracking-[0.16em] text-white/60 uppercase">Technical team</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {ABOUT.team.map((member) => (
            <li
              key={member.name}
              data-team-card=""
              className="[perspective:1000px] max-sm:last:col-span-2 max-sm:last:w-[calc(50%-0.5rem)] max-sm:last:justify-self-center"
            >
              <TiltCard
                max={9}
                className="team-card group relative aspect-3/4 overflow-hidden rounded-xl bg-navy ring-1 ring-white/10"
              >
                <div data-team-photo="" className="absolute inset-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover object-top contrast-105 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gold-bright opacity-0 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-deep via-navy-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p
                    data-team-line=""
                    className="font-semibold leading-snug transition-transform duration-500 group-hover:-translate-y-1"
                  >
                    {member.name}
                  </p>
                  <p data-team-line="" className="text-xs text-gold-bright sm:text-sm">
                    {member.role}
                  </p>
                </div>
                <span data-team-curtain="" aria-hidden="true" className="absolute inset-0 origin-top scale-y-0 bg-gold-bright" />
              </TiltCard>
            </li>
          ))}
        </ul>
      </TeamMotion>
    </section>
  );
}
