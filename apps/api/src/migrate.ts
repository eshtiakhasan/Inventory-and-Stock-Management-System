/**
 * One-off migration job: the `migrate` Compose service runs this before the
 * backend starts (reliability-design.md). Exits 0 when the schema is current,
 * 1 on any failure, so the backend never starts on a half-migrated database.
 */
import { loadConfig } from "./platform/config.js";
import { createDb, createPool } from "./platform/db/db.js";
import { runMigrations } from "./platform/db/migrations.js";
import { createLogger } from "./platform/log.js";

async function main(): Promise<number> {
  const config = loadConfig();
  const log = createLogger(config);
  const pool = createPool(
    { connectionString: config.databaseUrl, max: 1 },
    log,
  );
  const db = createDb(pool);
  try {
    const { results } = await runMigrations(db);
    if (results.length === 0) {
      log.info({ event: "migrate.current" }, "database schema is current");
    }
    for (const result of results) {
      log.info(
        { event: "migrate.applied", migration: result.migrationName },
        `migration ${result.status}`,
      );
    }
    return 0;
  } catch (error) {
    log.error({ err: error }, "migration failed");
    return 1;
  } finally {
    await db.destroy();
  }
}

process.exitCode = await main();
