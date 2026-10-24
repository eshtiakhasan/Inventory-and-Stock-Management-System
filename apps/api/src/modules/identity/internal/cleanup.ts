/**
 * Daily session clean-up (BR2.3; reliability-design.md). Each run is one
 * transaction: it takes a transaction-level advisory lock, so only one backend
 * instance deletes at a time, and the lock is released at commit or rollback.
 */
import { sql } from "kysely";
import {
  SESSION_CLEANUP_INTERVAL_MS,
  type Clock,
} from "../../../platform/config.js";
import type { Db } from "../../../platform/db/db.js";
import { deleteExpiredSessionsGlobal } from "./repository.js";

export interface CleanupLogger {
  info(obj: object, msg: string): void;
  error(obj: object, msg: string): void;
}

export interface CleanupDeps {
  db: Db;
  clock: Clock;
  log: CleanupLogger;
  intervalMs?: number;
}

export interface CleanupResult {
  /** True when another run held the lock, so this run deleted nothing. */
  skipped: boolean;
  deleted: number;
}

/** Runs the clean-up once. Throws on a database error. */
export async function runSessionCleanup(
  deps: Pick<CleanupDeps, "db" | "clock">,
): Promise<CleanupResult> {
  return deps.db.transaction().execute(async (trx) => {
    const lock = await sql<{ locked: boolean }>`
      SELECT pg_try_advisory_xact_lock(hashtext('session-cleanup')) AS locked`.execute(
      trx,
    );
    if (!lock.rows[0]?.locked) {
      return { skipped: true, deleted: 0 };
    }
    const deleted = await deleteExpiredSessionsGlobal(trx, deps.clock());
    return { skipped: false, deleted };
  });
}

export interface SessionCleanup {
  /** Stops the timer and waits for a run in progress to finish. */
  stop(): Promise<void>;
}

/**
 * Runs the clean-up at once, then every 24 hours. The timer is unref'd so it
 * never keeps the process alive. A failed run is logged at error and the next
 * run happens on schedule.
 */
export function startSessionCleanup(deps: CleanupDeps): SessionCleanup {
  let running: Promise<void> | undefined;
  let stopped = false;

  const runOnce = (): void => {
    if (running || stopped) return;
    running = runSessionCleanup(deps)
      .then((result) => {
        deps.log.info(
          {
            event: "session.cleanup",
            deleted: result.deleted,
            skipped: result.skipped,
          },
          "session clean-up finished",
        );
      })
      .catch((err: unknown) => {
        deps.log.error(
          { err, event: "session.cleanup" },
          "session clean-up failed",
        );
      })
      .finally(() => {
        running = undefined;
      });
  };

  runOnce();
  const timer = setInterval(
    runOnce,
    deps.intervalMs ?? SESSION_CLEANUP_INTERVAL_MS,
  );
  timer.unref();

  return {
    async stop() {
      stopped = true;
      clearInterval(timer);
      await running;
    },
  };
}
