import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect } from "vitest";

declare module "vitest" {
  interface Assertion {
    toHaveNoViolations(): void;
  }
}

expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.title = "";
});
