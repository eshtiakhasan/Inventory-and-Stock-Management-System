import { CSRF_HEADER } from "@mojud/contracts";
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { listRoutes } from "../../src/app.js";
import {
  ConfigError,
  loadConfig,
  parseConfig,
} from "../../src/platform/config.js";
import { createPool, type Db } from "../../src/platform/db/db.js";
import { shutdown } from "../../src/platform/shutdown.js";
import {
  buildTestApp,
  deadDb,
  LogCapture,
  signUpAgent,
  TEST_ORIGIN,
} from "../helpers/app.js";
import { closeTestDb, truncateIdentity, useTestDb } from "../helpers/db.js";
import { aSignUp } from "../helpers/factories.js";

const PUBLIC_ALLOW_LIST = [
  "POST /api/v1/auth/signup",
  "POST /api/v1/auth/signin",
  "GET /api/v1/health",
  "GET /api/v1/openapi.json",
];

describe("platform without a database", () => {
  let db: Db;

  beforeAll(() => {
    db = deadDb();
  });
  afterAll(async () => {
    await db.destroy();
  });

  it("sends the security headers on API responses (NFR1.14)", async () => {
    const { app } = buildTestApp({ db });

    const res = await request(app).get("/api/v1/auth/me");

    expect(res.status).toBe(401);
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
    expect(res.headers["x-frame-options"]).toBe("DENY");
    expect(res.headers["referrer-policy"]).toBe("same-origin");
    expect(res.headers["x-powered-by"]).toBeUndefined();
    expect(res.headers["x-response-time"]).toMatch(/^\d+(\.\d+)?ms$/);
  });

  it("echoes a valid X-Request-Id, replaces an invalid one, and puts it in a 500 body without internals (NFR8.10, NFR1.13)", async () => {
    const logs = new LogCapture();
    const { app } = buildTestApp({ db, logs });

    const echoed = await request(app)
      .get("/api/v1/auth/me")
      .set("X-Request-Id", "abc-123-def-456");
    const replaced = await request(app)
      .get("/api/v1/auth/me")
      .set("X-Request-Id", "bad id!");
    const failed = await request(app)
      .post("/api/v1/auth/signup")
      .set("Origin", TEST_ORIGIN)
      .set("X-Request-Id", "req-500-check")
      .send(aSignUp());

    expect(echoed.headers["x-request-id"]).toBe("abc-123-def-456");
    expect(replaced.headers["x-request-id"]).toMatch(/^[0-9a-f-]{36}$/);
    expect(failed.status).toBe(500);
    expect(failed.body).toEqual({
      code: "INTERNAL_ERROR",
      message: "Couldn't save. Try again.",
      requestId: "req-500-check",
    });
    const errorLine = logs.lines.find((line) => line.msg === "unhandled error");
    expect(errorLine).toMatchObject({ level: 50, requestId: "req-500-check" });
    const requestLine = logs.lines.find(
      (line) => line.msg === "request failed",
    );
    expect(requestLine).toMatchObject({
      level: 50,
      status: 500,
      route: "/api/v1/auth/signup",
    });
  });

  it("answers health with 503 when the database is down (NFR8.13)", async () => {
    const { app } = buildTestApp({ db });

    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: "error", db: "down" });
  });

  it("routes every request through authentication except the public allow-list (NFR1.8)", async () => {
    const { app, routes, mounted } = buildTestApp({ db });
    const appStack = (
      app as unknown as {
        router: { stack: { route?: unknown; handle: unknown }[] };
      }
    ).router.stack;
    const wrappers = new Set<unknown>(mounted.map((m) => m.wrapper));
    const routerLayers = appStack.filter((layer) =>
      Array.isArray((layer.handle as { stack?: unknown }).stack),
    );

    const publicRoutes = routes
      .filter((r) => r.access === "public")
      .map((r) => `${r.method} ${r.path}`);
    const protectedRoutes = routes.filter((r) => r.access === "protected");

    expect(appStack.filter((layer) => layer.route)).toHaveLength(0);
    expect(routerLayers.every((layer) => wrappers.has(layer.handle))).toBe(
      true,
    );
    expect(routerLayers).toHaveLength(mounted.length);
    expect(
      mounted.reduce((sum, m) => sum + listRoutes(m.router).length, 0),
    ).toBe(routes.length);
    expect(publicRoutes.sort()).toEqual([...PUBLIC_ALLOW_LIST].sort());
    expect(protectedRoutes.length).toBeGreaterThan(0);
    for (const route of protectedRoutes) {
      const call =
        route.method === "GET"
          ? request(app).get(route.path)
          : request(app).post(route.path);
      const res = await call.set("Origin", TEST_ORIGIN);
      expect(res.status, `${route.method} ${route.path}`).toBe(401);
    }
  });

  it("serves the OpenAPI document generated from the zod schemas, including health", async () => {
    const { app } = buildTestApp({ db });

    const res = await request(app).get("/api/v1/openapi.json");

    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe("3.1.0");
    expect(Object.keys(res.body.paths).sort()).toEqual(
      [
        "/auth/me",
        "/auth/signin",
        "/auth/signout",
        "/auth/signup",
        "/health",
      ].sort(),
    );
    expect(res.body.components.schemas.SessionResponse.required).toContain(
      "csrfToken",
    );
  });

  it("keeps running when the pool emits an idle-client error, logging it at warn (NFR8.6)", () => {
    const warn = vi.fn();
    const pool = createPool(
      { connectionString: "postgres://unused@127.0.0.1:1/none", max: 1 },
      { warn },
    );

    expect(() =>
      pool.emit("error", new Error("terminating connection")),
    ).not.toThrow();
    expect(warn).toHaveBeenCalledWith(
      expect.objectContaining({ err: expect.any(Error) }),
      "idle db client error",
    );
  });
});

