import { z } from "zod";

/** Argon2id parameters: the OWASP minimum (NFR1.1). Raise them here, in one place. */
export const ARGON2_PARAMS = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export type Argon2Params = typeof ARGON2_PARAMS;

/** A session ends 12 hours after its last use (BR2.3). */
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
/** Stored sessions expired for more than 7 days are removed by the clean-up (BR2.3). */
export const SESSION_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
/** The clean-up runs once at start, then every 24 hours. */
export const SESSION_CLEANUP_INTERVAL_MS = 24 * 60 * 60 * 1000;

export const LOG_LEVELS = [
  "fatal",
  "error",
  "warn",
  "info",
  "debug",
  "trace",
  "silent",
] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

/** Returns the current time; injected so tests can cross expiry boundaries. */
export type Clock = () => Date;

export interface Config {
  readonly nodeEnv: "development" | "production" | "test";
  readonly databaseUrl: string;
  /** Allowed origins for the Origin check (NFR1.19). */
  readonly appOrigins: readonly string[];
  readonly cookieSecure: boolean;
  readonly logLevel: LogLevel;
  readonly dbPoolMax: number;
  readonly port: number;
  readonly clock: Clock;
  readonly argon2: Argon2Params;
  readonly sessionTtlMs: number;
}

const requiredText = z.string().trim().min(1, "is required");

/** An origin is scheme, host and optional port, with no path, query or fragment. */
export function isOrigin(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.origin === value
    );
  } catch {
    return false;
  }
}

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: requiredText,
  POSTGRES_PASSWORD: requiredText,
  APP_ORIGIN: requiredText
    .transform((value) =>
      value
        .split(",")
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0),
    )
    .refine((origins) => origins.length > 0, "needs at least one origin")
    .refine(
      (origins) => origins.every(isOrigin),
      "every entry must be an origin such as http://localhost:8080 (no path)",
    ),
  COOKIE_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  LOG_LEVEL: z.enum(LOG_LEVELS).default("info"),
  DB_POOL_MAX: z.coerce.number().int().min(1).max(10).default(10),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export class ConfigError extends Error {
  constructor(readonly problems: readonly string[]) {
    super(`Invalid configuration:\n  - ${problems.join("\n  - ")}`);
    this.name = "ConfigError";
  }
}

/**
 * Parses and validates the environment (NFR1.12). Missing or empty required
 * values, and malformed origins, throw a ConfigError that names each variable.
 */
export function parseConfig(
  env: Readonly<Record<string, string | undefined>>,
  overrides: Partial<Pick<Config, "clock">> = {},
): Config {
  const result = EnvSchema.safeParse(env);
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`,
    );
    throw new ConfigError(problems);
  }
  const values = result.data;
  return {
    nodeEnv: values.NODE_ENV,
    databaseUrl: values.DATABASE_URL,
    appOrigins: values.APP_ORIGIN,
    cookieSecure: values.COOKIE_SECURE,
    logLevel: values.LOG_LEVEL,
    dbPoolMax: values.DB_POOL_MAX,
    port: values.PORT,
    clock: overrides.clock ?? (() => new Date()),
    argon2: ARGON2_PARAMS,
    sessionTtlMs: SESSION_TTL_MS,
  };
}

/**
 * Reads `process.env` once. On a missing or invalid value it prints a clear
 * message and exits with code 1, so the backend never starts half-configured.
 */
export function loadConfig(
  env: Readonly<Record<string, string | undefined>> = process.env,
  exit: (code: number) => never = process.exit,
): Config {
  try {
    return parseConfig(env);
  } catch (error) {
    if (error instanceof ConfigError) {
      console.error(error.message);
      return exit(1);
    }
    throw error;
  }
}
