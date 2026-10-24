import { z } from "zod";

/** Error codes used in U1 (functional-spec.md Error Catalogue; contract C1). */
export const ERROR_CODES = [
  "VALIDATION_FAILED",
  "DUPLICATE",
  "NOT_SIGNED_IN",
  "SESSION_ENDED",
  "INVALID_CREDENTIALS",
  "ACCOUNT_DEACTIVATED",
  "FORBIDDEN",
  "NOT_FOUND",
  "INTERNAL_ERROR",
] as const;

export const ErrorCodeSchema = z.enum(ERROR_CODES);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

/**
 * The one Error shape of contract C1. Clients ignore unknown fields, so `code`
 * is a plain string here: a later unit may add codes within v1.
 */
export const ErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
  requestId: z.string().optional(),
});

export type ApiErrorBody = z.infer<typeof ErrorSchema>;

/** HTTP status for each error code (Error Catalogue). */
export const ERROR_STATUS: Readonly<Record<ErrorCode, number>> = {
  VALIDATION_FAILED: 400,
  DUPLICATE: 409,
  NOT_SIGNED_IN: 401,
  SESSION_ENDED: 401,
  INVALID_CREDENTIALS: 401,
  ACCOUNT_DEACTIVATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};
