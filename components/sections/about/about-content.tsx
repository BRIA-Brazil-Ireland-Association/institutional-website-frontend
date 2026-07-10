import { Circle } from "@/components/ui/circle";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getObject, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../../ui/section-reveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AboutContent = ({ content }: any) => {
  const containerText = getText(content, "containerText");
  const mainImage = getObject(content, "mainImage");
  const mainImageUrl = getMediaUrl(mainImage);
  const mainImageAlt = getText(mainImage, "alternativeText") ?? "";
  const mainImageWidth =
    typeof mainImage?.width === "number" ? mainImage.width : 280;
  const mainImageHeight =
    typeof mainImage?.height === "number" ? mainImage.height : 350;

  if (!containerText && !mainImageUrl) {
    return null;
  }

  return (
    <div className="relative bg-[#efecef] text-black">
      <SectionReveal>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-10 pb-30 sm:px-6 lg:gap-16 lg:px-8">
          {containerText && (
            <div className="max-w-none lg:max-w-2xl">
              <p className="text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                {renderEmphasizedText(
                  containerText,
                  "font-semibold text-[#1a1a1a]",
                )}
              </p>
              <span
                aria-hidden="true"
                className="mt-8 block h-0.5 w-50 bg-[#fb8500]"
              />
            </div>
          )}

          {mainImageUrl && (
            <>
              <Circle
                className="absolute right-[25%] bottom-[40%] z-10 hidden lg:block"
                size="230px"
                borderSize="35px"
                color="#0b461b"
              />
              <Image
                alt={mainImageAlt}
                className="absolute right-0 hidden h-auto w-120 object-contain lg:block"
                height={mainImageHeight}
                sizes="256px"
                src={mainImageUrl}
                width={mainImageWidth}
              />
            </>
          )}
        </div>
      </SectionReveal>
    </div>
  );
};
