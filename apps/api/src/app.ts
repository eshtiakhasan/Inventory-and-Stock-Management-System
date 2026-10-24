/**
 * The Express application and its request pipeline (security-design.md).
 * Order matters; each step runs before the next:
 *
 *  1. requestId      take a valid X-Request-Id or make a UUID (NFR8.10)
 *     responseTime   X-Response-Time and durationMs (NFR5.3)
 *  2. pino-http      one log line per request, secrets redacted (NFR8.9, NFR1.18)
 *  3. helmet         security headers on API responses (NFR1.14)
 *  4. originCheck    non-GET only: Origin/Referer must be allowed (NFR1.19)
 *  5. express.json   100 KB limit; parser errors go to the error handler (NFR1.10)
 *  6. public routes  signup, signin, health, openapi.json (NFR1.8 allow-list)
 *  7. authenticate   session, expiry and active-user checks; no extension (WF4)
 *  8. csrfCheck      non-GET only (NFR1.7), then extendSession (BR2.3)
 *  9. module routers, then the not-found handler and errorHandler (NFR1.13)
 *
 * Every router is mounted through `mount`, which records it in the route
 * inventory, so a test can prove no route escapes the authentication step.
 */
import express, { Router, type Express } from "express";
import helmet from "helmet";
import {
  createIdentityRouters,
  equalizeSignInFailure,
} from "./modules/identity/index.js";
import type { Config } from "./platform/config.js";
import type { Db } from "./platform/db/db.js";
import { AppError } from "./platform/errors.js";
import { healthRouter } from "./platform/health.js";
import type { AppLogger } from "./platform/log.js";
import { authenticate } from "./platform/middleware/authenticate.js";
import { csrfCheck } from "./platform/middleware/csrfCheck.js";
import { errorHandler } from "./platform/middleware/errorHandler.js";
import { extendSession } from "./platform/middleware/extendSession.js";
import { httpLogger, tagMountPath } from "./platform/middleware/httpLogger.js";
import { originCheck } from "./platform/middleware/originCheck.js";
import { requestId } from "./platform/middleware/requestId.js";
import { responseTime } from "./platform/middleware/responseTime.js";
import { openApiRouter } from "./platform/openapi.js";

export const API_PREFIX = "/api/v1";

export interface AppDeps {
  db: Db;
  config: Config;
  logger: AppLogger;
}

export type RouteAccess = "public" | "protected";

export interface RouteEntry {
  method: string;
  path: string;
  access: RouteAccess;
}

export interface MountedRouter {
  prefix: string;
  /** The module's router. */
  router: Router;
  /** The router actually on the app stack: records the mount path, then runs `router`. */
  wrapper: Router;
  access: RouteAccess;
}

export interface AppBundle {
  app: Express;
  /** Every route, with its full path and whether it passes authentication. */
  routes: RouteEntry[];
  /** The routers mounted on the app, for the route-inventory test. */
  mounted: MountedRouter[];
}

/** Lists a router's own routes by walking its stack. */
export function listRoutes(router: Router): { method: string; path: string }[] {
  const entries: { method: string; path: string }[] = [];
  for (const layer of router.stack) {
    const route = layer.route as
      { path: string; methods?: Record<string, boolean> } | undefined;
    if (!route) continue;
    for (const [method, enabled] of Object.entries(route.methods ?? {})) {
      if (enabled && method !== "_all")
        entries.push({ method: method.toUpperCase(), path: route.path });
    }
  }
  return entries;
}

export function createApp(deps: AppDeps): AppBundle {
  const { db, config, logger } = deps;
  const app = express();
  app.disable("x-powered-by");
  const mounted: MountedRouter[] = [];
  const mount = (prefix: string, router: Router, access: RouteAccess): void => {
    const wrapper = Router();
    wrapper.use(tagMountPath, router);
    app.use(prefix, wrapper);
    mounted.push({ prefix, router, wrapper, access });
  };
  const identity = createIdentityRouters({
    db,
    clock: config.clock,
    argon2: config.argon2,
    cookieSecure: config.cookieSecure,
  });

  app.use(requestId());
  app.use(responseTime());
  app.use(httpLogger(logger));
  app.use(
    helmet({
      frameguard: { action: "deny" },
      referrerPolicy: { policy: "same-origin" },
    }),
  );
  app.use(originCheck(config.appOrigins));
  app.use(express.json({ limit: "100kb" }));

  mount(API_PREFIX, healthRouter(db), "public");
  mount(API_PREFIX, openApiRouter(), "public");
  mount(`${API_PREFIX}/auth`, identity.publicRouter, "public");

  app.use(authenticate({ db, clock: config.clock }));
  app.use(csrfCheck());
  app.use(extendSession());

  mount(`${API_PREFIX}/auth`, identity.protectedRouter, "protected");

  app.use((_req, _res, next) => {
    next(new AppError("NOT_FOUND"));
  });
  app.use(errorHandler({ equalizeSignInFailure }));

  const routes = mounted.flatMap(({ prefix, router, access }) =>
    listRoutes(router).map((route) => ({
      ...route,
      path: `${prefix}${route.path}`,
      access,
    })),
  );
  return { app, routes, mounted };
}
