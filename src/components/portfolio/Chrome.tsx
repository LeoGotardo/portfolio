import { motion, useScroll, useSpring, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { RESUME } from "@/data/projects";
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
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      data-chrome
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden rounded-full bg-primary mix-blend-difference [@media(hover:hover)]:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: hover ? 56 : 12, height: hover ? 56 : 12 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}

const links = [
  ["Work", "#work"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Nav() {
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
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hidden rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:block">
              {l}
            </a>
          ))}
          <a href={RESUME} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-4 py-1.5 font-mono text-xs text-primary-foreground">
            Resume
          </a>
        </nav>
      </header>
    </>
  );
}
