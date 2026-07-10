import { Circle } from "@/components/ui/circle";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../../ui/section-reveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AboutHeroBanner = ({ content }: any) => {
  const title = getText(content, "title");
  const sectionTitle = getText(content, "sectionTitle");
  const description = getText(content, "description");
  const image = getObject(content, "image");
  const imageUrl = getMediaUrl(image);
  const imageAlt = getText(image, "alternativeText") ?? "";
  const imageWidth = typeof image?.width === "number" ? image.width : 866;
  const imageHeight = typeof image?.height === "number" ? image.height : 816;

  return (
    <div className="relative overflow-hidden bg-[#efecef] pb-10 text-black">
      <div
        aria-hidden="true"
        className="absolute top-24 right-0 bottom-24 hidden w-1/4 bg-[#0b461b] lg:block"
      />
      <SectionReveal>
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:px-8">
          <div className="max-w-xl">
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

            {description && (
              <p className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                {renderEmphasizedText(
                  description,
                  "font-semibold text-[#1a1a1a]",
                )}
              </p>
            )}
            <div className="mt-4 h-0.5 w-25 bg-[#fb8500]" />
          </div>

          {imageUrl && (
            <Image
              alt={imageAlt}
              className="h-auto w-full rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
              height={imageHeight}
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              src={imageUrl}
              width={imageWidth}
            />
          )}
        </div>
      </SectionReveal>
      <Circle
        className="absolute top-20 -left-52 hidden lg:block"
        size="280px"
        borderSize="45px"
        color="#0b461b"
        immediate
      />
      <Circle
        className="absolute -bottom-30 left-[30%] hidden lg:block"
        size="200px"
        borderSize="35px"
        color="#fb8500"
      />
      <Circle
        className="absolute bottom-[-30%] left-[30%] hidden lg:block"
        size="220px"
        borderSize="45px"
        color="#FF9606"
        immediate
      />
    </div>
  );
};
