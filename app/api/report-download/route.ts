export const dynamic = "force-dynamic";

const REPORT_RELEASE_AT = Date.parse("2026-12-01T17:30:00Z");

const LANDING_PAGES = {
  en: "/en/report-2026",
  pt: "/pt-BR/relatorio-2026",
} as const;

const NO_STORE = { "Cache-Control": "no-store" };

const toDownloadUrl = (value: string) => {
  const driveId = value.match(
    /^https:\/\/drive\.google\.com\/file\/d\/([\w-]+)/,
  )?.[1];

  return driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : value;
};

export function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get("lang") === "pt" ? "pt" : "en";
  const landingPage = new URL(LANDING_PAGES[lang], url.origin);
  const pdfUrl = process.env.REPORT_PDF_URL?.trim();

  if (Date.now() < REPORT_RELEASE_AT) {
    return Response.redirect(landingPage, 307);
  }

  if (!pdfUrl) {
    console.error("Report download is not configured (REPORT_PDF_URL).");
    return Response.redirect(landingPage, 307);
  }

  return new Response(null, {
    status: 307,
    headers: { ...NO_STORE, Location: toDownloadUrl(pdfUrl) },
  });
}
