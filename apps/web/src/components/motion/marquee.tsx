import type { CSSProperties } from "react";

interface MarqueeProps {
  items: readonly string[];
  /** Seconds for one full loop. */
  duration?: number;
  className?: string;
  itemClassName?: string;
  dotClassName?: string;
}

/** An endless horizontal band of words. Pauses on hover and stops for reduced motion. */
export function Marquee({
  items,
  duration = 40,
  className = "",
  itemClassName = "",
  dotClassName = "bg-gold",
}: MarqueeProps) {
  const row = (copy: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={copy || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className={`whitespace-nowrap px-6 sm:px-10 ${itemClassName}`}>{item}</span>
          <span aria-hidden="true" className={`size-2 shrink-0 rounded-full ${dotClassName}`} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": `${duration}s` } as CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
