import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/website/icons";

function Node({
  title,
  detail,
  tone = "light",
  className = "",
}: {
  title: string;
  detail: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      data-reveal="scale"
      className={`rounded-lg border px-5 py-5 text-center ${
        dark ? "border-navy bg-navy text-white shadow-xl shadow-navy/20" : "border-line border-t-gold border-t-2 bg-panel"
      } ${className}`}
    >
      <p className={`font-display text-lg font-bold leading-tight ${dark ? "text-white" : "text-navy"}`}>{title}</p>
      <p className={`mt-1.5 text-[15px] ${dark ? "text-gold-bright" : "text-ink-soft"}`}>{detail}</p>
    </div>
  );
}

/** Label plus a moving dashed line pointing right (desktop only). */
function ConnectorX({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`hidden flex-col items-stretch px-2 lg:flex ${className}`}>
      <span className="mb-1.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">{label}</span>
      <span className="flex items-center">
        <span className="flow-x h-0.5 flex-1" />
        <ChevronRightIcon className="-ml-2 size-4 text-gold" />
      </span>
    </div>
  );
}

/** Label plus a moving dashed line pointing down (phones and tablets). */
function ConnectorY({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-2 lg:hidden">
      <span className="flow-y h-10 w-0.5" />
      <ChevronDownIcon className="-mt-2 size-4 text-gold" />
      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">{label}</span>
    </div>
  );
}

/**
 * How value moves through a project: land and capital in, finished flats out, and shares and
 * returns back. Built from HTML so every label is real text; the connectors are decorative.
 */
export function PartnerFlow() {
  return (
    <figure className="mt-16 rounded-xl border border-line bg-sand/60 p-5 sm:p-8 lg:p-10">
      <figcaption className="sr-only">
        Landowners and co-owners bring land, and investors bring capital, to ArcDev, which handles design,
        approvals and construction and delivers finished flats to families and businesses. Landowners receive a
        share of the flats and investors receive returns.
      </figcaption>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_8rem_1.15fr_8rem_1fr] lg:grid-rows-[auto_auto_auto] lg:items-center lg:gap-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:contents">
          <Node title="Landowners and co-owners" detail="Bring the plot" className="lg:col-start-1 lg:row-start-1" />
          <Node title="Investors" detail="Bring capital" className="lg:col-start-1 lg:row-start-2" />
        </div>

        <ConnectorY label="Land · Capital" />
        <ConnectorX label="Land" className="lg:col-start-2 lg:row-start-1" />
        <ConnectorX label="Capital" className="lg:col-start-2 lg:row-start-2" />

        <Node
          title="ArcDev"
          detail="Design · approvals · construction"
          tone="dark"
          className="lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:py-10"
        />

        <ConnectorY label="Finished flats" />
        <ConnectorX label="Finished flats" className="lg:col-start-4 lg:row-span-2 lg:row-start-1" />

        <Node
          title="Families and businesses"
          detail="Buy and move in"
          className="lg:col-start-5 lg:row-span-2 lg:row-start-1"
        />

        <div aria-hidden="true" className="mt-6 lg:col-span-3 lg:col-start-2 lg:row-start-3 lg:mt-0">
          <span className="flex items-center">
            <ChevronLeftIcon className="-mr-2 size-4 text-gold-bright" />
            <span className="flow-x-reverse h-0.5 flex-1" />
          </span>
          <span className="mt-2 block text-center text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
            Flat share to landowners · returns to investors
          </span>
        </div>
      </div>
    </figure>
  );
}
