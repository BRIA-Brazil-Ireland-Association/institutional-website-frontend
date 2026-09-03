import { Fragment } from "react";

const segmentPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g;
const linkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;
const trailingPunctuationPattern = /[.,;:!?)]+$/;

/**
 * Renders CMS text where `\n` becomes a line break, `**segment**` becomes a
 * span styled with `emphasisClassName`, `[label](href)` becomes a link, and
 * a bare `https://...` URL becomes a clickable link too.
 */
export const renderEmphasizedText = (
  text: string,
  emphasisClassName: string,
) => {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {line.split(segmentPattern).map((segment, segmentIndex) => {
        const linkMatch = segment.match(linkPattern);

        if (linkMatch) {
          const [, label, href] = linkMatch;
          const isExternal = /^https?:/.test(href);

          return (
            <a
              className="underline underline-offset-2 hover:no-underline"
              href={href}
              key={segmentIndex}
              rel={isExternal ? "noopener noreferrer" : undefined}
              target={isExternal ? "_blank" : undefined}
            >
              {label}
            </a>
          );
        }

        if (/^https?:\/\//.test(segment)) {
          const trailingMatch = segment.match(trailingPunctuationPattern);
          const trailingPunctuation = trailingMatch?.[0] ?? "";
          const href = trailingPunctuation
            ? segment.slice(0, -trailingPunctuation.length)
            : segment;

          return (
            <Fragment key={segmentIndex}>
              <a
                className="underline underline-offset-2 hover:no-underline"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {href}
              </a>
              {trailingPunctuation}
            </Fragment>
          );
        }

        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <span className={emphasisClassName} key={segmentIndex}>
              {segment.slice(2, -2).trim()}
            </span>
          );
        }

        return <Fragment key={segmentIndex}>{segment}</Fragment>;
      })}
      {lineIndex < lines.length - 1 && <br />}
    </Fragment>
  ));
};
