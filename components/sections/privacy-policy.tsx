import { Circle } from "@/components/ui/circle";
import { RenderCms } from "@/components/ui/render-cms";
import { SectionReveal } from "@/components/ui/section-reveal";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { cn } from "@/libs/utils";
import { getText } from "@/services/content";

type PolicySection = {
  closing?: string;
  description?: string;
  id: string;
  items: string[];
  title: string;
};

const emphasisClassName = "font-semibold text-[#1a1a1a]";

const processPolicySections = (sections: unknown): PolicySection[] => {
  if (!Array.isArray(sections)) {
    return [];
  }

  return sections.reduce<PolicySection[]>((result, section) => {
    const id = getText(section, "id");
    const title = getText(section, "title");

    if (!id || !title) {
      return result;
    }

    const items = Array.isArray(section?.items)
      ? section.items.filter(
          (item: unknown): item is string =>
            typeof item === "string" && Boolean(item.trim()),
        )
      : [];

    result.push({
      closing: getText(section, "closing"),
      description: getText(section, "description"),
      id,
      items,
      title,
    });

    return result;
  }, []);
};

const PolicyParagraphs = ({
  className,
  text,
}: {
  className: string;
  text: string;
}) => (
  <>
    {text.split(/\n\s*\n/).map((paragraph, paragraphIndex) => (
      <p className={cn(className, "break-words")} key={paragraphIndex}>
        {renderEmphasizedText(paragraph.trim(), emphasisClassName)}
      </p>
    ))}
  </>
);

const formatSectionNumber = (index: number) =>
  String(index + 1).padStart(2, "0");

export const PrivacyPolicy = ({ locale }: { locale: string }) => {
  return (
    <RenderCms
      locale={locale}
      cmsPath="privacy-page"
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const lastUpdated = getText(content, "lastUpdated");
        const description = getText(content, "description");
        const tableOfContentsTitle = getText(content, "tableOfContentsTitle");
        const sections = processPolicySections(content?.sections);

        return (
          <div className="relative overflow-clip bg-[#f0eff1] text-black">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-1/4 bg-[#0b461b] lg:block"
            />
            <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
              <div className="z-1 rounded-xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.08)] sm:p-10 lg:p-14">
                <SectionReveal className="max-w-3xl">
                  {title && (
                    <p className="text-lg font-bold tracking-wide text-[#1e3a8a] uppercase">
                      {title}
                    </p>
                  )}

                  {sectionTitle && (
                    <h1 className="mt-1 text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
                      {sectionTitle}
                    </h1>
                  )}

                  {lastUpdated && (
                    <p className="mt-4 text-sm font-medium text-[#104722]">
                      {lastUpdated}
                    </p>
                  )}

                  {description && (
                    <PolicyParagraphs
                      className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg"
                      text={description}
                    />
                  )}
                </SectionReveal>

                <div className="mt-12 grid grid-cols-1 gap-12 border-t border-gray-200 pt-10 lg:grid-cols-[260px_1fr] lg:gap-16">
                  {sections.length > 0 && (
                    <nav
                      aria-label={tableOfContentsTitle ?? sectionTitle}
                      className="hidden lg:block"
                    >
                      <div className="sticky top-28">
                        {tableOfContentsTitle && (
                          <p className="text-sm font-semibold tracking-wide text-[#1a1a1a] uppercase">
                            {tableOfContentsTitle}
                          </p>
                        )}
                        <ol className="mt-4 space-y-2.5 border-l border-gray-200 text-sm">
                          {sections.map((section, index) => (
                            <li key={section.id}>
                              <a
                                className="-ml-px flex gap-3 border-l-2 border-transparent py-0.5 pl-4 text-[#3d3d3d] transition-colors hover:border-[#169b62] hover:text-[#104722] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                                href={`#${section.id}`}
                              >
                                <span className="font-semibold text-[#169b62] tabular-nums">
                                  {formatSectionNumber(index)}
                                </span>
                                <span>{section.title}</span>
                              </a>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </nav>
                  )}

                  <div className="max-w-3xl space-y-12">
                    {sections.map((section, index) => (
                      <section
                        aria-labelledby={`${section.id}-title`}
                        className="scroll-mt-28"
                        id={section.id}
                        key={section.id}
                      >
                        <h2
                          className="flex items-baseline gap-4 text-2xl font-medium text-[#1a1a1a] sm:text-3xl"
                          id={`${section.id}-title`}
                        >
                          <span
                            aria-hidden="true"
                            className="text-base font-semibold text-[#169b62] tabular-nums"
                          >
                            {formatSectionNumber(index)}
                          </span>
                          {section.title}
                        </h2>

                        {section.description && (
                          <PolicyParagraphs
                            className="mt-4 text-base leading-relaxed text-[#3d3d3d]"
                            text={section.description}
                          />
                        )}

                        {section.items.length > 0 && (
                          <ul className="mt-4 space-y-3 text-base leading-relaxed text-[#3d3d3d]">
                            {section.items.map((item, itemIndex) => (
                              <li className="flex gap-3" key={itemIndex}>
                                <span
                                  aria-hidden="true"
                                  className="mt-2.5 size-2 shrink-0 rounded-full bg-[#169b62]"
                                />
                                <span>
                                  {renderEmphasizedText(
                                    item,
                                    emphasisClassName,
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.closing && (
                          <PolicyParagraphs
                            className="mt-4 text-base leading-relaxed text-[#3d3d3d]"
                            text={section.closing}
                          />
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Circle
              className="absolute -right-24 -bottom-24 hidden lg:block"
              size="250px"
              borderSize="40px"
              color="#0b461b"
            />
          </div>
        );
      }}
    />
  );
};
