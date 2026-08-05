"use client";

import { getMediaUrl, getObject, getText } from "@/services/cms";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

export const GalleryCarousel = ({
  slides,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slides: any[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: true })],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative mt-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex cursor-grab active:cursor-grabbing">
          {slides.map((photo, photoIndex) => {
            const image = getObject(photo, "image");
            const imageUrl = getMediaUrl(image);
            const description = getText(photo, "description");
            const imageAlt =
              getText(image, "alternativeText") ?? description ?? "";

            if (!imageUrl) {
              return null;
            }

            return (
              <div
                className="w-52 flex-none pl-4 sm:w-64 md:w-72"
                key={`${photo?.id ?? photoIndex}-${photoIndex}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
                  <Image
                    alt={imageAlt}
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 18rem, 13rem"
                    src={imageUrl}
                  />

                  {description && (
                    <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <span className="text-sm font-medium text-white">
                        {description}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        aria-label="Previous photo"
        className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-[#169b62] hover:text-white"
        onClick={scrollPrev}
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        aria-label="Next photo"
        className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-[#169b62] hover:text-white"
        onClick={scrollNext}
        type="button"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
