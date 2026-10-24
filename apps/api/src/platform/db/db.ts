import { Kysely, PostgresDialect, type Generated } from "kysely";
import pg from "pg";
import type { Role } from "@mojud/contracts";

/** Database types for the identity tables (migrations/0001_identity.sql). */
export interface BusinessesTable {
  id: Generated<string>;
  name: string;
  created_at: Generated<Date>;
}

export interface UsersTable {
  id: Generated<string>;
  business_id: string;
  name: string;
  phone: string;
  role: Role;
  password_hash: string;
  active: Generated<boolean>;
  created_at: Generated<Date>;
}

export interface SessionsTable {
  id_hash: string;
  user_id: string;
  csrf_token: string;
  created_at: Generated<Date>;
  last_used_at: Date;
  expires_at: Date;
}

export interface Database {
  businesses: BusinessesTable;
  users: UsersTable;
  sessions: SessionsTable;
}

export type Db = Kysely<Database>;

/** The part of the logger the pool needs. */
export interface PoolLogger {
  warn(obj: object, msg: string): void;
}

export interface PoolOptions {
  connectionString: string;
  max: number;
  /** Defaults to 5000 ms (performance-design.md). */
  connectionTimeoutMillis?: number;
}

/**
 * Creates the one connection pool of the process (NFR8.2). The `error`
 * listener logs idle-client errors at warn and never rethrows, so a database
 * restart never crashes the backend (NFR8.6).
 */
export function createPool(options: PoolOptions, log: PoolLogger): pg.Pool {
  const pool = new pg.Pool({
    connectionString: options.connectionString,
    max: options.max,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: options.connectionTimeoutMillis ?? 5_000,
  });
  pool.on("error", (err) => {
    log.warn({ err }, "idle db client error");
  });
  return pool;
}

/** Wraps a pool in a typed Kysely instance. */
export function createDb(pool: pg.Pool): Db {
  return new Kysely<Database>({ dialect: new PostgresDialect({ pool }) });
}
