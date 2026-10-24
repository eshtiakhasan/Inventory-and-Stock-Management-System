import { describe, expect, it } from "vitest";
import {
  CallerSchema,
  ERROR_CODES,
  ERROR_STATUS,
  ErrorSchema,
  normalizePhone,
  SignInSchema,
  SignUpSchema,
} from "../src/index.js";

const validSignUp = {
  businessName: "Haque Traders",
  name: "Abdul Haque",
  phone: "01711 000-001",
  password: "correct horse battery",
};

describe("normalizePhone (BR1.2)", () => {
  it("removes spaces and dashes", () => {
    expect(normalizePhone(" 017-11 000 001 ")).toBe("01711000001");
  });

  it("accepts 6 and 15 digits and refuses 5 and 16 digits", () => {
    expect(normalizePhone("123456")).toBe("123456");
    expect(normalizePhone("123456789012345")).toBe("123456789012345");
    expect(normalizePhone("12345")).toBeNull();
    expect(normalizePhone("1234567890123456")).toBeNull();
  });

  it("refuses letters and other symbols, returning null instead of throwing", () => {
    expect(normalizePhone("01711-ABC-001")).toBeNull();
    expect(normalizePhone("+8801711000001")).toBeNull();
    expect(() => normalizePhone(null)).not.toThrow();
    expect(normalizePhone({})).toBeNull();
  });
});

describe("SignUpSchema and SignInSchema (BR1.1, BR1.4, NFR1.10)", () => {
  it("accepts a valid sign-up and trims names but never the password", () => {
    const parsed = SignUpSchema.parse({
      ...validSignUp,
      businessName: "  Haque Traders  ",
      password: "        ",
    });

    expect(parsed.businessName).toBe("Haque Traders");
    expect(parsed.password).toBe("        ");
  });

  it("refuses unknown fields on both schemas", () => {
    expect(
      SignUpSchema.safeParse({ ...validSignUp, role: "owner" }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({ phone: "01711000001", password: "x", extra: 1 })
        .success,
    ).toBe(false);
  });

  it("refuses blank or over-100-character names, 7- and 129-character passwords and bad phones", () => {
    const fails = (patch: Partial<typeof validSignUp>) =>
      SignUpSchema.safeParse({ ...validSignUp, ...patch }).success === false;

    expect(fails({ name: "   " })).toBe(true);
    expect(fails({ businessName: "x".repeat(101) })).toBe(true);
    expect(fails({ password: "1234567" })).toBe(true);
    expect(fails({ password: "x".repeat(129) })).toBe(true);
    expect(fails({ phone: "12345" })).toBe(true);
    expect(
      SignUpSchema.safeParse({ ...validSignUp, password: "x".repeat(128) })
        .success,
    ).toBe(true);
  });

  it("requires a non-empty phone and password on sign-in, with a 128-character cap", () => {
    expect(
      SignInSchema.safeParse({ phone: "", password: "secret" }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({ phone: "01711000001", password: "" }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({
        phone: "01711000001",
        password: "x".repeat(129),
      }).success,
    ).toBe(false);
    expect(
      SignInSchema.safeParse({ phone: "01711000001", password: "anything" })
        .success,
    ).toBe(true);
  });
});

describe("Caller and Error shapes (contract C1)", () => {
  it("validates a caller with one of the six roles", () => {
    const caller = {
      userId: "4b0f8f43-34a1-4f0e-9d3a-6b2a5d1e7c11",
      businessId: "a8e7c5b1-1f2d-4c3b-8a9e-0d1c2b3a4f5e",
      businessName: "Haque Traders",
      name: "Abdul Haque",
      role: "warehouse_worker",
      warehouseIds: [],
    };

    expect(CallerSchema.parse(caller)).toEqual(caller);
    expect(CallerSchema.safeParse({ ...caller, role: "admin" }).success).toBe(
      false,
    );
  });

  it("maps every error code to its catalogue status and parses the Error shape", () => {
    expect(ERROR_CODES.map((code) => ERROR_STATUS[code])).toEqual([
      400, 409, 401, 401, 401, 401, 403, 404, 500,
    ]);
    expect(
      ErrorSchema.parse({ code: "DUPLICATE", message: "m", field: "phone" }),
    ).toEqual({
      code: "DUPLICATE",
      message: "m",
      field: "phone",
    });
    expect(ErrorSchema.safeParse({ message: "no code" }).success).toBe(false);
  });
});
