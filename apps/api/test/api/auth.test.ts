import { CSRF_HEADER, SESSION_COOKIE } from "@mojud/contracts";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { AppBundle } from "../../src/app.js";
import { SESSION_TTL_MS } from "../../src/platform/config.js";
import type { Db } from "../../src/platform/db/db.js";
import {
  buildTestApp,
  postWithCsrf,
  signUpAgent,
  TEST_ORIGIN,
  testClock,
  type TestClock,
} from "../helpers/app.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";
import { aSignUp } from "../helpers/factories.js";
import { twoBusinesses } from "../helpers/twoBusinesses.js";

const SIGNUP = "/api/v1/auth/signup";
const SIGNIN = "/api/v1/auth/signin";
const SIGNOUT = "/api/v1/auth/signout";
const ME = "/api/v1/auth/me";

const INVALID_CREDENTIALS = {
  code: "INVALID_CREDENTIALS",
  message: "Sign-in details are not correct.",
};

function sessionCookie(setCookie: string[] | string | undefined): string {
  const list = Array.isArray(setCookie)
    ? setCookie
    : setCookie
      ? [setCookie]
      : [];
  const cookie = list.find((value) => value.startsWith(`${SESSION_COOKIE}=`));
  if (!cookie) throw new Error("no session cookie was set");
  return cookie;
}

