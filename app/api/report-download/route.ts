import { isReportReleased } from "@/libs/report-release";
import { z } from "@/libs/validation";

export const dynamic = "force-dynamic";

const LANDING_PAGES = {
  en: "/en/report-2026",
  pt: "/pt-BR/relatorio-2026",
} as const;

const payloadSchema = z.object({
  ok: z.literal(true),
  url: z.string().trim().max(2000).url().startsWith("https://"),
});

const toDownloadUrl = (value: string) => {
  const driveId = value.match(
    /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/,
  )?.[1];

  return driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : value;
};

const getReportPdfUrl = async () => {
  const scriptUrl = process.env.REPORT_LEADS_SCRIPT_URL;
  const secret = process.env.REPORT_LEADS_SECRET;

  if (!scriptUrl || !secret) {
    console.error("Report download is not configured.");
    return null;
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, action: "report_pdf" }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    const payload = payloadSchema.safeParse(
      await response.json().catch(() => null),
    );

    if (!response.ok || !payload.success) {
      console.error("Report download script error:", response.status);
      return null;
    }

    return toDownloadUrl(payload.data.url);
  } catch (error) {
    console.error("Report download script exception:", error);
    return null;
  }
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "pt" ? "pt" : "en";
  const landingPage = new URL(LANDING_PAGES[lang], url.origin).toString();
  const pdfUrl = isReportReleased() ? await getReportPdfUrl() : null;

  return new Response(null, {
    status: 307,
    headers: { "Cache-Control": "no-store", Location: pdfUrl ?? landingPage },
  });
}
