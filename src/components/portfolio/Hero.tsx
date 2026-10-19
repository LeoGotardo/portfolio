import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MediaSlot, Magnetic } from "./primitives";
import { PORTRAIT, RESUME } from "@/data/projects";

const SUB = "Backend Python & full-stack React/TypeScript developer";

function Letters({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", rotate: 8, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          transition={{ delay: delay + i * 0.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </span>
  );
}

function useTyped(text: string, start: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, 28);
    }, start);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, start]);
  return text.slice(0, n);
}

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t || "--:--:--"}</span>;
}

export function Hero() {
  const typed = useTyped(SUB, 1300);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-10">
      {/* Background video slot */}
      <div className="absolute inset-0 -z-10">
        <MediaSlot label="Vídeo hero 16:9 · loop" className="h-full w-full rounded-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      <motion.div style={{ y, opacity: fade }} className="grid w-full items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            Londrina, BR · <Clock />
          </motion.div>
          <h1 className="font-display text-[15vw] font-bold leading-[0.85] tracking-tighter lg:text-[9vw]">
            <Letters text="Leonardo" delay={0.3} />
            <br />
            <span className="text-outline"><Letters text="Gotardo" delay={0.7} /></span>
          </h1>
          <p className="mt-8 min-h-[1.75rem] font-mono text-base text-primary md:text-lg">
            {typed}<span className="animate-blink">▍</span>
          </p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }}
            className="mt-4 max-w-xl text-muted-foreground">
            I design and ship APIs, web and mobile apps end to end: FastAPI and PostgreSQL on AWS, React and Capacitor on the screen, Raspberry Pi when hardware is involved.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }} className="mt-8 flex flex-wrap gap-3">
            <Magnetic href="#contact" className="border-primary bg-primary text-primary-foreground">Get in touch →</Magnetic>
            <Magnetic href={RESUME}>Resume (PDF)</Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, clipPath: "inset(100% 0 0 0)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - r.left) / r.width - 0.5);
            my.set((e.clientY - r.top) / r.height - 0.5);
          }}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
          className="relative mx-auto w-full max-w-sm"
          data-hover
        >
          <MediaSlot src={PORTRAIT} label="Retrato 4:5" alt="Portrait of Leonardo Gotardo" className="aspect-[4/5] glow" />
          <div className="absolute -bottom-4 -left-4 rounded-md border border-border bg-background px-3 py-2 font-mono text-xs">
            <span className="text-primary">$</span> whoami → dev
          </div>
        </motion.div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        scroll ↓
      </motion.div>
    </section>
  );
}

export function Marquee() {
  const items = ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "AWS", "Terraform", "Redis", "Capacitor", "Raspberry Pi", "Docker", "Socket.IO"];
  const row = [...items, ...items];
  return (
    <div className="relative -rotate-1 overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-3xl font-bold uppercase">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">{t}<span>✦</span></span>
        ))}
      </div>
    </div>
  );
}
