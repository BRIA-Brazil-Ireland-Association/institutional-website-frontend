"use client";

import { Button } from "@/components/ui/button";
import { DefaultCard } from "@/components/ui/default-card";
import { cn } from "@/libs/utils";
import { parseFormData, z } from "@/libs/validation";
import {
  useContactMutation,
  type ContactInterest,
} from "@/services/api/contact";
import { useState, type FormEvent, type ReactNode } from "react";

const interestValues = [
  "marketing_brazilian",
  "volunteer",
  "partner",
  "sponsor",
  "ambassador",
] as const satisfies readonly ContactInterest[];

const contactFormSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  countryRegion: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  interest: z.enum(interestValues),
  message: z.string().trim().min(1),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, boolean>>;

type ContactFormCopy = {
  fields: {
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    countryRegion: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    interest: { label: string };
    message: { label: string; placeholder: string };
  };
  interestOptions: { value: ContactInterest; label: string }[];
  requiredError: string;
  emailError: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successDescription: string;
  sendAnother: string;
  errorMessage: string;
};

const copy: Record<string, ContactFormCopy> = {
  en: {
    errorMessage:
      "We couldn't send your message. Please check your connection and try again.",
    fields: {
      countryRegion: {
        label: "Country / Region",
        placeholder: "e.g. Dublin, Ireland",
      },
      email: { label: "Email", placeholder: "you@example.com" },
      fullName: { label: "Full Name", placeholder: "Your full name" },
      interest: { label: "How would you like to get involved?" },
      message: {
        label: "Message",
        placeholder: "Tell us more about how you can help",
      },
      phone: { label: "Phone", placeholder: "+353 00 000 0000" },
    },
    interestOptions: [
      {
        label: "I'm a Brazilian interested in marketing myself in Ireland",
        value: "marketing_brazilian",
      },
      {
        label: "I want to help BRIA voluntarily (unpaid)",
        value: "volunteer",
      },
      {
        label: "I am a company or professional and want to partner with BRIA",
        value: "partner",
      },
      {
        label: "I am a company or professional and want to sponsor BRIA",
        value: "sponsor",
      },
      {
        label: "I am an influencer and want to be BRIA's Ambassador",
        value: "ambassador",
      },
    ],
    emailError: "Enter a valid email address.",
    requiredError: "This field is required.",
    sendAnother: "Send another message",
    submit: "Send Message",
    submitting: "Sending...",
    successDescription:
      "Thank you for reaching out. Our team will review your message and get back to you soon.",
    successTitle: "Message received",
  },
  "pt-BR": {
    errorMessage:
      "Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.",
    fields: {
      countryRegion: {
        label: "País / Região",
        placeholder: "ex: Dublin, Irlanda",
      },
      email: { label: "E-mail", placeholder: "voce@exemplo.com" },
      fullName: { label: "Nome completo", placeholder: "Seu nome completo" },
      interest: { label: "Como você gostaria de contribuir?" },
      message: {
        label: "Mensagem",
        placeholder: "Conte mais sobre como você pode ajudar",
      },
      phone: { label: "Telefone", placeholder: "+353 00 000 0000" },
    },
    interestOptions: [
      {
        label: "Sou brasileiro(a) e tenho interesse em me promover na Irlanda",
        value: "marketing_brazilian",
      },
      {
        label: "Quero ajudar a BRIA voluntariamente (sem remuneração)",
        value: "volunteer",
      },
      {
        label: "Sou uma empresa ou profissional e quero ser parceiro da BRIA",
        value: "partner",
      },
      {
        label: "Sou uma empresa ou profissional e quero patrocinar a BRIA",
        value: "sponsor",
      },
      {
        label: "Sou um(a) influenciador(a) e quero ser Embaixador(a) da BRIA",
        value: "ambassador",
      },
    ],
    emailError: "Informe um e-mail válido.",
    requiredError: "Este campo é obrigatório.",
    sendAnother: "Enviar outra mensagem",
    submit: "Enviar mensagem",
    submitting: "Enviando...",
    successDescription:
      "Obrigado por entrar em contato. Nossa equipe vai analisar sua mensagem e retornará em breve.",
    successTitle: "Mensagem recebida",
  },
};

const getCopy = (locale: string) => copy[locale] ?? copy.en;

