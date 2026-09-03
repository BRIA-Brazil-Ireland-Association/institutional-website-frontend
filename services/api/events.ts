import eventsEn from "@/content/en/events.json";
import eventsPt from "@/content/pt-BR/events.json";
import type { CmsEntry } from "@/services/content";
import { useQuery } from "@tanstack/react-query";

const EVENTS_BY_LOCALE: Record<string, CmsEntry[]> = {
  en: eventsEn as CmsEntry[],
  "pt-BR": eventsPt as CmsEntry[],
};

const fetchEvents = async ({
  locale,
}: {
  locale: string;
}): Promise<CmsEntry[]> => {
  return EVENTS_BY_LOCALE[locale] ?? [];
};

export const useEvents = ({ locale }: { locale: string }) => {
  return useQuery({
    queryKey: ["events", locale],
    queryFn: () => fetchEvents({ locale }),
  });
};
