import { createInstance, type i18n } from "i18next";
import { useTranslation } from "react-i18next";
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enJobs from "@/locales/en/jobs.json";
import enProjects from "@/locales/en/projects.json";
import enTerminal from "@/locales/en/terminal.json";
import ptCommon from "@/locales/pt/common.json";
import ptHome from "@/locales/pt/home.json";
import ptJobs from "@/locales/pt/jobs.json";
import ptProjects from "@/locales/pt/projects.json";
import ptTerminal from "@/locales/pt/terminal.json";

// The site is served in two languages, one route each: English at /, Brazilian Portuguese at /pt.
// The copy lives in src/locales/<language>/<namespace>.json. English is the source: its shape types
// every key (src/i18next.d.ts), so a key missing in Portuguese fails to compile, and
// src/test/locales.test.ts also checks extra keys, list lengths and placeholders.
export type Locale = "en" | "pt";

const en = {
  common: enCommon,
  home: enHome,
  projects: enProjects,
  jobs: enJobs,
  terminal: enTerminal,
};
const pt: typeof en = {
  common: ptCommon,
  home: ptHome,
  projects: ptProjects,
  jobs: ptJobs,
  terminal: ptTerminal,
};

export const resources: Record<Locale, typeof en> = { en, pt };
export type Resources = typeof en;
export const defaultNS = "common";

export const HOME: Record<Locale, string> = { en: "/", pt: "/pt" };
/** The value for lang and hreflang attributes. */
export const LANG: Record<Locale, string> = { en: "en", pt: "pt-BR" };
export const RESUME: Record<Locale, string> = {
  en: "/Leonardo_Gotardo_CV_EN.pdf",
  pt: "/Leonardo_Gotardo_CV_PT.pdf",
};

const instances: Partial<Record<Locale, i18n>> = {};

/**
 * The i18next instance for one language. Each is created once, synchronously from the bundled JSON,
 * and never changes language, so the server can share it between requests.
 */
export function i18nFor(locale: Locale): i18n {
  const existing = instances[locale];
  if (existing) return existing;
  const instance = createInstance();
  void instance.init({
    lng: locale,
    fallbackLng: "en",
    resources,
    ns: Object.keys(en),
    defaultNS,
    initAsync: false,
    // React escapes on render; escaping here too would print `..&#x2F;x` in the terminal.
    interpolation: { escapeValue: false },
  });
  instances[locale] = instance;
  return instance;
}

/** The page's language, from the i18next instance the root provides. */
export const useLocale = () => useTranslation().i18n.language as Locale;

/** "Dec 2025 – Present" in the given language ("dez 2025 – atual"). */
export function period(text: string, locale: Locale) {
  const t = i18nFor(locale).getFixedT(locale, "common");
  const months: Record<string, string> = t("months", { returnObjects: true });
  return text.replace(/\b[A-Z][a-z]{2}\b/g, (m) => months[m] ?? m).replace("Present", t("present"));
}

/** Soft-skill tags get translated; technology names stay as they are. */
export function tag(name: string, locale: Locale) {
  const tags: Record<string, string> = i18nFor(locale).t("tags", { returnObjects: true });
  return tags[name] ?? name;
}
