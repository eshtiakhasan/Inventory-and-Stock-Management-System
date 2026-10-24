import type { SignUpInput } from "@mojud/contracts";

let counter = 0;

/** A unique valid 11-digit phone number for each call. */
export function uniquePhone(): string {
  counter += 1;
  const seed = (Date.now() % 1_000_000) * 1000 + (process.pid % 100) * 10;
  const value = (seed + counter) % 1_000_000_000;
  return `01${String(value).padStart(9, "0")}`;
}

/** A valid sign-up body with a unique phone; override any field. */
export function aSignUp(overrides: Partial<SignUpInput> = {}): SignUpInput {
  return {
    businessName: "Haque Traders",
    name: "Abdul Haque",
    phone: uniquePhone(),
    password: "correct horse battery",
    ...overrides,
  };
}
