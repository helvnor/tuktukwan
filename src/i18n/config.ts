import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enGeneral from "./en/general.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  initImmediate: false,
  resources: {
    en: {
      general: enGeneral,
    },
  },
  defaultNS: "general",
  fallbackNS: "general",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
    skipOnVariables: false,
  },
});

export default i18n;
