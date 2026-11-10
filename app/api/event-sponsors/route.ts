import { z } from "@/libs/validation";

export const dynamic = "force-dynamic";

const CACHED = {
  "Cache-Control": "public, max-age=0, must-revalidate",
  "CDN-Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
};
const NOT_CACHED = { "Cache-Control": "no-store" };

const sponsorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  url: z
    .string()
    .trim()
    .max(500)
    .regex(/^(https?:\/\/\S+)?$/i),
  logo: z
    .string()
    .max(1_000_000)
    .regex(/^data:image\/(png|jpeg|gif|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/),
  event: z.boolean().catch(false),
  report: z.boolean().catch(false),
});

const pageSchema = z.enum(["event", "report"]).catch("event");

const payloadSchema = z.object({
  ok: z.literal(true),
  sponsors: z.array(z.unknown()).max(60),
});

const parseSponsors = (items: unknown[], page: "event" | "report") =>
  items.flatMap((item) => {
    const result = sponsorSchema.safeParse(item);
    if (!result.success || !result.data[page]) return [];
    const { name, url, logo } = result.data;
    return [{ name, url, logo }];
  });

const failed = () =>
  Response.json({ sponsors: [] }, { status: 502, headers: NOT_CACHED });

export async function GET(request: Request) {
  const page = pageSchema.parse(
    new URL(request.url).searchParams.get("page") ?? undefined,
  );
  const scriptUrl = process.env.REPORT_LEADS_SCRIPT_URL;
  const secret = process.env.REPORT_LEADS_SECRET;

  if (!scriptUrl || !secret) {
    console.error("Event sponsors endpoint is not configured.");
    return failed();
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, action: "sponsors" }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    const payload = payloadSchema.safeParse(
      await response.json().catch(() => null),
    );

    if (!response.ok || !payload.success) {
      console.error("Event sponsors script error:", response.status);
      return failed();
    }

    return Response.json(
      { sponsors: parseSponsors(payload.data.sponsors, page) },
      { headers: CACHED },
    );
  } catch (error) {
    console.error("Event sponsors script exception:", error);
    return failed();
  }
}
