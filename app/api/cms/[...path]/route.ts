import { proxyCmsGet } from "@/services/cms";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;

  try {
    const cmsResponse = await proxyCmsGet({
      path,
      searchParams: request.nextUrl.searchParams,
    });
    const responseHeaders = new Headers({
      "Cache-Control": "no-store",
    });
    const contentType = cmsResponse.headers.get("content-type");

    if (contentType) {
      responseHeaders.set("Content-Type", contentType);
    }

    return new Response(cmsResponse.body, {
      headers: responseHeaders,
      status: cmsResponse.status,
      statusText: cmsResponse.statusText,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch CMS content.";
    const status = message.includes("STRAPI_CMS_URL") ? 500 : 502;

    return Response.json(
      {
        error: "CMS_PROXY_ERROR",
        message,
      },
      { status },
    );
  }
}
