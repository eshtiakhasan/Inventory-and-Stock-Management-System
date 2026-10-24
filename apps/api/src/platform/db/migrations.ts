import { fileURLToPath } from "node:url";
import type { Kysely } from "kysely";
import { Migrator, type MigrationResult } from "kysely/migration";
import { SqlFileMigrationProvider } from "./sqlFileMigrationProvider.js";

/**
 * The `apps/api/migrations` folder. This file sits at `src/platform/db/` (and
 * at `dist/platform/db/` once built), so the folder is three levels up.
 */
export const MIGRATIONS_DIR = fileURLToPath(
  new URL("../../../migrations", import.meta.url),
);

export interface MigrationOutcome {
  results: readonly MigrationResult[];
}

/**
 * Applies every pending migration (forward only). Throws when a migration
 * fails, naming the failed migration and the database error.
 */
export async function runMigrations<DB>(
  db: Kysely<DB>,
  migrationsDir: string = MIGRATIONS_DIR,
): Promise<MigrationOutcome> {
  const migrator = new Migrator({
    db,
    provider: new SqlFileMigrationProvider(migrationsDir),
  });
  const { error, results = [] } = await migrator.migrateToLatest();
  if (error) {
    const failed = results.find((result) => result.status === "Error");
    const name = failed ? ` (${failed.migrationName})` : "";
    throw new Error(`Migration failed${name}: ${String(error)}`, {
      cause: error,
    });
  }
  return { results };
}
