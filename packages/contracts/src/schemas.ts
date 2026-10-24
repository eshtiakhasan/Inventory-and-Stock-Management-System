import { z } from "zod";
import { normalizePhone } from "./phone.js";
import { RoleSchema } from "./roles.js";

/** Name fields are 1 to 100 characters after trimming (BR1.1). */
export const NAME_MAX_LENGTH = 100;
/** Passwords are 8 to 128 characters, counted exactly as typed (BR1.4). */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
/** Upper bound on the raw phone text before normalization (input size cap, NFR1.10). */
export const PHONE_RAW_MAX_LENGTH = 32;

/** The session cookie named by contract C1. */
export const SESSION_COOKIE = "mojud_session";
/** The header that carries the CSRF token on every non-GET request (C1). */
export const CSRF_HEADER = "X-CSRF-Token";

const nameField = z.string().trim().min(1).max(NAME_MAX_LENGTH);

/** Phone as typed; valid when normalizePhone accepts it (BR1.2). */
export const PhoneInputSchema = z
  .string()
  .max(PHONE_RAW_MAX_LENGTH)
  .refine((value) => normalizePhone(value) !== null);

/** Password is never trimmed (BR1.1, BR1.4). */
export const NewPasswordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH)
  .max(PASSWORD_MAX_LENGTH);

/** `POST /api/v1/auth/signup` body (FR1.1). Unknown fields are refused. */
export const SignUpSchema = z.strictObject({
  businessName: nameField,
  name: nameField,
  phone: PhoneInputSchema,
  password: NewPasswordSchema,
});

export type SignUpInput = z.infer<typeof SignUpSchema>;

/**
 * `POST /api/v1/auth/signin` body (FR1.2). The phone is checked by
 * normalizePhone in the service, so every failure is the same
 * INVALID_CREDENTIALS answer (NFR1.3).
 */
export const SignInSchema = z.strictObject({
  phone: z.string().min(1).max(PHONE_RAW_MAX_LENGTH),
  password: z.string().min(1).max(PASSWORD_MAX_LENGTH),
});

export type SignInInput = z.infer<typeof SignInSchema>;

/** The caller context sent to the web app (contract C1 `Caller`). */
export const CallerSchema = z.object({
  userId: z.uuid(),
  businessId: z.uuid(),
  businessName: z.string(),
  name: z.string(),
  role: RoleSchema,
  warehouseIds: z.array(z.uuid()),
});

export type CallerView = z.infer<typeof CallerSchema>;

/** Body of sign-up, sign-in and `/auth/me` responses: the caller and its CSRF token. */
export const SessionResponseSchema = CallerSchema.extend({
  csrfToken: z.string(),
});

export type SessionResponse = z.infer<typeof SessionResponseSchema>;

/** `GET /api/v1/health` body (NFR8.13). */
export const HealthSchema = z.object({
  status: z.enum(["ok", "error"]),
  db: z.enum(["ok", "down"]),
});

export type Health = z.infer<typeof HealthSchema>;

/** Sign-up fields, in form order. */
export const SIGN_UP_FIELDS = [
  "businessName",
  "name",
  "phone",
  "password",
] as const;

export type SignUpField = (typeof SIGN_UP_FIELDS)[number];

/** Field messages for VALIDATION_FAILED (frontend-components.md Form Validation). */
export const SIGN_UP_FIELD_MESSAGES: Readonly<Record<SignUpField, string>> = {
  businessName: "Enter your business name.",
  name: "Enter your name.",
  phone: "Enter a phone number of 6 to 15 digits.",
  password: "At least 8 characters.",
};
