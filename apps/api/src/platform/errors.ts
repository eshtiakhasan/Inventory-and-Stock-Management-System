import { ERROR_STATUS, type ErrorCode } from "@mojud/contracts";

/** Default messages from the Error Catalogue (functional-spec.md). */
export const ERROR_MESSAGES: Readonly<Record<ErrorCode, string>> = {
  VALIDATION_FAILED: "Check this field.",
  DUPLICATE: "This phone number is already registered",
  NOT_SIGNED_IN: "Sign in to continue.",
  SESSION_ENDED: "Your session ended. Sign in again.",
  INVALID_CREDENTIALS: "Sign-in details are not correct.",
  ACCOUNT_DEACTIVATED: "This account is deactivated.",
  FORBIDDEN: "Couldn't save. Try again.",
  NOT_FOUND: "Not found",
  INTERNAL_ERROR: "Couldn't save. Try again.",
};

/**
 * An expected failure with a stable code from the Error Catalogue. The error
 * handler turns it into the one Error shape with the matching status.
 */
export class AppError extends Error {
  readonly status: number;

  constructor(
    readonly code: ErrorCode,
    readonly field?: string,
    message?: string,
  ) {
    super(message ?? ERROR_MESSAGES[code]);
    this.name = "AppError";
    this.status = ERROR_STATUS[code];
  }
}

/** PostgreSQL unique-violation details, when the error is one. */
export function uniqueViolationConstraint(error: unknown): string | undefined {
  const candidate = error as { code?: unknown; constraint?: unknown } | null;
  if (candidate?.code === "23505" && typeof candidate.constraint === "string") {
    return candidate.constraint;
  }
  return undefined;
}
