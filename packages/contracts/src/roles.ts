import { z } from "zod";

/** The six roles of contract C1 (`Role` schema). */
export const ROLES = [
  "owner",
  "manager",
  "supervisor",
  "warehouse_worker",
  "sales_rep",
  "accountant",
] as const;

export const RoleSchema = z.enum(ROLES);

export type Role = z.infer<typeof RoleSchema>;
