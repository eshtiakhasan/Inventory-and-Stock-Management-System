import { pino, type DestinationStream, type Logger } from "pino";
import type { Config } from "./config.js";

/**
 * Secrets removed from every log entry (NFR1.18). Request bodies are never
 * logged, and the request line has no headers, so these paths are a second line
 * of defence for anything a module logs explicitly.
 */
export const REDACT_PATHS = [
  "req.headers.cookie",
  'req.headers["x-csrf-token"]',
  'res.headers["set-cookie"]',
  "headers.cookie",
  'headers["x-csrf-token"]',
  "password",
  "*.password",
  "csrfToken",
  "*.csrfToken",
  "cookie",
  "*.cookie",
];

export type AppLogger = Logger;

/**
 * The root logger (NFR8.9, NFR8.12): JSON to stdout at `LOG_LEVEL`; pretty
 * output only in development. Tests pass a destination stream to capture lines.
 */
export function createLogger(
  config: Pick<Config, "logLevel" | "nodeEnv">,
  destination?: DestinationStream,
): AppLogger {
  const options = {
    level: config.logLevel,
    redact: { paths: REDACT_PATHS, remove: true },
    base: undefined,
  };
  if (destination) {
    return pino(options, destination);
  }
  if (config.nodeEnv === "development") {
    return pino({
      ...options,
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }
  return pino(options);
}
