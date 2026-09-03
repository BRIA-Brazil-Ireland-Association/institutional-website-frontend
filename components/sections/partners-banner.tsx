import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getObject, getText } from "@/services/content";
import Image from "next/image";
import { Button } from "../ui/button";
import { DefaultCard } from "../ui/default-card";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";

export function PartnersBanner({
  locale,
  compact,
}: {
  locale: string;
  compact: boolean;
}) {
  return (
    <RenderCms
      locale={locale}
      cmsPath="partner"
      render={({ content }) => {
        const title = getText(content, "title");
        const label = getText(content, "label");
        const description = getText(content, "description");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const partners: any[] = Array.isArray(content?.partners)
          ? content.partners
          : [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctas: any[] = Array.isArray(content?.cta) ? content.cta : [];

        return (
          <div id="partners" className="scroll-mt-20 bg-white text-black">
            <SectionReveal>
              <div className="mx-auto w-full max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8">
                {title && (
                  <h2 className="text-center text-xl font-semibold tracking-widest text-[#104722] uppercase">
                    {title}
                  </h2>
                )}

                {label && (
                  <h2 className="mt-1 text-center text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
                    {label}
                  </h2>
                )}

                {description && (
                  <p className="mt-5 text-center text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                    {renderEmphasizedText(
                      description,
                      "font-semibold text-[#1a1a1a]",
                    )}
                  </p>
                )}

                {partners.length > 0 && (
                  <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {partners.map((partner, partnerIndex) => {
                      const partnerUrl = getText(partner, "url");
                      const partnerName = getText(partner, "name");
                      const partnerDescription = getText(
                        partner,
                        "description",
                      );
                      const image = getObject(partner, "image");
                      const imageUrl = getMediaUrl(image);
                      const imageAlt =
                        getText(image, "alternativeText") ?? partnerName ?? "";

                      return (
                        <a
                          className="block rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                          href={partnerUrl ?? "#"}
                          key={partnerIndex}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <DefaultCard className="flex h-full flex-col items-center gap-3 text-center">
                            {imageUrl && (
                              <span className="relative block h-20 w-48 max-w-full">
                                <Image
                                  alt={imageAlt}
                                  className="object-contain"
                                  fill
                                  sizes="192px"
                                  src={imageUrl}
                                />
                              </span>
                            )}

                            {!compact && (
                              <>
                                {partnerName && (
                                  <h3 className="text-lg font-semibold text-[#1a1a1a]">
                                    {partnerName}
                                  </h3>
                                )}
                                {partnerDescription && (
                                  <p className="text-sm leading-relaxed text-[#3d3d3d]">
                                    {partnerDescription}
                                  </p>
                                )}
                              </>
                            )}
                          </DefaultCard>
                        </a>
                      );
                    })}
                  </div>
                )}
                {compact && (
                  <>
                    {ctas.length > 0 && (
                      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        {ctas.map((cta, ctaIndex) => {
                          const ctaLabel = getText(cta, "label");
                          const ctaHref = getText(cta, "href");

                          if (!ctaLabel || !ctaHref) {
                            return null;
                          }

                          const ctaAccessibleLabel = title
                            ? `${ctaLabel} - ${title}`
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
                  </>
                )}
              </div>
            </SectionReveal>
          </div>
        );
      }}
    />
  );
}