describe("shutdown (NFR8.8)", () => {
  function fakes(closeDelayMs: number) {
    const order: string[] = [];
    const server = {
      close: (cb: (err?: Error) => void) => {
        order.push("server.close");
        setTimeout(() => {
          order.push("server.closed");
          cb();
        }, closeDelayMs);
      },
      closeIdleConnections: () => order.push("closeIdle"),
      closeAllConnections: () => order.push("closeAll"),
    };
    const pool = { end: async () => void order.push("pool.end") };
    const cleanup = { stop: async () => void order.push("cleanup.stop") };
    const log = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
    return { order, deps: { server, pool, cleanup, log } };
  }

  it("stops the clean-up, closes the server, waits for in-flight requests, then ends the pool", async () => {
    const { order, deps } = fakes(30);

    await shutdown({ ...deps, timeoutMs: 1000 });

    expect(order).toEqual([
      "cleanup.stop",
      "server.close",
      "closeIdle",
      "server.closed",
      "pool.end",
    ]);
    expect(deps.log.warn).not.toHaveBeenCalled();
  });

  it("closes remaining connections after the timeout, and still ends the pool last", async () => {
    const { order, deps } = fakes(200);

    await shutdown({ ...deps, timeoutMs: 20 });

    expect(order).toEqual([
      "cleanup.stop",
      "server.close",
      "closeIdle",
      "closeAll",
      "server.closed",
      "pool.end",
    ]);
    expect(deps.log.warn).toHaveBeenCalledWith(
      expect.objectContaining({ event: "shutdown.timeout" }),
      expect.any(String),
    );
  });
});

