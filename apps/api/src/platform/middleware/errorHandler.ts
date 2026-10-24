import type { ErrorRequestHandler, Request, Response } from "express";
import { AppError, ERROR_MESSAGES } from "../errors.js";

export const SIGN_IN_PATH = "/api/v1/auth/signin";

/** Error types raised by Express's JSON body parser. */
const BODY_PARSER_ERRORS: ReadonlySet<string> = new Set([
  "entity.parse.failed",
  "entity.too.large",
  "entity.verify.failed",
  "charset.unsupported",
  "encoding.unsupported",
  "request.aborted",
  "request.size.invalid",
]);

const BODY_ERROR_MESSAGES: Readonly<Record<string, string>> = {
  "entity.too.large": "The request body is larger than 100 KB.",
  "entity.parse.failed": "The request body is not valid JSON.",
};

export function isBodyParserError(error: unknown): error is { type: string } {
  const type = (error as { type?: unknown } | null)?.type;
  return typeof type === "string" && BODY_PARSER_ERRORS.has(type);
}

/**
 * Sign-in is identified by method and path, not by `req.route`, which is not
 * set when the body parser fails (security-design.md).
 */
function isSignIn(req: Request): boolean {
  return req.method === "POST" && req.path === SIGN_IN_PATH;
}

function sendAppError(res: Response, error: AppError): void {
  res.status(error.status).json({
    code: error.code,
    message: error.message,
    ...(error.field !== undefined ? { field: error.field } : {}),
  });
}

export interface ErrorHandlerDeps {
  /** Runs the dummy hash check so a refused sign-in body takes the usual time (NFR1.3). */
  equalizeSignInFailure: () => Promise<void>;
}

/**
 * The one error handler (NFR1.13, BR2.8). AppErrors keep their catalogue
 * status. Body-parser errors are VALIDATION_FAILED, except on sign-in, where
 * every body or validation error is INVALID_CREDENTIALS after a dummy hash
 * check. Anything else is logged with its stack and answered with 500
 * INTERNAL_ERROR and the request id, never with internal details.
 */
export function errorHandler(deps: ErrorHandlerDeps): ErrorRequestHandler {
  return async (err: unknown, req, res, next) => {
    if (res.headersSent) {
      req.log.error({ err }, "error after the response started");
      next(err);
      return;
    }
    const signInBodyError =
      isSignIn(req) &&
      (isBodyParserError(err) ||
        (err instanceof AppError && err.code === "VALIDATION_FAILED"));
    if (signInBodyError) {
      try {
        await deps.equalizeSignInFailure();
      } catch (verifyError) {
        req.log.error({ err: verifyError }, "dummy hash check failed");
      }
      req.log.info(
        { event: "auth.signin_failed", reason: "invalid" },
        "sign-in failed",
      );
      sendAppError(res, new AppError("INVALID_CREDENTIALS"));
      return;
    }
    if (isBodyParserError(err)) {
      sendAppError(
        res,
        new AppError(
          "VALIDATION_FAILED",
          undefined,
          BODY_ERROR_MESSAGES[err.type] ??
            "The request body could not be read.",
        ),
      );
      return;
    }
    if (err instanceof AppError) {
      sendAppError(res, err);
      return;
    }
    const requestId = String(req.id);
    req.log.error({ err, requestId }, "unhandled error");
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: ERROR_MESSAGES.INTERNAL_ERROR,
      requestId,
    });
  };
}
