import { z } from "@/libs/validation";

export const dynamic = "force-dynamic";

const profileValues = [
  "A Brazilian professional in Ireland",
  "An employer or recruiter",
  "From the public sector or policy",
  "From education or research",
  "From a community organisation",
  "From the media",
  "Other",
] as const;

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().default("");

const reportLeadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().min(1).max(254).email(),
  organisation: optionalText(200),
  profile: z.enum(profileValues),
  consent: z.literal(true),
  updates: z.boolean().optional().default(false),
  lang: z.enum(["en", "pt"]),
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_content: optionalText(200),
  utm_term: optionalText(200),
  landing_url: optionalText(2000),
  referrer: optionalText(2000),
  website: optionalText(200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = reportLeadSchema.safeParse(body);

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
    console.error("Report leads endpoint is not configured.");
    return Response.json({ error: "NOT_CONFIGURED" }, { status: 500 });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, lead }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    const payload = await response.json().catch(() => null);

    if (!response.ok || payload?.ok !== true) {
      console.error(
        "Report leads script error:",
        response.status,
        payload?.error,
      );
      return Response.json({ error: "SAVE_FAILED" }, { status: 502 });
    }
  } catch (error) {
    console.error("Report leads script exception:", error);
    return Response.json({ error: "SAVE_FAILED" }, { status: 502 });
  }

  return Response.json({ success: true }, { status: 201 });
}
