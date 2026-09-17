import { PlusIcon } from "@/components/website/icons";

/** Questions that open in place. Plain <details>, so it works without JavaScript. */
export function FaqList({ items, className = "" }: { items: readonly { q: string; a: string }[]; className?: string }) {
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => (
        <details key={item.q} data-reveal="" className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-navy hover:text-gold-deep">
            {item.q}
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-gold-deep transition-transform duration-300 group-open:rotate-45">
              <PlusIcon />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-[17px] leading-relaxed text-ink-soft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
