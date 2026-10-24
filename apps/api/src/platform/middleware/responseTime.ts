import type { RequestHandler } from "express";

/**
 * Server time per request (NFR5.3, observability-design.md). When the headers
 * are written it stores the elapsed time in `res.locals.durationMs` (logged as
 * `durationMs` on the request line) and sends the same value in
 * `X-Response-Time`, so the smoke test can read it from outside the container.
 */
export function responseTime(): RequestHandler {
  return (_req, res, next) => {
    const start = process.hrtime.bigint();
    const originalWriteHead = res.writeHead;
    res.writeHead = function writeHeadWithTiming(
      this: typeof res,
      ...args: Parameters<typeof originalWriteHead>
    ) {
      const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
      const durationMs = Math.round(elapsedMs * 10) / 10;
      res.locals.durationMs = durationMs;
      if (!res.headersSent) {
        res.setHeader("X-Response-Time", `${durationMs}ms`);
      }
      return originalWriteHead.apply(this, args);
    } as typeof originalWriteHead;
    next();
  };
}
