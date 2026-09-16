const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-md px-5 text-base font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

export const buttonStyles = {
  /** Gold on any ground. The one main action on a page. */
  primary: `${base} bg-gold-bright text-navy hover:brightness-105`,
  /** Outline for use on navy. */
  outlineOnDark: `${base} border border-white/30 text-white hover:bg-white/10`,
  /** Outline for use on light grounds. */
  outline: `${base} border border-line bg-panel text-navy hover:border-navy`,
} as const;
