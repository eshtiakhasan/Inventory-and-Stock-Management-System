import type { Role } from "@mojud/contracts";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ROLE_NAV } from "../session/roles";

export interface SideNavProps {
  role: Role;
}

/** side-nav: the role's items; the current one has aria-current="page" (NavLink). */
export function SideNav({ role }: SideNavProps) {
  const { t } = useTranslation();
  const items = ROLE_NAV[role];
  return (
    <nav
      className="side-nav"
      aria-label={t("nav.label")}
      data-testid="side-nav"
    >
      <ul>
        {items.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to} data-testid={item.testId}>
              {t(item.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
