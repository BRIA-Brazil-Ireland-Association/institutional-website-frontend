"use client";

import { DefaultCard } from "@/components/ui/default-card";
import Skeleton from "@/components/ui/skeleton";
import { formatArticleDate } from "@/helpers/format-article-date";
import { Link } from "@/i18n/navigation";
import { useArticles } from "@/services/api/articles";
import { getMediaUrl } from "@/services/content";
import Image from "next/image";

export const RecentArticles = ({ locale }: { locale: string }) => {
  const { data, isPending, isError } = useArticles({
    locale,
    page: 1,
    pageSize: 3,
  });

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (isError || !data || data.articles.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-5">
      {data.articles.map((article, articleIndex) => {
        const imageUrl = getMediaUrl(article.coverImage);
        const formattedDate = formatArticleDate(article.date, locale);

        return (
          <Link
            className="block w-full sm:w-[calc((100%-2.5rem)/3)]"
            href={`/news/${article.slug}`}
            key={articleIndex}
          >
            <DefaultCard hoverable>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#eef0ef]">
                {imageUrl && (
                  <Image
                    alt={article.title}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    src={imageUrl}
                  />
                )}
              </div>

              <div className="mt-4">
                {formattedDate && (
                  <p className="text-xs font-semibold tracking-wide text-[#6b6b6b] uppercase">
                    {formattedDate}
                  </p>
                )}
                <h3 className="mt-1.5 line-clamp-2 text-base font-semibold text-[#1a1a1a]">
                  {article.title}
                </h3>
              </div>
            </DefaultCard>
          </Link>
        );
      })}
    </div>
  );
};
