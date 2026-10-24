import type { Role } from "@mojud/contracts";

/** Each role's home after sign-in (BR4.1). */
export const ROLE_HOME: Readonly<Record<Role, string>> = {
  owner: "/setup",
  manager: "/setup",
  sales_rep: "/dispatch-orders",
  warehouse_worker: "/my-tasks",
  supervisor: "/later",
  accountant: "/later",
};

export interface NavItem {
  to: string;
  labelKey: string;
  testId: string;
}

const SETUP: NavItem = {
  to: "/setup",
  labelKey: "nav.setup",
  testId: "side-nav-setup-link",
};
const DISPATCH: NavItem = {
  to: "/dispatch-orders",
  labelKey: "nav.dispatchOrders",
  testId: "side-nav-dispatch-orders-link",
};
const MY_TASKS: NavItem = {
  to: "/my-tasks",
  labelKey: "nav.myTasks",
  testId: "side-nav-my-tasks-link",
};

/** Side navigation items per role in this unit (frontend-components.md). */
export const ROLE_NAV: Readonly<Record<Role, readonly NavItem[]>> = {
  owner: [SETUP],
  manager: [SETUP],
  sales_rep: [DISPATCH],
  warehouse_worker: [MY_TASKS],
  supervisor: [],
  accountant: [],
};

/** Who may open each signed-in route (frontend-components.md Routes). */
export const ROUTE_ROLES: Readonly<Record<string, readonly Role[]>> = {
  "/setup": ["owner", "manager"],
  "/dispatch-orders": ["owner", "manager", "sales_rep"],
  "/my-tasks": ["warehouse_worker"],
  "/later": ["supervisor", "accountant"],
};
