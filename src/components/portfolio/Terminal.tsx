import { useInView, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { featured, projects, stack } from "@/data/projects";
import { Trans, useTranslation } from "react-i18next";
import { type Locale, period, resources, RESUME, useLocale } from "@/lib/i18n";
import { getLenis } from "@/lib/scroll";
import { Prompt, Reveal, SectionLabel } from "./primitives";
import {
  art,
  completePath,
  dim,
  EMAIL,
  GITHUB,
  kitten,
  label,
  link,
  LINKEDIN,
  ls,
  resolve,
  slug,
  terminalT,
  type TerminalT,
  tree,
} from "./TerminalFiles";

/**
 * A small shell between the hero and the work: it types `whoami` and `help` by itself when it comes
 * into view, then takes commands. Everything it prints comes from the same data as the page. The
 * easter eggs are listed in `help` under "shell" with straight-faced descriptions (see EGGS below).
 */

const INTRO = ["whoami", "help"];
// The newest lines stay in view; older ones are dropped rather than scrolled, so there is no scrollbar.
const KEEP = 40;

// Command names stay in English (they are shell commands); their placeholders, descriptions and all
// output follow the page's language (src/locales/<language>/terminal.json).
const COMMANDS = [...resources.en.terminal.page, ...resources.en.terminal.shell].map(
  ({ cmd }) => cmd.split(" ")[0]!,
);
const DATE_LOCALE: Record<Locale, string> = { en: "en-GB", pt: "pt-BR" };

/** Every project, featured first, read when a command runs so it matches the panels below. */
const allProjects = (l: Locale = "en") => [
  ...featured.map((p) => ({ name: p.name, period: period(p.period, l), url: p.links[0]?.href })),
  ...projects.map((p) => ({ name: p.name, period: period(p.period, l), url: p.live ?? p.code })),
];
function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView();
}

/* ---------------------------------------------------------------------------------------------
 * EGGS: the jokes behind the "shell" commands in help, plus a few unlisted one-word extras. Some nod
 * to the voxel scene in the hero (Athena, the tabby on the chair, the white Monster on the desk), the rest to
 * old shell and programmer jokes.
 * ------------------------------------------------------------------------------------------- */

