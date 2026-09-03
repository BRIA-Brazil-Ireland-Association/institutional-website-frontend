"use client";

import { Button } from "@/components/ui/button";
import { z } from "@/libs/validation";
import { useSubmitCommentMutation } from "@/services/api/comments";
import { useRef, useState, type FormEvent } from "react";

const commentSchema = z.object({
  authorName: z.string().trim().min(2).max(120),
  authorEmail: z.string().trim().email(),
  content: z.string().trim().min(5).max(2000),
});

const copy = {
  en: {
    nameLabel: "Name",
    emailLabel: "Email",
    contentLabel: "Comment",
    submitLabel: "Submit comment",
    validationError: "Please fill in a valid name, email and comment.",
    submitError: "We couldn't submit your comment. Please try again.",
    submitted: "Thank you! Your comment has been posted.",
  },
  "pt-BR": {
    nameLabel: "Nome",
    emailLabel: "E-mail",
    contentLabel: "Comentário",
    submitLabel: "Enviar comentário",
    validationError: "Preencha um nome, e-mail e comentário válidos.",
    submitError: "Não foi possível enviar seu comentário. Tente novamente.",
    submitted: "Obrigado! Seu comentário foi publicado.",
  },
} as const;

export const CommentForm = ({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const t = copy[locale as keyof typeof copy] ?? copy.en;

  const { mutate, isPending, isError } = useSubmitCommentMutation(
    { slug },
    () => {
      setSubmitted(true);
      formRef.current?.reset();
    },
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError(null);

    const formData = new FormData(event.currentTarget);
    const result = commentSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      setValidationError(t.validationError);
      return;
    }

    mutate(result.data);
  };

  if (submitted) {
    return (
      <p className="mt-6 rounded-lg bg-[#104722]/10 p-4 text-sm text-[#104722]">
        {t.submitted}
      </p>
    );
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit} ref={formRef}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            className="block text-sm font-medium text-[#1a1a1a]"
            htmlFor="authorName"
          >
            {t.nameLabel}
          </label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#104722] focus:ring-1 focus:ring-[#104722] focus:outline-none"
            id="authorName"
            name="authorName"
            required
            type="text"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-[#1a1a1a]"
            htmlFor="authorEmail"
          >
            {t.emailLabel}
          </label>
          <input
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#104722] focus:ring-1 focus:ring-[#104722] focus:outline-none"
            id="authorEmail"
            name="authorEmail"
            required
            type="email"
          />
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium text-[#1a1a1a]"
          htmlFor="content"
        >
          {t.contentLabel}
        </label>
        <textarea
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#1a1a1a] focus:border-[#104722] focus:ring-1 focus:ring-[#104722] focus:outline-none"
          id="content"
          name="content"
          required
          rows={4}
        />
      </div>

      {validationError && (
        <p className="text-sm text-red-600">{validationError}</p>
      )}

      {isError && !validationError && (
        <p className="text-sm text-red-600">{t.submitError}</p>
      )}

      <Button loading={isPending} type="submit">
        {t.submitLabel}
      </Button>
    </form>
  );
};
