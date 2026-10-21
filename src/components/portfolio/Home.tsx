import { Cursor, Nav, SmoothScroll } from "./Chrome";
import { Hero, Marquee } from "./Hero";
import { Terminal } from "./Terminal";
import { Work } from "./Work";
import { About, Contact } from "./About";
import { Experience } from "./Experience";
import { type Locale, LocaleContext } from "@/lib/i18n";

/** The one page, in either language; each language's route renders it. Section ids are the same in both. */
export function Home({ locale }: { locale: Locale }) {
  return (
    <LocaleContext.Provider value={locale}>
      <main className="grain relative overflow-x-clip">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <Hero />
        <Marquee />
        <Terminal />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </LocaleContext.Provider>
  );
}
