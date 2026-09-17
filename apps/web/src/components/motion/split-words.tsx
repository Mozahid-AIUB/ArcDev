import { Fragment } from "react";

/**
 * Renders text as words that rise into view (animated by MotionRoot).
 * The words and spaces stay real text, so search engines and screen readers read it normally.
 */
export function SplitWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span data-words="" className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className="word-mask">
            <span data-word="">{word}</span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}
