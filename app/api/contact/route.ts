import { getResendClient, getResendFrom, getResendTo } from "@/libs/resend";
import { z } from "@/libs/validation";

export const dynamic = "force-dynamic";

const interestValues = [
  "marketing_brazilian",
  "volunteer",
  "partner",
  "sponsor",
  "ambassador",
] as const;

const interestLabels: Record<(typeof interestValues)[number], string> = {
  marketing_brazilian: "Brazilian interested in marketing themselves",
  volunteer: "Volunteer",
  partner: "Partner",
  sponsor: "Sponsor",
  ambassador: "Ambassador",
};

const contactMessageSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().min(1).email(),
  countryRegion: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  interest: z.enum(interestValues),
  message: z.string().trim().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactMessageSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { fullName, email, countryRegion, phone, interest, message } =
    result.data;

  try {
    const resend = getResendClient();

    const { error } = await resend.emails.send({
      from: getResendFrom(),
      to: getResendTo(),
      replyTo: email,
      subject: `New contact form message from ${fullName}`,
      text: [
        `Full name: ${fullName}`,
        `Email: ${email}`,
        countryRegion ? `Country / Region: ${countryRegion}` : undefined,
        phone ? `Phone: ${phone}` : undefined,
        `Interest: ${interestLabels[interest]}`,
        "",
        "Message:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("Resend send error:", error);
      return Response.json({ error: "SEND_FAILED" }, { status: 502 });
    }
  } catch (error) {
    console.error("Resend send exception:", error);
    return Response.json({ error: "SEND_FAILED" }, { status: 502 });
  }

  return Response.json({ success: true }, { status: 201 });
}
