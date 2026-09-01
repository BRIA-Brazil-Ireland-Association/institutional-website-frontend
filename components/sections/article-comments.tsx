"use client";

import ThumbsDownIcon from "@/components/Icons/ThumbsDownIcon";
import ThumbsUpIcon from "@/components/Icons/ThumbsUpIcon";
import Skeleton from "@/components/ui/skeleton";
import { formatArticleDate } from "@/helpers/format-article-date";
import { cn } from "@/libs/utils";
import {
  type CommentReaction,
  useArticleComments,
  useReactToCommentMutation,
} from "@/services/api/comments";
import { useState } from "react";
import { CommentForm } from "./comment-form";

const copy = {
  en: {
    heading: "Comments",
    empty: "Be the first to leave a comment.",
    error: "We couldn't load the comments right now.",
    like: "Like",
    dislike: "Dislike",
  },
  "pt-BR": {
    heading: "Comentários",
    empty: "Seja o primeiro a comentar.",
    error: "Não foi possível carregar os comentários agora.",
    like: "Curtir",
    dislike: "Não curtir",
  },
} as const;

const VOTES_STORAGE_KEY = "bria-comment-votes";

const readStoredVotes = (): Record<string, CommentReaction> => {
  try {
    const raw = window.localStorage.getItem(VOTES_STORAGE_KEY);

    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeStoredVotes = (votes: Record<string, CommentReaction>) => {
  try {
    window.localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(votes));
  } catch {
    return;
  }
};

export const ArticleComments = ({
  slug,
  articleDocumentId,
  locale,
}: {
  slug: string;
  articleDocumentId: string;
  locale: string;
}) => {
  const { data: comments, isPending, isError } = useArticleComments({ slug });
  const reactMutation = useReactToCommentMutation({ slug });
  const [votes, setVotes] = useState<Record<string, CommentReaction>>(() =>
    typeof window === "undefined" ? {} : readStoredVotes(),
  );
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  const handleReaction = (documentId: string, reaction: CommentReaction) => {
    if (votes[documentId] || reactMutation.isPending) {
      return;
    }

    reactMutation.mutate(
      { documentId, reaction },
      {
        onSuccess: () => {
          setVotes((current) => {
            const next = { ...current, [documentId]: reaction };

            writeStoredVotes(next);

            return next;
          });
        },
      },
    );
  };

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
          {comments.map((comment) => {
            const votedReaction = votes[comment.documentId];

            return (
              <li
                className="border-b border-gray-100 pb-4"
                key={comment.documentId ?? comment.id}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-[#3d3d3d]">
                    {formatArticleDate(comment.createdAt, locale)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#3d3d3d]">
                  {comment.content}
                </p>

                <div className="mt-3 flex items-center gap-4">
                  <button
                    aria-label={t.like}
                    aria-pressed={votedReaction === "like"}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                      votedReaction
                        ? "cursor-not-allowed text-[#3d3d3d]/40"
                        : "text-[#3d3d3d] hover:text-[#104722]",
                      votedReaction === "like" && "text-[#104722]",
                    )}
                    disabled={Boolean(votedReaction) || reactMutation.isPending}
                    onClick={() => handleReaction(comment.documentId, "like")}
                    type="button"
                  >
                    <ThumbsUpIcon className="size-4" />
                    {comment.likes}
                  </button>

                  <button
                    aria-label={t.dislike}
                    aria-pressed={votedReaction === "dislike"}
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold transition-colors",
                      votedReaction
                        ? "cursor-not-allowed text-[#3d3d3d]/40"
                        : "text-[#3d3d3d] hover:text-red-700",
                      votedReaction === "dislike" && "text-red-700",
                    )}
                    disabled={Boolean(votedReaction) || reactMutation.isPending}
                    onClick={() =>
                      handleReaction(comment.documentId, "dislike")
                    }
                    type="button"
                  >
                    <ThumbsDownIcon className="size-4" />
                    {comment.dislikes}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <CommentForm articleDocumentId={articleDocumentId} locale={locale} />
    </div>
  );
};
