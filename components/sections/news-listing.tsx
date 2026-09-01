"use client";

import ChevronLeftIcon from "@/components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/Icons/ChevronRightIcon";
import { DefaultCard } from "@/components/ui/default-card";
import { SectionReveal } from "@/components/ui/section-reveal";
import Skeleton from "@/components/ui/skeleton";
import { formatArticleDate } from "@/helpers/format-article-date";
import { Link } from "@/i18n/navigation";
import type { Article } from "@/services/api/articles";
import { useArticles } from "@/services/api/articles";
import { getMediaUrl } from "@/services/cms";
import Image from "next/image";
import { useState } from "react";

const PAGE_SIZE = 9;

const copy: Record<
  string,
  {
    empty: string;
    error: string;
    previous: string;
    next: string;
    pageLabel: (page: number, pageCount: number) => string;
  }
> = {
  en: {
    empty: "No articles have been published yet. Check back soon.",
    error: "We couldn't load the news right now. Please try again later.",
    previous: "Previous",
    next: "Next",
    pageLabel: (page, pageCount) => `Page ${page} of ${pageCount}`,
  },
  "pt-BR": {
    empty: "Nenhum artigo foi publicado ainda. Volte em breve.",
    error:
      "Não foi possível carregar as notícias agora. Tente novamente mais tarde.",
    previous: "Anterior",
    next: "Próxima",
    pageLabel: (page, pageCount) => `Página ${page} de ${pageCount}`,
  },
};

const ArticleCard = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  const imageUrl = getMediaUrl(article.coverImage);
  const formattedDate = formatArticleDate(article.date, locale);

  return (
    <Link className="block h-full" href={`/news/${article.slug}`}>
      <DefaultCard
        hoverable
        className="flex h-full flex-col overflow-hidden p-0"
      >
        {imageUrl ? (
          <Image
            alt={article.title}
            className="h-48 w-full object-cover"
            height={360}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={imageUrl}
            width={640}
          />
        ) : (
          <div aria-hidden="true" className="h-48 w-full bg-[#f0eff1]" />
        )}

        <div className="flex flex-1 flex-col p-6">
          {formattedDate && (
            <span className="text-xs font-semibold tracking-wide text-[#1e3a8a] uppercase">
              {formattedDate}
            </span>
          )}

          <h3 className="mt-2 text-xl font-medium text-[#1a1a1a]">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#3d3d3d]">
              {article.excerpt}
            </p>
          )}
        </div>
      </DefaultCard>
    </Link>
  );
};

const NewsPagination = ({
  page,
  pageCount,
  onPageChange,
  t,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  t: (typeof copy)[string];
}) => {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        aria-label={t.previous}
        className="flex size-10 items-center justify-center rounded-full border border-[#104722] text-[#104722] transition-colors hover:bg-[#104722]/10 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        type="button"
      >
        <ChevronLeftIcon className="size-4" />
      </button>

      <span className="text-sm font-medium text-[#3d3d3d]">
        {t.pageLabel(page, pageCount)}
      </span>

      <button
        aria-label={t.next}
        className="flex size-10 items-center justify-center rounded-full border border-[#104722] text-[#104722] transition-colors hover:bg-[#104722]/10 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        type="button"
      >
        <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
};

export const NewsListing = ({
  locale,
  eyebrow,
  title,
}: {
  locale: string;
  eyebrow?: string;
  title?: string;
}) => {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useArticles({
    locale,
    page,
    pageSize: PAGE_SIZE,
  });
  const t = copy[locale] ?? copy.en;

  const articles = data?.articles ?? [];
  const pagination = data?.pagination;

  return (
    <div
      id="news"
      className="relative scroll-mt-20 overflow-hidden bg-white text-black"
    >
      <SectionReveal>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {eyebrow && (
            <p className="text-lg font-bold tracking-wide text-[#1e3a8a] uppercase">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-1 text-4xl font-medium text-[#1a1a1a] sm:text-5xl">
              {title}
            </h2>
          )}

          {isPending && (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton className="h-64" key={index} />
              ))}
            </div>
          )}

          {!isPending && isError && (
            <p className="mt-8 text-base text-[#3d3d3d]">{t.error}</p>
          )}

          {!isPending && !isError && articles.length === 0 && (
            <p className="mt-8 text-base text-[#3d3d3d]">{t.empty}</p>
          )}

          {!isPending && !isError && articles.length > 0 && (
            <>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    article={article}
                    key={article.documentId ?? article.id}
                    locale={locale}
                  />
                ))}
              </div>

              {pagination && (
                <NewsPagination
                  onPageChange={setPage}
                  page={pagination.page}
                  pageCount={pagination.pageCount}
                  t={t}
                />
              )}
            </>
          )}
        </div>
      </SectionReveal>
    </div>
  );
};
