interface FactListProps {
  facts: readonly { label: string; value: string }[];
  tone?: "light" | "dark";
  className?: string;
}

/** Label on the left, value on the right, hairlines between — the "fact sheet" look. */
export function FactList({ facts, tone = "light", className = "" }: FactListProps) {
  const dark = tone === "dark";

  return (
    <dl className={`divide-y ${dark ? "divide-white/10" : "divide-line"} ${className}`}>
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3">
          <dt className={dark ? "text-white/60" : "text-ink-soft"}>{fact.label}</dt>
          <dd className={`text-right font-semibold tabular-nums ${dark ? "text-white" : "text-ink"}`}>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
