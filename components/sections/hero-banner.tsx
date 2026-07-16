import { Circle } from "@/components/ui/circle";
import { RenderCms } from "@/components/ui/render-cms";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";

const KPI_VALUE_COLORS = ["text-[#0C4A17]", "text-[#312e81]", "text-[#F88600]"];

const populate = new URLSearchParams([
  ["populate[image]", "true"],
  ["[populate][kpis][populate]", "*"],
]);

export function HeroBanner({ locale }: { locale: string }) {
  return (
    <RenderCms
      locale={locale}
      populate={populate}
      cmsPath="hero"
      fallback={<Skeleton className="min-h-100" />}
      render={({ content }) => {
        const label = getText(content, "label");
        const title = getText(content, "title");
        const subtitle = getText(content, "subtitle");
        const image = getObject(content, "image");
        const imageUrl = getMediaUrl(image);
        const imageAlt = getText(image, "alternativeText") ?? "";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const kpis: any[] = Array.isArray(content?.kpis) ? content.kpis : [];

        return (
          <div className="relative bg-white text-black">
            <SectionReveal>
              {imageUrl && (
                <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
                  <Image
                    alt={imageAlt}
                    className="object-cover"
                    fetchPriority="high"
                    fill
                    priority
                    quality={65}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={imageUrl}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/90 lg:hidden"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 hidden w-40 bg-linear-to-r from-white to-transparent lg:block"
                  />
                </div>
              )}

              <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center gap-9 px-4 py-16 sm:px-6 lg:min-h-130 lg:px-8">
                <div className="max-w-xl">
                  {label && (
                    <p className="text-sm font-bold font-semibold tracking-widest text-[#104722] uppercase">
                      {label}
                      <span
                        aria-hidden="true"
                        className="mt-2 block h-0.5 w-10 bg-black/30"
                      />
                    </p>
                  )}

                  {title && (
                    <h1 className="mt-4 text-4xl leading-tight font-bold text-[#1a1a1a] sm:text-5xl">
                      {renderEmphasizedText(title, "text-[#169b62]")}
                    </h1>
                  )}

                  {subtitle && (
                    <p className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                      {renderEmphasizedText(
                        subtitle,
                        "font-semibold text-[#1a1a1a]",
                      )}
                    </p>
                  )}
                </div>

                {kpis.length > 0 && (
                  <ul className="flex w-full flex-wrap items-center justify-between gap-6 rounded-xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:gap-10 sm:px-8 lg:w-fit">
                    {kpis.map((kpi, kpiIndex) => {
                      const kpiValue = getText(kpi, "value");
                      const kpiLabel = getText(kpi, "label");
                      const kpiIcon = getObject(kpi, "icon");
                      const kpiIconUrl = getMediaUrl(kpiIcon);
                      const kpiIconAlt =
                        getText(kpiIcon, "alternativeText") ?? "";

                      return (
                        <li
                          className="flex items-center gap-3"
                          key={kpi?.id ?? kpiIndex}
                        >
                          {kpiIconUrl && (
                            <Image
                              alt={kpiIconAlt}
                              className="hidden h-12.5 w-12.5 shrink-0 object-contain md:block"
                              height={50}
                              src={kpiIconUrl}
                              width={50}
                            />
                          )}
                          <span className="flex flex-col">
                            <span
                              className={`text-xl leading-none font-extrabold md:text-3xl ${KPI_VALUE_COLORS[kpiIndex % KPI_VALUE_COLORS.length]}`}
                            >
                              {kpiValue}
                            </span>
                            <span className="text-xs text-[#1a1a1a] md:text-sm">
                              {kpiLabel}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div
                aria-hidden="true"
                className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 gap-2.5 lg:flex"
              >
                <span className="h-2 w-2 rounded-full bg-white" />
                <span className="h-2 w-2 rounded-full bg-white/55" />
                <span className="h-2 w-2 rounded-full bg-white/55" />
              </div>
            </SectionReveal>
            <Circle
              className="absolute -right-20 -bottom-35 hidden lg:block"
              size="300px"
              borderSize="45px"
              color="#0b461b"
            />
          </div>
        );
      }}
    />
  );
}
