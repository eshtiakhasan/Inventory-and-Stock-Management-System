import { CSRF_HEADER } from "@mojud/contracts";
import type { RequestHandler } from "express";
import { AppError } from "../errors.js";
import { SAFE_METHODS } from "../http.js";

/**
 * WF4 step 5 (BR2.5, NFR1.7): every non-GET request must send the session's
 * CSRF token in `X-CSRF-Token`; the compare is constant-time. A missing or
 * wrong token is 403 FORBIDDEN and the session is not extended.
 */
export function csrfCheck(): RequestHandler {
  return (req, _res, next) => {
    if (SAFE_METHODS.has(req.method)) {
      next();
      return;
    }
    if (!req.authSession) {
      next(new AppError("NOT_SIGNED_IN"));
      return;
    }
    if (!req.authSession.checkCsrf(req.get(CSRF_HEADER))) {
      next(new AppError("FORBIDDEN"));
      return;
    }
    next();
  };
}
