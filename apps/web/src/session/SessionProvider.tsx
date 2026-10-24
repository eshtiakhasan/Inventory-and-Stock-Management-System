/**
 * Holds the signed-in caller and CSRF token (frontend-components.md). The first
 * `/auth/me` call shows Sign in with no message on any 401. Later 401s from
 * other calls end the session: SESSION_ENDED shows "Your session ended", and
 * NOT_SIGNED_IN shows nothing; the signed-in layout then returns the person to
 * Sign in and remembers the page they were on.
 */
import type { SessionResponse } from "@mojud/contracts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ApiError, createApiClient, type ApiClient } from "../api/client";

export const ME_QUERY_KEY = ["auth", "me"] as const;

/** Why there is no session: shapes the Sign in redirect and message. */
export type EndReason = "signedOut" | "sessionEnded" | "notSignedIn" | null;

export interface SessionContextValue {
  session: SessionResponse | null;
  loading: boolean;
  client: ApiClient;
  endReason: EndReason;
  /** Stores the session returned by sign-up or sign-in. */
  setSession(session: SessionResponse): void;
  signOut(): Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export interface SessionProviderProps {
  children: ReactNode;
  fetchFn?: typeof fetch;
}

export function SessionProvider({ children, fetchFn }: SessionProviderProps) {
  const queryClient = useQueryClient();
  const csrfToken = useRef<string | undefined>(undefined);
  const [endReason, setEndReason] = useState<EndReason>(null);

  const client = useMemo(
    () =>
      createApiClient({
        fetchFn,
        getCsrfToken: () => csrfToken.current,
        onAuthError: (error) => {
          csrfToken.current = undefined;
          setEndReason(
            error.code === "SESSION_ENDED" ? "sessionEnded" : "notSignedIn",
          );
          queryClient.setQueryData(ME_QUERY_KEY, null);
        },
      }),
    [fetchFn, queryClient],
  );

  const me = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: async (): Promise<SessionResponse | null> => {
      try {
        const data = await client.get<SessionResponse>("/auth/me", {
          skipAuthHandler: true,
        });
        csrfToken.current = data.csrfToken;
        return data;
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null;
        console.error("Mojud: could not load the session", error);
        throw error;
      }
    },
    staleTime: Infinity,
    retry: false,
  });

  const setSession = useCallback(
    (session: SessionResponse) => {
      csrfToken.current = session.csrfToken;
      setEndReason(null);
      queryClient.setQueryData(ME_QUERY_KEY, session);
    },
    [queryClient],
  );

  const signOut = useCallback(async () => {
    try {
      await client.post("/auth/signout");
    } catch (error) {
      // A 401 means the session had already ended: the client's auth handler
      // has recorded why (SESSION_ENDED or NOT_SIGNED_IN) and cleared it.
      if (error instanceof ApiError && error.status === 401) return;
      throw error;
    }
    csrfToken.current = undefined;
    setEndReason("signedOut");
    queryClient.setQueryData(ME_QUERY_KEY, null);
  }, [client, queryClient]);

  const value = useMemo<SessionContextValue>(
    () => ({
      session: me.data ?? null,
      loading: me.isPending,
      client,
      endReason,
      setSession,
      signOut,
    }),
    [me.data, me.isPending, client, endReason, setSession, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}
