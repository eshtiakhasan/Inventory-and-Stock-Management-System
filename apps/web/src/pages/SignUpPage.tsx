/**
 * M1 Sign up (US1.1, WF1). Fields are checked when the person leaves them, and
 * again on submit; the server checks the same rules (BR1.1–BR1.4). Typed
 * values are always kept. Success stores the session; the public layout then
 * opens the Owner's home (BR4.1).
 */
import {
  NAME_MAX_LENGTH,
  normalizePhone,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  SIGN_UP_FIELDS,
  type SessionResponse,
  type SignUpField,
} from "@mojud/contracts";
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

type Fields = Record<SignUpField, string>;
type FieldErrors = Partial<Record<SignUpField, string>>;

const FIELD_IDS: Readonly<Record<SignUpField, string>> = {
  businessName: "signup-business-name",
  name: "signup-name",
  phone: "signup-phone",
  password: "signup-password",
};

/** True when the value breaks the client-side rule for its field. */
function isInvalid(field: SignUpField, value: string): boolean {
  switch (field) {
    case "businessName":
    case "name": {
      const trimmed = value.trim();
      return trimmed.length === 0 || trimmed.length > NAME_MAX_LENGTH;
    }
    case "phone":
      return normalizePhone(value) === null;
    case "password":
      return (
        value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH
      );
  }
}

function isSignUpField(value: string | undefined): value is SignUpField {
  return (SIGN_UP_FIELDS as readonly string[]).includes(value ?? "");
}

export function SignUpPage() {
  const { t } = useTranslation();
  const { client, setSession } = useSession();
  usePageTitle(t("signup.pageTitle"));
  const [fields, setFields] = useState<Fields>({
    businessName: "",
    name: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | undefined>();
  const [submitCount, setSubmitCount] = useState(0);
  const [saving, setSaving] = useState(false);

  const fieldMessage = (field: SignUpField) => t(`signup.errors.${field}`);

  const checkField = (field: SignUpField) => {
    setErrors((current) => ({
      ...current,
      [field]: isInvalid(field, fields[field])
        ? fieldMessage(field)
        : undefined,
    }));
  };

  const change = (field: SignUpField) => (value: string) =>
    setFields((current) => ({ ...current, [field]: value }));

  const showServerError = (error: unknown) => {
    if (error instanceof ApiError && isSignUpField(error.field)) {
      const field = error.field;
      const message =
        error.code === "DUPLICATE"
          ? t("signup.errors.duplicatePhone")
          : fieldMessage(field);
      setErrors((current) => ({ ...current, [field]: message }));
      document.getElementById(FIELD_IDS[field])?.focus();
      return;
    }
    setFormMessage(t("errors.saveFailed"));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    setSubmitCount((count) => count + 1);
    setFormMessage(undefined);
    const found: FieldErrors = {};
    for (const field of SIGN_UP_FIELDS) {
      if (isInvalid(field, fields[field])) found[field] = fieldMessage(field);
    }
    setErrors(found);
    const invalid = SIGN_UP_FIELDS.filter((field) => found[field]);
    if (invalid.length === 1 && invalid[0]) {
      document.getElementById(FIELD_IDS[invalid[0]])?.focus();
    }
    if (invalid.length > 0) return;

    setSaving(true);
    try {
      const session = await client.post<SessionResponse>(
        "/auth/signup",
        fields,
      );
      setSession(session);
    } catch (error) {
      showServerError(error);
      setSaving(false);
    }
  };

  const summaryErrors = SIGN_UP_FIELDS.flatMap((field) => {
    const message = errors[field];
    return message ? [{ fieldId: FIELD_IDS[field], message }] : [];
  });

  return (
    <div className="auth-card">
      <h1>{t("signup.heading")}</h1>
      <form noValidate onSubmit={submit} data-testid="signup-form">
        <FormErrorSummary
          id="signup-error-summary"
          testId="signup-error-summary"
          formMessage={formMessage}
          errors={submitCount > 0 ? summaryErrors : []}
          focusKey={submitCount}
        />
        <InputField
          id={FIELD_IDS.businessName}
          label={t("signup.businessName")}
          value={fields.businessName}
          error={errors.businessName}
          autoComplete="organization"
          testId="signup-business-name-input"
          onChange={change("businessName")}
          onBlur={() => checkField("businessName")}
        />
        <InputField
          id={FIELD_IDS.name}
          label={t("signup.name")}
          value={fields.name}
          error={errors.name}
          autoComplete="name"
          testId="signup-name-input"
          onChange={change("name")}
          onBlur={() => checkField("name")}
        />
        <InputField
          id={FIELD_IDS.phone}
          label={t("signup.phone")}
          hint={t("signup.phoneHint")}
          value={fields.phone}
          error={errors.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          testId="signup-phone-input"
          onChange={change("phone")}
          onBlur={() => checkField("phone")}
        />
        <PasswordField
          id={FIELD_IDS.password}
          label={t("signup.password")}
          hint={t("signup.passwordHint")}
          value={fields.password}
          error={errors.password}
          autoComplete="new-password"
          testId="signup-password-input"
          onChange={change("password")}
          onBlur={() => checkField("password")}
        />
        <ButtonPrimary testId="signup-submit-button" busy={saving}>
          {t("signup.submit")}
        </ButtonPrimary>
      </form>
      <p className="auth-card__switch">
        {t("signup.haveAccount")}{" "}
        <Link to="/signin" data-testid="signup-signin-link">
          {t("signup.signInLink")}
        </Link>
      </p>
    </div>
  );
}
