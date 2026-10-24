import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  getDummyHash,
  passwordHasher,
} from "../../src/modules/identity/internal/password.js";
import {
  authorize,
  resolveSession,
  signIn,
  signOut,
  signUp,
  type IdentityDeps,
} from "../../src/modules/identity/internal/service.js";
import { hashSessionId } from "../../src/modules/identity/internal/tokens.js";
import type { Caller } from "../../src/modules/identity/internal/types.js";
import { ARGON2_PARAMS, SESSION_TTL_MS } from "../../src/platform/config.js";
import type { Db } from "../../src/platform/db/db.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";
import { aSignUp } from "../helpers/factories.js";

describe("identity service", () => {
  let db: Db;
  let now: Date;
  let deps: IdentityDeps;

  beforeAll(async () => {
    db = useTestDb();
    await getDummyHash();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
    now = new Date("2026-10-25T09:00:00Z");
    deps = { db, clock: () => now, argon2: ARGON2_PARAMS };
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  afterAll(async () => {
    await closeTestDb();
  });

  describe("signUp (WF1)", () => {
    it("creates the business, its Owner and a session, storing only a hash", async () => {
      const input = aSignUp({ phone: "017-1100 0001" });

      const grant = await signUp(deps, input);

      expect(grant.caller).toMatchObject({
        businessName: input.businessName,
        name: input.name,
        role: "owner",
        warehouseIds: [],
      });
      const user = await db
        .selectFrom("users")
        .selectAll()
        .executeTakeFirstOrThrow();
      expect(user.phone).toBe("01711000001");
      expect(user.password_hash).not.toContain(input.password);
      const session = await db
        .selectFrom("sessions")
        .selectAll()
        .executeTakeFirstOrThrow();
      expect(session.id_hash).toBe(hashSessionId(grant.sessionId));
      expect(session.csrf_token).toBe(grant.csrfToken);
    });

    it("refuses a phone already registered in any business with DUPLICATE", async () => {
      const phone = "01711000002";
      await signUp(deps, aSignUp({ phone }));

      await expect(
        signUp(
          deps,
          aSignUp({ phone: "0171-100-0002", businessName: "Other" }),
        ),
      ).rejects.toMatchObject({ code: "DUPLICATE", field: "phone" });
    });

    it("reports one of two simultaneous sign-ups with the same phone as DUPLICATE (NFR1.17)", async () => {
      const phone = "01711000003";

      const results = await Promise.allSettled([
        signUp(deps, aSignUp({ phone, businessName: "First" })),
        signUp(deps, aSignUp({ phone, businessName: "Second" })),
      ]);

      const fulfilled = results.filter((r) => r.status === "fulfilled");
      const rejected = results.filter((r) => r.status === "rejected");
      expect(fulfilled).toHaveLength(1);
      expect(rejected).toHaveLength(1);
      expect((rejected[0] as PromiseRejectedResult).reason).toMatchObject({
        code: "DUPLICATE",
      });
      const businesses = await db
        .selectFrom("businesses")
        .select("id")
        .execute();
      expect(businesses).toHaveLength(1);
    });

    it("refuses invalid fields with VALIDATION_FAILED naming the field", async () => {
      await expect(
        signUp(deps, aSignUp({ businessName: "   " })),
      ).rejects.toMatchObject({
        code: "VALIDATION_FAILED",
        field: "businessName",
      });
      await expect(
        signUp(deps, aSignUp({ phone: "12345" })),
      ).rejects.toMatchObject({
        code: "VALIDATION_FAILED",
        field: "phone",
      });
      await expect(
        signUp(deps, aSignUp({ password: "short" })),
      ).rejects.toMatchObject({
        code: "VALIDATION_FAILED",
        field: "password",
        message: "At least 8 characters.",
      });
      await expect(
        signUp(deps, { ...aSignUp(), extra: 1 }),
      ).rejects.toMatchObject({
        code: "VALIDATION_FAILED",
        field: "extra",
      });
    });
  });

  describe("signIn (WF2)", () => {
    it("signs in with the right phone and password, in any typed format", async () => {
      const input = aSignUp({ phone: "01711000004" });
      const created = await signUp(deps, input);

      const grant = await signIn(deps, {
        phone: "0171 100-0004",
        password: input.password,
      });

      expect(grant.caller).toMatchObject({
        userId: created.caller.userId,
        businessId: created.caller.businessId,
        role: "owner",
      });
      expect(grant.sessionId).not.toBe(created.sessionId);
    });

    it.each([
      [
        "unknown phone",
        () => ({ phone: "01799999999", password: "correct horse battery" }),
      ],
      [
        "wrong password",
        () => ({ phone: "01711000005", password: "wrong password!" }),
      ],
      [
        "invalid phone",
        () => ({ phone: "12", password: "correct horse battery" }),
      ],
      ["missing fields", () => ({})],
      [
        "password over 128 characters",
        () => ({ phone: "01711000005", password: "x".repeat(129) }),
      ],
      ["wrong types", () => ({ phone: 1711000005, password: true })],
    ])(
      "refuses %s with INVALID_CREDENTIALS after exactly one hash check (NFR1.3)",
      async (_name, body) => {
        await signUp(deps, aSignUp({ phone: "01711000005" }));
        const verify = vi.spyOn(passwordHasher, "verify");

        await expect(signIn(deps, body())).rejects.toMatchObject({
          code: "INVALID_CREDENTIALS",
        });
        expect(verify).toHaveBeenCalledTimes(1);
      },
    );

    it("refuses a deactivated user with the right password as ACCOUNT_DEACTIVATED, and with a wrong one as INVALID_CREDENTIALS", async () => {
      const input = aSignUp({ phone: "01711000006" });
      await signUp(deps, input);
      await db.updateTable("users").set({ active: false }).execute();

      await expect(
        signIn(deps, { phone: input.phone, password: input.password }),
      ).rejects.toMatchObject({
        code: "ACCOUNT_DEACTIVATED",
      });
      await expect(
        signIn(deps, { phone: input.phone, password: "wrong password!" }),
      ).rejects.toMatchObject({
        code: "INVALID_CREDENTIALS",
      });
    });
  });

  describe("sessions (WF3, WF4)", () => {
    it("resolves a valid session to its caller and extends it", async () => {
      const grant = await signUp(deps, aSignUp());
      now = new Date(now.getTime() + 60 * 60 * 1000);

      const resolved = await resolveSession(deps, grant.sessionId);
      await resolved.extend();

      expect(resolved.caller.userId).toBe(grant.caller.userId);
      expect(resolved.checkCsrf(grant.csrfToken)).toBe(true);
      expect(resolved.checkCsrf("not-the-token")).toBe(false);
      expect(resolved.checkCsrf(undefined)).toBe(false);
      const row = await db
        .selectFrom("sessions")
        .select("expires_at")
        .executeTakeFirstOrThrow();
      expect(row.expires_at.getTime()).toBe(now.getTime() + SESSION_TTL_MS);
    });

    it("refuses a missing cookie, an unknown session and a signed-out session with NOT_SIGNED_IN", async () => {
      const grant = await signUp(deps, aSignUp());
      await signOut(deps, hashSessionId(grant.sessionId));

      await expect(resolveSession(deps, undefined)).rejects.toMatchObject({
        code: "NOT_SIGNED_IN",
      });
      await expect(
        resolveSession(deps, "no-such-session"),
      ).rejects.toMatchObject({ code: "NOT_SIGNED_IN" });
      await expect(resolveSession(deps, grant.sessionId)).rejects.toMatchObject(
        { code: "NOT_SIGNED_IN" },
      );
    });

    it("ends an expired session with SESSION_ENDED and deletes it (BR2.3)", async () => {
      const grant = await signUp(deps, aSignUp());
      const log = { info: vi.fn() };
      now = new Date(now.getTime() + SESSION_TTL_MS + 1);

      await expect(
        resolveSession(deps, grant.sessionId, log),
      ).rejects.toMatchObject({ code: "SESSION_ENDED" });

      expect(
        await db.selectFrom("sessions").select("id_hash").execute(),
      ).toHaveLength(0);
      expect(log.info).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "auth.session_ended",
          reason: "expired",
        }),
        "session ended",
      );
    });

    it("ends an inactive user's session with SESSION_ENDED and deletes it (BR2.6)", async () => {
      const grant = await signUp(deps, aSignUp());
      await db.updateTable("users").set({ active: false }).execute();

      await expect(resolveSession(deps, grant.sessionId)).rejects.toMatchObject(
        { code: "SESSION_ENDED" },
      );
      expect(
        await db.selectFrom("sessions").select("id_hash").execute(),
      ).toHaveLength(0);
    });
  });

  describe("authorize (BR2.7, NFR1.9)", () => {
    it("allows an active caller and refuses a missing or inactive one", async () => {
      const grant = await signUp(deps, aSignUp());
      const inactive: Caller = { ...grant.caller, active: false };

      expect(() => authorize(grant.caller, "identity.me")).not.toThrow();
      expect(() => authorize(undefined, "identity.me")).toThrow(
        expect.objectContaining({ code: "NOT_SIGNED_IN" }),
      );
      expect(() => authorize(inactive, "identity.me", null)).toThrow(
        expect.objectContaining({ code: "FORBIDDEN" }),
      );
    });
  });
});
