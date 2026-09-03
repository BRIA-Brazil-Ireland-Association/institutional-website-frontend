import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ArticleComment = {
  authorName: string;
  content: string;
  createdAt: string | null;
};

const fetchArticleComments = async ({
  slug,
}: {
  slug: string;
}): Promise<ArticleComment[]> => {
  const response = await fetch(
    `/api/comments?slug=${encodeURIComponent(slug)}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch comments (status ${response.status}).`);
  }

  const payload = await response.json();

  return Array.isArray(payload?.data) ? payload.data : [];
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
  slug,
  data,
}: {
  slug: string;
  data: SubmitCommentPayload;
}) => {
  const response = await fetch("/api/comments", {
    body: JSON.stringify({ slug, ...data }),
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
  { slug }: { slug: string },
  onSuccess?: () => void,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitCommentPayload) => submitComment({ slug, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["article-comments", slug] });
      onSuccess?.();
    },
  });
};
