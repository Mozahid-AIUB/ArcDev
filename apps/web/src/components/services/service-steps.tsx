import type { CSSProperties } from "react";

interface Step {
  title: string;
  text: string;
}

/**
 * Numbered steps. A vertical timeline on phones and tablets, horizontal on large screens.
 * The gold connector draws itself as the visitor scrolls past (data-line).
 */
export function ServiceSteps({ steps }: { steps: readonly Step[] }) {
  // The horizontal connector runs from the centre of the first column to the centre of the last.
  const edge = `${50 / steps.length}%`;

  return (
    <div className="relative">
      {/* Horizontal connector (lg and up), behind the number circles. */}
      <div
        aria-hidden="true"
        className="absolute top-7 hidden h-0.5 bg-line lg:block"
        style={{ left: edge, right: edge }}
      />
      <div
        aria-hidden="true"
        data-line="x"
        className="flow-x absolute top-7 hidden h-0.5 lg:block"
        style={{ left: edge, right: edge }}
      />

      <ol
        className="relative grid gap-10 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-8"
        style={{ "--steps": steps.length } as CSSProperties}
      >
        {steps.map((step, index) => (
          <li
            key={step.title}
            data-reveal=""
            className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center"
          >
            {/* Vertical connector to the next step (below lg). */}
            {index < steps.length - 1 && (
              <>
                <span aria-hidden="true" className="absolute -bottom-10 left-7 top-14 w-0.5 -translate-x-1/2 bg-line lg:hidden" />
                <span
                  aria-hidden="true"
                  data-line="y"
                  className="flow-y absolute -bottom-10 left-7 top-14 w-0.5 -translate-x-1/2 lg:hidden"
                />
              </>
            )}
            <span className="relative grid size-14 shrink-0 place-items-center rounded-full border-4 border-ground bg-navy font-display text-lg font-bold text-gold-bright tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pt-2 lg:pt-0">
              <h3 className="font-display text-xl font-bold text-navy">{step.title}</h3>
              <p className="mt-2 max-w-sm text-[17px] leading-relaxed text-ink-soft lg:mx-auto">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
