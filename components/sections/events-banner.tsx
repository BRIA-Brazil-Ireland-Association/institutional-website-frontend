"use client";

import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { Button } from "@/components/ui/button";
import { Circle } from "@/components/ui/circle";
import { RenderCms } from "@/components/ui/render-cms";
import { formatEventDate } from "@/helpers/format-event-date";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { useEvents } from "@/services/api/events";
import { getMediaUrl, getObject, getText } from "@/services/content";
import Image from "next/image";
import { SectionReveal } from "../ui/section-reveal";
import Skeleton from "../ui/skeleton";
import { EventsExplorer } from "./events-explorer";

const parseEventDate = (dateText: string | undefined) => {
  if (!dateText) {
    return undefined;
  }

  const [year, month, day] = dateText.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(Date.UTC(year, month - 1, day));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const processEvents = (eventItems: any[], compact: boolean) => {
  const now = new Date();
  const todayUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );

  const withDates = eventItems.map((event) => ({
    event,
    date: parseEventDate(getText(event, "date")),
  }));

  const sorted = [...withDates].sort((a, b) => {
    if (!a.date && !b.date) {
      return 0;
    }

    if (!a.date) {
      return 1;
    }

    if (!b.date) {
      return -1;
    }

    return a.date.getTime() - b.date.getTime();
  });

  const filtered = compact
    ? sorted.filter(({ date }) => !date || date.getTime() >= todayUtc)
    : sorted;

  const result = filtered.map(({ event, date }) => ({
    event,
    date,
    isPast: Boolean(date && date.getTime() < todayUtc),
  }));

  return compact ? result.slice(0, 3) : result;
};

export function EventsBanner({
  locale,
  compact,
}: {
  locale: string;
  compact: boolean;
}) {
  const { data: events, isPending } = useEvents({ locale });

  return (
    <RenderCms
      locale={locale}
      cmsPath="events-component"
      render={({ content }) => {
        const title = getText(content, "title");
        const sectionTitle = getText(content, "sectionTitle");
        const description = getText(content, "description");
        const emptyStateMessage = getText(content, "emptyStateMessage");
        const image = getObject(content, "image");

        const imageUrl = getMediaUrl(image);
        const imageAlt = getText(image, "alternativeText") ?? "";
        const imageWidth = typeof image?.width === "number" ? image.width : 866;
        const imageHeight =
          typeof image?.height === "number" ? image.height : 816;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctas: any[] = Array.isArray(content?.cta) ? content.cta : [];
        const processedEvents = processEvents(events ?? [], compact);

        return (
          <div
            id="events"
            className="relative scroll-mt-20 overflow-hidden bg-[#d4ecf6] text-black"
          >
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-1/4 bg-[#312e81] lg:block"
            />
            {isPending ? (
              <Skeleton className="min-h-100" />
            ) : (
              <SectionReveal>
                <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
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

                  <div className="order-0 md:order-1">
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

                    {Boolean(description && !compact) && (
                      <p className="mt-5 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
                        {renderEmphasizedText(
                          description!,
                          "font-semibold text-[#1a1a1a]",
                        )}
                      </p>
                    )}

                    {compact ? (
                      processedEvents.length > 0 && (
                        <div className="mt-8 grid grid-cols-1 gap-4">
                          {processedEvents.map(
                            ({ event, isPast }, eventIndex) => {
                              const eventTitle = getText(event, "title");
                              const eventDescription = getText(
                                event,
                                "description",
                              );
                              const eventUrl = getText(event, "url");
                              const eventDate = formatEventDate(
                                getText(event, "date"),
                                locale,
                              );

                              return (
                                <Link
                                  className={cn(
                                    "relative flex overflow-hidden rounded-md bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_14px_28px_rgba(0,0,0,0.16)]",
                                    isPast && "opacity-50 grayscale",
                                  )}
                                  href={eventUrl ?? "#"}
                                  key={eventIndex}
                                >
                                  {eventDate && (
                                    <span className="flex w-16 shrink-0 flex-col items-center justify-center bg-[#104722] px-2 py-3 text-white">
                                      <span className="text-3xl leading-none font-bold">
                                        {eventDate.day}
                                      </span>
                                      <span className="mt-1 text-sm leading-none font-semibold uppercase">
                                        {eventDate.month}
                                      </span>
                                    </span>
                                  )}

                                  <span className="flex-1 p-3 pb-5">
                                    {eventTitle && (
                                      <span className="block border-b border-[#1a1a1a]/60 pb-1 text-sm font-bold text-[#1a1a1a]">
                                        {eventTitle}
                                      </span>
                                    )}
                                    {eventDescription && (
                                      <span className="mt-1.5 block text-xs leading-snug text-[#3d3d3d]">
                                        {eventDescription}
                                      </span>
                                    )}
                                  </span>

                                  <span
                                    aria-hidden="true"
                                    className="absolute right-0 bottom-0 flex h-5 w-6 items-center justify-center bg-[#104722] text-white"
                                  >
                                    <ChevronRightIcon className="size-3" />
                                  </span>
                                </Link>
                              );
                            },
                          )}
                        </div>
                      )
                    ) : (
                      <EventsExplorer
                        emptyStateMessage={emptyStateMessage}
                        events={processedEvents}
                        locale={locale}
                      />
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
                </div>
              </SectionReveal>
            )}
            <Circle
              className="absolute -right-24 -bottom-16 hidden lg:block"
              size="220px"
              borderSize="35px"
              color="#0b461b"
            />
          </div>
        );
      }}
    />
  );
}
