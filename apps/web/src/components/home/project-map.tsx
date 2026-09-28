import type { Project } from "@arcdev/shared";
import { ProjectMapStage, type DhakaPin } from "@/components/home/project-map-stage";
import { SectionHeading } from "@/components/ui/section-heading";
import { projectDhaka } from "@/content/dhaka-map";
import { DHAKA_AREAS, DHAKA_HQ, DHAKA_PLACE_LABELS, DHAKA_SITES } from "@/content/dhaka-sites";
import {
  BANGLADESH_OUTLINE,
  BAY_LABEL,
  GRATICULE,
  GRID_LABELS,
  MAP_PINS,
  MAP_VIEWBOX,
  NEIGHBOUR_LAND,
  RIVERS,
  SCALE_100_KM,
} from "@/content/bangladesh-map";

type RegionId = keyof typeof MAP_PINS;

interface Region {
  id: RegionId;
  name: string;
  detail: string;
  office?: string;
  label: { dx: number; dy: number; anchor: "start" | "end" };
}

const REGIONS: Region[] = [
  {
    id: "dhaka",
    name: "Dhaka",
    detail: "Gulshan, Banani, Uttara, Mirpur, Purbachal, Elephant Road and more",
    office: "Head office, Uttara",
    label: { dx: -16, dy: 4, anchor: "end" },
  },
  { id: "gazipur", name: "Gazipur", detail: "Factories at Rajendrapur and Mouchak", label: { dx: -12, dy: -4, anchor: "end" } },
  { id: "noakhali", name: "Noakhali", detail: "A triplex family home", label: { dx: 15, dy: 4, anchor: "start" } },
  {
    id: "sylhet",
    name: "Sylhet",
    detail: "A 120-flat condominium at Akhalia",
    office: "Second office, Akhalia",
    label: { dx: 15, dy: 4, anchor: "start" },
  },
];

/** Which pin a project belongs to, read from its location. Unannounced sites are left off. */
function regionOf(project: Project): RegionId | null {
  const where = project.location.toLowerCase();
  if (where.includes("announced")) return null;
  if (where.includes("sylhet")) return "sylhet";
  if (where.includes("noakhali")) return "noakhali";
  if (where.includes("gazipur") || where.includes("mouchak")) return "gazipur";
  return "dhaka";
}

function pinRadius(count: number) {
  return 4.5 + Math.sqrt(count) * 1.7;
}

/** A gentle arc from the head office to another pin, bowed to one side. */
function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const bow = 0.28;
  return `M${from.x} ${from.y}Q${(mx - dy * bow).toFixed(1)} ${(my + dx * bow).toFixed(1)} ${to.x} ${to.y}`;
}

