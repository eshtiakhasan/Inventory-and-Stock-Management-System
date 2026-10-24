import { describe, expect, it } from "vitest";
import { normalizePhone } from "../src/index.js";

// Runner check (Step 2): proves the contracts project runs real code.
describe("test runner", () => {
  it("runs a test against real contracts code", () => {
    expect(normalizePhone("01-234 5678")).toBe("012345678");
  });

  it("reports an invalid phone as null", () => {
    expect(normalizePhone("12")).toBeNull();
  });

  it("does not throw on a non-string value", () => {
    expect(normalizePhone(undefined)).toBeNull();
  });
});
