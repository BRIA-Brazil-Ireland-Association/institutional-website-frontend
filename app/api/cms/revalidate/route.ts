import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "@/services/cms";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const revalidateSecret = process.env.CMS_REVALIDATE_SECRET?.trim();

  if (!revalidateSecret || key !== revalidateSecret) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  revalidateTag(CMS_CACHE_TAG, "max");

  return Response.json({ revalidated: true });
}
