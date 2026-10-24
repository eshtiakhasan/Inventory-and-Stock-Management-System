import { randomUUID } from "node:crypto";
import type { RequestHandler } from "express";

const VALID_REQUEST_ID = /^[A-Za-z0-9-]{8,64}$/;

/**
 * Request ID (NFR8.10): keeps a valid incoming `X-Request-Id`, otherwise makes
 * a UUID. The id is stored on `req.id` (used by pino-http) and echoed in the
 * `X-Request-Id` response header.
 */
export function requestId(): RequestHandler {
  return (req, res, next) => {
    const incoming = req.get("x-request-id");
    const id =
      incoming && VALID_REQUEST_ID.test(incoming) ? incoming : randomUUID();
    req.id = id;
    res.setHeader("X-Request-Id", id);
    next();
  };
}
