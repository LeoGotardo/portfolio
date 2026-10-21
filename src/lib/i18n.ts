import { createContext, useContext } from "react";

// The site is served in two languages, one route each: English at /, Brazilian Portuguese at /pt.
// Copy that changes with the language is written as Text, so a missing translation fails to compile.
export type Locale = "en" | "pt";
export type Text = Record<Locale, string>;

export const LocaleContext = createContext<Locale>("en");
export const useLocale = () => useContext(LocaleContext);

export const HOME: Record<Locale, string> = { en: "/", pt: "/pt" };
export const RESUME: Record<Locale, string> = {
  en: "/Leonardo_Gotardo_CV_EN.pdf",
  pt: "/Leonardo_Gotardo_CV_PT.pdf",
};

const MONTHS: Record<string, string> = {
  Jan: "jan",
  Feb: "fev",
  Mar: "mar",
  Apr: "abr",
  May: "mai",
  Jun: "jun",
  Jul: "jul",
  Aug: "ago",
  Sep: "set",
  Oct: "out",
  Nov: "nov",
  Dec: "dez",
};

/** "Dec 2025 – Present" in the given language ("dez 2025 – atual"). */
export function period(text: string, locale: Locale) {
  if (locale === "en") return text;
  return text.replace(/\b[A-Z][a-z]{2}\b/g, (m) => MONTHS[m] ?? m).replace("Present", "atual");
}

// Soft-skill tags get translated; technology names stay as they are.
const TAGS: Record<string, string> = {
  "Data Structures": "Estruturas de dados",
  Security: "Segurança",
  "Web Security": "Segurança web",
  Networking: "Redes",
  "Technical Support": "Suporte técnico",
  "Problem Solving": "Resolução de problemas",
};

export const tag = (name: string, locale: Locale) =>
  locale === "pt" ? (TAGS[name] ?? name) : name;
