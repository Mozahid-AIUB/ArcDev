import type { ReactNode } from "react";
import type { ServiceSlug } from "@arcdev/shared";
import type { DiagramBeat } from "./service-diagram";

/*
 * One blueprint-style diagram per service, animated by <ServiceDiagram> through data-sd
 * attributes (see service-diagram.tsx). viewBox 0 0 480 360 throughout.
 */

const LINE = "stroke-white/80";
const FAINT = "stroke-white/30";
const GOLD = "stroke-gold-bright";
const LABEL = "fill-white/60 font-mono text-[9px] tracking-[0.14em]";
const LABEL_GOLD = "fill-gold-bright font-mono text-[9px] font-bold tracking-[0.14em]";

function Sheet({ children, label, offsetY = 0 }: { children: ReactNode; label: string; offsetY?: number }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className="h-auto w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <pattern id="sd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="stroke-white/5" strokeWidth="1" />
        </pattern>
        <pattern id="sd-earth" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V6" className="stroke-white/25" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="480" height="360" fill="url(#sd-grid)" />
      <g transform={`translate(0 ${offsetY})`}>{children}</g>
    </svg>
  );
}

/** Ground line with earth hatch, drawn in beat 0. */
function Ground({ y = 300, x1 = 20, x2 = 460 }: { y?: number; x1?: number; x2?: number }) {
  return (
    <>
      <path data-sd="0" data-sd-type="draw" pathLength={1} d={`M${x1} ${y}H${x2}`} className={LINE} strokeWidth={1.6} />
      <rect data-sd="0" x={x1} y={y + 1} width={x2 - x1} height="10" fill="url(#sd-earth)" />
    </>
  );
}

/** A simple storey with two windows, used by several diagrams. */
function Storey({ x, y, w, h, beat, fill = "fill-white/[0.06]" }: { x: number; y: number; w: number; h: number; beat: number; fill?: string }) {
  const win = (wx: number) => <rect x={wx} y={y + h * 0.3} width={w * 0.2} height={h * 0.42} className="stroke-white/50" strokeWidth={0.8} />;
  return (
    <g data-sd={beat} data-sd-type="rise">
      <rect x={x} y={y} width={w} height={h} className={`${fill} ${LINE}`} strokeWidth={1.2} />
      {win(x + w * 0.12)}
      {win(x + w * 0.4)}
      {win(x + w * 0.68)}
    </g>
  );
}

/* ---------------------------------------------------------------- Fund */

function FundDiagram() {
  const floors = Array.from({ length: 7 }, (_, i) => 300 - (i + 1) * 26);
  const yours = new Set([0, 2, 4, 6]);
  return (
    <Sheet label="Diagram: ArcDev funds the construction on your land, then the finished flats are shared" offsetY={-42}>
      <Ground />
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M170 300V278l12 5-12 5M330 300V278l12 5-12 5" className={GOLD} strokeWidth={1.3} />
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M170 326H330M170 320v12M330 320v12" className={FAINT} strokeWidth={1} />
      <text data-sd="0" x="250" y="345" textAnchor="middle" className={LABEL_GOLD}>YOUR LAND</text>

      <g data-sd="1" data-sd-type="pop">
        <rect x="28" y="196" width="76" height="62" rx="6" className="fill-gold-bright/10 stroke-gold-bright" strokeWidth={1.4} />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx="66" cy={238 - i * 9} rx="18" ry="5" className="fill-navy-deep stroke-gold-bright" strokeWidth={1.2} />
        ))}
        <text x="66" y="214" textAnchor="middle" className={LABEL_GOLD}>FUND</text>
      </g>
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M106 226C140 226 150 250 172 262" className={GOLD} strokeWidth={1.4} strokeDasharray="4 4" />
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M164 256l8 6-9 3" className={GOLD} strokeWidth={1.4} />
      <text data-sd="1" x="66" y="276" textAnchor="middle" className={LABEL}>ARCDEV PAYS</text>

      {floors.map((y) => (
        <Storey key={y} x={186} y={y} w={128} h={26} beat={2} />
      ))}
      <path data-sd="2" data-sd-type="draw" pathLength={1} d="M180 118H320" className={LINE} strokeWidth={1.8} />

      {floors.map((y, i) => (
        <rect
          key={`share-${y}`}
          data-sd="3"
          x={187}
          y={y + 1}
          width={126}
          height={24}
          className={yours.has(i) ? "fill-gold-bright/45" : "fill-white/15"}
        />
      ))}
      <g data-sd="3">
        <rect x="352" y="170" width="12" height="12" className="fill-gold-bright/60" />
        <text x="372" y="180" className="fill-white/80 font-sans text-[11px] font-semibold">Your flats</text>
        <rect x="352" y="194" width="12" height="12" className="fill-white/25" />
        <text x="372" y="204" className="fill-white/80 font-sans text-[11px] font-semibold">ArcDev&apos;s share</text>
        <text x="352" y="228" className={LABEL}>RATIO AGREED</text>
        <text x="352" y="241" className={LABEL}>IN WRITING</text>
      </g>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- Landshare */

