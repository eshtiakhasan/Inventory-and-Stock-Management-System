/**
 * IdentityAccess module: the only public surface of `modules/identity`
 * (logical-components.md; contract C2). Other code must import from here,
 * never from `./internal/` (ESLint enforces it).
 *
 * - `createIdentityRouters`: the `/auth` routes, as a public router (signup,
 *   signin) and a protected router (signout, me).
 * - `resolveCaller`: turns the session cookie into the caller context, or
 *   refuses with NOT_SIGNED_IN / SESSION_ENDED. Its result also carries the
 *   CSRF check and the session extension, so platform middleware never touches
 *   the session tables.
 * - `authorize`: contract C2; every module operation calls it first.
 * - `Caller`: the read-only caller context type.
 * - `startSessionCleanup`: the daily clean-up timer started by the server.
 * - `equalizeSignInFailure`: the dummy hash check the error handler runs for a
 *   sign-in body that never reached the sign-in code (NFR1.3).
 */
export {
  authorize,
  equalizeSignInFailure,
  resolveSession as resolveCaller,
  type IdentityDeps,
  type ResolvedSession,
} from "./internal/service.js";
export {
  startSessionCleanup,
  type SessionCleanup,
} from "./internal/cleanup.js";
export {
  createIdentityRouters,
  type IdentityRouterDeps,
  type IdentityRouters,
} from "./internal/routes.js";
export type { Caller } from "./internal/types.js";
export type { BusinessId, UserId } from "./internal/ids.js";
