import { SESSION_COOKIE } from "@mojud/contracts";
import type { RequestHandler } from "express";
import {
  resolveCaller,
  type IdentityDeps,
} from "../../modules/identity/index.js";
import { readCookie } from "../http.js";

/**
 * WF4 steps 1–4 (lookup only): resolves the session cookie into the caller
 * context and attaches it to the request. It does not extend the session;
 * `extendSession` does that after the CSRF check passes.
 */
export function authenticate(
  deps: Pick<IdentityDeps, "db" | "clock">,
): RequestHandler {
  return async (req, _res, next) => {
    const sessionId = readCookie(req.headers.cookie, SESSION_COOKIE);
    const resolved = await resolveCaller(deps, sessionId, req.log);
    req.caller = resolved.caller;
    req.authSession = resolved;
    next();
  };
}
