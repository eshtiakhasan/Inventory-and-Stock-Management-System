import type { RequestHandler } from "express";
import { AppError } from "../errors.js";
import { SAFE_METHODS } from "../http.js";

/** The origin of a Referer URL, or undefined when it cannot be parsed. */
function refererOrigin(referer: string): string | undefined {
  try {
    return new URL(referer).origin;
  } catch {
    return undefined;
  }
}

/**
 * Origin check (NFR1.19) on every non-GET request, including sign-up and
 * sign-in: `Origin` must equal one allowed origin exactly; when it is absent,
 * the Referer's origin must. `Origin: null`, an unparsable Referer, or neither
 * header is 403 FORBIDDEN. This blocks login CSRF on the two routes that carry
 * no CSRF token.
 */
export function originCheck(allowedOrigins: readonly string[]): RequestHandler {
  const allowed = new Set(allowedOrigins);
  return (req, _res, next) => {
    if (SAFE_METHODS.has(req.method)) {
      next();
      return;
    }
    const origin = req.get("origin");
    const referer = req.get("referer");
    const candidate =
      origin !== undefined
        ? origin
        : referer !== undefined
          ? refererOrigin(referer)
          : undefined;
    if (candidate !== undefined && allowed.has(candidate)) {
      next();
      return;
    }
    next(new AppError("FORBIDDEN"));
  };
}
