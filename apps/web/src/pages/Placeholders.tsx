import { useTranslation } from "react-i18next";
import { useSession } from "../session/SessionProvider";
import { usePageTitle } from "./usePageTitle";

function Placeholder({
  titleKey,
  body,
  testId,
}: {
  titleKey: string;
  body: string;
  testId: string;
}) {
  const { t } = useTranslation();
  const title = t(titleKey);
  usePageTitle(title);
  return (
    <section data-testid={testId}>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}

/** Owner and Manager home; the real Setup home (M3) arrives in the frontend unit. */
export function SetupHomePlaceholder() {
  const { t } = useTranslation();
  const { session } = useSession();
  return (
    <Placeholder
      titleKey="pages.setup.title"
      body={t("pages.setup.body", {
        businessName: session?.businessName ?? "",
      })}
      testId="setup-home"
    />
  );
}

export function DispatchOrdersPlaceholder() {
  const { t } = useTranslation();
  return (
    <Placeholder
      titleKey="pages.dispatchOrders.title"
      body={t("pages.dispatchOrders.body")}
      testId="dispatch-orders-home"
    />
  );
}

export function MyTasksPlaceholder() {
  const { t } = useTranslation();
  return (
    <Placeholder
      titleKey="pages.myTasks.title"
      body={t("pages.myTasks.body")}
      testId="my-tasks-home"
    />
  );
}

/** M15: Supervisor and Accountant. */
export function ComingLaterPage() {
  const { t } = useTranslation();
  return (
    <Placeholder
      titleKey="pages.later.title"
      body={t("pages.later.body")}
      testId="coming-later"
    />
  );
}
