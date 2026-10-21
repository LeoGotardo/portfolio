import { motion, useMotionValue, useSpring, useInView, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Image or video slot. Without media it renders a placeholder; its label only shows in dev, as a note to fill it later. */
export function MediaSlot({ src, video, label, alt = "", className }: { src?: string | undefined; video?: string | undefined; label: string; alt?: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const empty = !video && (!src || failed);
  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-card", className)}>
      {video ? (
        <video src={video} autoPlay muted loop playsInline className="h-full w-full object-cover" />
      ) : src ? (
        <img src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = "none"; setFailed(true); }} className="h-full w-full object-cover" />
      ) : (
        <div className="grid-bg absolute inset-0" />
      )}
      {empty && import.meta.env.DEV && (
        <span className="absolute left-3 top-3 rounded border border-dashed border-primary/60 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur">
          ▶ {label}
        </span>
      )}
    </div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{to >= 1900 && to <= 2100 ? v : v.toLocaleString("en-US")}</span>;
}

export function Magnetic({ children, className, href }: { children: ReactNode; className?: string; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      data-hover
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.35);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

export function SectionLabel({ n, children }: { n: string; children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
      <span className="text-primary">{n}</span>
      <span className="h-px w-12 bg-border" />
      {children}
    </div>
  );
}

/** The shell prompt shared by the hero's whoami window and the terminal section, in a working directory. */
export function Prompt({ path = "~" }: { path?: string }) {
  return (
    <>
      <span className="text-primary">leo@londrina</span>
      <span className="text-muted-foreground">:{path}$</span>
    </>
  );
}
