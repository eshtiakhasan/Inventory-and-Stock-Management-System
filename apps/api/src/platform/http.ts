import type { Caller, ResolvedSession } from "../modules/identity/index.js";

declare global {
  // Express merges these fields into its Request type.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      /** The signed-in caller, set by `authenticate` (BR2.7). */
      caller?: Caller;
      /** The resolved session, set by `authenticate`. */
      authSession?: ResolvedSession;
    }
  }
}

/** Methods that never change data and so skip the Origin and CSRF checks. */
export const SAFE_METHODS: ReadonlySet<string> = new Set([
  "GET",
  "HEAD",
  "OPTIONS",
]);

/** Reads one cookie from a Cookie header; undefined when absent or malformed. */
export function readCookie(
  header: string | undefined,
  name: string,
): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index).trim() !== name) continue;
    const raw = part.slice(index + 1).trim();
    try {
      return decodeURIComponent(raw);
    } catch {
      // A malformed value can never name a stored session; treat it as absent.
      return undefined;
    }
  }
  return undefined;
}
