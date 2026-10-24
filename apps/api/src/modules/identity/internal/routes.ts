/**
 * `/api/v1/auth/*` (contract C1, WF1–WF3). Sign-up and sign-in are public;
 * sign-out and `/me` sit behind authentication and the CSRF check.
 */
import { SESSION_COOKIE, type SessionResponse } from "@mojud/contracts";
import {
  Router,
  type CookieOptions,
  type Request,
  type Response,
} from "express";
import { AppError } from "../../../platform/errors.js";
import "../../../platform/http.js";
import {
  authorize,
  signIn,
  signOut,
  signUp,
  type IdentityDeps,
  type SessionGrant,
} from "./service.js";
import type { Caller } from "./types.js";

export interface IdentityRouterDeps extends IdentityDeps {
  cookieSecure: boolean;
}

export interface IdentityRouters {
  /** Mounted before authentication: signup, signin. */
  publicRouter: Router;
  /** Mounted after authentication and the CSRF check: signout, me. */
  protectedRouter: Router;
}

/** The session cookie (NFR1.5): HttpOnly, SameSite=Lax, Path=/, no Max-Age. */
function cookieOptions(secure: boolean): CookieOptions {
  return { httpOnly: true, sameSite: "lax", path: "/", secure };
}

function sessionBody(caller: Caller, csrfToken: string): SessionResponse {
  return {
    userId: caller.userId,
    businessId: caller.businessId,
    businessName: caller.businessName,
    name: caller.name,
    role: caller.role,
    warehouseIds: [...caller.warehouseIds],
    csrfToken,
  };
}

function sendGrant(
  res: Response,
  deps: IdentityRouterDeps,
  grant: SessionGrant,
  status: number,
): void {
  res.cookie(SESSION_COOKIE, grant.sessionId, cookieOptions(deps.cookieSecure));
  res.status(status).json(sessionBody(grant.caller, grant.csrfToken));
}

function requireSession(req: Request): NonNullable<Request["authSession"]> {
  if (!req.authSession) throw new AppError("NOT_SIGNED_IN");
  return req.authSession;
}

export function createIdentityRouters(
  deps: IdentityRouterDeps,
): IdentityRouters {
  const publicRouter = Router();
  const protectedRouter = Router();

  publicRouter.post("/signup", async (req, res) => {
    const grant = await signUp(deps, req.body);
    req.log.info(
      {
        event: "auth.signup",
        businessId: grant.caller.businessId,
        userId: grant.caller.userId,
      },
      "business signed up",
    );
    sendGrant(res, deps, grant, 201);
  });

  publicRouter.post("/signin", async (req, res) => {
    let grant: SessionGrant;
    try {
      grant = await signIn(deps, req.body);
    } catch (error) {
      if (
        error instanceof AppError &&
        (error.code === "INVALID_CREDENTIALS" ||
          error.code === "ACCOUNT_DEACTIVATED")
      ) {
        const reason =
          error.code === "ACCOUNT_DEACTIVATED" ? "deactivated" : "invalid";
        req.log.info({ event: "auth.signin_failed", reason }, "sign-in failed");
      }
      throw error;
    }
    req.log.info(
      { event: "auth.signin", userId: grant.caller.userId },
      "signed in",
    );
    sendGrant(res, deps, grant, 200);
  });

  protectedRouter.post("/signout", async (req, res) => {
    const session = requireSession(req);
    authorize(req.caller, "identity.signout");
    await signOut(deps, session.idHash);
    res.clearCookie(SESSION_COOKIE, cookieOptions(deps.cookieSecure));
    req.log.info(
      { event: "auth.signout", userId: session.caller.userId },
      "signed out",
    );
    res.status(204).end();
  });

  protectedRouter.get("/me", (req, res) => {
    const session = requireSession(req);
    authorize(req.caller, "identity.me");
    res.status(200).json(sessionBody(session.caller, session.csrfToken));
  });

  return { publicRouter, protectedRouter };
}
