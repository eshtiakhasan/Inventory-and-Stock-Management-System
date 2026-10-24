import type { MouseEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export interface ButtonPrimaryProps {
  children: ReactNode;
  testId: string;
  type?: "button" | "submit";
  /** While busy the button shows a spinner and ignores clicks (no double submit). */
  busy?: boolean;
  onClick?: () => void;
}

/** button-primary: the main action of a form. */
export function ButtonPrimary({
  children,
  testId,
  type = "submit",
  busy = false,
  onClick,
}: ButtonPrimaryProps) {
  const { t } = useTranslation();
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (busy) {
      event.preventDefault();
      return;
    }
    onClick?.();
  };
  return (
    <button
      type={type}
      className="button button--primary"
      aria-busy={busy || undefined}
      aria-disabled={busy || undefined}
      data-testid={testId}
      onClick={handleClick}
    >
      {busy ? (
        <>
          <span className="spinner" aria-hidden="true" />
          <span className="visually-hidden">{t("common.saving")}</span>
        </>
      ) : null}
      {children}
    </button>
  );
}

export interface ButtonSecondaryProps {
  children: ReactNode;
  testId: string;
  onClick: () => void;
}

/** button-secondary. */
export function ButtonSecondary({
  children,
  testId,
  onClick,
}: ButtonSecondaryProps) {
  return (
    <button
      type="button"
      className="button button--secondary"
      data-testid={testId}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
