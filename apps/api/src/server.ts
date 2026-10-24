/**
 * Process entry point: config, logger, pool, app, HTTP server, clean-up timer,
 * crash handling and graceful shutdown (reliability-design.md).
 */
import { createApp } from "./app.js";
import {
  equalizeSignInFailure,
  startSessionCleanup,
} from "./modules/identity/index.js";
import { loadConfig } from "./platform/config.js";
import { createDb, createPool } from "./platform/db/db.js";
import { createLogger } from "./platform/log.js";
import { shutdown } from "./platform/shutdown.js";

const config = loadConfig();
const logger = createLogger(config);

// Any process-level error other than a pool idle-client error (handled by the
// pool listener) is fatal: log it and exit so Docker restarts the process (NFR8.7).
process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "uncaught exception");
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  logger.fatal({ err: reason }, "unhandled promise rejection");
  process.exit(1);
});

const pool = createPool(
  { connectionString: config.databaseUrl, max: config.dbPoolMax },
  logger,
);
const db = createDb(pool);
const { app } = createApp({ db, config, logger });

// Build the dummy Argon2id hash once at start (security-design.md) by running
// the dummy check: it also loads the native hashing module, so the first
// sign-up or sign-in does not pay that cost (NFR5.1, NFR5.2).
await equalizeSignInFailure();

const server = app.listen(config.port, () => {
  logger.info(
    { event: "server.listening", port: config.port },
    "api listening",
  );
});
server.on("error", (err) => {
  logger.fatal({ err }, "http server error");
  process.exit(1);
});

const cleanup = startSessionCleanup({ db, clock: config.clock, log: logger });

let shuttingDown = false;
const onSignal = (signal: NodeJS.Signals): void => {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ event: "server.signal", signal }, "signal received");
  shutdown({ server, pool, cleanup, log: logger })
    .then(() => process.exit(0))
    .catch((err: unknown) => {
      logger.fatal({ err }, "shutdown failed");
      process.exit(1);
    });
};
process.on("SIGTERM", onSignal);
process.on("SIGINT", onSignal);
