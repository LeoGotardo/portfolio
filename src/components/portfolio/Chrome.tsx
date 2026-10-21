import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { HOME, RESUME, useLocale } from "@/lib/i18n";
import { getLenis, setLenis } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ lerp: 0.1 });
    setLenis(instance);
    let id = 0;
    const raf = (t: number) => { instance.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      instance.destroy();
      if (getLenis() === instance) setLenis(null);
    };
  }, []);
  return null;
}

export function Cursor() {
  // The system arrow is hidden on hover devices, so the dot must sit exactly under the pointer:
  // positioned straight from the event, with no spring (that trailed behind and felt like
  // mouse acceleration). Only the hover growth is animated, via scale.
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setHover(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      data-chrome
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference [@media(hover:hover)]:block"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <motion.div
        className="-ml-7 -mt-7 h-14 w-14 rounded-full bg-primary"
        initial={false}
        animate={{ scale: hover ? 1 : 12 / 56 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </div>
  );
}

const NAV = {
  en: {
    links: [["Work", "#work"], ["Projects", "#projects"], ["Experience", "#experience"], ["About", "#about"], ["Contact", "#contact"]],
    // From this width the section links fit beside the logo; the language switch and Resume always show.
    show: "sm:block",
    resume: "Resume",
    // The switch shows the other language and links to it.
    other: { label: "PT", lang: "pt-BR", title: "Ver em português", href: HOME.pt },
  },
  pt: {
    links: [["Trabalhos", "#work"], ["Projetos", "#projects"], ["Experiência", "#experience"], ["Sobre", "#about"], ["Contato", "#contact"]],
    show: "min-[720px]:block",
    resume: "Currículo",
    other: { label: "EN", lang: "en", title: "View in English", href: HOME.en },
  },
};

export function Nav() {
  const locale = useLocale();
  const t = NAV[locale];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <>
      <motion.div data-chrome className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-primary" style={{ scaleX: progress }} />
      {/* Always on screen: the projects stack is long, so the way out stays reachable. */}
      <header data-chrome className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-mono text-sm font-bold">
          LG<span className="text-primary animate-blink">_</span>
        </a>
        <nav className="flex items-center gap-1 rounded-full border border-border bg-background/60 p-1 backdrop-blur-md">
          {t.links.map(([l, h]) => (
            <a key={h} href={h} className={`hidden rounded-full px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:px-4 ${t.show}`}>
              {l}
            </a>
          ))}
          {/* A full page load: the other language is its own route, and this resets the theme, Lenis and the terminal. */}
          <a href={t.other.href} hrefLang={t.other.lang} lang={t.other.lang} title={t.other.title} className="rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            {t.other.label}
          </a>
          <a href={RESUME[locale]} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-1.5 font-mono text-xs text-primary-foreground">
            {t.resume}
          </a>
        </nav>
      </header>
    </>
  );
}
