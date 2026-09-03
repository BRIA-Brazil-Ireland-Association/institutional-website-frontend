"use client";

import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { cn } from "@/libs/utils";
import { useState } from "react";
import { EventCard } from "./event-card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CalendarEvent = { event: any; date: Date | undefined; isPast: boolean };

type CalendarCell = {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
};

const MAX_VISIBLE_INDICATORS = 3;

const buildDateKey = (date: Date) => date.toISOString().slice(0, 10);

const getTodayUtcDate = () => {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
};

const groupEventsByDate = (events: CalendarEvent[]) => {
  const map = new Map<string, CalendarEvent[]>();

  events.forEach((item) => {
    if (!item.date) {
      return;
    }

    const key = buildDateKey(item.date);
    const existing = map.get(key) ?? [];

    existing.push(item);
    map.set(key, existing);
  });

  return map;
};

const buildCalendarCells = (monthAnchor: Date): CalendarCell[] => {
  const year = monthAnchor.getUTCFullYear();
  const month = monthAnchor.getUTCMonth();
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const date = new Date(Date.UTC(year, month, 1 + (index - firstWeekday)));

    return {
      date,
      dateKey: buildDateKey(date),
      isCurrentMonth: date.getUTCMonth() === month,
    };
  });
};

const getWeekdayLabels = (locale: string) => {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: "UTC",
    weekday: "short",
  });

  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(Date.UTC(2023, 0, 1 + index))).replace(/\./g, ""),
  );
};

type EventsCalendarProps = {
  events: CalendarEvent[];
  locale: string;
};

export const EventsCalendar = ({ events, locale }: EventsCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();

    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  });
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const eventsByDate = groupEventsByDate(events);
  const calendarCells = buildCalendarCells(currentMonth);
  const weekdayLabels = getWeekdayLabels(locale);
  const todayKey = buildDateKey(getTodayUtcDate());
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(currentMonth);
  const monthEvents = events.filter(
    (item) =>
      item.date &&
      item.date.getUTCFullYear() === currentMonth.getUTCFullYear() &&
      item.date.getUTCMonth() === currentMonth.getUTCMonth(),
  );
  const displayedEvents = selectedDateKey
    ? (eventsByDate.get(selectedDateKey) ?? [])
    : monthEvents;
  const selectedDateLabel = selectedDateKey
    ? new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        timeZone: "UTC",
        year: "numeric",
      }).format(new Date(`${selectedDateKey}T00:00:00.000Z`))
    : monthLabel;

  const goToPreviousMonth = () => {
    setSelectedDateKey(null);
    setCurrentMonth(
      (previousMonth) =>
        new Date(
          Date.UTC(
            previousMonth.getUTCFullYear(),
            previousMonth.getUTCMonth() - 1,
            1,
          ),
        ),
    );
  };

  const goToNextMonth = () => {
    setSelectedDateKey(null);
    setCurrentMonth(
      (previousMonth) =>
        new Date(
          Date.UTC(
            previousMonth.getUTCFullYear(),
            previousMonth.getUTCMonth() + 1,
            1,
          ),
        ),
    );
  };

  const selectDay = (cell: CalendarCell, dayEvents: CalendarEvent[]) => {
    if (dayEvents.length === 0) {
      return;
    }

    setSelectedDateKey((currentKey) =>
      currentKey === cell.dateKey ? null : cell.dateKey,
    );
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <button
          aria-label="Previous month"
          className="flex size-9 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/5"
          onClick={goToPreviousMonth}
          type="button"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <span className="text-base font-semibold text-[#1a1a1a] capitalize">
          {monthLabel}
        </span>

        <button
          aria-label="Next month"
          className="flex size-9 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/5"
          onClick={goToNextMonth}
          type="button"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[420px]">
          <div className="grid grid-cols-7 gap-1">
            {weekdayLabels.map((label, labelIndex) => (
              <div
                className="py-1 text-center text-[11px] font-semibold tracking-wide text-[#1a1a1a]/60 uppercase"
                key={labelIndex}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarCells.map((cell) => {
              const dayEvents = eventsByDate.get(cell.dateKey) ?? [];
              const isToday = cell.dateKey === todayKey;
              const isSelected = cell.dateKey === selectedDateKey;
              const hasEvents = dayEvents.length > 0;

              const dayNumber = (
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-sm font-semibold",
                    isToday ? "bg-[#104722] text-white" : "text-[#1a1a1a]",
                  )}
                >
                  {cell.date.getUTCDate()}
                </span>
              );

              const indicators = hasEvents && (
                <span className="mt-1 flex items-center justify-center gap-0.5">
                  {dayEvents
                    .slice(0, MAX_VISIBLE_INDICATORS)
                    .map((_, dotIndex) => (
                      <span
                        className="size-1.5 rounded-full bg-[#104722]"
                        key={dotIndex}
                      />
                    ))}
                  {dayEvents.length > MAX_VISIBLE_INDICATORS && (
                    <span className="text-[10px] font-semibold text-[#104722]">
                      +{dayEvents.length - MAX_VISIBLE_INDICATORS}
                    </span>
                  )}
                </span>
              );

              if (!hasEvents) {
                return (
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center rounded-md py-2",
                      !cell.isCurrentMonth && "opacity-35",
                    )}
                    key={cell.dateKey}
                  >
                    {dayNumber}
                  </div>
                );
              }

              return (
                <button
                  aria-label={`${cell.date.getUTCDate()} - ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md py-2 transition-colors hover:bg-black/5",
                    !cell.isCurrentMonth && "opacity-35",
                    isSelected && "bg-[#d4ecf6]",
                  )}
                  key={cell.dateKey}
                  onClick={() => selectDay(cell, dayEvents)}
                  type="button"
                >
                  {dayNumber}
                  {indicators}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {displayedEvents.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-[#1a1a1a] capitalize">
            {selectedDateLabel}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {displayedEvents.map(({ event, isPast }, eventIndex) => (
              <EventCard
                event={event}
                isPast={isPast}
                key={eventIndex}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
