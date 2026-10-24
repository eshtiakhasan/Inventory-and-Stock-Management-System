/**
 * M2 Sign in (US1.2, WF2). Refusals appear in the error summary, which takes
 * focus, and never name a field (BR2.1). After a session ended, the page says
 * so once. Success stores the session; the public layout then opens the page
 * first asked for, or the role's home (BR4.1).
 */
import type { SessionResponse } from "@mojud/contracts";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ApiError } from "../api/client";
import { ButtonPrimary } from "../components/Buttons";
import { FormErrorSummary } from "../components/FormErrorSummary";
import { InputField } from "../components/InputField";
import { PasswordField } from "../components/PasswordField";
import { useSession } from "../session/SessionProvider";
import { usePageTitle } from "./usePageTitle";

function refusalKey(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.code === "INVALID_CREDENTIALS")
      return "errors.invalidCredentials";
    if (error.code === "ACCOUNT_DEACTIVATED") return "errors.deactivated";
  }
  return "errors.saveFailed";
}

export function SignInPage() {
  const { t } = useTranslation();
  const { client, setSession, endReason } = useSession();
  usePageTitle(t("signin.pageTitle"));
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState<string | undefined>();
  const [submitCount, setSubmitCount] = useState(0);
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setFormMessage(undefined);
    try {
      const session = await client.post<SessionResponse>("/auth/signin", {
        phone,
        password,
      });
      setSession(session);
    } catch (error) {
      setFormMessage(t(refusalKey(error)));
      setSubmitCount((count) => count + 1);
      setSaving(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>{t("signin.heading")}</h1>
      {endReason === "sessionEnded" && !formMessage ? (
        <p className="refusal" role="status" data-testid="signin-session-ended">
          {t("errors.sessionEnded")}
        </p>
      ) : null}
      <form noValidate onSubmit={submit} data-testid="signin-form">
        <FormErrorSummary
          id="signin-error-summary"
          testId="signin-error-summary"
          formMessage={formMessage}
          focusKey={submitCount}
        />
        <InputField
          id="signin-phone"
          label={t("signin.phone")}
          value={phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          testId="signin-phone-input"
          onChange={setPhone}
        />
        <PasswordField
          id="signin-password"
          label={t("signin.password")}
          value={password}
          autoComplete="current-password"
          testId="signin-password-input"
          onChange={setPassword}
        />
        <ButtonPrimary testId="signin-submit-button" busy={saving}>
          {t("signin.submit")}
        </ButtonPrimary>
      </form>
      <p className="auth-card__switch">
        {t("signin.newBusiness")}{" "}
        <Link to="/signup" data-testid="signin-signup-link">
          {t("signin.createLink")}
        </Link>
      </p>
    </div>
  );
}
