import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import * as repository from "../../src/modules/identity/internal/repository.js";
import {
  createBusinessWithOwner,
  deleteSession,
  extendSession,
  findSessionByIdHashGlobal,
  findUserByPhoneForSignIn,
  getCaller,
  insertSession,
} from "../../src/modules/identity/internal/repository.js";
import { SESSION_TTL_MS } from "../../src/platform/config.js";
import type { Db } from "../../src/platform/db/db.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";
import { uniquePhone } from "../helpers/factories.js";
import { seedTwoBusinesses } from "../helpers/twoBusinesses.js";

const HASH_A = "a".repeat(64);

/** Parameter names of a function, read from its source text. */
function parameterNames(fn: (...args: never[]) => unknown): string[] {
  const source = fn.toString();
  const list = source.slice(source.indexOf("(") + 1, source.indexOf(")"));
  return list
    .split(",")
    .map((part) => part.replace(/=.*$/s, "").trim())
    .filter((part) => part.length > 0);
}

describe("repository exports (NFR2.1)", () => {
  it("every function without a businessId parameter is on the global-lookup allow-list", () => {
    const functions = Object.entries(repository).filter(
      ([, value]) => typeof value === "function",
    ) as [string, (...args: never[]) => unknown][];
    const unscoped = functions
      .filter(([, fn]) => !parameterNames(fn).includes("businessId"))
      .map(([name]) => name);

    expect(functions.length).toBeGreaterThan(0);
    expect(unscoped.sort()).toEqual([...repository.GLOBAL_LOOKUPS].sort());
    expect(parameterNames(getCaller)).toContain("businessId");
  });
});

describe("identity repository", () => {
  let db: Db;

  beforeAll(() => {
    db = useTestDb();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
  });
  afterAll(async () => {
    await closeTestDb();
  });

  async function newOwner(): Promise<{ userId: string; phone: string }> {
    const phone = uniquePhone();
    const ids = await db.transaction().execute((trx) =>
      createBusinessWithOwner(trx, {
        businessName: "Haque Traders",
        ownerName: "Abdul Haque",
        phone,
        passwordHash: "$argon2id$hash",
      }),
    );
    return { userId: ids.userId, phone };
  }

  it("creates the business and its active Owner in one transaction", async () => {
    const { phone } = await newOwner();

    const user = await db
      .selectFrom("users")
      .innerJoin("businesses", "businesses.id", "users.business_id")
      .select(["users.role", "users.active", "businesses.name"])
      .where("users.phone", "=", phone)
      .executeTakeFirstOrThrow();

    expect(user).toEqual({
      role: "owner",
      active: true,
      name: "Haque Traders",
    });
  });

  it("saves nothing when a failure happens after the business insert (NFR1.16)", async () => {
    const attempt = db.transaction().execute((trx) =>
      createBusinessWithOwner(
        trx,
        {
          businessName: "Doomed Ltd",
          ownerName: "Nobody",
          phone: uniquePhone(),
          passwordHash: "$argon2id$hash",
        },
        {
          afterBusinessInsert: () => {
            throw new Error("injected failure");
          },
        },
      ),
    );

    await expect(attempt).rejects.toThrow("injected failure");
    const businesses = await db.selectFrom("businesses").select("id").execute();
    const users = await db.selectFrom("users").select("id").execute();
    expect(businesses).toHaveLength(0);
    expect(users).toHaveLength(0);
  });

  it("finds a user by phone across businesses, and nothing for an unknown phone", async () => {
    const { userId, phone } = await newOwner();

    const found = await findUserByPhoneForSignIn(db, phone);
    const missing = await findUserByPhoneForSignIn(db, "019999999999");

    expect(found).toMatchObject({
      userId,
      active: true,
      passwordHash: "$argon2id$hash",
    });
    expect(missing).toBeUndefined();
  });

  it("looks up a session with the joined caller fields and CSRF token", async () => {
    const { userId } = await newOwner();
    const now = new Date("2026-10-25T10:00:00Z");
    await insertSession(db, {
      idHash: HASH_A,
      userId: userId as never,
      csrfToken: "csrf-token-value",
      now,
    });

    const session = await findSessionByIdHashGlobal(db, HASH_A);
    const unknown = await findSessionByIdHashGlobal(db, "b".repeat(64));

    expect(session).toMatchObject({
      idHash: HASH_A,
      csrfToken: "csrf-token-value",
      caller: {
        userId,
        businessName: "Haque Traders",
        name: "Abdul Haque",
        role: "owner",
        warehouseIds: [],
        active: true,
      },
    });
    expect(session?.expiresAt.getTime()).toBe(now.getTime() + SESSION_TTL_MS);
    expect(unknown).toBeUndefined();
  });

  it("extends a session to now plus 12 hours", async () => {
    const { userId } = await newOwner();
    const start = new Date("2026-10-25T10:00:00Z");
    const later = new Date("2026-10-25T15:30:00Z");
    await insertSession(db, {
      idHash: HASH_A,
      userId: userId as never,
      csrfToken: "c",
      now: start,
    });

    await extendSession(db, HASH_A, later);

    const row = await db
      .selectFrom("sessions")
      .select(["expires_at", "last_used_at"])
      .executeTakeFirstOrThrow();
    expect(row.expires_at.getTime()).toBe(later.getTime() + SESSION_TTL_MS);
    expect(row.last_used_at.getTime()).toBe(later.getTime());
  });

  it("deletes a session", async () => {
    const { userId } = await newOwner();
    await insertSession(db, {
      idHash: HASH_A,
      userId: userId as never,
      csrfToken: "c",
      now: new Date(),
    });

    await deleteSession(db, HASH_A);

    expect(await findSessionByIdHashGlobal(db, HASH_A)).toBeUndefined();
  });

  it("getCaller returns a user only within their own business (NFR2.2)", async () => {
    const { a, b } = await seedTwoBusinesses(db);

    const own = await getCaller(db, a.businessId, a.userId);
    const crossed = await getCaller(db, b.businessId, a.userId);

    expect(own).toMatchObject({
      userId: a.userId,
      businessId: a.businessId,
      businessName: "Business A",
    });
    expect(crossed).toBeUndefined();
  });
});
