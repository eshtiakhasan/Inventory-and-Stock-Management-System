/**
 * Data access for the identity tables (businesses, users, sessions).
 *
 * Business scoping (NFR2.1, BR3.1): every function that reads a
 * business-owned table takes a `businessId: BusinessId` and filters on it.
 * The only exceptions are listed in `GLOBAL_LOOKUPS` below; each one has a
 * reason that makes a business filter impossible (security-design.md):
 * - `findUserByPhoneForSignIn`: sign-in and the duplicate check; the phone is
 *   unique across all businesses (BR1.3), and the business is not known yet.
 * - `findSessionByIdHashGlobal`: authentication; a session row has no
 *   business, it reaches one through its user.
 * - `deleteExpiredSessionsGlobal`: the daily clean-up across all businesses.
 * - `createBusinessWithOwner`: creates the business, so no id exists before it.
 * - `insertSession`, `deleteSession`, `extendSession`: act on the one session
 *   named by its `id_hash`.
 * A test lists this module's exports and fails if any other function lacks a
 * `businessId` parameter.
 */
import type { Kysely, Transaction } from "kysely";
import type { Role } from "@mojud/contracts";
import {
  SESSION_RETENTION_MS,
  SESSION_TTL_MS,
} from "../../../platform/config.js";
import type { Database } from "../../../platform/db/db.js";
import { toBusinessId, toUserId, type BusinessId, type UserId } from "./ids.js";
import type { Caller } from "./types.js";

/** The database, or a transaction on it. */
export type Executor = Kysely<Database> | Transaction<Database>;

/** Functions allowed to run without a businessId, with their reason above. */
export const GLOBAL_LOOKUPS: readonly string[] = [
  "createBusinessWithOwner",
  "findUserByPhoneForSignIn",
  "findSessionByIdHashGlobal",
  "insertSession",
  "deleteSession",
  "extendSession",
  "deleteExpiredSessionsGlobal",
];

export interface NewBusinessWithOwner {
  businessName: string;
  ownerName: string;
  phone: string;
  passwordHash: string;
}

/** Test-only failure injection (NFR1.16). Production code never passes hooks. */
export interface CreateBusinessHooks {
  afterBusinessInsert?: () => void | Promise<void>;
}

/**
 * Inserts the business and its first Owner (BR1.6). Call it inside a
 * transaction so a failure after the business insert saves nothing.
 */
export async function createBusinessWithOwner(
  trx: Transaction<Database>,
  input: NewBusinessWithOwner,
  hooks: CreateBusinessHooks = {},
): Promise<{ businessId: BusinessId; userId: UserId }> {
  const business = await trx
    .insertInto("businesses")
    .values({ name: input.businessName })
    .returning("id")
    .executeTakeFirstOrThrow();
  await hooks.afterBusinessInsert?.();
  const user = await trx
    .insertInto("users")
    .values({
      business_id: business.id,
      name: input.ownerName,
      phone: input.phone,
      role: "owner",
      password_hash: input.passwordHash,
    })
    .returning("id")
    .executeTakeFirstOrThrow();
  return { businessId: toBusinessId(business.id), userId: toUserId(user.id) };
}

export interface SignInUser {
  userId: UserId;
  businessId: BusinessId;
  passwordHash: string;
  active: boolean;
}

/** Global lookup by normalized phone (sign-in and duplicate check). */
export async function findUserByPhoneForSignIn(
  db: Executor,
  phone: string,
): Promise<SignInUser | undefined> {
  const row = await db
    .selectFrom("users")
    .select(["id", "business_id", "password_hash", "active"])
    .where("phone", "=", phone)
    .executeTakeFirst();
  if (!row) return undefined;
  return {
    userId: toUserId(row.id),
    businessId: toBusinessId(row.business_id),
    passwordHash: row.password_hash,
    active: row.active,
  };
}

export interface StoredSession {
  idHash: string;
  csrfToken: string;
  expiresAt: Date;
  caller: Caller;
}

/**
 * Authentication lookup: one round trip joining session, user and business
 * by primary keys (security-design.md, performance-design.md).
 */
export async function findSessionByIdHashGlobal(
  db: Executor,
  idHash: string,
): Promise<StoredSession | undefined> {
  const row = await db
    .selectFrom("sessions as s")
    .innerJoin("users as u", "u.id", "s.user_id")
    .innerJoin("businesses as b", "b.id", "u.business_id")
    .select([
      "s.id_hash",
      "s.csrf_token",
      "s.expires_at",
      "u.id as user_id",
      "u.active",
      "u.name",
      "u.role",
      "b.id as business_id",
      "b.name as business_name",
    ])
    .where("s.id_hash", "=", idHash)
    .executeTakeFirst();
  if (!row) return undefined;
  return {
    idHash: row.id_hash,
    csrfToken: row.csrf_token,
    expiresAt: row.expires_at,
    caller: {
      userId: toUserId(row.user_id),
      businessId: toBusinessId(row.business_id),
      businessName: row.business_name,
      name: row.name,
      role: row.role,
      warehouseIds: [],
      active: row.active,
    },
  };
}

export interface NewSession {
  idHash: string;
  userId: UserId;
  csrfToken: string;
  now: Date;
}

/** Stores a new session that expires 12 hours from now (BR2.3). */
export async function insertSession(
  db: Executor,
  session: NewSession,
): Promise<void> {
  await db
    .insertInto("sessions")
    .values({
      id_hash: session.idHash,
      user_id: session.userId,
      csrf_token: session.csrfToken,
      created_at: session.now,
      last_used_at: session.now,
      expires_at: new Date(session.now.getTime() + SESSION_TTL_MS),
    })
    .execute();
}

/** Removes one session (sign-out, expiry, inactive user). */
export async function deleteSession(
  db: Executor,
  idHash: string,
): Promise<void> {
  await db.deleteFrom("sessions").where("id_hash", "=", idHash).execute();
}

/** Marks the session used now and moves its expiry to now + 12 hours (BR2.3). */
export async function extendSession(
  db: Executor,
  idHash: string,
  now: Date,
): Promise<void> {
  await db
    .updateTable("sessions")
    .set({
      last_used_at: now,
      expires_at: new Date(now.getTime() + SESSION_TTL_MS),
    })
    .where("id_hash", "=", idHash)
    .execute();
}

/** Deletes sessions expired more than 7 days ago; returns how many (BR2.3). */
export async function deleteExpiredSessionsGlobal(
  trx: Executor,
  now: Date,
): Promise<number> {
  const cutoff = new Date(now.getTime() - SESSION_RETENTION_MS);
  const result = await trx
    .deleteFrom("sessions")
    .where("expires_at", "<", cutoff)
    .executeTakeFirst();
  return Number(result.numDeletedRows);
}

/** The caller context of a user, scoped to their business (BR3.1). */
export async function getCaller(
  db: Executor,
  businessId: BusinessId,
  userId: UserId,
): Promise<Caller | undefined> {
  const row = await db
    .selectFrom("users as u")
    .innerJoin("businesses as b", "b.id", "u.business_id")
    .select([
      "u.id",
      "u.name",
      "u.role",
      "u.active",
      "b.id as business_id",
      "b.name as business_name",
    ])
    .where("u.business_id", "=", businessId)
    .where("u.id", "=", userId)
    .executeTakeFirst();
  if (!row) return undefined;
  return {
    userId: toUserId(row.id),
    businessId: toBusinessId(row.business_id),
    businessName: row.business_name,
    name: row.name,
    role: row.role satisfies Role,
    warehouseIds: [],
    active: row.active,
  };
}
