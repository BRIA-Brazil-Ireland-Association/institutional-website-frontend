import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { getMediaUrl, getText } from "@/services/cms";
import Image from "next/image";
import { SectionReveal } from "../../ui/section-reveal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AboutCards = ({ content }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cards: any[] = Array.isArray(content) ? content : [];

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#efecef] text-black">
      <SectionReveal>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
          {cards.map((card, cardIndex) => {
            const cardTitle = getText(card, "title");
            const cardDescription = getText(card, "description");
            const icon = Array.isArray(card?.image) ? card.image[0] : null;
            const iconUrl = getMediaUrl(icon);
            const iconAlt = getText(icon, "alternativeText") ?? "";

            return (
              <div
                className="flex gap-5 rounded-lg bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                key={card?.id ?? cardIndex}
              >
                {iconUrl && (
                  <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#f0eff1]">
                    <Image
                      alt={iconAlt}
                      className="h-auto w-11 object-contain"
                      height={34}
                      src={iconUrl}
                      width={44}
                    />
                  </span>
                )}

                <div className="flex flex-col">
                  {cardTitle && (
                    <h2 className="text-base font-bold tracking-wide text-[#104722] uppercase">
                      {cardTitle}
                    </h2>
                  )}
                  {cardDescription && (
                    <p className="mt-2 text-sm leading-relaxed text-[#3d3d3d]">
                      {renderEmphasizedText(
                        cardDescription,
                        "font-semibold text-[#1a1a1a]",
                      )}
                    </p>
                  )}
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-0.5 w-8 bg-[#fb8500]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </SectionReveal>
    </div>
  );
};