function LandshareDiagram() {
  const owners = [
    { id: "A", x: 150, tone: "fill-gold-bright/45" },
    { id: "B", x: 210, tone: "fill-white/25" },
    { id: "C", x: 270, tone: "fill-[#7fb3d5]/45" },
  ];
  const floors = Array.from({ length: 6 }, (_, i) => 320 - (i + 1) * 24);
  return (
    <Sheet label="Diagram: several owners' shares of one plot become one building, with flats for each owner">
      {/* Plan of the plot, split between owners */}
      <text data-sd="0" x="240" y="24" textAnchor="middle" className={LABEL}>PLOT PLAN · SHARED TITLE</text>
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M150 36H330V104H150Z" className={FAINT} strokeWidth={1.2} />
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M210 36V104M270 36V104" className="stroke-white/40" strokeWidth={1} strokeDasharray="4 4" />
      {owners.map((o) => (
        <g key={o.id} data-sd="0" data-sd-type="pop">
          <rect x={o.x + 4} y="40" width="52" height="60" className={o.tone} />
          <text x={o.x + 30} y="76" textAnchor="middle" className="fill-white font-display text-[16px] font-bold">
            {o.id}
          </text>
        </g>
      ))}

      {/* One agreement: the whole plot outlined as one */}
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M144 30H336V110H144Z" className={GOLD} strokeWidth={2} />
      <text data-sd="1" x="348" y="68" className={LABEL_GOLD}>ONE</text>
      <text data-sd="1" x="348" y="81" className={LABEL_GOLD}>AGREEMENT</text>
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M240 116V162M233 154l7 9 7-9" className={GOLD} strokeWidth={1.4} />

      <Ground y={320} />
      {floors.map((y) => (
        <Storey key={y} x={170} y={y} w={140} h={24} beat={2} />
      ))}
      <path data-sd="2" data-sd-type="draw" pathLength={1} d="M164 176H316" className={LINE} strokeWidth={1.8} />

      {floors.map((y, i) => (
        <g key={`own-${y}`} data-sd="3">
          <rect x={171} y={y + 1} width={138} height={22} className={owners[i % 3].tone} />
          <text x={322} y={y + 16} className="fill-white/80 font-display text-[11px] font-bold">
            {owners[i % 3].id}
          </text>
        </g>
      ))}
      <text data-sd="3" x="30" y="250" className={LABEL}>FLATS SPLIT</text>
      <text data-sd="3" x="30" y="263" className={LABEL}>BY SHARE</text>
      <text data-sd="3" x="30" y="276" className={LABEL}>OF TITLE</text>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- Interior */

function InteriorDiagram() {
  return (
    <Sheet label="Diagram: an apartment floor plan drawn, furnished and lit">
      {/* Walls */}
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M60 50H420V310H60Z" className={LINE} strokeWidth={4} />
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M250 50V170M250 210V310M60 190H170M210 190H250M330 190H420M330 190V230" className={LINE} strokeWidth={2.4} />

      {/* Doors and windows */}
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M170 190A40 40 0 0 0 210 150M250 170A40 40 0 0 1 290 210M330 230A35 35 0 0 0 365 265" className="stroke-white/50" strokeWidth={1} strokeDasharray="3 3" />
      <path data-sd="1" data-sd-type="draw" pathLength={1} d="M100 47V53M100 50H160M160 47V53M300 47V53M300 50H380M380 47V53M120 307V313M120 310H200M200 307V313" className="stroke-[#8db3d8]" strokeWidth={2.2} />

      {/* Furniture */}
      <g data-sd="2" data-sd-type="pop" className="stroke-white/70" strokeWidth={1.2}>
        <rect x="80" y="84" width="96" height="34" rx="5" className="fill-white/10" />
        <path d="M80 92H176" />
      </g>
      <rect data-sd="2" data-sd-type="pop" x="102" y="130" width="52" height="28" rx="3" className="fill-white/10 stroke-white/70" strokeWidth={1.2} />
      <g data-sd="2" data-sd-type="pop" className="fill-white/10 stroke-white/70" strokeWidth={1.2}>
        <rect x="92" y="226" width="64" height="44" rx="4" />
        {[[100, 218], [148, 218], [100, 278], [148, 278]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />
        ))}
      </g>
      <g data-sd="2" data-sd-type="pop" className="stroke-white/70" strokeWidth={1.2}>
        <rect x="300" y="70" width="90" height="100" rx="4" className="fill-white/10" />
        <rect x="308" y="76" width="34" height="20" rx="3" className="fill-white/15" />
        <rect x="348" y="76" width="34" height="20" rx="3" className="fill-white/15" />
      </g>
      <g data-sd="2" data-sd-type="pop" className="stroke-white/70" strokeWidth={1.2}>
        <path d="M262 230H320M262 230V296H280" />
        <circle cx="291" cy="246" r="7" />
        <circle cx="271" cy="270" r="5" />
        <circle cx="271" cy="284" r="5" />
      </g>

      {/* Light and labels */}
      {[[128, 110], [124, 248], [345, 120], [290, 262]].map(([cx, cy]) => (
        <circle key={`glow-${cx}`} data-sd="3" cx={cx} cy={cy} r="46" className="fill-gold-bright/15" />
      ))}
      <text data-sd="3" x="128" y="178" textAnchor="middle" className={LABEL_GOLD}>LIVING</text>
      <text data-sd="3" x="345" y="186" textAnchor="middle" className={LABEL_GOLD}>BEDROOM</text>
      <text data-sd="3" x="124" y="302" textAnchor="middle" className={LABEL_GOLD}>DINING</text>
      <text data-sd="3" x="370" y="300" textAnchor="middle" className={LABEL_GOLD}>KITCHEN</text>
      <path data-sd="3" data-sd-type="draw" pathLength={1} d="M60 332H250M60 327v10M250 327v10" className={FAINT} strokeWidth={1} />
      <text data-sd="3" x="155" y="350" textAnchor="middle" className={LABEL}>18&apos;-0&quot;</text>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- Engineering */

function EngineeringDiagram() {
  const columns = [150, 220, 290, 360];
  const levels = Array.from({ length: 4 }, (_, i) => 164 - i * 36);
  return (
    <Sheet label="Diagram: soil test, piled foundation, structural frame and a code-checked design">
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M20 200H460" className={LINE} strokeWidth={1.6} />
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M20 246C90 240 170 252 250 246S400 240 460 248M20 294C110 288 200 300 300 292S420 290 460 296" className={FAINT} strokeWidth={1.2} strokeDasharray="6 4" />
      <text data-sd="0" x="30" y="226" className={LABEL}>FILL</text>
      <text data-sd="0" x="30" y="272" className={LABEL}>SILTY CLAY</text>
      <text data-sd="0" x="30" y="322" className={LABEL}>DENSE SAND</text>
      <g data-sd="0" data-sd-type="pop">
        <path d="M420 190V330" className={GOLD} strokeWidth={1.2} strokeDasharray="2 3" />
        <text x="426" y="186" className={LABEL_GOLD}>BH-1</text>
      </g>

      {columns.map((x) => (
        <g key={`pile-${x}`}>
          <path data-sd="1" data-sd-type="draw" pathLength={1} d={`M${x - 8} 212V322M${x + 8} 212V322`} className="stroke-white/60" strokeWidth={1.4} />
          <rect data-sd="1" data-sd-type="rise" x={x - 16} y="200" width="32" height="12" className="fill-white/15 stroke-white/70" strokeWidth={1.2} />
        </g>
      ))}

      {columns.map((x) => (
        <rect key={`col-${x}`} data-sd="2" data-sd-type="rise" x={x - 3} y="56" width="6" height="144" className="fill-white/70" />
      ))}
      {levels.map((y) => (
        <rect key={`beam-${y}`} data-sd="2" data-sd-type="grow" x="140" y={y - 2.5} width="230" height="5" className="fill-white/55" />
      ))}

      {[185, 255, 325].map((x) => (
        <path key={`load-${x}`} data-sd="3" data-sd-type="draw" pathLength={1} d={`M${x} 18V40M${x - 5} 34l5 6 5-6`} className={GOLD} strokeWidth={1.4} />
      ))}
      <text data-sd="3" x="255" y="14" textAnchor="middle" className={LABEL_GOLD}>DESIGN LOADS</text>
      <g data-sd="3" data-sd-type="pop" transform="translate(420 90) rotate(-12)">
        <circle r="30" className="stroke-gold-bright" strokeWidth={2} />
        <circle r="24" className="stroke-gold-bright" strokeWidth={0.8} />
        <text y="-2" textAnchor="middle" className="fill-gold-bright font-sans text-[10px] font-bold tracking-widest">BNBC</text>
        <text y="10" textAnchor="middle" className="fill-gold-bright font-mono text-[7px] font-bold tracking-[0.12em]">CHECKED</text>
      </g>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- Management */

function ManagementDiagram() {
  const tasks = [
    { name: "DESIGN", start: 0, len: 2 },
    { name: "APPROVAL", start: 1.5, len: 2 },
    { name: "FOUNDATION", start: 3.5, len: 2 },
    { name: "STRUCTURE", start: 5, len: 3.5 },
    { name: "FINISHING", start: 8, len: 2.5 },
    { name: "HANDOVER", start: 10.5, len: 1 },
  ];
  const x0 = 130;
  const unit = 26;
  const today = 6.6;
  return (
    <Sheet label="Diagram: a project schedule, progress against today, and weekly photo reports">
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} data-sd="0" data-sd-type="draw" pathLength={1} d={`M${x0 + i * unit} 34V232`} className="stroke-white/10" strokeWidth={1} />
      ))}
      {tasks.map((t, i) => (
        <text key={t.name} data-sd="0" x="30" y={58 + i * 32} className={LABEL}>
          {t.name}
        </text>
      ))}
      <text data-sd="0" x={x0} y="24" className={LABEL}>MONTH 1</text>
      <text data-sd="0" x={x0 + 12 * unit} y="24" textAnchor="end" className={LABEL}>HANDOVER</text>

      {tasks.map((t, i) => (
        <rect
          key={`bar-${t.name}`}
          data-sd="1"
          data-sd-type="grow"
          x={x0 + t.start * unit}
          y={46 + i * 32}
          width={t.len * unit}
          height="16"
          rx="4"
          className={t.start + t.len <= today ? "fill-gold-bright/80" : "fill-white/25"}
        />
      ))}

      <path data-sd="2" data-sd-type="draw" pathLength={1} d={`M${x0 + today * unit} 30V240`} className={GOLD} strokeWidth={1.6} strokeDasharray="4 3" />
      <text data-sd="2" x={x0 + today * unit} y="254" textAnchor="middle" className={LABEL_GOLD}>TODAY</text>
      {tasks
        .filter((t) => t.start + t.len <= today)
        .map((t) => {
          const i = tasks.indexOf(t);
          return (
            <g key={`tick-${t.name}`} data-sd="2" data-sd-type="pop" transform={`translate(${x0 + (t.start + t.len) * unit + 12} ${54 + i * 32})`}>
              <circle r="7" className="fill-gold-bright" />
              <path d="M-3 0l2 2.5 4-4.5" className="stroke-navy-deep" strokeWidth={1.8} />
            </g>
          );
        })}

      {[0, 1, 2].map((i) => (
        <g key={`report-${i}`} data-sd="3" data-sd-type="pop" transform={`translate(${150 + i * 104} 272)`}>
          <rect width="92" height="68" rx="6" className="fill-white/10 stroke-white/40" strokeWidth={1} />
          <rect x="8" y="8" width="76" height="34" rx="3" className="fill-white/15" />
          <path d="M14 38l14-14 10 10 8-6 18 10" className="stroke-white/50" strokeWidth={1.2} />
          <text x="8" y="58" className="fill-white/70 font-mono text-[8px] tracking-widest">
            WEEK {40 + i} REPORT
          </text>
        </g>
      ))}
    </Sheet>
  );
}

/* ---------------------------------------------------------------- Investment */

function InvestmentDiagram() {
  const tranches = [
    { x: 90, h: 40 },
    { x: 140, h: 40 },
    { x: 190, h: 40 },
  ];
  const floors = Array.from({ length: 6 }, (_, i) => 290 - (i + 1) * 26);
  return (
    <Sheet label="Illustrative diagram: capital goes into a named building, statements follow construction, and payouts come from flat sales">
      <path data-sd="0" data-sd-type="draw" pathLength={1} d="M60 30V290H450" className={LINE} strokeWidth={1.6} />
      <text data-sd="0" x="66" y="26" className={LABEL}>VALUE</text>
      <text data-sd="0" x="450" y="308" textAnchor="end" className={LABEL}>TIME</text>

      {tranches.map((t) => (
        <g key={t.x} data-sd="1" data-sd-type="rise">
          <rect x={t.x} y={290 - t.h} width="34" height={t.h} rx="3" className="fill-gold-bright/70" />
        </g>
      ))}
      <text data-sd="1" x="90" y="238" className={LABEL_GOLD}>YOUR CAPITAL</text>

      {floors.map((y) => (
        <Storey key={y} x={290} y={y} w={96} h={26} beat={2} />
      ))}
      <text data-sd="2" x="338" y="306" textAnchor="middle" className={LABEL}>NAMED PROJECT</text>

      {[[96, 120], [164, 92], [232, 64]].map(([x, y], i) => (
        <g key={`statement-${x}`} data-sd="2" data-sd-type="pop" transform={`translate(${x} ${y})`}>
          <rect width="58" height="36" rx="4" className="fill-navy-deep stroke-white/40" strokeWidth={1} />
          <path d="M8 12H50M8 20H40M8 28H30" className="stroke-white/40" strokeWidth={1.2} />
          <text x="29" y="-4" textAnchor="middle" className="fill-white/60 font-mono text-[7px] tracking-widest">
            Q{i + 1}
          </text>
        </g>
      ))}

      <path data-sd="3" data-sd-type="draw" pathLength={1} d="M76 272C170 262 250 230 320 170S420 74 440 60" className={GOLD} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <ellipse key={`coin-${i}`} data-sd="3" data-sd-type="pop" cx="440" cy={50 - i * 8} rx="14" ry="4.5" className="fill-navy-deep stroke-gold-bright" strokeWidth={1.3} />
      ))}
      <text data-sd="3" x="420" y="30" textAnchor="end" className={LABEL_GOLD}>PAID FROM FLAT SALES</text>
      <text data-sd="3" x="450" y="340" textAnchor="end" className="fill-white/45 font-sans text-[9px] italic">
        Illustration only. Returns are not guaranteed.
      </text>
    </Sheet>
  );
}

