import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "../session/SessionProvider";
import { ButtonSecondary } from "./Buttons";
import { ThemeSwitch } from "./ThemeSwitch";

function CloudCheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M7 18a5 5 0 1 1 .9-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 7.9H7Z" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  );
}

/**
 * app-bar (desk): app name, business, signed-in name and role, online status
 * as icon and text (always "Online" this round), theme switch and Sign out.
 */
export function AppBar() {
  const { t } = useTranslation();
  const { session, signOut } = useSession();
  const [failed, setFailed] = useState(false);
  if (!session) return null;

  const handleSignOut = () => {
    setFailed(false);
    signOut().catch((error: unknown) => {
      console.error("Mojud: sign-out failed", error);
      setFailed(true);
    });
  };

  return (
    <header className="app-bar">
      <span className="app-bar__brand">{t("app.name")}</span>
      <span>{session.businessName}</span>
      <span className="app-bar__user">
        <span data-testid="app-bar-user-name">{session.name}</span>
        <span className="app-bar__meta" data-testid="app-bar-user-role">
          {t(`roles.${session.role}`)}
        </span>
      </span>
      <span className="app-bar__status">
        <CloudCheckIcon />
        {t("app.online")}
      </span>
      <ThemeSwitch />
      <ButtonSecondary testId="app-bar-sign-out-button" onClick={handleSignOut}>
        {t("app.signOut")}
      </ButtonSecondary>
      {failed ? (
        <p className="refusal" role="alert">
          {t("errors.saveFailed")}
        </p>
      ) : null}
    </header>
  );
}
