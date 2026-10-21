import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import { SpeedInsights } from "@vercel/speed-insights/react";

import appCss from "../styles.css?url";

import { SITE } from "@/lib/seo";
import { I18nextProvider, useTranslation } from "react-i18next";
import { HOME, i18nFor, LANG, type Locale, useLocale } from "@/lib/i18n";

/** The Portuguese page lives under /pt; everything else is English. */
function usePathLocale(): Locale {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

const OG_IMAGE = `${SITE}/og-image-2026.png`;
const DESCRIPTION =
  "Leonardo Gotardo, software developer in Londrina, Brazil. Backend Python (FastAPI, Flask) and full-stack React/TypeScript, shipping web and mobile apps end to end.";
const KEYWORDS =
  "Leonardo Gotardo, software developer, full-stack developer, backend developer, embedded systems, REST API, IoT, React, Python, JavaScript, TypeScript, Java, C, HTML, CSS, Lua, Bash, Flask, FastAPI, Laravel, WebSocket, JWT, SQLAlchemy, Vite, Tailwind CSS, React Router, MongoDB, MySQL, PostgreSQL, SQLite, Linux, SSH, NFC, RFID, GPIO, threading, socket programming, Git, PyPI, Vercel, fintech, IrisPay, vending machines, cryptography, AES-256, open source, Python library, web development, Londrina, Paraná, Brazil, Brasil, portfolio, desenvolvedor de software, sistemas embarcados";

function NotFoundComponent() {
  const locale = useLocale();
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{t("fallback.notFound")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("fallback.notFoundText")}</p>
        <div className="mt-6">
          <Link
            to={HOME[locale]}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("fallback.home")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {t("fallback.error")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("fallback.errorText")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("fallback.retry")}
          </button>
          <a
            href={HOME[locale]}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {t("fallback.home")}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Leonardo Gotardo" },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: KEYWORDS },
      { name: "author", content: "Leonardo Gotardo" },
      { name: "theme-color", content: "#0c0d0f" },
      { name: "geo.region", content: "BR-PR" },
      { name: "geo.placename", content: "Londrina, Brazil" },
      { name: "geo.position", content: "-23.3045;-51.1696" },
      { name: "ICBM", content: "-23.3045, -51.1696" },
      // Open Graph (LinkedIn, WhatsApp, Facebook) and Twitter/X; pages override title and description.
      { property: "og:site_name", content: "Leonardo Gotardo" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Leonardo Gotardo · Software Developer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Leonardo Gotardo",
              alternateName: "Leonardo Gotardo · Software Developer",
              url: SITE,
            },
            {
              "@type": "Person",
              name: "Leonardo Gotardo",
              url: SITE,
              image: OG_IMAGE,
              jobTitle: "Software Developer",
              worksFor: { "@type": "Organization", name: "IrisPay" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Londrina",
                addressCountry: "BR",
              },
              email: "contato@leogotardo.com.br",
              sameAs: ["https://github.com/LeoGotardo", "https://www.linkedin.com/in/leogotardo/"],
            },
          ],
        },
      },
    ],
    // Canonical, hreflang, og:url and og:locale are set by each language's route (src/lib/seo.ts).
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Figtree:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700&family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=Share+Tech+Mono&family=Orbitron:wght@700;900&family=Manrope:wght@400;500;600;700&family=Cinzel:wght@600;700&family=Sora:wght@400;700&family=Space+Mono:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "apple-touch-icon", href: "/favicon-192.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = usePathLocale();
  return (
    <html lang={LANG[locale]}>
      <head>
        {/* Two Search Console properties; written here because head() keeps one meta per name. */}
        <meta
          name="google-site-verification"
          content="94MWrRaes_KHE5hgGSaxF1YYS7p8e3L4Di6WKwrWmCA"
        />
        <meta
          name="google-site-verification"
          content="yBZMYwGP4-yT-0LYC7oPPQU-j8s59r-ABepDJvEjQco"
        />
        <HeadContent />
      </head>
      <body>
        {/* The page, and the 404 and error pages, read their copy from this language's instance. */}
        <I18nextProvider i18n={i18nFor(locale)}>{children}</I18nextProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SpeedInsights />
    </QueryClientProvider>
  );
}
