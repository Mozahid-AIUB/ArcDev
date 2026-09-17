interface Milestone {
  year: string;
  text: string;
}

/**
 * Vertical timeline. On phones the line runs down the left edge; on large screens it sits in
 * the centre and the milestones alternate left and right of it.
 */
export function MilestoneTimeline({ milestones }: { milestones: readonly Milestone[] }) {
  return (
    <div className="relative">
      {/* Track plus a gold line that draws while scrolling past the timeline. */}
      <span aria-hidden="true" className="absolute inset-y-0 left-4 w-px bg-line lg:left-1/2" />
      <span aria-hidden="true" data-line="y" className="absolute inset-y-0 left-4 w-px bg-gold lg:left-1/2" />

      <ol className="relative space-y-10 lg:space-y-4">
        {milestones.map((milestone, index) => {
          const onLeft = index % 2 === 0;
          return (
            <li key={milestone.year} className="relative pl-12 lg:grid lg:grid-cols-2 lg:gap-20 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute top-3 left-4 size-3 -translate-x-1/2 rounded-full bg-gold ring-4 ring-ground lg:left-1/2"
              />
              <div
                data-reveal={onLeft ? "left" : "right"}
                className={onLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-2"}
              >
                <p className="font-display text-3xl font-bold text-gold-deep sm:text-4xl">{milestone.year}</p>
                <p className="mt-2 text-lg leading-relaxed text-ink">{milestone.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
