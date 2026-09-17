import { ArticleDetail } from "@/components/sections/article-detail";
import { getArticleBySlug, getArticles } from "@/services/api/articles";
import { getDescription, getPageMetadata } from "@/services/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type NewsArticleProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ["en", "pt-BR"].flatMap((locale) =>
    getArticles(locale).map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: NewsArticleProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug({ locale, slug });

  if (!article) {
    return {};
  }

  const alternateLocales = ["en", "pt-BR"].filter((alternateLocale) =>
    Boolean(getArticleBySlug({ locale: alternateLocale, slug })),
  );

  return getPageMetadata({
    alternateLocales,
    description: getDescription(article.excerpt ?? article.content),
    image: article.coverImage?.url,
    locale,
    path: `/news/${article.slug}`,
    title: article.title,
    type: "article",
  });
}

export default async function NewsArticle({ params }: NewsArticleProps) {
  const { locale, slug } = await params;
  const article = getArticleBySlug({ locale, slug });

  if (!article) {
    notFound();
  }

  return <ArticleDetail locale={locale} slug={slug} />;
}
