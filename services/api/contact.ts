import { useMutation } from "@tanstack/react-query";

export type ContactInterest =
  "marketing_brazilian" | "volunteer" | "partner" | "sponsor" | "ambassador";

export type ContactMessagePayload = {
  fullName: string;
  email: string;
  countryRegion?: string;
  phone?: string;
  interest: ContactInterest;
  message: string;
};

const submitContactMessage = async (payload: ContactMessagePayload) => {
  const response = await fetch("/api/cms/contact-messages", {
    body: JSON.stringify({ data: payload }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to submit contact message (status ${response.status}).`,
    );
  }

  return response.json();
};

export const useContactMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: submitContactMessage,
    onSuccess,
  });
};