/** "Where we build": a hand-inked map of Bangladesh with a pin for every area ArcDev has built in. */
export function ProjectMap({ projects }: { projects: readonly Project[] }) {
  const counts = Object.fromEntries(REGIONS.map((r) => [r.id, 0])) as Record<RegionId, number>;
  for (const project of projects) {
    const region = regionOf(project);
    if (region) counts[region]++;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const hq = MAP_PINS.dhaka;

  const pins: DhakaPin[] = projects.flatMap((project) => {
    const site = DHAKA_SITES[project.slug];
    if (!site) return [];
    const area = DHAKA_AREAS.find((a) => a.id === site.area);
    return [
      {
        slug: project.slug,
        name: project.name,
        areaId: site.area,
        areaName: area?.name ?? "Dhaka",
        status: project.status,
        image: project.images[0],
        ...projectDhaka(site.lng, site.lat),
      },
    ];
  });
  const groups = DHAKA_AREAS.map((area) => ({
    id: area.id,
    name: area.name,
    count: pins.filter((p) => p.areaId === area.id).length,
  })).filter((g) => g.count > 0);

  return (
    <section aria-labelledby="map-title" className="map-paper relative overflow-hidden bg-panel py-20 sm:py-28">
      <ProjectMapStage
        heading={
          <SectionHeading
            id="map-title"
            eyebrow="Where we build"
            title="Built across Bangladesh"
            intro={`${total} projects from Dhaka to Sylhet, run from our head office in Uttara and a second office in Akhalia.`}
          />
        }
        dhakaAt={MAP_PINS.dhaka}
        regions={REGIONS.map((r) => ({ id: r.id, name: r.name, detail: r.detail, office: r.office, count: counts[r.id] }))}
        groups={groups}
        pins={pins}
        hq={projectDhaka(DHAKA_HQ.lng, DHAKA_HQ.lat)}
        labels={DHAKA_PLACE_LABELS.map((label) => ({ name: label.name, river: label.river, ...projectDhaka(label.lng, label.lat) }))}
        unpinned={counts.dhaka - pins.length}
        country={
          <svg
            data-map-svg=""
            viewBox={MAP_VIEWBOX}
            role="img"
            aria-label={`Map of Bangladesh with ArcDev projects in ${REGIONS.map((r) => `${r.name} (${counts[r.id]})`).join(", ")}`}
            className="h-auto w-full overflow-visible"
          >
            <defs>
              <clipPath id="map-bd">
                <path d={BANGLADESH_OUTLINE} />
              </clipPath>
              {/* Neighbouring land fades out towards the edges instead of stopping at a hard box. */}
              <radialGradient id="map-fade" cx="0.5" cy="0.48" r="0.6">
                <stop offset="0.55" stopColor="#fff" />
                <stop offset="1" stopColor="#000" />
              </radialGradient>
              <mask id="map-vignette">
                <rect width="400" height="480" fill="url(#map-fade)" />
              </mask>
              <linearGradient id="map-land" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="1" stopColor="#f3efe6" />
              </linearGradient>
            </defs>

            <g data-map-fade="land">
              <g mask="url(#map-vignette)">
                <path d={NEIGHBOUR_LAND} className="fill-sand/80 stroke-line" strokeWidth={0.8} />
                <path d={GRATICULE} fill="none" className="stroke-navy/15" strokeWidth={0.6} strokeDasharray="2 3" />
              </g>
              {GRID_LABELS.map((label) => (
                <text
                  key={label.text}
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  className="fill-navy/35 font-mono text-[7px]"
                >
                  {label.text}
                </text>
              ))}
            </g>

            <path d={BANGLADESH_OUTLINE} data-map-fill="" fill="url(#map-land)" />
            <path
              d={RIVERS}
              pathLength={1}
              data-map-draw="river"
              clipPath="url(#map-bd)"
              fill="none"
              stroke="#6d9cc8"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={BANGLADESH_OUTLINE}
              pathLength={1}
              data-map-draw="outline"
              fill="none"
              className="stroke-navy"
              strokeWidth={1.2}
              strokeLinejoin="round"
            />

            {/* Links from the head office to every other area */}
            {REGIONS.filter((r) => r.id !== "dhaka").map((region) => {
              const d = arc(hq, MAP_PINS[region.id]);
              return (
                <g key={region.id}>
                  <path d={d} pathLength={1} data-map-draw="link" fill="none" className="stroke-gold/50" strokeWidth={1} />
                  <path d={d} data-map-fade="label" fill="none" className="map-flow stroke-gold" strokeWidth={1.2} />
                </g>
              );
            })}

            {REGIONS.map((region) => {
              const pin = MAP_PINS[region.id];
              const count = counts[region.id];
              const r = pinRadius(count);
              const big = count >= 10;
              return (
                <g key={region.id} data-region={region.id} className="map-pin cursor-default">
                  <g transform={`translate(${pin.x} ${pin.y})`}>
                    <g data-map-pin="">
                      <circle r={r} className="map-pulse fill-gold/30" />
                      <circle r={r + 3} className="fill-gold/15" />
                      <circle r={r} className="map-pin-dot fill-gold-bright stroke-navy-deep" strokeWidth={1.2} />
                      {big && (
                        <text y={3.4} textAnchor="middle" className="fill-navy-deep font-sans text-[9.5px] font-bold">
                          {count}
                        </text>
                      )}
                    </g>
                  </g>
                  <text
                    data-map-fade="label"
                    x={pin.x + region.label.dx + (region.label.anchor === "end" ? -r + 4 : r - 4)}
                    y={pin.y + region.label.dy}
                    textAnchor={region.label.anchor}
                    stroke="#ffffff"
                    strokeWidth={3.2}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    className="fill-navy font-sans text-[10px] font-bold"
                  >
                    {region.name}
                    {!big && <tspan className="fill-gold-deep font-semibold"> · {count}</tspan>}
                  </text>
                </g>
              );
            })}

            <g data-map-fade="furniture" className="fill-navy/40">
              <text
                x={BAY_LABEL.x}
                y={BAY_LABEL.y}
                textAnchor="middle"
                className="font-sans text-[9px] font-semibold tracking-[0.4em] italic"
              >
                BAY OF BENGAL
              </text>
              {/* North arrow */}
              <g transform="translate(370 44)">
                <circle r="13" fill="none" className="stroke-navy/30" strokeWidth={0.8} />
                <path d="M0 -10L4 3L0 0L-4 3Z" className="fill-navy/70" />
                <text y="-15" textAnchor="middle" className="fill-navy/60 font-mono text-[8px] font-bold">
                  N
                </text>
              </g>
              {/* 100 km scale bar */}
              <g transform="translate(22 466)">
                <path
                  d={`M0 0H${SCALE_100_KM}M0 -3V3M${SCALE_100_KM / 2} -2V2M${SCALE_100_KM} -3V3`}
                  className="stroke-navy/60"
                  strokeWidth={0.9}
                />
                <rect x="0" y="-1.5" width={SCALE_100_KM / 2} height="3" className="fill-navy/60" />
                <text x={SCALE_100_KM + 5} y="3" className="fill-navy/60 font-mono text-[7px]">
                  100 km
                </text>
              </g>
            </g>
          </svg>
        }
      />
    </section>
  );
}
