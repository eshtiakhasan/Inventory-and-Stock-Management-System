import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getThemeChoice,
  setThemeChoice,
  type ThemeChoice,
} from "../theme/theme";

const CHOICES: readonly ThemeChoice[] = ["light", "dark", "device"];

/** theme-switch: a native select labelled "Theme" (Light, Dark, Device). */
export function ThemeSwitch() {
  const { t } = useTranslation();
  const [choice, setChoice] = useState<ThemeChoice>(getThemeChoice);
  return (
    <span className="theme-switch">
      <label htmlFor="theme-switch">{t("theme.label")}</label>
      <select
        id="theme-switch"
        value={choice}
        data-testid="theme-switch"
        onChange={(event) => {
          const next = event.target.value as ThemeChoice;
          setThemeChoice(next);
          setChoice(next);
        }}
      >
        {CHOICES.map((value) => (
          <option key={value} value={value}>
            {t(`theme.${value}`)}
          </option>
        ))}
      </select>
    </span>
  );
}
