import {
  motion,
  type MotionStyle,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Fragment, memo, type RefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { featured, projects } from "@/data/projects";
import { applyTheme, sceneStyle, themes } from "@/data/themes";
import { Counter, SectionLabel } from "./primitives";
import { SceneWidget } from "./scenes";
import { LiveContext } from "@/lib/live";
import { jumpTo } from "@/lib/scroll";

type SceneProps = {
  name: string;
  period: string;
  index: string;
  lede?: string;
  rows?: [string, string][];
  stats?: { value: number; label: string }[];
  tags?: string[];
  links: { label: string; href: string }[];
  big?: boolean;
};

/** Stacked full-screen panels only where there is room and motion is welcome. */
function useStacking() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide && !reduce;
}

/**
 * Decides which project tints the page chrome. Panels report how far they have entered;
 * the last one past halfway wins, and the boundary after the projects resets to the portfolio theme.
 */
function useThemeConductor(names: string[]) {
  const entered = useRef<number[]>(names.map(() => 0));
  const state = useRef({ active: -2, after: false });

  const sync = useCallback(() => {
    let active = -1;
    entered.current.forEach((v, i) => { if (v >= 0.5) active = i; });
    if (state.current.after) active = -1;
    if (active === state.current.active) return;
    state.current.active = active;
    const name = active >= 0 ? names[active] : undefined;
    applyTheme(name ? themes[name] ?? null : null);
  }, [names]);

  const report = useCallback((i: number, v: number) => { entered.current[i] = v; sync(); }, [sync]);
  const setAfter = useCallback((after: boolean) => { state.current.after = after; sync(); }, [sync]);

  useEffect(() => () => applyTheme(null), []);
  return { report, setAfter };
}

// Scroll distance, in viewport heights, that a fully revealed project holds still before the next one
// starts sliding over it. The slide itself takes one viewport: the next panel scrolls up natively.
const DWELL = 0.6;

/** Document position of a non-sticky element (offsetTop of a sticky one includes its current shift). */
function docTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
}

/** Where each panel and the stack sit in the document, so scrolling only does arithmetic. */
type StackLayout = { vh: number; stackTop: number; stackBottom: number; tops: number[]; bottoms: number[] };
type SceneEls = { marker: HTMLDivElement | null; section: HTMLElement | null };

/**
 * Measures the stack off the scroll path: on mount, when stacking switches, and whenever the page
 * resizes (fonts, images, viewport). Reading layout inside scroll handlers forced a reflow per panel
 * per frame, right after the panels had written their transforms. `version` ticks after each measure.
 */
function useStackLayout(stack: RefObject<HTMLDivElement | null>, els: RefObject<SceneEls[]>, stacking: boolean) {
  const layout = useRef<StackLayout>({ vh: 0, stackTop: 0, stackBottom: 0, tops: [], bottoms: [] });
  const version = useMotionValue(0);
  useLayoutEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = stack.current;
      if (!el) return;
      const l = layout.current;
      l.vh = window.innerHeight;
      l.stackTop = docTop(el);
      l.stackBottom = l.stackTop + el.offsetHeight;
      l.tops = els.current.map((e) => (e.marker ? docTop(e.marker) : 0));
      l.bottoms = els.current.map((e, i) => (l.tops[i] ?? 0) + (e.section?.offsetHeight ?? 0));
      version.set(version.get() + 1);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    window.addEventListener("resize", schedule);
    void document.fonts?.ready.then(schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [stack, els, stacking, version]);
  return { layout, version };
}

type SceneCtx = {
  i: number;
  stacking: boolean;
  report: (i: number, v: number) => void;
  register: (i: number, els: Partial<SceneEls>) => void;
  layout: RefObject<StackLayout>;
  version: MotionValue<number>;
};

