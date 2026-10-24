import type { Health } from "@mojud/contracts";
import { Router } from "express";
import { sql } from "kysely";
import type { Db } from "./db/db.js";

export const HEALTH_TIMEOUT_MS = 1000;

/**
 * True when the database answers `SELECT 1` within the timeout. A refused or
 * slow database is reported as false; the reason goes to the caller's log.
 */
export async function pingDatabase(
  db: Db,
  timeoutMs: number,
  onFailure: (err: unknown) => void,
): Promise<boolean> {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<boolean>((resolve) => {
    timer = setTimeout(() => {
      onFailure(new Error(`database did not answer within ${timeoutMs} ms`));
      resolve(false);
    }, timeoutMs);
  });
  const query = sql`SELECT 1`
    .execute(db)
    .then(() => true)
    .catch((err: unknown) => {
      onFailure(err);
      return false;
    });
  try {
    return await Promise.race([query, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * `GET /api/v1/health` (NFR8.13): 200 `{status:"ok",db:"ok"}` when the
 * database answers, otherwise 503 `{status:"error",db:"down"}`. Docker uses it
 * as the backend health check. Logged at debug.
 */
export function healthRouter(db: Db, timeoutMs = HEALTH_TIMEOUT_MS): Router {
  const router = Router();
  router.get("/health", async (req, res) => {
    const ok = await pingDatabase(db, timeoutMs, (err) => {
      req.log.debug(
        { err, event: "health.db_down" },
        "health check: database down",
      );
    });
    const body: Health = ok
      ? { status: "ok", db: "ok" }
      : { status: "error", db: "down" };
    res.status(ok ? 200 : 503).json(body);
  });
  return router;
}
