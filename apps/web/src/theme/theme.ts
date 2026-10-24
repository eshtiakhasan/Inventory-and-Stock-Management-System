/**
 * Theme choice (BR5.1, FR18.2). "Device" follows the operating system through
 * CSS and removes the saved choice; Light and Dark are saved in this browser
 * and applied before first paint by public/theme-init.js.
 */
export const THEME_STORAGE_KEY = "mojud-theme";

export type ThemeChoice = "light" | "dark" | "device";

export function getThemeChoice(): ThemeChoice {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "device";
  } catch (error) {
    console.warn(
      "Mojud: saved theme could not be read; using the device theme.",
      error,
    );
    return "device";
  }
}

export function setThemeChoice(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === "device") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", choice);
  }
  try {
    if (choice === "device") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, choice);
    }
  } catch (error) {
    console.warn(
      "Mojud: theme choice could not be saved in this browser.",
      error,
    );
  }
}
