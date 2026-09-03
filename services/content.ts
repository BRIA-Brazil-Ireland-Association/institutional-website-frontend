import aboutEn from "@/content/en/about.json";
import aboutPageEn from "@/content/en/about-page.json";
import contactPageEn from "@/content/en/contact-page.json";
import eventsEn from "@/content/en/events.json";
import eventsComponentEn from "@/content/en/events-component.json";
import galleryPageEn from "@/content/en/gallery-page.json";
import galleryPhotosEn from "@/content/en/gallery-photos.json";
import globalEn from "@/content/en/global.json";
import heroEn from "@/content/en/hero.json";
import newsComponentEn from "@/content/en/news-component.json";
import partnerEn from "@/content/en/partner.json";
import teamEn from "@/content/en/team.json";
import teamPageEn from "@/content/en/team-page.json";

import aboutPt from "@/content/pt-BR/about.json";
import aboutPagePt from "@/content/pt-BR/about-page.json";
import contactPagePt from "@/content/pt-BR/contact-page.json";
import eventsPt from "@/content/pt-BR/events.json";
import eventsComponentPt from "@/content/pt-BR/events-component.json";
import galleryPagePt from "@/content/pt-BR/gallery-page.json";
import galleryPhotosPt from "@/content/pt-BR/gallery-photos.json";
import globalPt from "@/content/pt-BR/global.json";
import heroPt from "@/content/pt-BR/hero.json";
import newsComponentPt from "@/content/pt-BR/news-component.json";
import partnerPt from "@/content/pt-BR/partner.json";
import teamPt from "@/content/pt-BR/team.json";
import teamPagePt from "@/content/pt-BR/team-page.json";

export type CmsEntry = Record<string, unknown> & {
  url?: string;
};

export type CmsData = CmsEntry | CmsEntry[] | null;

const CONTENT_BY_PATH: Record<string, Record<string, CmsData>> = {
  about: { en: aboutEn, "pt-BR": aboutPt },
  "about-page": { en: aboutPageEn, "pt-BR": aboutPagePt },
  "contact-page": { en: contactPageEn, "pt-BR": contactPagePt },
  events: { en: eventsEn, "pt-BR": eventsPt },
  "events-component": { en: eventsComponentEn, "pt-BR": eventsComponentPt },
  global: { en: globalEn, "pt-BR": globalPt },
  "gallery-page": { en: galleryPageEn, "pt-BR": galleryPagePt },
  "gallery-photos": { en: galleryPhotosEn, "pt-BR": galleryPhotosPt },
  hero: { en: heroEn, "pt-BR": heroPt },
  "news-component": { en: newsComponentEn, "pt-BR": newsComponentPt },
  partner: { en: partnerEn, "pt-BR": partnerPt },
  team: { en: teamEn, "pt-BR": teamPt },
  "team-page": { en: teamPageEn, "pt-BR": teamPagePt },
};

export function getContent(cmsPath: string, locale: string): CmsData {
  return CONTENT_BY_PATH[cmsPath]?.[locale] ?? null;
}

export function getSingleContent(content: CmsData) {
  return Array.isArray(content) ? (content[0] ?? null) : content;
}

export function getText(
  content: CmsEntry | null | undefined,
  ...keys: string[]
) {
  for (const key of keys) {
    const value = content?.[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
}

export function getObject(content: CmsEntry | null | undefined, key: string) {
  const value = content?.[key];

  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as CmsEntry)
    : null;
}

export function getMediaUrl(media: CmsEntry | null | undefined) {
  return getText(media, "url");
}
