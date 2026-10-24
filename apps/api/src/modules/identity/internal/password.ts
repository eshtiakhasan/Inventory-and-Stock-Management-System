/**
 * Password hashing with Argon2id (NFR1.1, BR1.5). The parameters come from
 * `config.ts`; the library makes a random salt for each hash. The plain
 * password is never stored, returned or logged.
 */
import { randomBytes } from "node:crypto";
import argon2 from "argon2";
import { ARGON2_PARAMS, type Argon2Params } from "../../../platform/config.js";

/**
 * Hash and verify, as one object so a test can spy on `verify` and count the
 * checks on every sign-in path (NFR1.3).
 */
export const passwordHasher = {
  async hash(
    plain: string,
    params: Argon2Params = ARGON2_PARAMS,
  ): Promise<string> {
    return argon2.hash(plain, { type: argon2.argon2id, ...params });
  },
  async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  },
};

let dummyHash: Promise<string> | undefined;

/**
 * A fixed Argon2id hash with the same parameters, of a random secret nobody
 * knows. Sign-in verifies against it when there is no real hash to check, so
 * every failure path does the same work (NFR1.3). Built once; the server calls
 * this at start so the first sign-in pays no extra cost.
 */
export function getDummyHash(): Promise<string> {
  dummyHash ??= passwordHasher.hash(randomBytes(32).toString("base64url"));
  return dummyHash;
}
