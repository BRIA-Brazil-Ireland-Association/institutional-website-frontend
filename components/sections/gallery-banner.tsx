import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getText } from "@/services/cms";
import { RenderCms } from "../ui/render-cms";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";
import { GalleryCarousel } from "./gallery-carousel";

const populate = new URLSearchParams([["populate[image]", "true"]]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processGalleryPhotos = (photos: any[]) => {
  return photos.length > 0 && photos.length < 10
    ? [...photos, ...photos]
    : photos;
};

export default function GalleryBanner({
  locale,
  compact,
}: {
  locale: string;
  compact: boolean;
}) {
  return (
    <RenderCms
      locale={locale}
      cmsPath="gallery-page"
      fallback={<Skeleton className="min-h-100" />}
      render={({ content: contentPage }) => {
        return (
          <RenderCms
            locale={locale}
            populate={populate}
            cmsPath="gallery-photos"
            fallback={<Skeleton className="min-h-100" />}
            render={({ content }) => {
              const title = getText(contentPage, "title");
              const description = getText(contentPage, "description");

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const photos: any[] = Array.isArray(content) ? content : [];
              const slides = processGalleryPhotos(photos);

              if (slides.length === 0) {
                return null;
              }

              return (
                <div
                  id="gallery"
                  className="relative scroll-mt-20 overflow-hidden bg-white pb-20 text-black"
                >
                  {!compact && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 hidden w-1/4 bg-[#0b461b] lg:block"
                    />
                  )}
                  <SectionReveal>
                    <div className="mx-auto w-full max-w-7xl py-10">
                      <h2 className="text-center text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
                        {title}
                      </h2>
                      {Boolean(description) && (
                        <p className="mt-5 text-center text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                          {renderEmphasizedText(
                            description!,
                            "font-semibold text-[#1a1a1a]",
                          )}
                        </p>
                      )}

                      <GalleryCarousel key={photos.length} slides={slides} />
                    </div>
                  </SectionReveal>
                </div>
              );
            }}
          />
        );
      }}
    />
  );
}
