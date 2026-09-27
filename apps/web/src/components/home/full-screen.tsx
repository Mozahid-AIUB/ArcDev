import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/website/icons";

/**
 * One screen of the homepage, as in the client's sketch: fills the viewport under the header,
 * snaps into place, and ends with a "∨ next section" cue that scrolls on.
 */
export function FullScreen({
  id,
  label,
  next,
  tone = "light",
  className = "",
  children,
}: {
  id: string;
  /** Name shown by the section dots. */
  label: string;
  next?: { id: string; label: string };
  tone?: "light" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const dark = tone === "dark";

  return (
    <section
      id={id}
      data-screen={label}
      aria-labelledby={`${id}-title`}
      className={`relative flex min-h-[calc(100svh-4rem)] flex-col justify-center overflow-hidden pt-8 pb-4 lg:min-h-[calc(100svh-5rem)] lg:pt-10 ${className}`}
    >
      <div className="flex flex-1 flex-col justify-center">{children}</div>
      {next && (
        <a
          href={`#${next.id}`}
          className={`group mx-auto mt-4 inline-flex min-h-11 items-center gap-2 px-4 text-xs font-semibold tracking-[0.2em] uppercase transition-colors sm:text-sm ${
            dark ? "text-white/70 hover:text-gold-bright" : "text-navy/70 hover:text-gold-deep"
          }`}
        >
          <ChevronDownIcon className="size-4 animate-bounce" />
          {next.label}
        </a>
      )}
    </section>
  );
}
