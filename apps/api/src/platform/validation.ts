import type { z } from "zod";
import { AppError } from "./errors.js";

/**
 * Validates a request body against a zod schema (NFR1.10). On failure it
 * throws VALIDATION_FAILED naming the first failing field, with the field's
 * message when one is given. An unknown field is reported by its name.
 */
export function validate<Schema extends z.ZodType>(
  schema: Schema,
  body: unknown,
  fieldMessages: Readonly<Record<string, string>> = {},
): z.infer<Schema> {
  const result = schema.safeParse(body);
  if (result.success) {
    return result.data;
  }
  const issue = result.error.issues[0];
  if (issue?.code === "unrecognized_keys") {
    const key = issue.keys[0];
    throw new AppError("VALIDATION_FAILED", key, "This field is not allowed.");
  }
  const first = issue?.path[0];
  const field = typeof first === "string" ? first : undefined;
  if (field === undefined) {
    throw new AppError(
      "VALIDATION_FAILED",
      undefined,
      "The request body is not valid.",
    );
  }
  throw new AppError("VALIDATION_FAILED", field, fieldMessages[field]);
}
