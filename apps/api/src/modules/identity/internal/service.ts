/**
 * Identity use cases: sign-up (WF1), sign-in (WF2), sign-out (WF3), session
 * resolution (WF4) and `authorize` (contract C2). Rules: BR1.1–BR2.8.
 */
import {
  normalizePhone,
  SIGN_UP_FIELD_MESSAGES,
  SignInSchema,
  SignUpSchema,
} from "@mojud/contracts";
import type { Argon2Params, Clock } from "../../../platform/config.js";
import type { Db } from "../../../platform/db/db.js";
import {
  AppError,
  uniqueViolationConstraint,
} from "../../../platform/errors.js";
import { validate } from "../../../platform/validation.js";
import { getDummyHash, passwordHasher } from "./password.js";
import {
  createBusinessWithOwner,
  deleteSession,
  extendSession,
  findSessionByIdHashGlobal,
  findUserByPhoneForSignIn,
  getCaller,
  insertSession,
  type Executor,
} from "./repository.js";
import {
  hashSessionId,
  newCsrfToken,
  newSessionId,
  safeEqual,
} from "./tokens.js";
import type { Caller } from "./types.js";

export interface IdentityDeps {
  db: Db;
  clock: Clock;
  argon2: Argon2Params;
}

/** A new signed-in session: the raw id goes only into the cookie. */
export interface SessionGrant {
  caller: Caller;
  sessionId: string;
  csrfToken: string;
}

export interface EventLogger {
  info(obj: object, msg: string): void;
}

async function startSession(
  deps: Pick<IdentityDeps, "clock">,
  executor: Executor,
  caller: Caller,
): Promise<SessionGrant> {
  const sessionId = newSessionId();
  const csrfToken = newCsrfToken();
  await insertSession(executor, {
    idHash: hashSessionId(sessionId),
    userId: caller.userId,
    csrfToken,
    now: deps.clock(),
  });
  return { caller, sessionId, csrfToken };
}

/**
 * WF1: validates, refuses a phone already used in any business (BR1.3), then
 * creates the business, its Owner and the first session in one transaction
 * (BR1.6). A phone taken by a simultaneous sign-up is also DUPLICATE (NFR1.17).
 */
export async function signUp(
  deps: IdentityDeps,
  body: unknown,
): Promise<SessionGrant> {
  const input = validate(SignUpSchema, body, SIGN_UP_FIELD_MESSAGES);
  const phone = normalizePhone(input.phone);
  if (!phone) {
    throw new AppError(
      "VALIDATION_FAILED",
      "phone",
      SIGN_UP_FIELD_MESSAGES.phone,
    );
  }
  if (await findUserByPhoneForSignIn(deps.db, phone)) {
    throw new AppError("DUPLICATE", "phone");
  }
  const passwordHash = await passwordHasher.hash(input.password, deps.argon2);
  try {
    return await deps.db.transaction().execute(async (trx) => {
      const ids = await createBusinessWithOwner(trx, {
        businessName: input.businessName,
        ownerName: input.name,
        phone,
        passwordHash,
      });
      const caller: Caller = {
        userId: ids.userId,
        businessId: ids.businessId,
        businessName: input.businessName,
        name: input.name,
        role: "owner",
        warehouseIds: [],
        active: true,
      };
      return startSession(deps, trx, caller);
    });
  } catch (error) {
    if (uniqueViolationConstraint(error) === "users_phone_key") {
      throw new AppError("DUPLICATE", "phone");
    }
    throw error;
  }
}

/**
 * WF2 with one uniform path (NFR1.3, security-design.md): the hash check runs
 * exactly once on every path, against a dummy hash when there is no user, and
 * every failure is INVALID_CREDENTIALS. ACCOUNT_DEACTIVATED is only returned
 * after a correct password (BR2.2).
 */
export async function signIn(
  deps: IdentityDeps,
  body: unknown,
): Promise<SessionGrant> {
  const parsed = SignInSchema.safeParse(body);
  const phone = parsed.success ? normalizePhone(parsed.data.phone) : null;
  const user = phone
    ? await findUserByPhoneForSignIn(deps.db, phone)
    : undefined;
  const ok = await passwordHasher.verify(
    user?.passwordHash ?? (await getDummyHash()),
    parsed.success ? parsed.data.password : "",
  );
  if (!user || !ok) throw new AppError("INVALID_CREDENTIALS");
  if (!user.active) throw new AppError("ACCOUNT_DEACTIVATED");
  const caller = await getCaller(deps.db, user.businessId, user.userId);
  if (!caller) {
    throw new Error(`user ${user.userId} has no business row`);
  }
  return startSession(deps, deps.db, caller);
}

/**
 * Runs the same dummy hash check a failed sign-in runs. The error handler
 * calls it when a sign-in body never reaches `signIn` (malformed JSON, wrong
 * charset, too large), so timing stays uniform (NFR1.3).
 */
export async function equalizeSignInFailure(): Promise<void> {
  await passwordHasher.verify(await getDummyHash(), "");
}

/** WF3: deletes the session at once (BR2.4). */
export async function signOut(
  deps: Pick<IdentityDeps, "db">,
  idHash: string,
): Promise<void> {
  await deleteSession(deps.db, idHash);
}

/**
 * The resolved session of a request. `checkCsrf` and `extend` keep the
 * session's internals inside the identity module.
 */
export interface ResolvedSession {
  readonly caller: Caller;
  readonly idHash: string;
  readonly csrfToken: string;
  /** Constant-time compare of the X-CSRF-Token header (BR2.5, NFR1.7). */
  checkCsrf(token: string | undefined): boolean;
  /** Moves the expiry to now + 12 hours (BR2.3). */
  extend(): Promise<void>;
}

/**
 * WF4 steps 1–4 (lookup only, no extension): no cookie or no stored session is
 * NOT_SIGNED_IN; an expired session or an inactive user deletes the session
 * and is SESSION_ENDED (BR2.3, BR2.6).
 */
export async function resolveSession(
  deps: Pick<IdentityDeps, "db" | "clock">,
  sessionId: string | undefined,
  log?: EventLogger,
): Promise<ResolvedSession> {
  if (!sessionId) throw new AppError("NOT_SIGNED_IN");
  const idHash = hashSessionId(sessionId);
  const stored = await findSessionByIdHashGlobal(deps.db, idHash);
  if (!stored) throw new AppError("NOT_SIGNED_IN");
  const now = deps.clock();
  const reason =
    stored.expiresAt.getTime() <= now.getTime()
      ? "expired"
      : stored.caller.active
        ? undefined
        : "inactive";
  if (reason) {
    await deleteSession(deps.db, idHash);
    log?.info(
      { event: "auth.session_ended", userId: stored.caller.userId, reason },
      "session ended",
    );
    throw new AppError("SESSION_ENDED");
  }
  return {
    caller: stored.caller,
    idHash,
    csrfToken: stored.csrfToken,
    checkCsrf: (token) => safeEqual(token, stored.csrfToken),
    extend: () => extendSession(deps.db, idHash, deps.clock()),
  };
}

/**
 * Contract C2 `authorize`. In U1 it allows any signed-in, active caller
 * (BR2.7, NFR1.9). U2 adds the role table and warehouse scope here, without
 * changing the signature. Every module operation calls it first.
 */
export function authorize(
  caller: Caller | undefined,
  _action: string,
  _warehouseId: string | null = null,
): void {
  if (!caller) throw new AppError("NOT_SIGNED_IN");
  if (!caller.active) throw new AppError("FORBIDDEN");
}
