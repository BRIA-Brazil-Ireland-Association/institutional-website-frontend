import { Fragment } from "react";

const segmentPattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
const linkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;

/**
 * Renders CMS text where `\n` becomes a line break, `**segment**` becomes a
 * span styled with `emphasisClassName`, and `[label](href)` becomes a link.
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
