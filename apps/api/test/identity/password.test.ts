import { describe, expect, it } from "vitest";
import {
  getDummyHash,
  passwordHasher,
} from "../../src/modules/identity/internal/password.js";

const PLAIN_TEXT = "correct horse battery";

describe("password hashing (NFR1.1, BR1.5)", () => {
  it("produces an Argon2id hash with the configured parameters", async () => {
    const hash = await passwordHasher.hash(PLAIN_TEXT);

    expect(hash.startsWith("$argon2id$")).toBe(true);
    const params = hash.split("$")[3] ?? "";
    expect(params.split(",").sort()).toEqual(["m=19456", "p=1", "t=2"]);
  });

  it("verifies the right password and rejects a wrong one", async () => {
    const hash = await passwordHasher.hash(PLAIN_TEXT);

    await expect(passwordHasher.verify(hash, PLAIN_TEXT)).resolves.toBe(true);
    await expect(passwordHasher.verify(hash, "wrong password")).resolves.toBe(
      false,
    );
  });

  it("hashes one password within 500 ms (NFR5.5)", async () => {
    await passwordHasher.hash("warm-up password");
    const start = performance.now();
    await passwordHasher.hash(PLAIN_TEXT);
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThanOrEqual(500);
  });

  it("never contains the plain password and salts each hash", async () => {
    const first = await passwordHasher.hash(PLAIN_TEXT);
    const second = await passwordHasher.hash(PLAIN_TEXT);

    expect(first).not.toContain(PLAIN_TEXT);
    expect(first).not.toBe(second);
  });

  it("builds the dummy hash once and no password matches it", async () => {
    const dummy = await getDummyHash();

    expect(await getDummyHash()).toBe(dummy);
    expect(dummy.startsWith("$argon2id$")).toBe(true);
    await expect(passwordHasher.verify(dummy, "")).resolves.toBe(false);
  });
});
