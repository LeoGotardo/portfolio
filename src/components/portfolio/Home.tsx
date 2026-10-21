import { Cursor, Nav, SmoothScroll } from "./Chrome";
import { Hero, Marquee } from "./Hero";
import { Terminal } from "./Terminal";
import { Work } from "./Work";
import { About, Contact } from "./About";
import { Experience } from "./Experience";

/**
 * The one page, in either language; each language's route renders it, and the root provides the
 * i18next instance for the path. Section ids are the same in both.
 */
export function Home() {
  return (
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
  );
}
