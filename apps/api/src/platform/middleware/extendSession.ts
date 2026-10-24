import type { RequestHandler } from "express";
import { AppError } from "../errors.js";

/**
 * WF4 step 6 (BR2.3): after the CSRF check passes, moves the session's expiry
 * to now + 12 hours. Runs on every authenticated request.
 */
export function extendSession(): RequestHandler {
  return async (req, _res, next) => {
    if (!req.authSession) {
      throw new AppError("NOT_SIGNED_IN");
    }
    await req.authSession.extend();
    next();
  };
}
