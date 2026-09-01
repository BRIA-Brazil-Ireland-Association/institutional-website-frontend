import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ArticleComment = {
  id: number;
  documentId: string;
  authorName: string;
  authorEmail: string;
  content: string;
  approved: boolean;
  likes: number;
  dislikes: number;
  createdAt: string;
};

function isArticleComment(value: unknown): value is ArticleComment {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    typeof (value as ArticleComment).content === "string"
  );
}

const fetchArticleComments = async ({
  slug,
}: {
  slug: string;
}): Promise<ArticleComment[]> => {
  const response = await fetch(
    `/api/cms/articles/${encodeURIComponent(slug)}/comments`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch comments (status ${response.status}).`);
  }

  const payload = await response.json();

  return Array.isArray(payload?.data)
    ? payload.data.filter(isArticleComment)
    : [];
};

export const useArticleComments = ({ slug }: { slug: string }) => {
  return useQuery({
    queryKey: ["article-comments", slug],
    queryFn: () => fetchArticleComments({ slug }),
    enabled: Boolean(slug),
  });
};

export type SubmitCommentPayload = {
  authorName: string;
  authorEmail: string;
  content: string;
};

const submitComment = async ({
  articleDocumentId,
  data,
}: {
  articleDocumentId: string;
  data: SubmitCommentPayload;
}) => {
  const response = await fetch("/api/cms/comments", {
    body: JSON.stringify({
      data: {
        article: articleDocumentId,
        ...data,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`Failed to submit comment (status ${response.status}).`);
  }

  return response.json();
};

export const useSubmitCommentMutation = (
  { articleDocumentId }: { articleDocumentId: string },
  onSuccess?: () => void,
) => {
  return useMutation({
    mutationFn: (data: SubmitCommentPayload) =>
      submitComment({ articleDocumentId, data }),
    onSuccess,
  });
};

export type CommentReaction = "like" | "dislike";

const reactToComment = async ({
  documentId,
  reaction,
}: {
  documentId: string;
  reaction: CommentReaction;
}): Promise<ArticleComment> => {
  const response = await fetch(
    `/api/cms/comments/${encodeURIComponent(documentId)}/${reaction}`,
    {
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to ${reaction} comment (status ${response.status}).`,
    );
  }

  const payload = await response.json();

  return payload.data;
};

export const useReactToCommentMutation = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { documentId: string; reaction: CommentReaction }) =>
      reactToComment(params),
    onSuccess: (updatedComment) => {
      queryClient.setQueryData<ArticleComment[]>(
        ["article-comments", slug],
        (current) =>
          current?.map((comment) =>
            comment.documentId === updatedComment.documentId
              ? updatedComment
              : comment,
          ) ?? current,
      );
    },
  });
};
