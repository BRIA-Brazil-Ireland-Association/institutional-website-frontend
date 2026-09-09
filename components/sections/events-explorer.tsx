"use client";

import CalendarIcon from "@/components/Icons/CalendarIcon";
import ListIcon from "@/components/Icons/ListIcon";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { EventCard } from "./event-card";
import { EventsCalendar } from "./events-calendar";

type EventsExplorerView = "calendar" | "list";

type EventsExplorerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: { event: any; date: Date | undefined; isPast: boolean }[];
  locale: string;
  emptyStateMessage?: string;
};

type EventsListGroupProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: { event: any; date: Date | undefined; isPast: boolean }[];
  locale: string;
  onShowMore: () => void;
  title: string;
  visibleCount: number;
};

const EVENTS_PAGE_SIZE = 5;

const EventsListGroup = ({
  events,
  locale,
  onShowMore,
  title,
  visibleCount,
}: EventsListGroupProps) => {
  const visibleEvents = events.slice(0, visibleCount);
  const showMoreLabel = locale === "pt-BR" ? "Ver mais" : "See more";

  return (
    <div>
      <h3 className="text-lg font-semibold text-[#1a1a1a]">{title}</h3>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {visibleEvents.map(({ event, isPast }, eventIndex) => (
          <EventCard
            event={event}
            isPast={isPast}
            key={eventIndex}
            locale={locale}
          />
        ))}
      </div>

      {events.length > visibleCount && (
        <button
          className="mt-4 rounded-full border border-[#104722] px-4 py-2 text-sm font-semibold text-[#104722] transition-colors hover:bg-[#104722] hover:text-white"
          onClick={onShowMore}
          type="button"
        >
          {showMoreLabel}
        </button>
      )}
    </div>
  );
};

export const EventsExplorer = ({
  events,
  locale,
  emptyStateMessage,
}: EventsExplorerProps) => {
  const [view, setView] = useState<EventsExplorerView>("calendar");
  const [visibleUpcoming, setVisibleUpcoming] = useState(EVENTS_PAGE_SIZE);
  const [visiblePast, setVisiblePast] = useState(EVENTS_PAGE_SIZE);

  const upcomingEvents = events.filter(({ isPast }) => !isPast);
  const pastEvents = events.filter(({ isPast }) => isPast);

  if (events.length === 0) {
    return (
      Boolean(emptyStateMessage) && (
        <p className="mt-8 text-base text-[#3d3d3d]">{emptyStateMessage}</p>
      )
    );
  }

  return (
    <div className="mt-8">
      <div className="inline-flex rounded-full bg-white p-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
        <button
          aria-label="Calendar view"
          aria-pressed={view === "calendar"}
          className={cn(
            "flex items-center justify-center rounded-full px-3 py-2 transition-colors",
            view === "calendar"
              ? "bg-[#104722] text-white"
              : "text-[#1a1a1a] hover:bg-black/5",
          )}
          onClick={() => setView("calendar")}
          type="button"
        >
          <CalendarIcon className="size-4" />
        </button>

        <button
          aria-label="Compact view"
          aria-pressed={view === "list"}
          className={cn(
            "flex items-center justify-center rounded-full px-3 py-2 transition-colors",
            view === "list"
              ? "bg-[#104722] text-white"
              : "text-[#1a1a1a] hover:bg-black/5",
          )}
          onClick={() => setView("list")}
          type="button"
        >
          <ListIcon className="size-4" />
        </button>
      </div>

      {view === "calendar" ? (
        <EventsCalendar events={events} locale={locale} />
      ) : (
        <div className="mt-6 flex flex-col gap-10">
          {upcomingEvents.length > 0 && (
            <EventsListGroup
              events={upcomingEvents}
              locale={locale}
              onShowMore={() =>
                setVisibleUpcoming((count) => count + EVENTS_PAGE_SIZE)
              }
              title={
                locale === "pt-BR" ? "Próximos eventos" : "Upcoming events"
              }
              visibleCount={visibleUpcoming}
            />
          )}

          {pastEvents.length > 0 && (
            <EventsListGroup
              events={pastEvents}
              locale={locale}
              onShowMore={() =>
                setVisiblePast((count) => count + EVENTS_PAGE_SIZE)
              }
              title={locale === "pt-BR" ? "Eventos passados" : "Past events"}
              visibleCount={visiblePast}
            />
          )}
        </div>
      )}
    </div>
  );
};
