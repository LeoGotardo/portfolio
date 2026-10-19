import { createFileRoute } from "@tanstack/react-router";
import { Cursor, Nav, SmoothScroll } from "@/components/portfolio/Chrome";
import { Hero, Marquee } from "@/components/portfolio/Hero";
import { Work } from "@/components/portfolio/Work";
import { About, Contact } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";

const TITLE = "Leonardo Gotardo — Backend Python & React Developer";
const DESC =
  "Leonardo Gotardo, software developer in Londrina, Brazil. Backend Python (FastAPI, Flask) and full-stack React/TypeScript, shipping web and mobile apps end to end.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="grain relative overflow-x-clip">
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Experience />
      <About />
      <Contact />
    </main>
  );
}
