import { cache } from "react";

type CmsProxyParams = {
  path: string[];
  revalidate?: number;
  searchParams: URLSearchParams;
};

export type CmsPopulate = string | URLSearchParams;

type GetCMSContentParams = {
  locale?: string;
  path: string[];
  populate?: CmsPopulate;
  revalidate?: number;
  searchParams?: URLSearchParams;
};

export type CmsEntry = Record<string, unknown> & {
  attributes?: CmsEntry;
  formats?: Record<string, { url?: string } | undefined>;
  locale?: string;
  localizations?: CmsEntry[];
  url?: string;
};

export type CmsData = CmsEntry | CmsEntry[] | null;

function getStrapiCmsUrl() {
  const strapiCmsUrl = process.env.NEXT_PUBLIC_STRAPI_CMS_URL?.trim();

  if (!strapiCmsUrl) {
    throw new Error("NEXT_PUBLIC_STRAPI_CMS_URL is not configured.");
  }

  return strapiCmsUrl;
}

export function getStrapiCmsOrigin() {
  return new URL(getStrapiCmsUrl()).origin;
}

function buildStrapiUrl({ path, searchParams }: CmsProxyParams) {
  const strapiUrl = new URL(getStrapiCmsUrl());
  const basePath = strapiUrl.pathname.replace(/\/$/, "");
  const hasApiPrefix = basePath === "/api" || basePath.endsWith("/api");
  const cmsPath = path.map((segment) => encodeURIComponent(segment)).join("/");

  strapiUrl.pathname = `${basePath}${hasApiPrefix ? "" : "/api"}/${cmsPath}`;
  strapiUrl.search = searchParams.toString();

  return strapiUrl;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeEntry(value: unknown): CmsEntry | null {
  if (!isObject(value)) {
    return null;
  }

  return (value.attributes ?? value) as CmsEntry;
}

function unwrapCmsData(payload: unknown): CmsData {
  if (!isObject(payload)) {
    return null;
  }

  const firstData = payload.data;

  if (Array.isArray(firstData)) {
    return firstData.filter(isObject).map((item) => item as CmsEntry);
  }

  if (!isObject(firstData)) {
    return normalizeEntry(payload);
  }

  const nestedData = firstData.data;

  if (Array.isArray(nestedData)) {
    return nestedData.filter(isObject).map((item) => item as CmsEntry);
  }

  if (isObject(nestedData)) {
    return normalizeEntry(nestedData);
  }

  return normalizeEntry(firstData);
}

function localizeEntry(entry: CmsEntry, locale: string) {
  const content = normalizeEntry(entry);

  if (!content || content.locale === locale) {
    return content;
  }

  const localization = content.localizations?.find(
    (item) => item.locale === locale,
  );

  if (!localization) {
    return content;
  }

  return {
    ...content,
    ...localization,
    localizations: content.localizations,
  };
}

function localizeCmsData(content: CmsData, locale?: string): CmsData {
  if (!locale || !content) {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((entry) => localizeEntry(entry, locale))
      .filter((entry): entry is CmsEntry => Boolean(entry));
  }

  return localizeEntry(content, locale);
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
  return normalizeEntry(content?.[key]);
}

export function getMediaUrl(media: CmsEntry | null | undefined) {
  const url =
    getText(media, "url") ??
    media?.formats?.large?.url ??
    media?.formats?.medium?.url ??
    media?.formats?.small?.url ??
    media?.formats?.thumbnail?.url;

  if (!url) {
    return undefined;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return new URL(url, getStrapiCmsUrl()).toString();
}

export async function proxyCmsGet({
  path,
  revalidate,
  searchParams,
}: CmsProxyParams) {
  const strapiUrl = buildStrapiUrl({ path, searchParams });
  const headers = new Headers({
    Accept: "application/json",
  });
  const strapiToken = process.env.STRAPI_CMS_TOKEN?.trim();

  if (strapiToken) {
    headers.set("Authorization", `Bearer ${strapiToken}`);
  }

  return fetch(strapiUrl, {
    ...(revalidate === undefined
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
    headers,
    method: "GET",
  });
}

const fetchCMSContent = cache(
  async (
    pathKey: string,
    searchParamsKey: string,
    locale?: string,
    revalidate?: number,
  ): Promise<CmsData> => {
    try {
      const response = await proxyCmsGet({
        path: JSON.parse(pathKey) as string[],
        revalidate,
        searchParams: new URLSearchParams(searchParamsKey),
      });

      if (!response.ok) {
        return null;
      }

      return localizeCmsData(unwrapCmsData(await response.json()), locale);
    } catch {
      return null;
    }
  },
);

export async function getCMSContent({
  locale,
  path,
  populate,
  revalidate,
  searchParams = new URLSearchParams(),
}: GetCMSContentParams): Promise<CmsData> {
  const cmsSearchParams = new URLSearchParams(searchParams);

  if (typeof populate === "string") {
    cmsSearchParams.set("populate", populate);
  } else if (populate) {
    populate.forEach((value, key) => {
      cmsSearchParams.append(key, value);
    });
  }

  if (locale) {
    cmsSearchParams.set("locale", locale);
  }

  cmsSearchParams.sort();

  return fetchCMSContent(
    JSON.stringify(path),
    cmsSearchParams.toString(),
    locale,
    revalidate,
  );
}
