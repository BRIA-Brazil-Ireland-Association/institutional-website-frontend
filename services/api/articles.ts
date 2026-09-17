import articlesEn from "@/content/en/articles.json";
import articlesPt from "@/content/pt-BR/articles.json";
import type { CmsEntry } from "@/services/content";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export type Article = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  date?: string | null;
  author?: string | null;
  coverImage?: CmsEntry | null;
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

const ARTICLES_BY_LOCALE: Record<string, Article[]> = {
  en: articlesEn as Article[],
  "pt-BR": articlesPt as Article[],
};

export const getArticles = (locale: string) => {
  return ARTICLES_BY_LOCALE[locale] ?? [];
};

const fetchArticles = async ({
  locale,
  page,
  pageSize,
}: {
  locale: string;
  page: number;
  pageSize: number;
}): Promise<ArticlesPage> => {
  const allArticles = getArticles(locale);
  const start = (page - 1) * pageSize;
  const articles = allArticles.slice(start, start + pageSize);
  const pagination: ArticlesPagination = {
    page,
    pageSize,
    pageCount: Math.max(1, Math.ceil(allArticles.length / pageSize)),
    total: allArticles.length,
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

export const getArticleBySlug = ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}): Article | null => {
  const allArticles = getArticles(locale);

  return allArticles.find((article) => article.slug === slug) ?? null;
};

const fetchArticleBySlug = async (params: {
  locale: string;
  slug: string;
}): Promise<Article | null> => {
  return getArticleBySlug(params);
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
