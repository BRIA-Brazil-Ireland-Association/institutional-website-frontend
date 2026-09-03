"use client";

import Skeleton from "@/components/ui/skeleton";
import { formatArticleDate } from "@/helpers/format-article-date";
import { useArticleComments } from "@/services/api/comments";
import { CommentForm } from "./comment-form";

const copy = {
  en: {
    heading: "Comments",
    empty: "Be the first to leave a comment.",
    error: "We couldn't load the comments right now.",
  },
  "pt-BR": {
    heading: "Comentários",
    empty: "Seja o primeiro a comentar.",
    error: "Não foi possível carregar os comentários agora.",
  },
} as const;

export const ArticleComments = ({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) => {
  const { data: comments, isPending, isError } = useArticleComments({ slug });
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-medium text-[#1a1a1a]">{t.heading}</h2>

      {isPending && (
        <div className="mt-6 space-y-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      )}

      {!isPending && isError && (
        <p className="mt-6 text-sm text-[#3d3d3d]">{t.error}</p>
      )}

      {!isPending && !isError && comments && comments.length === 0 && (
        <p className="mt-6 text-sm text-[#3d3d3d]">{t.empty}</p>
      )}

      {!isPending && !isError && comments && comments.length > 0 && (
        <ul className="mt-6 space-y-6">
          {comments.map((comment, commentIndex) => (
            <li className="border-b border-gray-100 pb-4" key={commentIndex}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1a1a1a]">
                  {comment.authorName}
                </span>
                <span className="text-xs text-[#3d3d3d]">
                  {formatArticleDate(comment.createdAt ?? undefined, locale)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#3d3d3d]">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      <CommentForm locale={locale} slug={slug} />
    </div>
  );
};
