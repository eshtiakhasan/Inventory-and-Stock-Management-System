/**
 * API test global setup (NFR7.2). On every run it connects to the `postgres`
 * maintenance database, creates `mojud_test` if missing, and migrates it with
 * the same migrator as the `migrate` service. Both steps are safe to repeat.
 *
 * If the database cannot be reached, the reason is handed to the tests through
 * `provide`. Every database-backed test then fails at once with a clear
 * "database not reachable at TEST_DATABASE_URL" message, while tests that need
 * no database still run.
 */
import { sql } from "kysely";
import type { TestProject } from "vitest/node";
import { createDb, createPool } from "../src/platform/db/db.js";
import { runMigrations } from "../src/platform/db/migrations.js";

declare module "vitest" {
  export interface ProvidedContext {
    dbSetupError: string | null;
  }
}

const CONNECT_TIMEOUT_MS = 3000;
const silentLog = { warn: () => undefined };

/** Hides the password when a URL is printed. */
export function redactUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.password) parsed.password = "***";
    return parsed.toString();
  } catch {
    return "(unparsable URL)";
  }
}

const CONNECTION_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EAI_AGAIN",
]);

/** True for errors that mean the server could not be reached at all. */
function isConnectionError(error: unknown): boolean {
  const code = (error as { code?: unknown } | null)?.code;
  if (typeof code === "string" && CONNECTION_ERROR_CODES.has(code)) {
    return true;
  }
  if (error instanceof AggregateError) {
    return error.errors.some(isConnectionError);
  }
  const message = error instanceof Error ? error.message : "";
  return /timeout|ECONNREFUSED/i.test(message);
}

async function ensureDatabase(testUrl: string): Promise<void> {
  const target = new URL(testUrl);
  const dbName = decodeURIComponent(target.pathname.replace(/^\//, ""));
  if (!/^[a-z_][a-z0-9_]*$/.test(dbName)) {
    throw new Error(`invalid test database name "${dbName}"`);
  }
  const maintenance = new URL(testUrl);
  maintenance.pathname = "/postgres";
  const db = createDb(
    createPool(
      {
        connectionString: maintenance.toString(),
        max: 1,
        connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
      },
      silentLog,
    ),
  );
  try {
    const found = await sql<{ found: number }>`
      SELECT 1 AS found FROM pg_database WHERE datname = ${dbName}`.execute(db);
    if (found.rows.length === 0) {
      // The name is checked against a strict pattern above, so the identifier is safe.
      await sql`CREATE DATABASE ${sql.id(dbName)}`.execute(db);
    }
  } finally {
    await db.destroy();
  }
}

async function migrateTestDatabase(testUrl: string): Promise<void> {
  const db = createDb(
    createPool(
      {
        connectionString: testUrl,
        max: 1,
        connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
      },
      silentLog,
    ),
  );
  try {
    await runMigrations(db);
  } finally {
    await db.destroy();
  }
}

export default async function setup(project: TestProject): Promise<void> {
  const testUrl = process.env.TEST_DATABASE_URL;
  if (!testUrl) {
    const message =
      "database not reachable at TEST_DATABASE_URL: the variable is not set (copy .env.example to .env)";
    console.error(`[api tests] ${message}`);
    project.provide("dbSetupError", message);
    return;
  }
  try {
    await ensureDatabase(testUrl);
    await migrateTestDatabase(testUrl);
    project.provide("dbSetupError", null);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    const message = isConnectionError(error)
      ? `database not reachable at TEST_DATABASE_URL (${redactUrl(testUrl)}): ${reason}. Start it with: docker compose up -d --wait db`
      : `test database setup failed at TEST_DATABASE_URL (${redactUrl(testUrl)}): ${reason}`;
    console.error(`[api tests] ${message}`);
    project.provide("dbSetupError", message);
  }
}
