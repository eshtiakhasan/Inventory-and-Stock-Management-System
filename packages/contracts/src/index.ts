/**
 * @mojud/contracts: the shared part of contract C1. Both the API and the web
 * app import these schemas and types, so one definition drives server checks
 * and client hints (NFR1.10).
 */
export * from "./errors.js";
export * from "./phone.js";
export * from "./roles.js";
export * from "./schemas.js";
