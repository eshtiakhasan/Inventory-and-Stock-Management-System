/**
 * Test database helpers. API integration tests use the real `mojud_test`
 * database; it is never mocked (team Testing Posture).
 */
import { sql } from "kysely";
import type pg from "pg";
import { inject } from "vitest";
import { createDb, createPool, type Db } from "../../src/platform/db/db.js";

let pool: pg.Pool | undefined;
let db: Db | undefined;

/** The test database URL; throws when global setup could not reach it. */
export function testDatabaseUrl(): string {
  const setupError = inject("dbSetupError");
  if (setupError) {
    throw new Error(setupError);
  }
  const url = process.env.TEST_DATABASE_URL;
  if (!url) {
    throw new Error(
      "database not reachable at TEST_DATABASE_URL: the variable is not set",
    );
  }
  return url;
}

/**
 * Returns the shared test database for this test file. Call it in `beforeAll`:
 * when the database is not reachable it throws, so the tests fail at once.
 */
export function useTestDb(): Db {
  if (!db) {
    pool = createPool(
      { connectionString: testDatabaseUrl(), max: 5 },
      { warn: () => undefined },
    );
    db = createDb(pool);
  }
  return db;
}

/** Empties the identity tables between tests. */
export async function truncateIdentity(target: Db): Promise<void> {
  await sql`TRUNCATE sessions, users, businesses RESTART IDENTITY CASCADE`.execute(
    target,
  );
}

/** Closes the shared pool at the end of a test file. */
export async function closeTestDb(): Promise<void> {
  if (db) {
    await db.destroy();
  }
  db = undefined;
  pool = undefined;
}
