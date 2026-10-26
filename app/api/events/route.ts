import { fetchOndeTemEvents } from "@/libs/ondetem";
import { z } from "@/libs/validation";
import type { NextRequest } from "next/server";

const localeSchema = z.enum(["en", "pt-BR"]).catch("pt-BR");

export async function GET(request: NextRequest) {
  const locale = localeSchema.parse(
    request.nextUrl.searchParams.get("locale") ?? undefined,
  );

  try {
    const events = await fetchOndeTemEvents(locale);

    return Response.json(
      { data: events },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error(
      "OndeTem events error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return Response.json(
      { data: [] },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