const Scene = memo(function Scene(p: SceneProps & SceneCtx) {
  const { scrollY } = useScroll();
  const { i, layout, register } = p;
  const stacking = useRef(p.stacking);
  stacking.current = p.stacking;

  // 0 when a panel's top enters at the bottom of the screen, 1 when it reaches the top (where,
  // stacked, it pins over the previous one).
  const entered = (y: number, top: number | undefined) => {
    const l = layout.current;
    if (!l.vh || top === undefined) return 0;
    return Math.min(1, Math.max(0, (y - top + l.vh) / l.vh));
  };
  // Live while any of it can be seen: stacked, from when it enters until the next panel has covered
  // it (the last one until the stack scrolls away); unstacked, while it crosses the viewport.
  const isLive = (y: number) => {
    const l = layout.current;
    const top = l.tops[i];
    if (!l.vh || top === undefined) return false;
    const end = stacking.current ? (l.tops[i + 1] ?? l.stackBottom) : (l.bottoms[i] ?? top);
    return y + l.vh > top && y < end;
  };
  const progress = useTransform([scrollY, p.version], ([y]: number[]) => entered(y ?? 0, layout.current.tops[i]));
  // How far the next panel has slid over this one.
  const covered = useTransform([scrollY, p.version], ([y]: number[]) => (stacking.current ? entered(y ?? 0, layout.current.tops[i + 1]) : 0));
  const liveValue = useTransform([scrollY, p.version], ([y]: number[]) => (isLive(y ?? 0) ? 1 : 0));
  const [live, setLive] = useState(false);
  useMotionValueEvent(progress, "change", (v) => p.report(i, v));
  useMotionValueEvent(liveValue, "change", (v) => setLive(v === 1));
  useEffect(() => {
    p.report(i, progress.get());
    setLive(liveValue.get() === 1);
  }, [p.stacking]); // eslint-disable-line react-hooks/exhaustive-deps

  // The recede: while the next panel slides up over it, this one sinks back, drifts up slower than the
  // scroll and darkens. Transform and opacity only, so scrolling never repaints the panel.
  const scale = useTransform(covered, [0, 1], [1, 0.94]);
  const drift = useTransform(covered, [0, 1], ["0%", "-10%"]);
  const shade = useTransform(covered, [0, 1], [0, 0.6]);
  const marker = useCallback((el: HTMLDivElement | null) => register(i, { marker: el }), [register, i]);
  const section = useCallback((el: HTMLElement | null) => register(i, { section: el }), [register, i]);

  return (
    <LiveContext.Provider value={live}>
    {/* Where the panel's box starts in the flow; measured instead of the sticky panel. */}
    <div ref={marker} aria-hidden />
    {/* Covered panels stop painting (visibility) and their mocks stop animating (LiveContext).
        The shadow on the top edge separates two dark palettes while one slides over the other. */}
    <motion.section
      ref={section}
      style={{ ...(sceneStyle(themes[p.name]) as MotionStyle), ...(p.stacking ? { scale, y: drift, visibility: live ? "visible" : "hidden", willChange: live ? "transform" : undefined } : {}) }}
      className={`relative flex items-center overflow-hidden bg-background text-foreground ${p.stacking ? "sticky top-0 h-svh" : "min-h-svh"} ${p.stacking && i > 0 ? "shadow-[0_-24px_48px_-12px_rgb(0_0_0/0.5)]" : ""}`}
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-6 py-24 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-baseline gap-4 font-mono text-xs text-muted-foreground">
            <span className="text-primary">{p.index}</span><span>{p.period}</span>
          </div>
          <h2 className={`mt-3 font-bold tracking-tight ${p.big ? "text-5xl md:text-7xl" : "text-4xl md:text-6xl"}`} style={{ fontFamily: themes[p.name]?.display }}>{p.name}</h2>
          {p.lede && <p className="mt-5 max-w-lg text-lg text-muted-foreground">{p.lede}</p>}
          {p.rows && (
            <dl className="mt-6 space-y-4 text-sm">
              {p.rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-primary">{k}</dt>
                  <dd className="text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {p.stats && (
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {p.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold"><Counter to={s.value} /></div>
                  <div className="font-mono text-[10px] uppercase text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          {p.tags && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px]">{t}</span>)}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-2">
            {p.links.map((l, i) => (
              <a key={l.href + i} href={l.href} target="_blank" rel="noreferrer"
                className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${i === 0 ? "border-primary bg-primary text-primary-foreground hover:opacity-90" : "border-border hover:border-primary hover:text-primary"}`}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
          <SceneWidget name={p.name} />
        </motion.div>
      </div>
      {p.stacking && <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: shade }} />}
    </motion.section>
    </LiveContext.Provider>
  );
});

const scenes: (SceneProps & { anchor?: string })[] = [
  ...featured.map((p) => ({
    big: true,
    name: p.name,
    period: p.period,
    index: `${p.n} / 03`,
    rows: [["Problem", p.problem], ["Decision", p.decision], ["Result", p.result]] as [string, string][],
    stats: p.stats,
    links: p.links,
  })),
  ...projects.map((p, i) => ({
    ...(i === 0 ? { anchor: "projects" } : {}),
    name: p.name,
    period: p.period,
    index: String(i + 4).padStart(2, "0"),
    lede: p.desc,
    tags: p.tags,
    links: [...(p.live ? [{ label: "Live", href: p.live }] : []), ...(p.code ? [{ label: "Code", href: p.code }] : [])],
  })),
];
const sceneNames = scenes.map((s) => s.name);

export function Work() {
  const stacking = useStacking();
  const { report, setAfter } = useThemeConductor(sceneNames);
  // Where the reader is relative to the stack, checked on every scroll so that jumping straight to a
  // later section still resets the theme: past it (bottom above mid-screen) the chrome returns to the
  // portfolio theme; inside it the skip button is offered.
  const stack = useRef<HTMLDivElement>(null);
  const els = useRef<SceneEls[]>(scenes.map(() => ({ marker: null, section: null })));
  const register = useCallback((i: number, e: Partial<SceneEls>) => {
    const cur = els.current[i];
    if (cur) Object.assign(cur, e);
  }, []);
  const { layout, version } = useStackLayout(stack, els, stacking);
  const [inStack, setInStack] = useState(false);
  const { scrollY } = useScroll();
  const locate = useCallback(() => {
    const l = layout.current;
    if (!l.vh) return;
    const mid = window.scrollY + l.vh * 0.5;
    setAfter(l.stackBottom < mid);
    setInStack(l.stackTop < mid && l.stackBottom > mid);
  }, [setAfter, layout]);
  useMotionValueEvent(scrollY, "change", locate);
  useMotionValueEvent(version, "change", locate);

  const skip = () => {
    const next = document.getElementById("experience");
    if (!next) return;
    jumpTo(next);
    next.setAttribute("tabindex", "-1");
    next.focus({ preventScroll: true });
  };

  return (
    <div id="work">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-12">
        <SectionLabel n="01">Selected work</SectionLabel>
      </div>
      {/* Before the panels in the DOM, so keyboard users reach it first; fixed on screen while inside the stack.
          The wrapper takes the project theme, so the button keeps its own show/hide transition. */}
      <div data-chrome>
      <button
        type="button"
        onClick={skip}
        tabIndex={inStack ? 0 : -1}
        aria-hidden={!inStack}
        className={`fixed bottom-6 right-6 z-50 rounded-full border border-border bg-background/80 px-4 py-2 font-mono text-xs text-foreground backdrop-blur-md transition-[opacity,translate,border-color,color] duration-300 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:bottom-8 md:right-10 ${inStack ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
      >
        Skip projects ↓
      </button>
      </div>
      {/*
        One containing block, so every panel stays pinned while the next one slides over it.
        Stacked, each panel is followed by a spacer that holds it still for a reading pause
        before the next one scrolls up.
      */}
      <div ref={stack} className="relative">
        {scenes.map(({ anchor, ...s }, i) => (
          <Fragment key={s.name}>
            {anchor && <div id={anchor} aria-hidden />}
            <Scene {...s} i={i} stacking={stacking} report={report} register={register} layout={layout} version={version} />
            {stacking && <div aria-hidden style={{ height: `${DWELL * 100}svh` }} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
