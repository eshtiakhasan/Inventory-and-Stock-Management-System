import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

/** "Skip to content": the first focusable element on every page. */
export function SkipLink() {
  const { t } = useTranslation();
  const skip = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("main")?.focus();
  };
  return (
    <a
      className="skip-link"
      href="#main"
      data-testid="skip-link"
      onClick={skip}
    >
      {t("app.skipLink")}
    </a>
  );
}
