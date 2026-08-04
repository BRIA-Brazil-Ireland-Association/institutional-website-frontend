import { Circle } from "@/components/ui/circle";
import { RenderCms } from "@/components/ui/render-cms";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";

const populate = new URLSearchParams([
  ["populate[image]", "true"],
  ["populate[cta][populate]", "*"],
]);

export function AboutBanner({
  locale,
  compact,
  cmsPath = "about",
  overPopulate = null,
  className = "",
}: {
  overPopulate?: null | URLSearchParams;
  compact: boolean;
  locale: string;
  cmsPath?: string;
  className?: string;
}) {
  return (
    <RenderCms
      locale={locale}
      populate={overPopulate ?? populate}
      cmsPath={cmsPath}
      fallback={<Skeleton className="min-h-100" />}
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const description = getText(content, "description");
        const image = getObject(content, "image");
        const imageUrl = getMediaUrl(image);
        const imageAlt = getText(image, "alternativeText") ?? "";
        const imageWidth =
          typeof image?.width === "number" ? image.width : 1484;
        const imageHeight =
          typeof image?.height === "number" ? image.height : 698;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctas: any[] = Array.isArray(content?.cta) ? content.cta : [];
        return (
          <div
            id="about"
            className="relative scroll-mt-20 overflow-hidden bg-[#f0eff1] text-black"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-1/4 bg-[#0b461b] lg:block"
            />
            <SectionReveal>
              <div
                className={cn(
                  "relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8",
                  className,
                )}
              >
                {imageUrl && (
                  <Image
                    alt={imageAlt}
                    className="order-1 h-auto w-full rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:order-0"
                    height={imageHeight}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={imageUrl}
                    width={imageWidth}
                  />
                )}

                <div className="order-0 max-w-xl md:order-1">
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

                  {compact && (
                    <>
                      {ctas.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-4">
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
                              <Link
                                aria-label={ctaAccessibleLabel}
                                className="rounded-full bg-[#104722] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b461b]"
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
              </div>
            </SectionReveal>
            <Circle
              className="absolute -bottom-35 left-[35%] hidden lg:block"
              size="250px"
              borderSize="40px"
              color="#fb8500"
            />
          </div>
        );
      }}
    />
  );
}
