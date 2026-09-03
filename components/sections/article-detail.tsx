"use client";

import Skeleton from "@/components/ui/skeleton";
import { formatArticleDate } from "@/helpers/format-article-date";
import { renderEmphasizedText } from "@/helpers/render-emphasized-text";
import { useArticle } from "@/services/api/articles";
import { getMediaUrl } from "@/services/content";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleComments } from "./article-comments";

const copy = {
  en: {
    error: "We couldn't load this article right now. Please try again later.",
  },
  "pt-BR": {
    error:
      "Não foi possível carregar este artigo agora. Tente novamente mais tarde.",
  },
} as const;

export const ArticleDetail = ({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) => {
  const { data: article, isPending, isError } = useArticle({ locale, slug });
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-4 h-80" />
        <Skeleton className="mt-4 h-40" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-base text-[#3d3d3d]">{t.error}</p>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const imageUrl = getMediaUrl(article.coverImage);
  const formattedDate = formatArticleDate(article.date, locale);

  return (
    <div className="relative overflow-hidden bg-white text-black">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#3d3d3d]">
          {formattedDate && <span>{formattedDate}</span>}
          {article.author && formattedDate && <span aria-hidden="true">·</span>}
          {article.author && <span>{article.author}</span>}
        </div>

        {imageUrl && (
          <Image
            alt={article.title}
            className="mt-6 h-auto w-full rounded-lg object-cover shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
            height={480}
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            src={imageUrl}
            width={768}
          />
        )}

        {article.content && (
          <div className="mt-8 text-base leading-relaxed text-[#3d3d3d] sm:text-lg">
            {renderEmphasizedText(
              article.content,
              "font-semibold text-[#1a1a1a]",
            )}
          </div>
        )}

        <ArticleComments locale={locale} slug={slug} />
      </div>
    </div>
  );
};
