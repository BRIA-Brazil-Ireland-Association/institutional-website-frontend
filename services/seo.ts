import type { Metadata } from "next";

export const SITE_URL = "https://www.brazilirelandassociation.org";

type PageMetadataOptions = {
  alternateLocales?: string[];
  description?: string;
  image?: string;
  locale: string;
  path?: string;
  title?: string;
  type?: "article" | "website";
};

const getLocalePath = (locale: string, path = "") => {
  return `/${locale}${path}`;
};

const getLanguageAlternates = (locales: string[], path = "") => {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, getLocalePath(locale, path)]),
  );

  if (locales.includes("en")) {
    languages["x-default"] = getLocalePath("en", path);
  }

  return languages;
};

export const getPageMetadata = ({
  alternateLocales = ["en", "pt-BR"],
  description,
  image,
  locale,
  path = "",
  title,
  type = "website",
}: PageMetadataOptions): Metadata => {
  const canonical = getLocalePath(locale, path);

  return {
    title: path ? title : title ? { absolute: title } : undefined,
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(alternateLocales, path),
    },
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      locale: locale.replace("-", "_"),
      type,
      url: canonical,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
};

export const getDescription = (text?: string | null, maxLength = 160) => {
  if (!text) {
    return undefined;
  }

  const normalizedText = text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (normalizedText.length <= maxLength) {
    return normalizedText;
  }

  const truncatedText = normalizedText.slice(0, maxLength);
  const lastSpace = truncatedText.lastIndexOf(" ");

  return `${truncatedText.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`;
};
