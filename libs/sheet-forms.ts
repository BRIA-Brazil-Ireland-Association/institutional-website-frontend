import { z } from "@/libs/validation";

export const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

export const trackingFields = {
  lang: z.enum(["en", "pt"]),
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_content: optionalText(200),
  utm_term: optionalText(200),
  landing_url: optionalText(2000),
  referrer: optionalText(2000),
  website: optionalText(200),
};

const PHONE_CODE = /^\+\d{1,4}$/;
const PHONE_NUMBER = /^[\d\s().-]*$/;

type PhoneInput = { phone_code: string; phone_number: string };

const countDigits = (value: string) => value.replace(/\D/g, "").length;

export const phoneFields = {
  phone_code: optionalText(5),
  phone_number: optionalText(30),
};

export const isValidPhone = ({ phone_code, phone_number }: PhoneInput) =>
  !phone_number ||
  (PHONE_CODE.test(phone_code) &&
    PHONE_NUMBER.test(phone_number) &&
    countDigits(phone_number) >= 4 &&
    countDigits(phone_code + phone_number) <= 15);

export const withPhone = <T extends PhoneInput>({
  phone_code,
  phone_number,
  ...rest
}: T) => ({
  ...rest,
  phone: phone_number ? `${phone_code} ${phone_number}` : "",
});

export const handleSheetForm = async (
  request: Request,
  form: "rsvp" | "interest",
  schema: z.ZodType<{ website: string } & Record<string, unknown>>,
) => {
  const body = await request.json().catch(() => null);
  const result = schema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { website, ...lead } = result.data;

  if (website) {
    return Response.json({ success: true }, { status: 201 });
  }

  const scriptUrl = process.env.REPORT_LEADS_SCRIPT_URL;
  const secret = process.env.REPORT_LEADS_SECRET;

  if (!scriptUrl || !secret) {
    console.error("Sheet forms endpoint is not configured.");
    return Response.json({ error: "NOT_CONFIGURED" }, { status: 500 });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, form, lead }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok || payload?.ok !== true) {
      console.error(
        `Sheet forms script error (${form}):`,
        response.status,
        payload?.error,
      );
      return Response.json({ error: "SAVE_FAILED" }, { status: 502 });
    }
  } catch (error) {
    console.error(`Sheet forms script exception (${form}):`, error);
    return Response.json({ error: "SAVE_FAILED" }, { status: 502 });
  }

  return Response.json({ success: true }, { status: 201 });
};
