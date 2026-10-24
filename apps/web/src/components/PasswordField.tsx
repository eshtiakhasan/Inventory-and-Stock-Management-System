import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputField, type InputFieldProps } from "./InputField";

export type PasswordFieldProps = Omit<InputFieldProps, "type" | "addon">;

/** A password input-field with a Show/Hide toggle (aria-pressed). */
export function PasswordField(props: PasswordFieldProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  return (
    <InputField
      {...props}
      type={visible ? "text" : "password"}
      addon={
        <button
          type="button"
          className="button button--secondary"
          aria-pressed={visible}
          aria-controls={props.id}
          aria-label={t("password.toggleLabel")}
          data-testid={`${props.testId}-toggle`}
          onClick={() => setVisible((shown) => !shown)}
        >
          {visible ? t("password.hide") : t("password.show")}
        </button>
      }
    />
  );
}