export const SERVICE_DIAGRAMS: Record<ServiceSlug, { beats: DiagramBeat[]; Diagram: () => ReactNode }> = {
  fund: {
    Diagram: FundDiagram,
    beats: [
      { title: "You bring the land", text: "A plot with clear title, and nothing else." },
      { title: "ArcDev funds everything", text: "Design, approvals, materials and labour, with no loan on your side." },
      { title: "The building goes up", text: "Built to code, with regular progress reports." },
      { title: "The flats are shared", text: "In the ratio written into the agreement before work began." },
    ],
  },
  landshare: {
    Diagram: LandshareDiagram,
    beats: [
      { title: "One plot, several owners", text: "Heirs or co-owners each hold a share of the title." },
      { title: "One agreement for all", text: "Every owner signs the same agreement; nothing is signed until all agree." },
      { title: "One building", text: "Designed and built for the whole plot." },
      { title: "Flats for every owner", text: "Allocated by share of title and registered separately." },
    ],
  },
  interior: {
    Diagram: InteriorDiagram,
    beats: [
      { title: "Measure and plan", text: "The space is measured and the layout planned around how you live." },
      { title: "Doors, windows, light", text: "Openings and daylight shape where everything goes." },
      { title: "Furniture and fit-out", text: "Custom furniture, kitchen and storage, shown in 3D before building." },
      { title: "Finished and lit", text: "Lighting, finishes and a clean handover, ready to move in." },
    ],
  },
  engineering: {
    Diagram: EngineeringDiagram,
    beats: [
      { title: "Soil test first", text: "Boreholes show what the ground can carry." },
      { title: "Foundation to suit", text: "Piles and caps designed for the soil found." },
      { title: "Structural frame", text: "Columns and beams sized storey by storey." },
      { title: "Checked to code", text: "Loads verified against the Bangladesh National Building Code." },
    ],
  },
  management: {
    Diagram: ManagementDiagram,
    beats: [
      { title: "A plan with dates", text: "Every stage scheduled before work starts." },
      { title: "Stages run in order", text: "Contractors and suppliers lined up for each one." },
      { title: "Progress against today", text: "You see what is done, and what is next." },
      { title: "Weekly photo reports", text: "Photographs and spending, every week, from the site." },
    ],
  },
  investment: {
    Diagram: InvestmentDiagram,
    beats: [
      { title: "Terms in writing", text: "Amount, term and profit share agreed before you invest." },
      { title: "Capital into a named building", text: "Your money is tied to one project you can visit." },
      { title: "Statements as it rises", text: "Regular statements with construction photographs." },
      { title: "Payout from sales", text: "Capital and profit paid as flats sell. Returns are not guaranteed." },
    ],
  },
};
