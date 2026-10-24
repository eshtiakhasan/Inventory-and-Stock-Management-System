/**
 * Translations (BR5.2, FR18.1): every screen string comes from one English
 * file by key. Bangla can be added later as a second resource.
 */
import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";

export const i18n: I18n = i18next.createInstance();

// With initAsync false the resources load synchronously; the promise only
// reports a failure, which is logged.
i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: { en: { translation: en } },
    interpolation: { escapeValue: false },
    initAsync: false,
    react: { useSuspense: false },
  })
  .catch((error: unknown) => {
    console.error("Mojud: translations failed to load", error);
  });
