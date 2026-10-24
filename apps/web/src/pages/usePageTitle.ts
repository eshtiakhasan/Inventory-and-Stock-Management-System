import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/** Sets a unique document title, "{Screen} · Mojud" (accessibility checklist). */
export function usePageTitle(page: string): void {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t("app.pageTitle", { page });
  }, [page, t]);
}
