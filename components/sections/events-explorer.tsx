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

export const EventsExplorer = ({
  events,
  locale,
  emptyStateMessage,
}: EventsExplorerProps) => {
  const [view, setView] = useState<EventsExplorerView>("calendar");

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
        <div className="mt-6 grid grid-cols-1 gap-4">
          {events.map(({ event, isPast }, eventIndex) => (
            <EventCard
              event={event}
              isPast={isPast}
              key={eventIndex}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
};
