import { getMediaUrl, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../../ui/section-reveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AboutGallery = ({ content }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const images: any[] = Array.isArray(content) ? content : [];

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#efecef] text-black">
      <SectionReveal>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 pb-26 sm:grid-cols-3 sm:px-6 lg:px-8">
          {images.map((image, imageIndex) => {
            const imageUrl = getMediaUrl(image);
            const imageAlt = getText(image, "alternativeText") ?? "";

            if (!imageUrl) {
              return null;
            }

            return (
              <Image
                alt={imageAlt}
                className="h-44 w-full rounded-md object-cover"
                height={352}
                key={image?.documentId ?? image?.id ?? imageIndex}
                sizes="(min-width: 640px) 33vw, 100vw"
                src={imageUrl}
                width={528}
              />
            );
          })}
        </div>
      </SectionReveal>
    </div>
  );
};
