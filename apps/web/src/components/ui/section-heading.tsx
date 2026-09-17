import { SplitWords } from "@/components/motion/split-words";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  /** "dark" when the section sits on navy. */
  tone?: "light" | "dark";
  /** Id for the h2, so a section can use aria-labelledby. */
  id?: string;
  className?: string;
}

/** Short gold rule, optional eyebrow, animated h2 and intro. Used to open every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  id,
  className = "",
}: SectionHeadingProps) {
  const center = align === "center";
  const dark = tone === "dark";

  return (
    <div className={`${center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <span data-reveal="fade" aria-hidden="true" className={`block h-0.5 w-10 bg-gold ${center ? "mx-auto" : ""}`} />
      {eyebrow && (
        <p
          data-reveal=""
          className={`mt-5 text-sm font-semibold uppercase tracking-[0.14em] ${dark ? "text-gold-bright" : "text-gold-deep"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`${eyebrow ? "mt-3" : "mt-5"} text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${dark ? "text-white" : "text-navy"}`}
      >
        <SplitWords text={title} />
      </h2>
      {intro && (
        <p data-reveal="" className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink-soft"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
