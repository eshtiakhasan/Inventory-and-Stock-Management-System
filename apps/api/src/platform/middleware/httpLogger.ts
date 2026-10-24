import type { Request, RequestHandler, Response } from "express";
import { pinoHttp } from "pino-http";
import type { AppLogger } from "../log.js";

export const HEALTH_PATH = "/api/v1/health";

/**
 * The route pattern (not the raw URL), or "(unmatched)" when no route matched.
 * Express resets `req.baseUrl` once a router passes an error on, so the mount
 * path recorded by `tagMountPath` is used instead.
 */
export function routePattern(req: Request, res: Response): string {
  const routePath = (req.route as { path?: unknown } | undefined)?.path;
  if (typeof routePath !== "string") return "(unmatched)";
  const mountPath = res.locals.mountPath as string | undefined;
  return `${mountPath ?? req.baseUrl}${routePath}`;
}

/** Records the mount path of the router a request enters (see routePattern). */
export const tagMountPath: RequestHandler = (req, res, next) => {
  res.locals.mountPath = req.baseUrl;
  next();
};

function requestLine(req: Request, res: Response): Record<string, unknown> {
  return {
    method: req.method,
    route: routePattern(req, res),
    status: res.statusCode,
    durationMs: res.locals.durationMs as number | undefined,
  };
}

/**
 * One JSON line per finished request (NFR8.9) with requestId, method, route,
 * status, durationMs and, when signed in, userId and businessId. Headers and
 * bodies are never logged. Health checks log at debug (Docker calls them every
 * few seconds); 5xx lines log at error, so `logs:errors` finds them (NFR8.14).
 * `req.log` carries the request id on every line a module writes.
 */
export function httpLogger(logger: AppLogger): RequestHandler {
  return pinoHttp({
    logger,
    quietReqLogger: true,
    quietResLogger: true,
    customAttributeKeys: { reqId: "requestId" },
    genReqId: (req) => req.id,
    customProps: (req) => {
      const caller = (req as Request).caller;
      return caller
        ? { userId: caller.userId, businessId: caller.businessId }
        : {};
    },
    customLogLevel: (req, res, err) => {
      if (err || res.statusCode >= 500) return "error";
      // originalUrl keeps the full path; req.path is relative to the mounted router.
      const path = ((req as Request).originalUrl ?? "").split("?")[0];
      return path === HEALTH_PATH ? "debug" : "info";
    },
    customSuccessObject: (req, res) =>
      requestLine(req as Request, res as Response),
    customErrorObject: (req, res) =>
      requestLine(req as Request, res as Response),
    customSuccessMessage: () => "request completed",
    customErrorMessage: () => "request failed",
  });
}
