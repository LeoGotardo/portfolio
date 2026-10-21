import { HOME, type Locale } from "./i18n";

export const SITE = "https://www.leogotardo.com.br";

const PAGE: Record<Locale, { title: string; description: string; og: string }> = {
  en: {
    title: "Leonardo Gotardo — Backend Python & React Developer",
    description:
      "Leonardo Gotardo, software developer in Londrina, Brazil. Backend Python (FastAPI, Flask) and full-stack React/TypeScript, shipping web and mobile apps end to end.",
    og: "en_US",
  },
  pt: {
    title: "Leonardo Gotardo — Desenvolvedor Backend Python & React",
    description:
      "Leonardo Gotardo, desenvolvedor de software em Londrina. Backend Python (FastAPI, Flask) e full-stack React/TypeScript, entregando apps web e mobile de ponta a ponta.",
    og: "pt_BR",
  },
};

const url = (l: Locale) => (l === "en" ? SITE : `${SITE}${HOME[l]}`);

/**
 * The head of the page in one language: its own title, description, canonical and Open Graph locale,
 * and the hreflang pair that ties the two versions together (x-default is the English one).
 */
export function pageHead(l: Locale) {
  const other: Locale = l === "en" ? "pt" : "en";
  const { title, description, og } = PAGE[l];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url(l) },
      { property: "og:locale", content: og },
      { property: "og:locale:alternate", content: PAGE[other].og },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url(l) },
      { rel: "alternate", hrefLang: "en", href: url("en") },
      { rel: "alternate", hrefLang: "pt-BR", href: url("pt") },
      { rel: "alternate", hrefLang: "x-default", href: url("en") },
    ],
  };
}
