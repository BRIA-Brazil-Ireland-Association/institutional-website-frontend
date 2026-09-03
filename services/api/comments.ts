import commentsBySlug from "@/content/comments.json";
import { useQuery } from "@tanstack/react-query";

export type ArticleComment = {
  authorName: string;
  authorEmail: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
};

const COMMENTS_BY_SLUG: Record<string, ArticleComment[]> = commentsBySlug;

const fetchArticleComments = async ({
  slug,
}: {
  slug: string;
}): Promise<ArticleComment[]> => {
  return COMMENTS_BY_SLUG[slug] ?? [];
};

export const useArticleComments = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["article-comments", slug],
    queryFn: () => fetchArticleComments({ slug }),
    enabled: Boolean(slug),
  });
};

// Submitting new comments and reacting to them (like/dislike) are
// temporarily disabled: they require a live backend, which no longer
// exists after the Strapi decoupling. See comment-form.tsx and
// article-comments.tsx.
//
// export type SubmitCommentPayload = {
//   authorName: string;
//   authorEmail: string;
//   content: string;
// };
//
// export const useSubmitCommentMutation = (
//   { articleDocumentId }: { articleDocumentId: string },
//   onSuccess?: () => void,
// ) => { ... };
//
// export type CommentReaction = "like" | "dislike";
//
// export const useReactToCommentMutation = ({ slug }: { slug: string }) => { ... };
