import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getText } from "@/services/content";
import { Button } from "../ui/button";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";
import { RecentArticles } from "./recent-articles";

export function NewsBanner({ locale }: { locale: string }) {
  return (
    <RenderCms
      locale={locale}
      cmsPath="news-component"
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const description = getText(content, "description");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctas: any[] = Array.isArray(content?.cta) ? content.cta : [];

        return (
          <div id="news" className="relative scroll-mt-20 bg-white text-black">
            <SectionReveal>
              <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  {title && (
                    <p className="text-lg font-bold tracking-wide text-[#1e3a8a] uppercase">
                      {title}
                    </p>
                  )}

                  {sectionTitle && (
                    <h2 className="mt-1 text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
                      {sectionTitle}
                    </h2>
                  )}

                  {description && (
                    <p className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                      {renderEmphasizedText(
                        description,
                        "font-semibold text-[#1a1a1a]",
                      )}
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <RecentArticles locale={locale} />
                </div>

                {ctas.length > 0 && (
                  <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {ctas.map((cta, ctaIndex) => {
                      const ctaLabel = getText(cta, "label");
                      const ctaHref = getText(cta, "href");

                      if (!ctaLabel || !ctaHref) {
                        return null;
                      }

                      const ctaAccessibleLabel = sectionTitle
                        ? `${ctaLabel} - ${sectionTitle}`
                        : ctaLabel;

                      return (
                        <Button
                          aria-label={ctaAccessibleLabel}
                          href={ctaHref}
                          key={ctaIndex}
                        >
                          {ctaLabel}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </SectionReveal>
          </div>
        );
      }}
    />
  );
}
