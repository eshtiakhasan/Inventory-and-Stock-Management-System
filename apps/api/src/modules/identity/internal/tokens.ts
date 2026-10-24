/**
 * Session and CSRF tokens (NFR1.4): 32 random bytes from the operating
 * system's secure source, base64url-encoded. Only the SHA-256 hash of the
 * session id is stored.
 */
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

const TOKEN_BYTES = 32;

export function newSessionId(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

export function newCsrfToken(): string {
  return randomBytes(TOKEN_BYTES).toString("base64url");
}

/** SHA-256 of the session id, as 64 hex characters (the `sessions.id_hash` key). */
export function hashSessionId(sessionId: string): string {
  return createHash("sha256").update(sessionId, "utf8").digest("hex");
}

/**
 * Constant-time comparison (NFR1.7). `timingSafeEqual` throws on unequal
 * lengths, so a missing value or a different byte length is refused first.
 */
export function safeEqual(
  given: string | undefined,
  expected: string,
): boolean {
  if (typeof given !== "string") return false;
  const a = Buffer.from(given, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
