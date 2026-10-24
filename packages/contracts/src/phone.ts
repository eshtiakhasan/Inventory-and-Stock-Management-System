/** Phone numbers have 6 to 15 digits after spaces and dashes are removed (BR1.2). */
export const PHONE_MIN_DIGITS = 6;
export const PHONE_MAX_DIGITS = 15;

const PHONE_DIGITS = /^[0-9]{6,15}$/;

/**
 * Normalizes a typed phone number (BR1.2): removes spaces and dashes, then
 * checks that 6 to 15 digits remain. Returns the digits, or `null` when the
 * value is not a valid phone number. It never throws, so sign-in can treat an
 * invalid phone exactly like unknown details (BR2.1, NFR1.3).
 */
export function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const digits = value.replace(/[\s-]/g, "");
  return PHONE_DIGITS.test(digits) ? digits : null;
}
