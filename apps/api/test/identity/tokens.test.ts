import { describe, expect, it } from "vitest";
import {
  hashSessionId,
  newCsrfToken,
  newSessionId,
  safeEqual,
} from "../../src/modules/identity/internal/tokens.js";

const BASE64URL_32_BYTES = /^[A-Za-z0-9_-]{43}$/;

describe("session and CSRF tokens (NFR1.4, NFR1.7)", () => {
  it("makes 32-byte base64url tokens that differ each time", () => {
    const ids = new Set([newSessionId(), newSessionId(), newCsrfToken()]);

    for (const id of ids) {
      expect(id).toMatch(BASE64URL_32_BYTES);
      expect(Buffer.from(id, "base64url")).toHaveLength(32);
    }
    expect(ids.size).toBe(3);
  });

  it("hashes a session id to 64 hex characters, the same way every time", () => {
    const id = newSessionId();

    expect(hashSessionId(id)).toMatch(/^[0-9a-f]{64}$/);
    expect(hashSessionId(id)).toBe(hashSessionId(id));
    expect(hashSessionId(id)).not.toBe(hashSessionId(newSessionId()));
  });

  it("safeEqual is true only for identical values", () => {
    const token = newCsrfToken();

    expect(safeEqual(token, token)).toBe(true);
    const lastChar = token.endsWith("A") ? "B" : "A";
    const oneCharOff = `${token.slice(0, -1)}${lastChar}`;
    expect(safeEqual(oneCharOff, token)).toBe(false);
    expect(safeEqual(newCsrfToken(), token)).toBe(false);
  });

  it("safeEqual returns false without throwing for unequal lengths or a missing value", () => {
    const token = newCsrfToken();

    expect(() => safeEqual("short", token)).not.toThrow();
    expect(safeEqual("short", token)).toBe(false);
    expect(safeEqual(undefined, token)).toBe(false);
    expect(safeEqual("", token)).toBe(false);
  });
});
