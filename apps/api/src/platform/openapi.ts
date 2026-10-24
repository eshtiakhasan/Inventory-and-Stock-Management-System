import {
  OpenAPIRegistry,
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import {
  CSRF_HEADER,
  ErrorSchema,
  HealthSchema,
  SESSION_COOKIE,
  SessionResponseSchema,
  SignInSchema,
  SignUpSchema,
} from "@mojud/contracts";
import { Router } from "express";

type OpenApiDocument = ReturnType<OpenApiGeneratorV31["generateDocument"]>;
type SchemaObject = Record<string, unknown>;

/**
 * Converts a zod schema with zod's own JSON Schema output (draft 2020-12, the
 * dialect of OpenAPI 3.1). This avoids `extendZodWithOpenApi`, which patches
 * one copy of zod: Node loads zod-to-openapi's CommonJS build and its own zod
 * copy, so the patch would not reach the ESM schemas in @mojud/contracts.
 */
function toSchema(schema: z.ZodType): SchemaObject {
  const { $schema: _dialect, ...rest } = z.toJSONSchema(schema, {
    io: "input",
    unrepresentable: "any",
  }) as SchemaObject;
  return rest;
}

const json = (schema: SchemaObject) => ({ "application/json": { schema } });

/**
 * The OpenAPI 3.1 document for the U1 paths, generated from the shared zod
 * schemas (contract C1). `/health` and `/openapi.json` are additive under v1.
 */
export function buildOpenApiDocument(): OpenApiDocument {
  const registry = new OpenAPIRegistry();
  const component = (name: string, schema: z.ZodType): SchemaObject => {
    registry.registerComponent("schemas", name, toSchema(schema));
    return { $ref: `#/components/schemas/${name}` };
  };
  const error = component("Error", ErrorSchema);
  const session = component("SessionResponse", SessionResponseSchema);
  const health = component("Health", HealthSchema);
  registry.registerComponent("securitySchemes", "sessionCookie", {
    type: "apiKey",
    in: "cookie",
    name: SESSION_COOKIE,
  });
  const csrfHeader = {
    name: CSRF_HEADER,
    in: "header" as const,
    required: true,
    schema: { type: "string" as const },
  };

  registry.registerPath({
    method: "post",
    path: "/auth/signup",
    summary: "Create a business and its first Owner, and sign in (FR1.1)",
    security: [],
    request: { body: { content: json(toSchema(SignUpSchema)) } },
    responses: {
      201: { description: "Created and signed in", content: json(session) },
      400: { description: "Validation failed", content: json(error) },
      409: {
        description: "Phone already registered (DUPLICATE, field phone)",
        content: json(error),
      },
    },
  });
  registry.registerPath({
    method: "post",
    path: "/auth/signin",
    summary: "Sign in (FR1.2); the error never names which field was wrong",
    security: [],
    request: { body: { content: json(toSchema(SignInSchema)) } },
    responses: {
      200: { description: "Signed in", content: json(session) },
      401: {
        description: "INVALID_CREDENTIALS or ACCOUNT_DEACTIVATED",
        content: json(error),
      },
    },
  });
  registry.registerPath({
    method: "post",
    path: "/auth/signout",
    security: [{ sessionCookie: [] }],
    parameters: [csrfHeader],
    responses: {
      204: { description: "Session ended" },
      401: {
        description: "Not signed in or session ended",
        content: json(error),
      },
      403: { description: "Missing or wrong CSRF token", content: json(error) },
    },
  });
  registry.registerPath({
    method: "get",
    path: "/auth/me",
    security: [{ sessionCookie: [] }],
    responses: {
      200: {
        description: "Current caller and CSRF token",
        content: json(session),
      },
      401: {
        description: "Not signed in or session ended",
        content: json(error),
      },
    },
  });
  registry.registerPath({
    method: "get",
    path: "/health",
    security: [],
    responses: {
      200: { description: "Database answers", content: json(health) },
      503: { description: "Database down", content: json(health) },
    },
  });

  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: "3.1.0",
    info: { title: "Mojud core slice API", version: "1.0.0" },
    servers: [{ url: "/api/v1" }],
  });
}

/** `GET /api/v1/openapi.json`; the document is built once on first request. */
export function openApiRouter(): Router {
  const router = Router();
  let document: OpenApiDocument | undefined;
  router.get("/openapi.json", (_req, res) => {
    document ??= buildOpenApiDocument();
    res.json(document);
  });
  return router;
}
