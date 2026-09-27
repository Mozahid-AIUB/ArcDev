import Image from "next/image";
import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { AwardIcon, BuildingIcon, DocumentIcon, QuoteIcon, ShieldCheckIcon } from "@/components/website/icons";
import { CLIENTS, CREDENTIALS, MORE_CLIENTS, TESTIMONIALS, type CredentialIcon } from "@/content/trust";

const ICONS: Record<CredentialIcon, typeof ShieldCheckIcon> = {
  shield: ShieldCheckIcon,
  document: DocumentIcon,
  award: AwardIcon,
  building: BuildingIcon,
};

const EDGE_FADE = "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]";

/** Sizes each logo by area, so wide wordmarks and square seals read as the same visual weight. */
function logoSize(width: number, height: number) {
  const aspect = width / height;
  const h = Math.min(62, Math.max(30, Math.sqrt(5600 / aspect)));
  return { width: Math.round(h * aspect), height: Math.round(h) };
}

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {CLIENTS.map((client) => {
        const size = logoSize(client.logo.width, client.logo.height);
        return (
          <li key={client.name} className="flex h-24 shrink-0 items-center px-7 sm:h-28 sm:px-12">
            <Image
              src={client.logo.src}
              alt={hidden ? "" : client.name}
              title={client.name}
              width={size.width}
              height={size.height}
              style={{ width: size.width, height: size.height }}
              className="max-w-none object-contain opacity-75 grayscale transition duration-500 hover:scale-105 hover:opacity-100 hover:grayscale-0 max-sm:scale-90"
            />
          </li>
        );
      })}
    </ul>
  );
}

/** "Trusted by": past clients' logos drifting past, in grey until hovered. */
export function TrustedBy() {
  return (
    <section aria-labelledby="trusted-title" className="overflow-hidden bg-panel py-16 sm:py-24">
      <SectionHeading
        id="trusted-title"
        align="center"
        eyebrow="Trusted by"
        title="Built for names Bangladesh knows"
        intro="Banks, developers, factories, universities and hospitals that ArcDev and its sister firm have designed and built for."
        className="px-4"
      />
      <div data-reveal="fade" className={`mt-8 border-y border-line sm:mt-12 ${EDGE_FADE}`}>
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max" style={{ "--marquee-duration": "45s" } as CSSProperties}>
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </div>
      <p data-reveal="" className="mt-6 px-4 text-center text-sm text-ink-soft">
        Also {MORE_CLIENTS.join(", ")} and many more.
      </p>
    </section>
  );
}

/** Registration, licences and professional memberships, as badges. */
export function Credentials() {
  return (
    <section aria-labelledby="credentials-title" className="relative overflow-hidden bg-navy-deep py-16 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="credentials-title"
          align="center"
          tone="dark"
          eyebrow="Registered and licensed"
          title="Accountable on paper, not just on site"
          intro="Everything below is on public record, so you can check who you are building with."
        />
        <ul className="mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
          {CREDENTIALS.map((credential) => {
            const Icon = ICONS[credential.icon];
            return (
              <li
                key={credential.title}
                data-reveal=""
                className="group relative flex gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-500 hover:border-gold-bright/50 lg:flex-col lg:gap-5 lg:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-bright/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold-bright/40 bg-gold-bright/10 text-gold-bright">
                  <Icon className="size-6" />
                </span>
                <span>
                  <span className="block font-display text-lg leading-snug font-bold">{credential.title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-white/65">{credential.detail}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Client quotes. Renders nothing until real testimonials are added to content/trust.ts. */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="testimonials-title" align="center" eyebrow="In their words" title="What our clients say" />
        <ul className="mt-10 grid gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.name}
              data-reveal=""
              className="flex flex-col rounded-2xl border border-line bg-panel p-6 shadow-sm sm:p-8"
            >
              <QuoteIcon className="size-9 text-gold" />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ink">{item.quote}</blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {item.photo ? (
                  <Image src={item.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                ) : (
                  <span className="grid size-12 place-items-center rounded-full bg-navy font-display font-bold text-gold-bright">
                    {item.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block font-semibold text-navy">{item.name}</span>
                  <span className="block text-sm text-ink-soft">{item.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