const LOGO = String.raw` _      ____
| |    / ___|
| |   | |  _
| |___| |_| |
|_____|\____|`;

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/** Wraps text into lines of at most `width` characters, breaking between words. */
function wrap(text: string, width: number) {
  const lines: string[] = [];
  for (const word of text.split(/\s+/)) {
    const last = lines[lines.length - 1];
    if (last !== undefined && last.length + word.length + 1 <= width)
      lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

function cowsay(text: string) {
  const lines = wrap(text, 28);
  const w = Math.max(...lines.map((l) => l.length));
  const say =
    lines.length === 1
      ? [`< ${lines[0]} >`]
      : lines.map((l, i) => {
          const [a, b] = i === 0 ? ["/", "\\"] : i === lines.length - 1 ? ["\\", "/"] : ["|", "|"];
          return `${a} ${l.padEnd(w)} ${b}`;
        });
  return [
    ` ${"_".repeat(w + 2)}`,
    ...say,
    ` ${"-".repeat(w + 2)}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
}

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテト";
const LIME = "#c8f04a";
// Spacing of the rain's grid, in CSS pixels, and how often it moves down a row.
const COLUMN = 16;
const ROW = 16;
const TICK = 55;

const glyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;

/**
 * The matrix screensaver: glyphs fall down columns, a pale head over a lime trail that fades out. It
 * runs only while it is on screen; under reduced motion it shows a still frame instead.
 */
function MatrixRain() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || reduce) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.font = `13px ${getComputedStyle(canvas).fontFamily}`;
    ctx.textBaseline = "top";
    const rows = Math.ceil(h / ROW);
    // Each column's head row; starting above the top staggers the first drops.
    const heads = Array.from(
      { length: Math.floor(w / COLUMN) },
      () => -Math.floor(Math.random() * rows),
    );
    let raf = 0;
    let last = 0;
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (now - last < TICK) return;
      last = now;
      // Fade everything a little towards transparent, so the trails dim over a few rows.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      heads.forEach((y, i) => {
        if (y > 0) {
          ctx.fillStyle = LIME;
          ctx.fillText(glyph(), i * COLUMN, (y - 1) * ROW);
        }
        if (y >= 0) {
          ctx.fillStyle = "#f2ffd6";
          ctx.fillText(glyph(), i * COLUMN, y * ROW);
        }
        // Past the bottom, a column waits a random while before dropping again.
        heads[i] = y > rows && Math.random() > 0.92 ? -Math.floor(Math.random() * 6) : y + 1;
      });
    };
    // Rain only while visible: off screen, or clipped out of the terminal, nothing is drawn.
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!raf) raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) {
    const row = () => Array.from({ length: 30 }, glyph).join("");
    return (
      <pre className="leading-snug text-primary">{Array.from({ length: 6 }, row).join("\n")}</pre>
    );
  }
  return <canvas ref={ref} aria-hidden className="mt-1 block h-40 w-full" />;
}

function matrix(t: TerminalT) {
  return (
    <div>
      {dim(t("wakeUp"))}
      <MatrixRain />
    </div>
  );
}

const elapsed = (since: number) => {
  const s = Math.floor((Date.now() - since) / 1000);
  return [Math.floor(s / 60), s % 60] as const;
};

/** Commands matched on the whole line, before the command name is looked up. */
function egg(line: string, t: TerminalT): ReactNode | undefined {
  if (/^sudo\s+make\s+me\s+a\s+sandwich$/.test(line)) return t("sandwichSudo");
  if (/^make\s+me\s+a\s+sandwich$/.test(line)) return t("sandwich");
  const target = /^make(?:\s+(\S+).*)?$/.exec(line);
  if (target) return t("noRule", { target: target[1] ?? "coffee" });
  if (/^(sudo\s+)?rm(\s|$)/.test(line)) return t("rm");
  if (/^git\s+blame/.test(line)) return t("blame");
  if (/^git\s+push\s+(-f|--force)/.test(line)) return t("pushForce");
  if (/^git\s+status/.test(line)) return t("gitStatus");
  if (/^git(\s|$)/.test(line)) return t("git");
  return undefined;
}

type Ctx = {
  history: string[];
  since: number;
  locale: Locale;
  cwd: string[];
  chdir: (path: string[]) => void;
};

/** Splits ls/tree arguments into "show hidden files" and the folder to look at. */
function listArgs(args: string[]) {
  const flags = args.filter((a) => a.startsWith("-")).join("");
  return { all: flags.includes("a"), target: args.find((a) => !a.startsWith("-")) ?? "." };
}

/** Runs one command line; returns what to print, or "clear". */
function run(line: string, ctx: Ctx): ReactNode | "clear" {
  const l = ctx.locale;
  const t = terminalT(l);
  const trimmed = line.trim();
  const hidden = egg(trimmed, t);
  if (hidden !== undefined) return hidden;
  const [name = "", ...args] = trimmed.split(/\s+/);
  switch (name) {
    case "":
      return null;
    case "help":
      // Two groups side by side; on a phone the shell group runs on as a list, without descriptions.
      return (
        <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
          <div>
            {dim(t("pageTitle"))}
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
              {t("page", { returnObjects: true }).map(({ cmd, desc }) => (
                <div key={cmd} className="contents">
                  <span className="text-primary">{cmd}</span>
                  {dim(desc)}
                </div>
              ))}
            </div>
          </div>
          <div>
            {dim(t("shellTitle"))}
            <div className="flex flex-wrap gap-x-3 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-4">
              {t("shell", { returnObjects: true }).map(({ cmd, desc }) => (
                <div key={cmd} className="contents">
                  <span className="text-primary">{cmd}</span>
                  <span className="hidden text-muted-foreground md:inline">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "whoami":
      return t("whoami");
    case "about":
      return t("about");
    case "projects":
      return (
        <div>
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
            {allProjects(l).map((p) => (
              <div key={p.name} className="contents">
                <span>{p.name}</span>
                {dim(p.period)}
              </div>
            ))}
          </div>
          <div className="mt-1">{dim(t("projectsHint"))}</div>
        </div>
      );
    case "open": {
      const want = slug(args.join(""));
      if (!want) return t("openUsage");
      const p = allProjects().find((x) => slug(x.name).startsWith(want));
      if (!p?.url) return t("openMissing", { query: args.join(" ") });
      window.open(p.url, "_blank", "noopener");
      return (
        <>
          {t("opening")} {link(p.url, p.url)}
        </>
      );
    }
    case "stack":
      return (
        <div>
          {stack.map(({ id, items }) => (
            <div key={id}>
              <span className="text-primary">{t(`projects:stack.${id}`)}</span> {dim("·")}{" "}
              {items.join(", ")}
            </div>
          ))}
        </div>
      );
    case "ls":
    case "tree": {
      const { all, target } = listArgs(args);
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return t(found.reason === "denied" ? "denied" : "noSuch", { cmd: name, path: target });
      if (found.node.kind === "file") return target;
      if (found.node.locked) return t("denied", { cmd: name, path: target });
      return name === "ls" ? ls(found.node, all) : art(tree(found.node, all, label(found.path)));
    }
    case "cd": {
      const target = args[0] ?? "~";
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return t(found.reason === "denied" ? "denied" : "noSuch", { cmd: "cd", path: target });
      if (found.node.kind === "file") return t("notDir", { cmd: "cd", path: target });
      if (found.node.locked) return t("denied", { cmd: "cd", path: target });
      ctx.chdir(found.path);
      if (found.node.section) goTo(found.node.section);
      return null;
    }
    case "pwd":
      return `/home/leo${ctx.cwd.map((p) => `/${p}`).join("")}`;
    case "contact":
      return (
        <div>
          <div>
            email {dim("·")} {link(`mailto:${EMAIL}`, EMAIL)}
          </div>
          <div>
            linkedin {dim("·")} {link(LINKEDIN, "linkedin.com/in/leogotardo")}
          </div>
          <div>
            github {dim("·")} {link(GITHUB, "github.com/LeoGotardo")}
          </div>
        </div>
      );
    case "resume":
    case "cv":
      window.open(RESUME[l], "_blank", "noopener");
      return (
        <>
          {t("opening")} {link(RESUME[l], "resume.pdf")}
        </>
      );
    case "date":
      return new Date().toLocaleString(DATE_LOCALE[l], {
        timeZone: "America/Sao_Paulo",
        dateStyle: "full",
        timeStyle: "short",
      });
    case "echo":
      return args.join(" ");
    case "sudo":
      return t("sudo");
    case "exit":
      return t("exit");
    case "clear":
      return "clear";
    // EGGS, matched by name.
    case "cat": {
      const target = args[0];
      if (!target) return kitten(t("files.kittenSays"));
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return t(found.reason === "denied" ? "denied" : "noSuch", { cmd: "cat", path: target });
      if (found.node.kind === "dir")
        return found.node.locked
          ? t("denied", { cmd: "cat", path: target })
          : t("isDir", { path: target });
      return found.node.body(l);
    }
    case "meow":
      return kitten(t("files.kittenSays"));
    case "cowsay":
      return art(cowsay(args.join(" ") || t("moo")));
    case "fortune": {
      const fortunes = t("fortunes", { returnObjects: true });
      return fortunes[Math.floor(Math.random() * fortunes.length)];
    }
    case "neofetch":
      return (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <pre className="leading-snug text-primary">{LOGO}</pre>
          <div>
            <div>
              <span className="text-primary">leo</span>@
              <span className="text-primary">londrina</span>
            </div>
            {[
              [t("fetch.os"), "Londrina, BR"],
              ["shell", "zsh"],
              ["uptime", `${elapsed(ctx.since)[0]}m ${elapsed(ctx.since)[1]}s`],
              ["stack", "Python · FastAPI · React/TS"],
              ["editor", t("fetch.editorValue")],
              [t("fetch.drink"), t("fetch.drinkValue")],
              [t("fetch.pet"), t("fetch.petValue")],
            ].map(([k, v]) => (
              <div key={k}>
                <span className="text-primary">{k}</span> {dim("·")} {v}
              </div>
            ))}
          </div>
        </div>
      );
    case "matrix":
      return matrix(t);
    case "history":
      return (
        <pre className="whitespace-pre-wrap break-words">
          {[...ctx.history]
            .reverse()
            .map((c, i) => `${String(i + 1).padStart(4)}  ${c}`)
            .join("\n") || t("historyEmpty")}
        </pre>
      );
    case "uptime": {
      const [minutes, seconds] = elapsed(ctx.since);
      return t("uptime", { minutes, seconds });
    }
    case "vim":
    case "vi":
    case "nvim":
    case "nano":
    case "emacs":
      return t("vim", { name });
    case ":q":
    case ":q!":
    case ":wq":
    case ":x":
      return t("quitVim");
    case "coffee":
      return t("coffee");
    case "monster":
      return t("monster");
    case "ping":
      return args[0] ? t("ping", { host: args[0] }) : "pong";
    case "hello":
    case "hi":
    case "hey":
    case "oi":
    case "olá":
      return t("hello");
    case "42":
      return t("answer");
    case "xyzzy":
      return t("xyzzy");
    default:
      return (
        <>
          {t("notFound", { name })} {dim(t("typeHelp"))}
        </>
      );
  }
}

const PATH_COMMANDS = ["cd", "cat", "ls", "tree", "vim"];

/** Completes the command name, a path after cd/cat/ls/tree/vim, or the project after open. */
function complete(input: string, cwd: string[]): { value: string; options?: string[] } {
  const [name = "", arg] = input.split(/\s+(.*)/);
  const pick = (all: string[], prefix: string) => all.filter((c) => c.startsWith(prefix));
  if (arg === undefined) {
    const found = pick(COMMANDS, name);
    return found.length === 1 ? { value: `${found[0]} ` } : { value: input, options: found };
  }
  if (PATH_COMMANDS.includes(name)) {
    const last = input.split(/\s+/).at(-1) ?? "";
    if (last.startsWith("-")) return { value: input };
    const { value, options } = completePath(cwd, last);
    return { value: input.slice(0, input.length - last.length) + value, options };
  }
  const pool = name === "open" ? allProjects().map((p) => slug(p.name)) : [];
  const found = pick(pool, arg.toLowerCase());
  return found.length === 1 ? { value: `${name} ${found[0]}` } : { value: input, options: found };
}

type Entry = { id: number; path: string; cmd: string; out: ReactNode };

export function Terminal() {
  const locale = useLocale();
  const { t } = useTranslation("terminal");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const body = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [typing, setTyping] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const nextId = useRef(0);
  const history = useRef<string[]>([]);
  const back = useRef(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const pending = useRef<string[]>([]);
  const keys = useRef<string[]>([]);
  const [cheat, setCheat] = useState(false);
  // The working directory: a ref for the command being run, state for the prompt.
  const cwd = useRef<string[]>([]);
  const [where, setWhere] = useState("~");
  const chdir = useCallback((path: string[]) => {
    cwd.current = path;
    setWhere(label(path));
  }, []);

  // Each line keeps the folder it was typed in, like a real scrollback.
  const print = useCallback((cmd: string, out: ReactNode) => {
    const path = label(cwd.current);
    setEntries((all) => [...all, { id: nextId.current++, path, cmd, out }].slice(-KEEP));
  }, []);

  const since = useRef(Date.now());
  const execute = useCallback(
    (cmd: string) => {
      const path = label(cwd.current);
      const out = run(cmd, {
        history: history.current,
        since: since.current,
        locale,
        cwd: cwd.current,
        chdir,
      });
      if (out === "clear") setEntries([]);
      else setEntries((all) => [...all, { id: nextId.current++, path, cmd, out }].slice(-KEEP));
    },
    [locale, chdir],
  );

  // The intro types itself once the terminal is on screen; reduced motion prints it at once.
  useEffect(() => {
    if (!seen) return;
    pending.current = [...INTRO];
    if (reduce) {
      for (const cmd of pending.current.splice(0)) execute(cmd);
      return;
    }
    let delay = 400;
    for (const cmd of INTRO) {
      for (let i = 1; i <= cmd.length; i++)
        timers.current.push(setTimeout(() => setTyping(cmd.slice(0, i)), (delay += 70)));
      timers.current.push(
        setTimeout(
          () => {
            pending.current.shift();
            setTyping(null);
            execute(cmd);
          },
          (delay += 350),
        ),
      );
      delay += 500;
    }
    const all = timers.current;
    return () => all.forEach(clearTimeout);
  }, [seen, reduce, execute]);

  /** Ends the intro at once when the visitor starts typing. */
  const takeOver = () => {
    if (!pending.current.length) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyping(null);
    for (const cmd of pending.current.splice(0)) execute(cmd);
  };

  // Keep the newest line in view. The body clips instead of scrolling, so it is moved in code.
  useLayoutEffect(() => {
    const el = body.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, typing]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const h = history.current;
    // ↑ ↑ ↓ ↓ ← → ← → B A toggles cheat mode; the field, which the arrows filled from history, is cleared.
    keys.current = [...keys.current, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(
      -KONAMI.length,
    );
    if (keys.current.join() === KONAMI.join()) {
      e.preventDefault();
      keys.current = [];
      setInput("");
      setCheat((on) => !on);
      print("", t(cheat ? "cheatOff" : "cheatOn"));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (input.trim()) h.unshift(input);
      back.current = -1;
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      back.current = Math.max(
        -1,
        Math.min(h.length - 1, back.current + (e.key === "ArrowUp" ? 1 : -1)),
      );
      setInput(back.current < 0 ? "" : (h[back.current] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const { value, options } = complete(input, cwd.current);
      setInput(value);
      if (options && options.length > 1) print(input, dim(options.join("  ")));
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <section id="shell" className="px-6 pt-24 md:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionLabel n="00">{t("label")}</SectionLabel>
        <Reveal>
          <h2 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-6xl">
            <Trans
              t={t}
              i18nKey="heading"
              components={{ outline: <span className="text-outline" /> }}
            />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          {/* Clicking anywhere in the window types into it, unless it was a link or a text selection. */}
          <div
            ref={ref}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a") || window.getSelection()?.toString())
                return;
              field.current?.focus({ preventScroll: true });
            }}
            className={`overflow-hidden rounded-xl border border-border bg-background/80 font-mono text-[13px] shadow-2xl [font-variant-ligatures:none] focus-within:border-primary/60 ${cheat ? "animate-hue" : ""}`}
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-card px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
              <span className="ml-3 text-[11px] text-muted-foreground">
                leo@londrina: {where} — zsh
              </span>
            </div>
            <div
              ref={body}
              className="h-[min(78svh,40rem)] overflow-hidden px-4 py-3 leading-relaxed md:h-[28rem]"
            >
              <div role="log" aria-live="polite" aria-label={t("outputLabel")}>
                {entries.map((e) => (
                  <div key={e.id} className="mb-2 last:mb-0">
                    <div>
                      <Prompt path={e.path} /> {e.cmd}
                    </div>
                    {e.out != null && <div className="break-words">{e.out}</div>}
                  </div>
                ))}
              </div>
              {/* A long folder in the prompt pushes the field to the next line rather than squeezing it. */}
              <label className="mt-2 flex flex-wrap items-center gap-x-2">
                <span className="shrink-0">
                  <Prompt path={where} />
                </span>
                {/* While the intro types, the field shows it read-only; focusing the field ends the intro.
                    Below md it is set at 16px and scaled to look like 13px, as iOS zooms the page into
                    any field under 16px. */}
                <span className="min-w-[10rem] flex-1 overflow-hidden">
                  <input
                    ref={field}
                    value={typing ?? input}
                    readOnly={typing !== null}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    onFocus={takeOver}
                    aria-label={t("inputLabel")}
                    placeholder={t("placeholder")}
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="block w-[123.08%] origin-left scale-[0.8125] bg-transparent text-[16px] text-foreground caret-primary outline-none placeholder:text-muted-foreground/50 md:w-full md:scale-100 md:text-[13px]"
                  />
                </span>
              </label>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
