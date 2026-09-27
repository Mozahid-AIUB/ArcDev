import Link from "next/link";
import type { Project } from "@arcdev/shared";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon } from "@/components/website/icons";
import { ConstructionMotion } from "./construction-motion";

// Elevation, viewBox 0 0 340 440. Building x 90–250, ground at y 400, top of the last storey at y 70.
const GROUND = 400;
const TOP = 70;
const LEFT = 90;
const RIGHT = 250;
const COLUMNS = [LEFT, 143, 197, RIGHT];

function lattice(x: number, y1: number, y2: number, depth: number, bays: number) {
  const points = Array.from({ length: bays + 1 }, (_, i) => `${x + (i % 2 ? depth : 0)} ${y1 + ((y2 - y1) * i) / bays}`);
  return `M${x} ${y1}V${y2}M${x + depth} ${y1}V${y2}M${points.join("L")}`;
}

function horizontalLattice(y: number, x1: number, x2: number, depth: number, bays: number) {
  const points = Array.from({ length: bays + 1 }, (_, i) => `${x1 + ((x2 - x1) * i) / bays} ${y + (i % 2 ? depth : 0)}`);
  return `M${x1} ${y}H${x2}M${x1} ${y + depth}H${x2}M${points.join("L")}`;
}

/**
 * How far the structure has got: floors whose slab is cast drawn solid, the rest dashed, with the
 * crane and scaffold at the working level. Shown only for ongoing projects with a slab count.
 */
