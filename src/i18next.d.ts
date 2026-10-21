import "i18next";
import type { defaultNS, Resources } from "@/lib/i18n";

// Keys are typed from the English copy: t("hero.sub") checks, t("hero.typo") does not compile.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: Resources;
  }
}