describe("/api/v1/auth endpoints", () => {
  let db: Db;
  let clock: TestClock;
  let bundle: AppBundle;

  beforeAll(() => {
    db = useTestDb();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
    clock = testClock();
    bundle = buildTestApp({ db, clock });
  });
  afterAll(async () => {
    await closeTestDb();
  });

  const post = (path: string) =>
    request(bundle.app).post(path).set("Origin", TEST_ORIGIN);

  describe("sign-up (WF1)", () => {
    it("returns 201 with the caller, a CSRF token and a session cookie with the right attributes (NFR1.5)", async () => {
      const input = aSignUp();

      const res = await post(SIGNUP).send(input);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({
        businessName: input.businessName,
        name: input.name,
        role: "owner",
        warehouseIds: [],
      });
      expect(res.body.csrfToken).toMatch(/^[A-Za-z0-9_-]{43}$/);
      expect(JSON.stringify(res.body)).not.toContain(input.password);
      const cookie = sessionCookie(res.headers["set-cookie"]);
      expect(cookie).toMatch(/; HttpOnly/);
      expect(cookie).toMatch(/; SameSite=Lax/);
      expect(cookie).toMatch(/; Path=\//);
      expect(cookie).not.toMatch(/Max-Age|Expires|Secure/i);
    });

    it.each([
      ["businessName", { businessName: "  " }, "Enter your business name."],
      ["name", { name: "x".repeat(101) }, "Enter your name."],
      ["phone", { phone: "12345" }, "Enter a phone number of 6 to 15 digits."],
      ["password", { password: "1234567" }, "At least 8 characters."],
    ])(
      "returns 400 VALIDATION_FAILED for an invalid %s",
      async (field, patch, message) => {
        const res = await post(SIGNUP).send(aSignUp(patch));

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: "VALIDATION_FAILED", field, message });
      },
    );

    it("returns 400 for an unknown field and for a body over 100 KB", async () => {
      const extra = await post(SIGNUP).send({ ...aSignUp(), role: "owner" });
      const huge = await post(SIGNUP).send({
        ...aSignUp(),
        businessName: "x".repeat(110_000),
      });

      expect(extra.status).toBe(400);
      expect(extra.body).toMatchObject({
        code: "VALIDATION_FAILED",
        field: "role",
      });
      expect(huge.status).toBe(400);
      expect(huge.body).toMatchObject({ code: "VALIDATION_FAILED" });
    });

    it("returns 409 DUPLICATE for a phone already registered", async () => {
      const input = aSignUp();
      await post(SIGNUP).send(input);

      const res = await post(SIGNUP).send({
        ...input,
        businessName: "Another business",
      });

      expect(res.status).toBe(409);
      expect(res.body).toEqual({
        code: "DUPLICATE",
        field: "phone",
        message: "This phone number is already registered",
      });
    });
  });

  describe("sign-in (WF2)", () => {
    it("returns 200 with the caller and a new session cookie", async () => {
      const input = aSignUp();
      const created = await post(SIGNUP).send(input);

      const res = await post(SIGNIN).send({
        phone: input.phone,
        password: input.password,
      });

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        userId: created.body.userId,
        businessId: created.body.businessId,
      });
      expect(sessionCookie(res.headers["set-cookie"])).toMatch(/; HttpOnly/);
    });

    it("answers a wrong password and an unknown phone with the same 401 body", async () => {
      const input = aSignUp();
      await post(SIGNUP).send(input);

      const wrong = await post(SIGNIN).send({
        phone: input.phone,
        password: "wrong password!",
      });
      const unknown = await post(SIGNIN).send({
        phone: "01799999999",
        password: input.password,
      });

      expect(wrong.status).toBe(401);
      expect(unknown.status).toBe(401);
      expect(wrong.body).toEqual(INVALID_CREDENTIALS);
      expect(unknown.body).toEqual(INVALID_CREDENTIALS);
    });

    it("answers malformed JSON, an unsupported charset and a body over 100 KB with 401 INVALID_CREDENTIALS (NFR1.3)", async () => {
      const malformed = await post(SIGNIN)
        .set("Content-Type", "application/json")
        .send('{"phone": ');
      const charset = await post(SIGNIN)
        .set("Content-Type", "application/json; charset=latin1")
        .send('{"phone":"01711000001","password":"x"}');
      const huge = await post(SIGNIN).send({
        phone: "01711000001",
        password: "x".repeat(110_000),
      });
      const extra = await post(SIGNIN).send({
        phone: "01711000001",
        password: "x",
        admin: true,
      });

      for (const res of [malformed, charset, huge, extra]) {
        expect(res.status).toBe(401);
        expect(res.body).toEqual(INVALID_CREDENTIALS);
      }
    });

    it("returns 401 ACCOUNT_DEACTIVATED for a deactivated user with the right password", async () => {
      const input = aSignUp();
      await post(SIGNUP).send(input);
      await db.updateTable("users").set({ active: false }).execute();

      const res = await post(SIGNIN).send({
        phone: input.phone,
        password: input.password,
      });

      expect(res.status).toBe(401);
      expect(res.body).toEqual({
        code: "ACCOUNT_DEACTIVATED",
        message: "This account is deactivated.",
      });
    });
  });

  describe("sessions, sign-out and CSRF (WF3, WF4)", () => {
    it("serves /auth/me, signs out with 204, then refuses the old cookie with NOT_SIGNED_IN (AC1.2.4)", async () => {
      const signedIn = await signUpAgent(bundle.app);
      const me = await signedIn.agent.get(ME);
      const oldCookie = (
        await post(SIGNIN).send({
          phone: signedIn.input.phone,
          password: signedIn.input.password,
        })
      ).headers["set-cookie"];
      const rawCookie = sessionCookie(oldCookie).split(";")[0] ?? "";

      const signOut = await postWithCsrf(signedIn, SIGNOUT);
      const afterAgent = await signedIn.agent.get(ME);
      const otherSession = await request(bundle.app)
        .get(ME)
        .set("Cookie", rawCookie);

      expect(me.status).toBe(200);
      expect(me.body).toMatchObject({
        userId: signedIn.session.userId,
        csrfToken: signedIn.session.csrfToken,
      });
      expect(signOut.status).toBe(204);
      expect(sessionCookie(signOut.headers["set-cookie"])).toMatch(
        /Expires=Thu, 01 Jan 1970/,
      );
      expect(afterAgent.status).toBe(401);
      expect(afterAgent.body).toMatchObject({ code: "NOT_SIGNED_IN" });
      expect(otherSession.status).toBe(200);
    });

    it("deletes the session at sign-out, so replaying the old cookie value is NOT_SIGNED_IN (BR2.4)", async () => {
      const created = await post(SIGNUP).send(aSignUp());
      const cookie =
        sessionCookie(created.headers["set-cookie"]).split(";")[0] ?? "";
      const before = await db
        .selectFrom("sessions")
        .select("id_hash")
        .execute();

      const signOut = await post(SIGNOUT)
        .set("Cookie", cookie)
        .set(CSRF_HEADER, created.body.csrfToken);
      const replay = await request(bundle.app).get(ME).set("Cookie", cookie);
      const after = await db.selectFrom("sessions").select("id_hash").execute();

      expect(before).toHaveLength(1);
      expect(signOut.status).toBe(204);
      expect(after).toHaveLength(0);
      expect(replay.status).toBe(401);
      expect(replay.body).toMatchObject({ code: "NOT_SIGNED_IN" });
    });

    it("refuses a missing or wrong X-CSRF-Token with 403 and does not extend the session (NFR1.7)", async () => {
      const signedIn = await signUpAgent(bundle.app);
      const start = clock.now.getTime();
      clock.now = new Date(start + 60 * 60 * 1000);

      const missing = await signedIn.agent
        .post(SIGNOUT)
        .set("Origin", TEST_ORIGIN);
      const wrong = await signedIn.agent
        .post(SIGNOUT)
        .set("Origin", TEST_ORIGIN)
        .set(CSRF_HEADER, "not-the-token");
      const row = await db
        .selectFrom("sessions")
        .select("expires_at")
        .executeTakeFirstOrThrow();

      expect(missing.status).toBe(403);
      expect(missing.body).toMatchObject({ code: "FORBIDDEN" });
      expect(wrong.status).toBe(403);
      expect(row.expires_at.getTime()).toBe(start + SESSION_TTL_MS);
    });

    it("extends the session on use and ends it with SESSION_ENDED 12 hours after the last use", async () => {
      const signedIn = await signUpAgent(bundle.app);
      clock.now = new Date(clock.now.getTime() + 11 * 60 * 60 * 1000);
      const stillActive = await signedIn.agent.get(ME);
      clock.now = new Date(clock.now.getTime() + SESSION_TTL_MS + 1);

      const ended = await signedIn.agent.get(ME);

      expect(stillActive.status).toBe(200);
      expect(ended.status).toBe(401);
      expect(ended.body).toEqual({
        code: "SESSION_ENDED",
        message: "Your session ended. Sign in again.",
      });
    });

    it("answers an unknown path with 401 when signed out and 404 NOT_FOUND when signed in", async () => {
      const signedIn = await signUpAgent(bundle.app);

      const anonymous = await request(bundle.app).get("/api/v1/nothing-here");
      const known = await signedIn.agent.get("/api/v1/nothing-here");

      expect(anonymous.status).toBe(401);
      expect(known.status).toBe(404);
      expect(known.body).toEqual({ code: "NOT_FOUND", message: "Not found" });
    });
  });

  describe("Origin check (NFR1.19)", () => {
    it("refuses a foreign Origin, Origin: null, a bad Referer and no header at all with 403", async () => {
      const input = aSignUp();
      const foreign = await request(bundle.app)
        .post(SIGNUP)
        .set("Origin", "http://evil.example")
        .send(input);
      const nullOrigin = await request(bundle.app)
        .post(SIGNIN)
        .set("Origin", "null")
        .send(input);
      const badReferer = await request(bundle.app)
        .post(SIGNIN)
        .set("Referer", "not a url")
        .send(input);
      const foreignReferer = await request(bundle.app)
        .post(SIGNIN)
        .set("Referer", "http://evil.example/page")
        .send(input);
      const none = await request(bundle.app).post(SIGNUP).send(input);

      for (const res of [
        foreign,
        nullOrigin,
        badReferer,
        foreignReferer,
        none,
      ]) {
        expect(res.status).toBe(403);
        expect(res.body).toMatchObject({ code: "FORBIDDEN" });
      }
      expect(await db.selectFrom("users").select("id").execute()).toHaveLength(
        0,
      );
    });

    it("accepts an allowed Referer when Origin is absent", async () => {
      const res = await request(bundle.app)
        .post(SIGNUP)
        .set("Referer", `${TEST_ORIGIN}/signup`)
        .send(aSignUp());

      expect(res.status).toBe(201);
    });
  });

  describe("business isolation (NFR2.2)", () => {
    it("each session's /auth/me returns only its own business", async () => {
      const { a, b } = await twoBusinesses(bundle.app);

      const meA = await a.agent.get(ME);
      const meB = await b.agent.get(ME);

      expect(meA.body).toMatchObject({
        businessId: a.session.businessId,
        businessName: "Business A",
      });
      expect(meB.body).toMatchObject({
        businessId: b.session.businessId,
        businessName: "Business B",
      });
      expect(meA.body.businessId).not.toBe(meB.body.businessId);
    });
  });
});
