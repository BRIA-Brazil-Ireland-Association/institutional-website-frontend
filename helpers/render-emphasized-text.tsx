import { Fragment } from "react";

/**
 * Renders CMS text where `\n` becomes a line break and `**segment**`
 * becomes a span styled with `emphasisClassName`.
 */
export const renderEmphasizedText = (
  text: string,
  emphasisClassName: string,
) => {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {line.split(/(\*\*[^*]+\*\*)/g).map((segment, segmentIndex) => {
        if (segment.startsWith("**") && segment.endsWith("**")) {
          return (
            <span className={emphasisClassName} key={segmentIndex}>
              {segment.slice(2, -2).trim()}
            </span>
          );
        }

        return <Fragment key={segmentIndex}>{segment}</Fragment>;
      })}
      {lineIndex < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
};
