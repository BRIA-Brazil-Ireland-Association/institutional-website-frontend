import eventsEn from "@/content/en/events.json";
import eventsPt from "@/content/pt-BR/events.json";
import type { CmsEntry } from "@/services/content";
import { getText } from "@/services/content";
import { useQuery } from "@tanstack/react-query";

const EVENTS_BY_LOCALE: Record<string, CmsEntry[]> = {
  en: eventsEn as CmsEntry[],
  "pt-BR": eventsPt as CmsEntry[],
};

const normalizeTitle = (title: string | undefined) => {
  return (title ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const getEventKey = (event: CmsEntry) => {
  return `${getText(event, "date") ?? ""}|${normalizeTitle(getText(event, "title"))}`;
};

const fetchRemoteEvents = async ({
  locale,
}: {
  locale: string;
}): Promise<CmsEntry[]> => {
  try {
    const response = await fetch(
      `/api/events?locale=${encodeURIComponent(locale)}`,
    );

    if (!response.ok) {
      return [];
    }

    const body: unknown = await response.json();
    const data = (body as { data?: unknown } | null)?.data;

    return Array.isArray(data) ? (data as CmsEntry[]) : [];
  } catch {
    return [];
  }
};

const fetchEvents = async ({
  locale,
}: {
  locale: string;
}): Promise<CmsEntry[]> => {
  const staticEvents = EVENTS_BY_LOCALE[locale] ?? [];
  const remoteEvents = await fetchRemoteEvents({ locale });
  const knownKeys = new Set(staticEvents.map(getEventKey));
  const newRemoteEvents = remoteEvents.filter((event) => {
    const key = getEventKey(event);

    if (knownKeys.has(key)) {
      return false;
    }

    knownKeys.add(key);

    return true;
  });

  return [
    ...staticEvents.map((event) => ({ ...event, origin: "static" })),
    ...newRemoteEvents.map((event) => ({ ...event, origin: "ondetem" })),
  ];
};

export const useEvents = ({ locale }: { locale: string }) => {
  return useQuery({
    queryKey: ["events", locale],
    queryFn: () => fetchEvents({ locale }),
  });
};