export function ConstructionStatus({ project }: { project: Project }) {
  const storeys = project.storeys;
  const cast = project.slabsCast;
  if (project.status !== "ongoing" || storeys === undefined || cast === undefined) return null;

  const floorH = (GROUND - TOP) / storeys;
  const floors = Array.from({ length: storeys }, (_, i) => ({
    index: i,
    top: GROUND - (i + 1) * floorH,
    bottom: GROUND - i * floorH,
    cast: i < cast,
  }));
  const castTop = GROUND - cast * floorH;
  const finished = cast >= storeys;
  const latest = project.updates?.[0];
  const started = project.updates?.find((u) => /began|started/i.test(u.title));

  return (
    <section aria-labelledby="status-heading" className="blueprint-bg relative overflow-hidden bg-navy-deep py-20 text-white sm:py-28">
      <ConstructionMotion className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <figure className="relative mx-auto w-full max-w-115">
          <svg
            data-cs-svg=""
            viewBox="0 0 340 440"
            role="img"
            aria-label={`Elevation of ${project.name}: ${cast} of ${storeys} floor slabs cast`}
            className="h-auto w-full overflow-visible"
            fill="none"
          >
            <defs>
              <pattern id="cs-earth" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M0 0V6" stroke="currentColor" strokeWidth="0.6" className="text-white/30" />
              </pattern>
              <linearGradient id="cs-concrete" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e6eaf1" />
                <stop offset="1" stopColor="#b8c1cf" />
              </linearGradient>
            </defs>

            {/* Floors still to come, sketched in dashes */}
            {floors
              .filter((f) => !f.cast)
              .map((f) => (
                <g key={f.index} data-cs-planned="" stroke="currentColor" className="text-white/30" strokeWidth={0.9}>
                  <path d={`M${LEFT} ${f.top}H${RIGHT}`} strokeDasharray="5 4" />
                  {COLUMNS.map((x) => (
                    <path key={x} d={`M${x} ${f.top}V${f.bottom}`} strokeDasharray="3 4" />
                  ))}
                </g>
              ))}

            {/* Floors with their slab cast: columns and a slab, rising in order */}
            {floors
              .filter((f) => f.cast)
              .map((f) => (
                <g key={f.index} data-cs-floor="">
                  {COLUMNS.map((x) => (
                    <rect key={x} x={x - 3} y={f.top} width={6} height={f.bottom - f.top} fill="url(#cs-concrete)" />
                  ))}
                  <rect x={LEFT - 6} y={f.top} width={RIGHT - LEFT + 12} height={5} className="fill-[#eef1f6]" />
                  <rect x={LEFT - 6} y={f.top + 5} width={RIGHT - LEFT + 12} height={1.2} className="fill-black/25" />
                </g>
              ))}

            {/* Working level: starter bars on the top slab */}
            {!finished && (
              <g data-cs-fade="" stroke="currentColor" className="text-gold-bright" strokeWidth={0.9}>
                {COLUMNS.map((x) => (
                  <path key={x} d={`M${x - 1.5} ${castTop}V${castTop - floorH * 0.55}M${x + 1.5} ${castTop}V${castTop - floorH * 0.55}`} />
                ))}
              </g>
            )}

            {/* Scaffold on the right, up to the working level */}
            <path
              data-cs-draw=""
              pathLength={1}
              d={lattice(RIGHT + 10, GROUND, castTop - floorH * 0.4, 7, Math.max(4, cast * 2))}
              stroke="currentColor"
              className="text-white/45"
              strokeWidth={0.8}
            />

            {/* Tower crane on the left */}
            <g stroke="currentColor" className="text-gold-bright" strokeWidth={0.9}>
              <path data-cs-draw="" pathLength={1} d={lattice(44, GROUND, 45, 8, 28)} />
              <path data-cs-draw="" pathLength={1} d={horizontalLattice(38, 14, 240, 7, 26)} />
              <path data-cs-draw="" pathLength={1} d="M48 14L14 38M48 14L240 38M48 14V38M14 38v10h14v-10" />
              <path data-cs-draw="" pathLength={1} d={`M226 45V${castTop - floorH * 0.7}M220 ${castTop - floorH * 0.7}h12v7h-12z`} />
            </g>

            {/* Ground */}
            <path d={`M10 ${GROUND}H330`} stroke="currentColor" className="text-white/80" strokeWidth={1.6} />
            <rect x="10" y={GROUND + 1} width="320" height="9" fill="url(#cs-earth)" />

            {/* Height bracket: how much of the frame is cast */}
            <g data-cs-fade="" stroke="currentColor" className="text-white/60" strokeWidth={0.8}>
              <path d={`M292 ${GROUND}V${castTop}M288 ${GROUND}h8M288 ${castTop}h8`} />
              <path d={`M292 ${castTop}V${TOP}M288 ${TOP}h8`} strokeDasharray="3 3" className="text-white/30" />
            </g>
            <g data-cs-fade="" className="font-mono">
              <text x="300" y={(GROUND + castTop) / 2} className="fill-white/80 text-[9px] font-bold">
                {cast} / {storeys}
              </text>
              <text x="300" y={(GROUND + castTop) / 2 + 11} className="fill-white/45 text-[7px]">
                CAST
              </text>
            </g>

            {/* Working-level marker */}
            {!finished && (
              <g transform={`translate(${LEFT + 20} ${castTop - floorH * 0.28})`}>
                <g data-cs-pop="">
                  <circle r="3.5" className="map-pulse fill-gold-bright/60" />
                  <circle r="3" className="fill-gold-bright" />
                  <text
                    x="8"
                    y="3"
                    stroke="#0e1a33"
                    strokeWidth={3}
                    paintOrder="stroke"
                    className="fill-gold-bright font-mono text-[8px] font-bold tracking-[0.12em]"
                  >
                    FLOOR {cast + 1} IN PROGRESS
                  </text>
                </g>
              </g>
            )}
          </svg>
          <figcaption className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-5 rounded-sm bg-[#dfe4ec]" /> Slab cast
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-5 rounded-sm border border-dashed border-white/40" /> To come
            </span>
          </figcaption>
        </figure>

        <div>
          <SectionHeading
            id="status-heading"
            tone="dark"
            eyebrow="Construction status"
            title={finished ? "The structure is complete" : `${cast} of ${storeys} floor slabs cast`}
            intro={
              finished
                ? "Every floor slab is cast. Finishing work follows."
                : `The concrete frame is up to floor ${cast}. Work continues on the ${storeys - cast === 1 ? "last floor" : `remaining ${storeys - cast} floors`}.`
            }
          />

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
            <div>
              <dt className="text-sm text-white/60">Floor slabs cast</dt>
              <dd className="mt-1 font-display text-5xl font-bold text-gold-bright tabular-nums">
                <span data-count={cast}>{cast}</span>
                <span className="text-2xl text-white/40">/{storeys}</span>
              </dd>
            </div>
            {started && (
              <div>
                <dt className="text-sm text-white/60">Construction began</dt>
                <dd className="mt-2 font-display text-2xl font-bold">{started.date}</dd>
              </div>
            )}
            {latest && (
              <div className="col-span-2">
                <dt className="text-sm text-white/60">Latest update</dt>
                <dd className="mt-1 text-lg">
                  {latest.title} <span className="text-white/50">· {latest.date}</span>
                </dd>
              </div>
            )}
          </dl>

          <Link href="/enquiry" className={`${buttonStyles.primary} mt-10`}>
            Book a site visit
            <ArrowRightIcon />
          </Link>
        </div>
      </ConstructionMotion>
    </section>
  );
}
