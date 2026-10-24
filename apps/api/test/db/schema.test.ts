import { sql } from "kysely";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { Db } from "../../src/platform/db/db.js";
import { runMigrations } from "../../src/platform/db/migrations.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";

/** Captures the PostgreSQL error a statement raises. */
async function pgError(run: () => Promise<unknown>): Promise<{
  code?: string;
  constraint?: string;
}> {
  try {
    await run();
  } catch (error) {
    return error as { code?: string; constraint?: string };
  }
  throw new Error("expected the statement to fail");
}

describe("database schema (0001_identity)", () => {
  let db: Db;

  async function insertBusiness(name = "Haque Traders"): Promise<string> {
    const row = await db
      .insertInto("businesses")
      .values({ name })
      .returning("id")
      .executeTakeFirstOrThrow();
    return row.id;
  }

  async function insertUser(
    businessId: string,
    overrides: Partial<{ phone: string; role: string }> = {},
  ): Promise<string> {
    const row = await db
      .insertInto("users")
      .values({
        business_id: businessId,
        name: "Haque",
        phone: overrides.phone ?? "01711000001",
        role: (overrides.role ?? "owner") as "owner",
        password_hash: "$argon2id$placeholder",
      })
      .returning("id")
      .executeTakeFirstOrThrow();
    return row.id;
  }

  beforeAll(() => {
    db = useTestDb();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
  });
  afterAll(async () => {
    await closeTestDb();
  });

  it("runs the migrations twice without error, and the second run applies nothing", async () => {
    const first = await runMigrations(db);
    const second = await runMigrations(db);
    const applied = await sql<{ name: string }>`
      SELECT name FROM kysely_migration ORDER BY name`.execute(db);

    expect(first.results.every((r) => r.status === "Success")).toBe(true);
    expect(second.results).toHaveLength(0);
    expect(applied.rows.map((row) => row.name)).toEqual(["0001_identity"]);
  });

  it("rejects a duplicate phone with 23505 on users_phone_key", async () => {
    const businessA = await insertBusiness("A");
    const businessB = await insertBusiness("B");
    await insertUser(businessA, { phone: "01711000002" });

    const error = await pgError(() =>
      insertUser(businessB, { phone: "01711000002" }),
    );

    expect(error.code).toBe("23505");
    expect(error.constraint).toBe("users_phone_key");
  });

  it("rejects a phone that is not 6 to 15 digits", async () => {
    const businessId = await insertBusiness();

    const letters = await pgError(() =>
      insertUser(businessId, { phone: "01711-ABC" }),
    );
    const tooShort = await pgError(() =>
      insertUser(businessId, { phone: "12345" }),
    );

    expect(letters.code).toBe("23514");
    expect(letters.constraint).toBe("users_phone_format");
    expect(tooShort.code).toBe("23514");
  });

  it("rejects an unknown role", async () => {
    const businessId = await insertBusiness();

    const error = await pgError(() =>
      insertUser(businessId, { role: "admin" }),
    );

    expect(error.code).toBe("23514");
    expect(error.constraint).toBe("users_role_check");
  });

  it("rejects a blank business name and one longer than 100 characters", async () => {
    const blank = await pgError(() => insertBusiness("   "));
    const tooLong = await pgError(() => insertBusiness("x".repeat(101)));

    expect(blank.code).toBe("23514");
    expect(tooLong.code).toBe("23514");
  });

  it("deletes a user's sessions when the user is deleted", async () => {
    const businessId = await insertBusiness();
    const userId = await insertUser(businessId);
    await db
      .insertInto("sessions")
      .values({
        id_hash: "a".repeat(64),
        user_id: userId,
        csrf_token: "csrf",
        last_used_at: new Date(),
        expires_at: new Date(Date.now() + 60_000),
      })
      .execute();

    await db.deleteFrom("users").where("id", "=", userId).execute();

    const remaining = await db
      .selectFrom("sessions")
      .select("id_hash")
      .execute();
    expect(remaining).toHaveLength(0);
  });

  it("has the indexes the U1 lookups need (NFR8.3)", async () => {
    const result = await sql<{ indexname: string }>`
      SELECT indexname FROM pg_indexes
      WHERE tablename IN ('users', 'sessions', 'businesses')`.execute(db);
    const names = result.rows.map((row) => row.indexname);

    expect(names).toEqual(
      expect.arrayContaining([
        "users_phone_key",
        "users_business_id_idx",
        "sessions_pkey",
        "sessions_expires_at_idx",
        "sessions_user_id_idx",
      ]),
    );
  });
});
