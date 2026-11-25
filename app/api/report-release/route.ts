import { isReportReleased } from "@/libs/report-release";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { released: isReportReleased() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