describe("config (NFR1.12, NFR8.2, NFR8.12)", () => {
  const valid = {
    DATABASE_URL: "postgres://u:p@localhost:5433/mojud",
    POSTGRES_PASSWORD: "local-dev-only",
    APP_ORIGIN: "http://localhost:8080, http://127.0.0.1:8080",
  };

  it("parses a valid environment with defaults", () => {
    const config = parseConfig(valid);

    expect(config.appOrigins).toEqual([
      "http://localhost:8080",
      "http://127.0.0.1:8080",
    ]);
    expect(config).toMatchObject({
      cookieSecure: false,
      logLevel: "info",
      dbPoolMax: 10,
      port: 3000,
    });
    expect(config.argon2).toEqual({
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    });
  });

  it("refuses an origin with a path and a pool above 10", () => {
    expect(() =>
      parseConfig({ ...valid, APP_ORIGIN: "http://localhost:8080/app" }),
    ).toThrow(ConfigError);
    expect(() => parseConfig({ ...valid, DB_POOL_MAX: "11" })).toThrow(
      ConfigError,
    );
  });

  it("exits with code 1 and a clear message when a required variable is missing or empty", () => {
    const errors: string[] = [];
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation((msg: string) => void errors.push(msg));
    const exit = vi.fn((code: number): never => {
      throw new Error(`exit ${code}`);
    });

    expect(() => loadConfig({ ...valid, DATABASE_URL: "" }, exit)).toThrow(
      "exit 1",
    );
    expect(() => loadConfig({ APP_ORIGIN: valid.APP_ORIGIN }, exit)).toThrow(
      "exit 1",
    );
    expect(exit).toHaveBeenCalledWith(1);
    expect(errors.join("\n")).toMatch(/DATABASE_URL/);
    expect(errors.join("\n")).toMatch(/POSTGRES_PASSWORD/);
    consoleError.mockRestore();
  });
});

describe("platform with the database", () => {
  let db: Db;

  beforeAll(() => {
    db = useTestDb();
  });
  beforeEach(async () => {
    await truncateIdentity(db);
  });
  afterAll(async () => {
    await closeTestDb();
  });

  it("answers health with 200 when the database answers, logging it only at debug", async () => {
    const logs = new LogCapture();
    const { app } = buildTestApp({ db, logs });

    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", db: "ok" });
    const line = logs.lines.find((l) => l.route === "/api/v1/health");
    expect(line).toMatchObject({ level: 20, status: 200 });
  });

  it("logs one request line with the fields, and never the password, cookie or CSRF token (NFR8.9, NFR1.2, NFR1.18)", async () => {
    const logs = new LogCapture();
    const { app } = buildTestApp({ db, logs });
    const signedIn = await signUpAgent(app);
    await signedIn.agent
      .get("/api/v1/auth/me")
      .set(CSRF_HEADER, signedIn.session.csrfToken);
    await request(app)
      .post("/api/v1/auth/signin")
      .set("Origin", TEST_ORIGIN)
      .send({ phone: signedIn.input.phone, password: "a wrong password" });

    const meLine = logs.lines.find((l) => l.route === "/api/v1/auth/me");
    expect(meLine).toMatchObject({
      level: 30,
      method: "GET",
      status: 200,
      userId: signedIn.session.userId,
      businessId: signedIn.session.businessId,
      requestId: expect.any(String),
      durationMs: expect.any(Number),
    });
    expect(logs.lines.find((l) => l.event === "auth.signup")).toMatchObject({
      businessId: signedIn.session.businessId,
      userId: signedIn.session.userId,
    });
    const failure = logs.lines.find((l) => l.event === "auth.signin_failed");
    expect(failure).toMatchObject({ reason: "invalid" });
    const text = logs.text();
    expect(text).not.toContain(signedIn.input.password);
    expect(text).not.toContain("a wrong password");
    expect(text).not.toContain(signedIn.session.csrfToken);
    expect(text).not.toContain(signedIn.input.phone);
    expect(text).not.toMatch(/mojud_session=/);
    const users = await db.selectFrom("users").selectAll().execute();
    expect(JSON.stringify(users)).not.toContain(signedIn.input.password);
  });
});
