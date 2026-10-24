/**
 * The one API client (frontend-components.md API Integration): sends the
 * session cookie on every call, adds `X-CSRF-Token` to every non-GET call,
 * and turns the shared Error shape into an ApiError the forms can show.
 */
import { CSRF_HEADER, ErrorSchema } from "@mojud/contracts";

export const API_BASE = "/api/v1";

/** Responses from these forms are always shown on the form itself. */
const FORM_PATHS: ReadonlySet<string> = new Set([
  "/auth/signin",
  "/auth/signup",
]);

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly field?: string,
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface RequestOptions {
  /** Do not report a 401 to the session handler (used by the first /auth/me). */
  skipAuthHandler?: boolean;
}

export interface ApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
}

export interface ApiClientOptions {
  fetchFn?: typeof fetch;
  getCsrfToken: () => string | undefined;
  /** Called with every 401 outside the sign-in and sign-up forms. */
  onAuthError?: (error: ApiError) => void;
}

async function toApiError(response: Response): Promise<ApiError> {
  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }
  const parsed = ErrorSchema.safeParse(payload);
  if (parsed.success) {
    const { code, message, field, requestId } = parsed.data;
    return new ApiError(response.status, code, message, field, requestId);
  }
  return new ApiError(
    response.status,
    "INTERNAL_ERROR",
    `Unexpected response (${response.status})`,
  );
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  const fetchFn = options.fetchFn ?? ((input, init) => fetch(input, init));

  async function send<T>(
    method: string,
    path: string,
    body: unknown,
    requestOptions: RequestOptions = {},
  ): Promise<T> {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const csrfToken = options.getCsrfToken();
    if (method !== "GET" && csrfToken) headers[CSRF_HEADER] = csrfToken;

    let response: Response;
    try {
      response = await fetchFn(`${API_BASE}${path}`, {
        method,
        credentials: "include",
        headers,
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (cause) {
      console.error("Mojud: request failed", cause);
      throw new ApiError(
        0,
        "INTERNAL_ERROR",
        "The server could not be reached.",
      );
    }

    if (!response.ok) {
      const error = await toApiError(response);
      if (
        error.status === 401 &&
        !FORM_PATHS.has(path) &&
        !requestOptions.skipAuthHandler
      ) {
        options.onAuthError?.(error);
      }
      throw error;
    }
    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }

  return {
    get: (path, requestOptions) => send("GET", path, undefined, requestOptions),
    post: (path, body, requestOptions) =>
      send("POST", path, body, requestOptions),
  };
}
