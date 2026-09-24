import Link from "next/link";
import { SERVICES } from "@arcdev/shared";
import { ArrowRightIcon } from "@/components/website/icons";
// Webhook auto-deploy verification ping (2026-09-24) — safe to remove after confirmed.

/**
 * Six tone variants, one per service tile, cycled by index so the grid reads as a
 * deliberate palette rather than a single repeated colour.
 */
const TILE_TONES = [
  "bg-navy text-white",
  "bg-gold-deep text-white",
  "bg-navy-deep text-white",
  "bg-gold text-navy-deep",
  "bg-ink text-white",
  "bg-gold-bright text-navy-deep",
] as const;

/**
 * The six services as a grid of tiles that auto-flip on a timer (not on hover) between the
 * service name and the client's own request line, then link through to that service's page.
 * Each tile's flip is offset so the grid never flips as one block.
 */
export function ServiceFlipGrid() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
      {SERVICES.map((service, index) => (
        <li key={service.slug} data-reveal="scale">
          <Link
            href={`/services/${service.slug}`}
            className="group flip-card block aspect-4/3 rounded-lg focus-visible:outline-offset-4 sm:aspect-3/2"
          >
            <div
              className="flip-card-inner relative size-full rounded-lg shadow-lg shadow-navy/10 group-hover:[animation-play-state:paused]"
              style={{
                // @ts-expect-error -- custom properties read by the flip-card-inner animation
                "--flip-duration": "9s",
                "--flip-delay": `${index * -1.5}s`,
              }}
            >
              <div
                className={`flip-card-face absolute inset-0 flex flex-col items-start justify-between rounded-lg p-5 sm:p-6 ${TILE_TONES[index % TILE_TONES.length]}`}
              >
                <span className="font-display text-3xl font-bold opacity-70">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl font-bold leading-tight sm:text-3xl">{service.name}</span>
              </div>

              <div
                className={`flip-card-face flip-card-face-back absolute inset-0 flex flex-col items-start justify-between rounded-lg p-5 sm:p-6 ${TILE_TONES[index % TILE_TONES.length]}`}
              >
                <span className="text-sm font-semibold uppercase leading-snug tracking-[0.04em] sm:text-base">
                  {service.cta}
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-semibold">
                  Explore
                  <ArrowRightIcon className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
