import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getThemeChoice, THEME_STORAGE_KEY } from "../src/theme/theme";
import themeInitSource from "../public/theme-init.js?raw";
import { aSession, renderApp, stubFetch } from "./helpers";

function runThemeInit(): void {
  new Function(themeInitSource)();
}

async function renderSignedIn() {
  renderApp({
    path: "/",
    fetchFn: stubFetch({
      "GET /api/v1/auth/me": { status: 200, body: aSession() },
    }),
  });
  await screen.findByRole("heading", { level: 1 });
  return screen.getByLabelText<HTMLSelectElement>("Theme");
}

describe("theme (BR5.1, FR18.2)", () => {
  it("shows the saved choice and saves a new one, applying it to the page", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const select = await renderSignedIn();
    expect(select).toHaveValue("dark");

    await user.selectOptions(select, "light");

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("removes the saved choice when Device is chosen, so the device setting applies", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    const select = await renderSignedIn();

    await user.selectOptions(select, "device");

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(getThemeChoice()).toBe("device");
  });

  it("theme-init.js applies a saved choice before first paint and ignores anything else", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    runThemeInit();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");

    document.documentElement.removeAttribute("data-theme");
    window.localStorage.setItem(THEME_STORAGE_KEY, "purple");
    runThemeInit();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("falls back to the device theme when browser storage cannot be read", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const getItem = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("blocked");
      });

    runThemeInit();

    expect(getThemeChoice()).toBe("device");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(warn).toHaveBeenCalledTimes(2);
    getItem.mockRestore();
    warn.mockRestore();
  });
});