const inputClasses =
  "w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:border-[#104722] focus:ring-2 focus:ring-[#104722]/20 focus:outline-none";

const FormField = ({
  label,
  htmlFor,
  error,
  errorMessage,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: boolean;
  errorMessage?: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-[#1a1a1a]" htmlFor={htmlFor}>
      {label}
    </label>
    {children}
    {error && errorMessage && (
      <p className="text-sm text-red-600">{errorMessage}</p>
    )}
  </div>
);

export function ContactForm({ locale }: { locale: string }) {
  const text = getCopy(locale);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useContactMutation(() => setIsSubmitted(true));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const values = parseFormData(contactFormSchema, formData);

      setErrors({});
      mutation.mutate(values);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: ContactFormErrors = {};

        error.issues.forEach((issue) => {
          const key = issue.path[0] as keyof ContactFormValues;

          fieldErrors[key] = true;
        });

        setErrors(fieldErrors);
      }
    }
  };

  const handleSendAnother = () => {
    mutation.reset();
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <DefaultCard className="flex flex-col items-center gap-2 py-12 text-center">
        <h3 className="text-2xl font-medium text-[#1a1a1a]">
          {text.successTitle}
        </h3>
        <p className="max-w-md text-base text-[#3d3d3d]">
          {text.successDescription}
        </p>
        <Button
          className="mt-4"
          onClick={handleSendAnother}
          type="button"
          variant="secondary"
        >
          {text.sendAnother}
        </Button>
      </DefaultCard>
    );
  }

  return (
    <DefaultCard>
      <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            error={errors.fullName}
            errorMessage={text.requiredError}
            htmlFor="fullName"
            label={text.fields.fullName.label}
          >
            <input
              className={cn(
                inputClasses,
                errors.fullName &&
                  "border-red-400 focus:border-red-400 focus:ring-red-200",
              )}
              id="fullName"
              name="fullName"
              placeholder={text.fields.fullName.placeholder}
              type="text"
            />
          </FormField>

          <FormField
            error={errors.email}
            errorMessage={errors.email ? text.emailError : undefined}
            htmlFor="email"
            label={text.fields.email.label}
          >
            <input
              className={cn(
                inputClasses,
                errors.email &&
                  "border-red-400 focus:border-red-400 focus:ring-red-200",
              )}
              id="email"
              name="email"
              placeholder={text.fields.email.placeholder}
              type="email"
            />
          </FormField>

          <FormField
            htmlFor="countryRegion"
            label={text.fields.countryRegion.label}
          >
            <input
              className={inputClasses}
              id="countryRegion"
              name="countryRegion"
              placeholder={text.fields.countryRegion.placeholder}
              type="text"
            />
          </FormField>

          <FormField htmlFor="phone" label={text.fields.phone.label}>
            <input
              className={inputClasses}
              id="phone"
              name="phone"
              placeholder={text.fields.phone.placeholder}
              type="tel"
            />
          </FormField>
        </div>

        <fieldset className="flex flex-col gap-2.5">
          <legend className="mb-1 text-sm font-medium text-[#1a1a1a]">
            {text.fields.interest.label}
          </legend>
          {text.interestOptions.map((option) => (
            <label
              className="flex cursor-pointer items-start gap-2.5 text-sm text-[#3d3d3d]"
              key={option.value}
            >
              <input
                className="mt-0.5 size-4 accent-[#104722]"
                name="interest"
                type="radio"
                value={option.value}
              />
              {option.label}
            </label>
          ))}
          {errors.interest && (
            <p className="text-sm text-red-600">{text.requiredError}</p>
          )}
        </fieldset>

        <FormField
          error={errors.message}
          errorMessage={text.requiredError}
          htmlFor="message"
          label={text.fields.message.label}
        >
          <textarea
            className={cn(
              inputClasses,
              "min-h-32 resize-y",
              errors.message &&
                "border-red-400 focus:border-red-400 focus:ring-red-200",
            )}
            id="message"
            name="message"
            placeholder={text.fields.message.placeholder}
          />
        </FormField>

        {mutation.isError && (
          <p className="text-sm text-red-600">{text.errorMessage}</p>
        )}

        <Button loading={mutation.isPending} type="submit">
          {mutation.isPending ? text.submitting : text.submit}
        </Button>
      </form>
    </DefaultCard>
  );
}
