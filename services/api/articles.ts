import type { CmsEntry } from "@/services/cms";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Article = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  author?: string | null;
  coverImage?: CmsEntry | null;
  locale?: string;
};

export type ArticlesPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export type ArticlesPage = {
  articles: Article[];
  pagination: ArticlesPagination;
};

function isArticle(value: unknown): value is Article {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    typeof (value as Article).slug === "string"
  );
}

const fetchArticles = async ({
  locale,
  page,
  pageSize,
}: {
  locale: string;
  page: number;
  pageSize: number;
}): Promise<ArticlesPage> => {
  const searchParams = new URLSearchParams({
    locale,
    sort: "date:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
    "populate[coverImage]": "true",
  });

  const response = await fetch(`/api/cms/articles?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch articles (status ${response.status}).`);
  }

  const payload = await response.json();
  const articles = Array.isArray(payload?.data)
    ? payload.data.filter(isArticle)
    : [];

  const pagination: ArticlesPagination = payload?.meta?.pagination ?? {
    page,
    pageSize,
    pageCount: 1,
    total: articles.length,
  };

  return { articles, pagination };
};

export const useArticles = ({
  locale,
  page,
  pageSize = 9,
}: {
  locale: string;
  page: number;
  pageSize?: number;
}) => {
  return useQuery({
    queryKey: ["articles", locale, page, pageSize],
    queryFn: () => fetchArticles({ locale, page, pageSize }),
    placeholderData: keepPreviousData,
  });
};

const fetchArticleBySlug = async ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Promise<Article | null> => {
  const searchParams = new URLSearchParams({
    locale,
    "filters[slug][$eq]": slug,
    "populate[coverImage]": "true",
  });

  const response = await fetch(`/api/cms/articles?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch article (status ${response.status}).`);
  }

  const payload = await response.json();
  const articles = Array.isArray(payload?.data)
    ? payload.data.filter(isArticle)
    : [];

  return articles[0] ?? null;
};

export const useArticle = ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) => {
  return useQuery({
    queryKey: ["article", locale, slug],
    queryFn: () => fetchArticleBySlug({ locale, slug }),
    enabled: Boolean(slug),
  });
};
