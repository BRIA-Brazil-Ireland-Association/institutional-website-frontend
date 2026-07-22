import { Link } from "@/i18n/navigation";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";

const populate = new URLSearchParams([
  ["populate[partners][populate][image]", "true"],
  ["populate[cta]", "true"],
]);

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
      populate={populate}
      cmsPath="partner"
      fallback={<Skeleton className="min-h-100" />}
      render={({ content }) => {
        const title = getText(content, "title");
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

                {partners.length > 0 && (
                  <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {partners.map((partner, partnerIndex) => {
                      const partnerUrl = getText(partner, "url");
                      const image = getObject(partner, "image");
                      const imageUrl = getMediaUrl(image);
                      const imageAlt = getText(image, "alternativeText") ?? "";

                      return (
                        <a
                          className="flex h-44 items-center justify-center rounded-xl border border-gray-100 shadow-xl transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#169b62]"
                          href={partnerUrl ?? "#"}
                          key={partner?.id ?? partnerIndex}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {imageUrl && (
                            <span className="relative block h-20 w-48 max-w-[70%]">
                              <Image
                                alt={imageAlt}
                                className="object-contain"
                                fill
                                sizes="192px"
                                src={imageUrl}
                              />
                            </span>
                          )}
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
                            <Link
                              aria-label={ctaAccessibleLabel}
                              className="rounded-full bg-[#9c9c9c] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b461b]"
                              href={ctaHref}
                              key={cta?.id ?? ctaIndex}
                            >
                              {ctaLabel}
                            </Link>
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
