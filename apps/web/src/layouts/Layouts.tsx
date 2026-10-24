import type { Role } from "@mojud/contracts";
import { Suspense, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet, useLocation, type Location } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { SideNav } from "../components/SideNav";
import { SkipLink } from "../components/SkipLink";
import { ROLE_HOME, ROUTE_ROLES } from "../session/roles";
import { useSession } from "../session/SessionProvider";

export function Loading() {
  const { t } = useTranslation();
  return (
    <div className="loading" aria-busy="true" data-testid="loading">
      {t("app.loading")}
    </div>
  );
}

const PUBLIC_PATHS = new Set(["/signin", "/signup"]);

/** The page first asked for, remembered when a signed-out person was sent to Sign in. */
function rememberedPath(state: unknown): string | undefined {
  const from = (state as { from?: Location } | null)?.from;
  if (!from || PUBLIC_PATHS.has(from.pathname)) return undefined;
  return `${from.pathname}${from.search}`;
}

/** Sign up and Sign in: only when signed out; a signed-in person goes home. */
export function PublicLayout() {
  const { session, loading } = useSession();
  const location = useLocation();
  if (loading) return <Loading />;
  if (session) {
    return (
      <Navigate
        to={rememberedPath(location.state) ?? ROLE_HOME[session.role]}
        replace
      />
    );
  }
  return (
    <>
      <header>
        <SkipLink />
      </header>
      <main id="main" className="public-page" tabIndex={-1}>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

/** The signed-in frame; without a caller it returns the person to Sign in. */
export function SignedInLayout() {
  const { t } = useTranslation();
  const { session, loading, endReason } = useSession();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!session) {
    return endReason === "signedOut" ? (
      <Navigate to="/signin" replace />
    ) : (
      <Navigate to="/signin" replace state={{ from: location }} />
    );
  }
  return (
    <>
      <SkipLink />
      <AppBar />
      <p className="narrow-notice">{t("app.narrowNotice")}</p>
      <div className="app-frame">
        <SideNav role={session.role} />
        <main id="main" className="app-main" tabIndex={-1}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  );
}

/** `/` sends each role to its own home (BR4.1). */
export function RoleHomeRedirect() {
  const { session } = useSession();
  return session ? <Navigate to={ROLE_HOME[session.role]} replace /> : null;
}

export interface RoleRouteProps {
  path: keyof typeof ROUTE_ROLES & string;
  children: ReactNode;
}

/** Opens the page for its roles; other roles go to their own home. */
export function RoleRoute({ path, children }: RoleRouteProps) {
  const { session } = useSession();
  if (!session) return null;
  const allowed: readonly Role[] = ROUTE_ROLES[path] ?? [];
  return allowed.includes(session.role) ? (
    <>{children}</>
  ) : (
    <Navigate to={ROLE_HOME[session.role]} replace />
  );
}
