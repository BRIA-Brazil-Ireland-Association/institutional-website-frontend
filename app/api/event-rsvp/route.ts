import { z } from "@/libs/validation";
import {
  handleSheetForm,
  isValidPhone,
  phoneFields,
  trackingFields,
  withPhone,
} from "@/libs/sheet-forms";

export const dynamic = "force-dynamic";

const eventRsvpSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().min(1).max(254).email(),
    institution: z.string().trim().min(1).max(200),
    consent: z.literal(true),
    updates: z.boolean().optional().default(false),
    ...phoneFields,
    ...trackingFields,
  })
  .refine(isValidPhone)
  .transform(withPhone);

export async function POST(request: Request) {
  return handleSheetForm(request, "rsvp", eventRsvpSchema);
}
