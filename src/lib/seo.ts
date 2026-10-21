import { HOME, i18nFor, LANG, type Locale } from "./i18n";

export const SITE = "https://www.leogotardo.com.br";

// Open Graph locale codes; the title and description are in src/locales/<language>/common.json.
const OG: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

const url = (l: Locale) => (l === "en" ? SITE : `${SITE}${HOME[l]}`);

/**
 * The head of the page in one language: its own title, description, canonical and Open Graph locale,
 * and the hreflang pair that ties the two versions together (x-default is the English one).
 */
export function pageHead(l: Locale) {
  const other: Locale = l === "en" ? "pt" : "en";
  const t = i18nFor(l).getFixedT(l);
  const title = t("seo.title");
  const description = t("seo.description");
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url(l) },
      { property: "og:locale", content: OG[l] },
      { property: "og:locale:alternate", content: OG[other] },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [
      { rel: "canonical", href: url(l) },
      { rel: "alternate", hrefLang: LANG.en, href: url("en") },
      { rel: "alternate", hrefLang: LANG.pt, href: url("pt") },
      { rel: "alternate", hrefLang: "x-default", href: url("en") },
    ],
  };
}
