import { z } from "zod";

export function parseFormData<TSchema extends z.ZodType>(
  schema: TSchema,
  formData: FormData,
): z.infer<TSchema> {
  return schema.parse(Object.fromEntries(formData));
}

export { z };
