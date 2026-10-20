import { motion, useInView, useReducedMotion, useTransform, useScroll } from "motion/react";
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { MediaSlot, Magnetic } from "./primitives";
import { PORTRAIT, RESUME } from "@/data/projects";

const SUB = "Backend Python & full-stack React/TypeScript developer";

// three.js loads only on the client, after the hero has rendered, and only with WebGL.
const VoxelCat = lazy(() => import("./VoxelCat"));

/** Whether this browser can draw WebGL; checked on the client so the 3D chunk is never requested without it. */
function useWebGL() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (typeof WebGLRenderingContext === "undefined") return;
    try {
      const gl = document.createElement("canvas").getContext("webgl2") ?? document.createElement("canvas").getContext("webgl");
      setOk(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

/** Keeps a failed 3D load (a stale chunk after a deploy, a lost WebGL context) inside the card instead of the error page. */
class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

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

function Clock({ live }: { live: boolean }) {
  const [t, setT] = useState("");
  useEffect(() => {
    if (!live) return;
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, [live]);
  return <span className="tabular-nums">{t || "--:--:--"}</span>;
}

const Prompt = () => (
  <>
    <span className="text-primary">leo@londrina</span>
    <span className="text-muted-foreground">:~$</span>
  </>
);

/** A small terminal window over the corner of the hero scene: types `whoami` once and answers. */
function Whoami() {
  const cmd = useTyped("whoami", 3000);
  const done = cmd.length === "whoami".length;
  return (
    <div className="absolute -bottom-6 -left-2 w-60 overflow-hidden rounded-lg border border-border bg-background/90 font-mono text-xs shadow-2xl backdrop-blur md:-left-8">
      <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 text-[10px] text-muted-foreground">leo@londrina: ~</span>
      </div>
      {/* All three lines are always laid out, so the window never changes height while typing. */}
      <div className="px-3 py-2.5 leading-relaxed">
        <p>
          <Prompt /> {cmd}
          {!done && <span className="animate-blink">▍</span>}
        </p>
        <p className={done ? "text-foreground" : "invisible"}>dev</p>
        <p className={done ? undefined : "invisible"}>
          <Prompt /> <span className="animate-blink">▍</span>
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  const typed = useTyped(SUB, 1300);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // The clock and the bouncing hint only run while the hero is on screen.
  const live = useInView(ref);

  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const onFailed = useCallback(() => setFailed(true), []);
  const webgl = useWebGL() && !failed;
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-20 md:px-10 lg:pb-0">
      {/* Background video slot */}
      <div className="absolute inset-0 -z-10">
        <MediaSlot label="Vídeo hero 16:9 · loop" className="h-full w-full rounded-none opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
      </div>

      <motion.div style={{ y, opacity: fade }} className="grid w-full items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur">
            Londrina, BR · <Clock live={live} />
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
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)", transitionEnd: { clipPath: "none" } }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mx-auto w-full ${webgl ? "max-w-lg" : "max-w-sm"}`}
        >
          {/* The voxel scene floats on the page background and fades in once its chunk has loaded; without WebGL, or if it fails, the portrait slot stays. */}
          <div
            role={webgl ? "img" : undefined}
            aria-label={webgl ? "3D voxel scene, slowly turning: a tabby kitten with lime eyes lying on an office chair in front of a white desk with a PC showing code, a white RGB keyboard and mouse, a Raspberry Pi, a white Monster energy can and a potted cactus, a white PC tower with RGB fans, and an acoustic guitar on a stand" : undefined}
            className={`relative overflow-hidden rounded-lg ${webgl ? "aspect-square" : "aspect-[4/5]"}`}
          >
            {!webgl && <MediaSlot src={PORTRAIT} label="Retrato 4:5" alt="Portrait of Leonardo Gotardo" className="absolute inset-0" />}
            {webgl && (
              <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
                <SceneBoundary onError={onFailed}>
                  <Suspense fallback={null}>
                    <VoxelCat live={live} still={!!reduce} onReady={onReady} />
                  </Suspense>
                </SceneBoundary>
              </div>
            )}
          </div>
          <Whoami />
        </motion.div>
      </motion.div>

      <motion.div animate={live ? { y: [0, 10, 0] } : { y: 0 }} transition={live ? { repeat: Infinity, duration: 2 } : { duration: 0.2 }}
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
