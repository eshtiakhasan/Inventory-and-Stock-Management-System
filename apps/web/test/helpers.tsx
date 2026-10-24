/**
 * Web test helpers: a stubbed fetch (no network) and the real routes inside a
 * MemoryRouter, with a fresh TanStack Query client per test.
 */
import type { Role, SessionResponse } from "@mojud/contracts";
import { render, type RenderResult } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { vi, type Mock } from "vitest";
import {
  AppProviders,
  AppRoutes,
  createQueryClient,
  ROUTER_FUTURE,
} from "../src/App";

export interface StubResponse {
  status: number;
  body?: unknown;
}

export type Handler =
  StubResponse | ((init: RequestInit) => StubResponse | Promise<StubResponse>);

/** Keys look like "GET /api/v1/auth/me". An unexpected request fails the test. */
export function stubFetch(
  handlers: Record<string, Handler>,
): Mock<typeof fetch> {
  return vi.fn<typeof fetch>(async (input, init = {}) => {
    const key = `${init.method ?? "GET"} ${String(input)}`;
    const handler = handlers[key];
    if (!handler) throw new Error(`unexpected request: ${key}`);
    const result =
      typeof handler === "function" ? await handler(init) : handler;
    return new Response(
      result.body === undefined ? null : JSON.stringify(result.body),
      {
        status: result.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  });
}

export const NOT_SIGNED_IN: StubResponse = {
  status: 401,
  body: { code: "NOT_SIGNED_IN", message: "Sign in to continue." },
};

export function aSession(
  role: Role = "owner",
  overrides: Partial<SessionResponse> = {},
): SessionResponse {
  return {
    userId: "4b0f8f43-34a1-4f0e-9d3a-6b2a5d1e7c11",
    businessId: "a8e7c5b1-1f2d-4c3b-8a9e-0d1c2b3a4f5e",
    businessName: "Haque Traders",
    name: "Abdul Haque",
    role,
    warehouseIds: [],
    csrfToken: "csrf-token-from-server",
    ...overrides,
  };
}

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}</output>;
}

export interface RenderAppOptions {
  path: string;
  fetchFn: typeof fetch;
  /** Adds an element showing the current path (left out for accessibility checks). */
  probe?: boolean;
}

export function renderApp({
  path,
  fetchFn,
  probe = true,
}: RenderAppOptions): RenderResult {
  return render(
    <AppProviders queryClient={createQueryClient()} fetchFn={fetchFn}>
      <MemoryRouter initialEntries={[path]} future={ROUTER_FUTURE}>
        <AppRoutes />
        {probe ? <LocationProbe /> : null}
      </MemoryRouter>
    </AppProviders>,
  );
}

/** The parsed JSON body and headers of the n-th call to the stub. */
export function callOf(fetchFn: Mock<typeof fetch>, index: number) {
  const [url, init = {}] = fetchFn.mock.calls[index] ?? [];
  return {
    url: String(url),
    method: init.method,
    headers: (init.headers ?? {}) as Record<string, string>,
    body:
      typeof init.body === "string"
        ? (JSON.parse(init.body) as unknown)
        : undefined,
    credentials: init.credentials,
  };
}
