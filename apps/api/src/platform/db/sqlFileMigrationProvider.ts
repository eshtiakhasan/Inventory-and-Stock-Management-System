import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { sql } from "kysely";
import type { Migration, MigrationProvider } from "kysely/migration";

/**
 * Kysely has no plain-SQL migration provider, so this one reads
 * `migrations/*.sql` in name order and runs each file as one migration
 * (reliability-design.md). This is the only file allowed to use `sql.raw`
 * (NFR1.11): the migration files are trusted, version-controlled SQL.
 * Kysely's Migrator runs each migration inside its own transaction and holds
 * its migration lock, so concurrent runs are safe.
 */
export class SqlFileMigrationProvider implements MigrationProvider {
  constructor(private readonly migrationsDir: string) {}

  async getMigrations(): Promise<Record<string, Migration>> {
    let entries: string[];
    try {
      entries = await readdir(this.migrationsDir);
    } catch (error) {
      throw new Error(
        `Cannot read the migrations folder ${this.migrationsDir}: ${String(error)}`,
        { cause: error },
      );
    }
    const files = entries.filter((name) => name.endsWith(".sql")).sort();
    const migrations: Record<string, Migration> = {};
    for (const file of files) {
      const text = await readFile(path.join(this.migrationsDir, file), "utf8");
      migrations[file.replace(/\.sql$/, "")] = {
        async up(db) {
          await sql.raw(text).execute(db);
        },
      };
    }
    return migrations;
  }
}
