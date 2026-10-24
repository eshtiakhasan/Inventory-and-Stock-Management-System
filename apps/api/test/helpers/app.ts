/**
 * Builds the real Express app for Supertest (no network port) with a test
 * config, a controllable clock and, optionally, a captured log stream.
 */
import {
  CSRF_HEADER,
  type SessionResponse,
  type SignUpInput,
} from "@mojud/contracts";
import request from "supertest";
import { createApp, type AppBundle } from "../../src/app.js";
import { parseConfig, type Config } from "../../src/platform/config.js";
import { createDb, createPool, type Db } from "../../src/platform/db/db.js";
import { createLogger } from "../../src/platform/log.js";
import { aSignUp } from "./factories.js";

export const TEST_ORIGIN = "http://localhost:8080";

/** A controllable clock: `clock.now` can be moved by a test. */
export interface TestClock {
  now: Date;
  read: () => Date;
}

export function testClock(start = new Date("2026-10-25T09:00:00Z")): TestClock {
  const clock: TestClock = { now: start, read: () => clock.now };
  return clock;
}

export function testConfig(clock: () => Date = () => new Date()): Config {
  return parseConfig(
    {
      NODE_ENV: "test",
      DATABASE_URL: process.env.TEST_DATABASE_URL ?? "postgres://unused",
      POSTGRES_PASSWORD: "local-dev-only",
      APP_ORIGIN: `${TEST_ORIGIN},http://127.0.0.1:8080`,
      LOG_LEVEL: "info",
    },
    { clock },
  );
}

/** Collects pino lines written to it, parsed as JSON. */
export class LogCapture {
  readonly lines: Record<string, unknown>[] = [];
  readonly raw: string[] = [];

  write(chunk: string): void {
    this.raw.push(chunk);
    this.lines.push(JSON.parse(chunk) as Record<string, unknown>);
  }

  text(): string {
    return this.raw.join("");
  }
}

export interface TestAppOptions {
  db: Db;
  clock?: TestClock;
  logs?: LogCapture;
}

export function buildTestApp(
  options: TestAppOptions,
): AppBundle & { config: Config } {
  const config = testConfig(options.clock?.read);
  const logger = options.logs
    ? createLogger({ logLevel: "debug", nodeEnv: "test" }, options.logs)
    : createLogger({ logLevel: "silent", nodeEnv: "test" });
  return { ...createApp({ db: options.db, config, logger }), config };
}

/** A Kysely instance whose pool points at a port nothing listens on. */
export function deadDb(): Db {
  return createDb(
    createPool(
      {
        connectionString: "postgres://nobody:nothing@127.0.0.1:1/none",
        max: 2,
        connectionTimeoutMillis: 500,
      },
      { warn: () => undefined },
    ),
  );
}

export interface SignedInAgent {
  agent: ReturnType<typeof request.agent>;
  session: SessionResponse;
  input: SignUpInput;
}

/** Signs a new business up through the API; the agent keeps the cookie. */
export async function signUpAgent(
  app: AppBundle["app"],
  overrides: Partial<SignUpInput> = {},
): Promise<SignedInAgent> {
  const agent = request.agent(app);
  const input = aSignUp(overrides);
  const res = await agent
    .post("/api/v1/auth/signup")
    .set("Origin", TEST_ORIGIN)
    .send(input);
  if (res.status !== 201) {
    throw new Error(
      `sign-up failed: ${res.status} ${JSON.stringify(res.body)}`,
    );
  }
  return { agent, session: res.body as SessionResponse, input };
}

/** A POST from the allowed origin carrying the agent's CSRF token. */
export function postWithCsrf(signedIn: SignedInAgent, path: string) {
  return signedIn.agent
    .post(path)
    .set("Origin", TEST_ORIGIN)
    .set(CSRF_HEADER, signedIn.session.csrfToken);
}
