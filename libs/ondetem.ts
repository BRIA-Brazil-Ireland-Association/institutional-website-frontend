import { z } from "@/libs/validation";

export type OndeTemEvent = {
  date: string;
  title: string;
  description?: string;
  image?: string;
  url?: string;
  linkType?: "tickets" | "details";
};

const PAGE_SIZE = 100;
const MAX_PAGES = 10;
const REQUEST_TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 300;
const DISPLAY_TIME_ZONE = "Europe/Dublin";

const ACCEPT_LANGUAGE_BY_LOCALE: Record<string, string> = {
  en: "en",
  "pt-BR": "br",
};

const ondeTemEventSchema = z.object({
  encryptedId: z.string().regex(/^[A-Za-z0-9_-]+$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().trim().min(1),
  startTime: z.string().nullish(),
  endTime: z.string().nullish(),
  cityName: z.string().nullish(),
  address: z.string().nullish(),
  isOnlineEvent: z.boolean().nullish(),
  imageSquareCoverURL: z.string().nullish(),
  imageCoverURL: z.string().nullish(),
  linkToBuy: z.string().nullish(),
});

const getOndeTemConfig = () => {
  const apiKey = process.env.ONDE_TEM_KEY;
  const baseUrl = process.env.ONDE_TEM_URL;

  if (!apiKey || !baseUrl) {
    throw new Error("ONDE_TEM_KEY or ONDE_TEM_URL is not configured.");
  }

  return {
    apiKey,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    publicUrl: new URL(baseUrl).origin,
  };
};

const fetchEventsPage = async ({
  acceptLanguage,
  apiKey,
  baseUrl,
  page,
}: {
  acceptLanguage: string;
  apiKey: string;
  baseUrl: string;
  page: number;
}) => {
  const response = await fetch(
    `${baseUrl}/partner/v1/events?page=${page}&size=${PAGE_SIZE}`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": acceptLanguage,
        "X-API-Key": apiKey,
      },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    throw new Error(`OndeTem request failed (status ${response.status}).`);
  }

  const items: unknown = await response.json();

  if (!Array.isArray(items)) {
    throw new Error("OndeTem response is not a list.");
  }

  return {
    items,
    total: Number(response.headers.get("X-Total-Count")),
  };
};

const formatTime = (isoDate: string, locale: string) => {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  const formattedTime = new Intl.DateTimeFormat(
    locale === "pt-BR" ? "pt-BR" : "en-US",
    {
      hour: locale === "pt-BR" ? "2-digit" : "numeric",
      hourCycle: locale === "pt-BR" ? "h23" : "h12",
      minute: "2-digit",
      timeZone: DISPLAY_TIME_ZONE,
    },
  ).format(date);

  return locale === "pt-BR" ? formattedTime : formattedTime.toLowerCase();
};

const buildDescription = (
  event: z.infer<typeof ondeTemEventSchema>,
  locale: string,
) => {
  const start = event.startTime ? formatTime(event.startTime, locale) : null;
  const end = event.endTime ? formatTime(event.endTime, locale) : null;
  const separator = locale === "pt-BR" ? "às" : "to";
  const timeRange =
    start && end && start !== end ? `${start} ${separator} ${end}` : start;
  const address = event.address?.trim();
  const city = event.cityName?.trim();
  const cityAlreadyInAddress = Boolean(
    address && city && address.toLowerCase().includes(city.toLowerCase()),
  );
  const place = event.isOnlineEvent
    ? "Online"
    : [address, cityAlreadyInAddress ? undefined : city]
        .filter(Boolean)
        .join(", ");

  return [timeRange, place].filter(Boolean).join(" · ") || undefined;
};

const getHttpsUrl = (value: string | null | undefined) => {
  const url = value?.trim();

  return url?.startsWith("https://") ? url : undefined;
};

const normalizeEvent = (
  event: z.infer<typeof ondeTemEventSchema>,
  locale: string,
  publicUrl: string,
): OndeTemEvent => {
  const ticketsUrl = getHttpsUrl(event.linkToBuy);

  return {
    date: event.date,
    title: event.title,
    description: buildDescription(event, locale),
    image:
      getHttpsUrl(event.imageSquareCoverURL) ??
      getHttpsUrl(event.imageCoverURL),
    url: ticketsUrl ?? `${publicUrl}/events/${event.encryptedId}`,
    linkType: ticketsUrl ? "tickets" : "details",
  };
};

export const fetchOndeTemEvents = async (
  locale: string,
): Promise<OndeTemEvent[]> => {
  const { apiKey, baseUrl, publicUrl } = getOndeTemConfig();
  const acceptLanguage = ACCEPT_LANGUAGE_BY_LOCALE[locale] ?? "en";
  const rawEvents: unknown[] = [];

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const { items, total } = await fetchEventsPage({
      acceptLanguage,
      apiKey,
      baseUrl,
      page,
    });

    rawEvents.push(...items);

    const hasAllEvents = Number.isFinite(total) && rawEvents.length >= total;

    if (items.length < PAGE_SIZE || hasAllEvents) {
      break;
    }
  }

  return rawEvents.flatMap((rawEvent) => {
    const result = ondeTemEventSchema.safeParse(rawEvent);

    return result.success
      ? [normalizeEvent(result.data, locale, publicUrl)]
      : [];
  });
};
