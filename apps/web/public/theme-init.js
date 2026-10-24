// Runs before first paint (BR5.1): applies the theme saved in this browser.
// With no saved choice the page follows the device setting through CSS
// (prefers-color-scheme), so nothing needs to be set.
(function applySavedTheme() {
  "use strict";
  try {
    var choice = window.localStorage.getItem("mojud-theme");
    if (choice === "light" || choice === "dark") {
      document.documentElement.setAttribute("data-theme", choice);
    }
  } catch (error) {
    // Storage can be blocked (private mode); the device theme is used instead.
    console.warn(
      "Mojud: saved theme could not be read; using the device theme.",
      error,
    );
  }
})();
