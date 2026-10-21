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
import { type Locale, period, RESUME, useLocale } from "@/lib/i18n";
import { getLenis } from "@/lib/scroll";
import { Prompt, Reveal, SectionLabel } from "./primitives";
import {
  art,
  completePath,
  dim,
  EMAIL,
  GITHUB,
  KITTEN_SAYS,
  kitten,
  label,
  link,
  LINKEDIN,
  ls,
  resolve,
  slug,
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

/* ---------------------------------------------------------------------------------------------
 * Everything the terminal says, per language. Command names stay in English (they are shell
 * commands); their placeholders, descriptions and all output follow the page's language. PT is
 * typed from EN, so a missing line fails to compile.
 * ------------------------------------------------------------------------------------------- */

const EN = {
  heading: ["Prefer the", "terminal"],
  placeholder: "type help",
  inputLabel: "Terminal command. Type help to list the commands.",
  outputLabel: "Terminal output",
  pageTitle: "# this page",
  shellTitle: "# shell",
  page: [
    ["help", "list the commands"],
    ["whoami", "who is this"],
    ["about", "a short bio"],
    ["projects", "what I've built"],
    ["open <project>", "open a project's site or code"],
    ["stack", "the tools I use"],
    ["ls [-a] [dir]", "list files (-a: hidden ones too)"],
    ["cd <dir>", "change folder; sections scroll the page"],
    ["contact", "how to reach me"],
    ["resume", "open my resume (PDF)"],
    ["date", "the time in Londrina"],
    ["clear", "clear the screen"],
  ] as [string, string][],
  // The easter eggs, passed off as ordinary shell commands.
  shell: [
    ["cat <file>", "read a file"],
    ["pwd", "where you are"],
    ["tree", "the folder tree"],
    ["echo <text>", "print text"],
    ["history", "past commands"],
    ["uptime", "how long you've been here"],
    ["neofetch", "system information"],
    ["fortune", "a random quote"],
    ["cowsay <msg>", "print a message"],
    ["git <cmd>", "version control"],
    ["vim <file>", "edit a file"],
    ["rm <file>", "remove a file"],
    ["make <target>", "build a target"],
    ["sudo <cmd>", "run as admin"],
    ["ping <host>", "check a connection"],
    ["matrix", "screensaver"],
    ["exit", "end the session"],
  ] as [string, string][],
  whoami: "leonardo gotardo · backend python & full-stack react/typescript developer",
  about:
    "Software developer in Londrina, Brazil, graduated in Analysis and Systems Development at IFPR (2026). I ship APIs, web and mobile apps end to end: FastAPI and PostgreSQL on AWS, React and Capacitor on the screen, Raspberry Pi when hardware is involved.",
  projectsHint: "open <project> to visit one · cd work to scroll to them",
  openUsage: "usage: open <project>",
  openMissing: (q: string) => `open: no project matches "${q}"`,
  opening: "opening",
  noSuch: (cmd: string, path: string) => `${cmd}: ${path}: No such file or directory`,
  notDir: (cmd: string, path: string) => `${cmd}: not a directory: ${path}`,
  isDir: (path: string) => `cat: ${path}: Is a directory`,
  denied: (cmd: string, path: string) => `${cmd}: ${path}: Permission denied (nice try)`,
  dateLocale: "en-GB",
  sudo: "leo is not in the sudoers file. This incident will be reported.",
  exit: "logout? not yet. Try contact instead.",
  notFound: (name: string) => `zsh: command not found: ${name}`,
  typeHelp: "· type help",
  fortunes: [
    "There are only two hard things in computer science: cache invalidation, naming things and off-by-one errors.",
    "It works on my machine.",
    "A SQL query walks into a bar, walks up to two tables and asks: may I join you?",
    "Weeks of coding can save you hours of planning.",
    "99 little bugs in the code. Take one down, patch it around: 127 little bugs in the code.",
    "The best code is no code at all.",
    "Real programmers count from 0.",
    "!false. It's funny because it's true.",
  ],
  moo: "moo",
  wakeUp: "wake up, neo…",
  uptime: (m: number, s: number) =>
    `up ${m}m ${s}s · 1 user · load average: 0.42 (mostly the kitten)`,
  sandwichSudo: "okay.",
  sandwich: "what? make it yourself.",
  noRule: (t: string) => `make: *** No rule to make target '${t}'. Stop.`,
  rm: "rm: permission denied. The kitten is asleep on the keyboard.",
  blame: "it was the cat.",
  pushForce: "! [rejected] main -> main (not on a friday)",
  gitStatus: "On branch main. Nothing to commit, working tree clean.",
  git: "git: the kitten only knows blame, status and push.",
  fetch: {
    os: "os",
    drink: "drink",
    pet: "pet",
    editorValue: "whatever compiles",
    drinkValue: "white Monster",
    petValue: "tabby kitten (asleep)",
  },
  historyEmpty: "(empty)",
  vim: (name: string) => `opening ${name}… just kidding, you'd never get out. Try :q anyway.`,
  quitVim: "you exited vim. Put that on your resume.",
  coffee: "no coffee on this desk. There's a white Monster, though.",
  monster: "*psst* cracked open a white Monster. Focus +10.",
  ping: (host: string) =>
    `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.42 ms · it's up (the kitten checked)`,
  hello: "hi! Type help to look around.",
  answer: "the answer to life, the universe and everything.",
  xyzzy: "Nothing happens.",
  cheatOn: "↑ ↑ ↓ ↓ ← → ← → B A · cheat mode on: +30 lives.",
  cheatOff: "cheat mode off.",
};
type Strings = typeof EN;

const PT: Strings = {
  heading: ["Prefere o", "terminal"],
  placeholder: "digite help",
  inputLabel: "Comando do terminal. Digite help para ver a lista de comandos.",
  outputLabel: "Saída do terminal",
  pageTitle: "# esta página",
  shellTitle: "# shell",
  page: [
    ["help", "lista os comandos"],
    ["whoami", "quem é este"],
    ["about", "uma bio curta"],
    ["projects", "o que eu construí"],
    ["open <projeto>", "abre o site ou o código de um projeto"],
    ["stack", "as ferramentas que uso"],
    ["ls [-a] [pasta]", "lista arquivos (-a: os ocultos também)"],
    ["cd <pasta>", "muda de pasta; seções rolam a página"],
    ["contact", "como falar comigo"],
    ["resume", "abre meu currículo (PDF)"],
    ["date", "a hora em Londrina"],
    ["clear", "limpa a tela"],
  ],
  shell: [
    ["cat <arquivo>", "lê um arquivo"],
    ["pwd", "onde você está"],
    ["tree", "a árvore de pastas"],
    ["echo <texto>", "imprime um texto"],
    ["history", "comandos anteriores"],
    ["uptime", "há quanto tempo você está aqui"],
    ["neofetch", "informações do sistema"],
    ["fortune", "uma frase aleatória"],
    ["cowsay <msg>", "imprime uma mensagem"],
    ["git <cmd>", "controle de versão"],
    ["vim <arquivo>", "edita um arquivo"],
    ["rm <arquivo>", "remove um arquivo"],
    ["make <alvo>", "compila um alvo"],
    ["sudo <cmd>", "executa como admin"],
    ["ping <host>", "testa uma conexão"],
    ["matrix", "protetor de tela"],
    ["exit", "encerra a sessão"],
  ],
  whoami: "leonardo gotardo · desenvolvedor backend python & full-stack react/typescript",
  about:
    "Desenvolvedor de software em Londrina, formado em Análise e Desenvolvimento de Sistemas pelo IFPR (2026). Entrego APIs, apps web e mobile de ponta a ponta: FastAPI e PostgreSQL na AWS, React e Capacitor na tela, Raspberry Pi quando tem hardware no meio.",
  projectsHint: "open <projeto> para visitar um · cd work para rolar até eles",
  openUsage: "uso: open <projeto>",
  openMissing: (q) => `open: nenhum projeto corresponde a "${q}"`,
  opening: "abrindo",
  noSuch: (cmd, path) => `${cmd}: ${path}: arquivo ou diretório inexistente`,
  notDir: (cmd, path) => `${cmd}: não é um diretório: ${path}`,
  isDir: (path) => `cat: ${path}: é um diretório`,
  denied: (cmd, path) => `${cmd}: ${path}: permissão negada (boa tentativa)`,
  dateLocale: "pt-BR",
  sudo: "leo não está no arquivo sudoers. Este incidente será reportado.",
  exit: "logout? ainda não. Tente contact.",
  notFound: (name) => `zsh: comando não encontrado: ${name}`,
  typeHelp: "· digite help",
  fortunes: [
    "Só existem duas coisas difíceis em computação: invalidação de cache, dar nome às coisas e erros de off-by-one.",
    "Na minha máquina funciona.",
    "Uma query SQL entra num bar, vai até duas mesas e pergunta: posso fazer um join com vocês?",
    "Semanas programando podem te poupar horas de planejamento.",
    "99 bugs no código. Corrige um, sobe de novo: 127 bugs no código.",
    "O melhor código é nenhum código.",
    "Programador de verdade conta a partir do 0.",
    "!false. É engraçado porque é verdade.",
  ],
  moo: "muu",
  wakeUp: "acorda, neo…",
  uptime: (m, s) =>
    `ativo há ${m}m ${s}s · 1 usuário · load average: 0.42 (quase tudo é o gatinho)`,
  sandwichSudo: "tá bom.",
  sandwich: "quê? faz você mesmo.",
  noRule: (t) => `make: *** Nenhuma regra para processar o alvo '${t}'. Pare.`,
  rm: "rm: permissão negada. O gatinho está dormindo no teclado.",
  blame: "foi o gato.",
  pushForce: "! [rejected] main -> main (não na sexta-feira)",
  gitStatus: "No ramo main. Nada para commitar, árvore de trabalho limpa.",
  git: "git: o gatinho só conhece blame, status e push.",
  fetch: {
    os: "so",
    drink: "bebida",
    pet: "pet",
    editorValue: "o que compilar",
    drinkValue: "Monster branco",
    petValue: "filhote malhado (dormindo)",
  },
  historyEmpty: "(vazio)",
  vim: (name) => `abrindo ${name}… brincadeira, você nunca ia sair. Tenta :q mesmo assim.`,
  quitVim: "você saiu do vim. Coloca isso no currículo.",
  coffee: "não tem café nesta mesa. Mas tem um Monster branco.",
  monster: "*psst* abri um Monster branco. Foco +10.",
  ping: (host) =>
    `64 bytes de ${host}: icmp_seq=1 ttl=64 time=0.42 ms · está no ar (o gatinho conferiu)`,
  hello: "oi! Digite help para explorar.",
  answer: "a resposta para a vida, o universo e tudo mais.",
  xyzzy: "Nada acontece.",
  cheatOn: "↑ ↑ ↓ ↓ ← → ← → B A · modo cheat ligado: +30 vidas.",
  cheatOff: "modo cheat desligado.",
};

const COPY: Record<Locale, Strings> = { en: EN, pt: PT };
const COMMANDS = [...EN.page, ...EN.shell].map(([c]) => c.split(" ")[0]!);

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
 * to the voxel scene in the hero (the tabby on the chair, the white Monster on the desk), the rest to
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

function matrix(t: Strings) {
  const glyphs = "01アイウエオカキクケコサシスセソタチツテト";
  const row = () =>
    Array.from({ length: 30 }, () => glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
  return (
    <div>
      {dim(t.wakeUp)}
      <pre className="leading-snug text-primary">{Array.from({ length: 6 }, row).join("\n")}</pre>
    </div>
  );
}

const elapsed = (since: number) => {
  const s = Math.floor((Date.now() - since) / 1000);
  return [Math.floor(s / 60), s % 60] as const;
};

/** Commands matched on the whole line, before the command name is looked up. */
function egg(line: string, t: Strings): ReactNode | undefined {
  if (/^sudo\s+make\s+me\s+a\s+sandwich$/.test(line)) return t.sandwichSudo;
  if (/^make\s+me\s+a\s+sandwich$/.test(line)) return t.sandwich;
  const target = /^make(?:\s+(\S+).*)?$/.exec(line);
  if (target) return t.noRule(target[1] ?? "coffee");
  if (/^(sudo\s+)?rm(\s|$)/.test(line)) return t.rm;
  if (/^git\s+blame/.test(line)) return t.blame;
  if (/^git\s+push\s+(-f|--force)/.test(line)) return t.pushForce;
  if (/^git\s+status/.test(line)) return t.gitStatus;
  if (/^git(\s|$)/.test(line)) return t.git;
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
  const t = COPY[l];
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
            {dim(t.pageTitle)}
            <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4">
              {t.page.map(([c, d]) => (
                <div key={c} className="contents">
                  <span className="text-primary">{c}</span>
                  {dim(d)}
                </div>
              ))}
            </div>
          </div>
          <div>
            {dim(t.shellTitle)}
            <div className="flex flex-wrap gap-x-3 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-4">
              {t.shell.map(([c, d]) => (
                <div key={c} className="contents">
                  <span className="text-primary">{c}</span>
                  <span className="hidden text-muted-foreground md:inline">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "whoami":
      return t.whoami;
    case "about":
      return t.about;
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
          <div className="mt-1">{dim(t.projectsHint)}</div>
        </div>
      );
    case "open": {
      const want = slug(args.join(""));
      if (!want) return t.openUsage;
      const p = allProjects().find((x) => slug(x.name).startsWith(want));
      if (!p?.url) return t.openMissing(args.join(" "));
      window.open(p.url, "_blank", "noopener");
      return (
        <>
          {t.opening} {link(p.url, p.url)}
        </>
      );
    }
    case "stack":
      return (
        <div>
          {stack.map(({ group, items }) => (
            <div key={group.en}>
              <span className="text-primary">{group[l]}</span> {dim("·")} {items.join(", ")}
            </div>
          ))}
        </div>
      );
    case "ls":
    case "tree": {
      const { all, target } = listArgs(args);
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return found.reason === "denied" ? t.denied(name, target) : t.noSuch(name, target);
      if (found.node.kind === "file") return target;
      if (found.node.locked) return t.denied(name, target);
      return name === "ls" ? ls(found.node, all) : art(tree(found.node, all, label(found.path)));
    }
    case "cd": {
      const target = args[0] ?? "~";
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return found.reason === "denied" ? t.denied("cd", target) : t.noSuch("cd", target);
      if (found.node.kind === "file") return t.notDir("cd", target);
      if (found.node.locked) return t.denied("cd", target);
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
          {t.opening} {link(RESUME[l], "resume.pdf")}
        </>
      );
    case "date":
      return new Date().toLocaleString(t.dateLocale, {
        timeZone: "America/Sao_Paulo",
        dateStyle: "full",
        timeStyle: "short",
      });
    case "echo":
      return args.join(" ");
    case "sudo":
      return t.sudo;
    case "exit":
      return t.exit;
    case "clear":
      return "clear";
    // EGGS, matched by name.
    case "cat": {
      const target = args[0];
      if (!target) return art(kitten(KITTEN_SAYS[l]));
      const found = resolve(ctx.cwd, target);
      if (!found.ok)
        return found.reason === "denied" ? t.denied("cat", target) : t.noSuch("cat", target);
      if (found.node.kind === "dir")
        return found.node.locked ? t.denied("cat", target) : t.isDir(target);
      return found.node.body(l);
    }
    case "meow":
      return art(kitten(KITTEN_SAYS[l]));
    case "cowsay":
      return art(cowsay(args.join(" ") || t.moo));
    case "fortune":
      return t.fortunes[Math.floor(Math.random() * t.fortunes.length)];
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
              [t.fetch.os, "Londrina, BR"],
              ["shell", "zsh"],
              ["uptime", `${elapsed(ctx.since)[0]}m ${elapsed(ctx.since)[1]}s`],
              ["stack", "Python · FastAPI · React/TS"],
              ["editor", t.fetch.editorValue],
              [t.fetch.drink, t.fetch.drinkValue],
              [t.fetch.pet, t.fetch.petValue],
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
        <pre>
          {[...ctx.history]
            .reverse()
            .map((c, i) => `${String(i + 1).padStart(4)}  ${c}`)
            .join("\n") || t.historyEmpty}
        </pre>
      );
    case "uptime":
      return t.uptime(...elapsed(ctx.since));
    case "vim":
    case "vi":
    case "nvim":
    case "nano":
    case "emacs":
      return t.vim(name);
    case ":q":
    case ":q!":
    case ":wq":
    case ":x":
      return t.quitVim;
    case "coffee":
      return t.coffee;
    case "monster":
      return t.monster;
    case "ping":
      return args[0] ? t.ping(args[0]) : "pong";
    case "hello":
    case "hi":
    case "hey":
    case "oi":
    case "olá":
      return t.hello;
    case "42":
      return t.answer;
    case "xyzzy":
      return t.xyzzy;
    default:
      return (
        <>
          {t.notFound(name)} {dim(t.typeHelp)}
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
  const t = COPY[locale];
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
      print("", cheat ? t.cheatOff : t.cheatOn);
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
        <SectionLabel n="00">Shell</SectionLabel>
        <Reveal>
          <h2 className="mb-10 font-display text-4xl font-bold tracking-tighter md:text-6xl">
            {t.heading[0]} <span className="text-outline">{t.heading[1]}</span>?
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
            <div ref={body} className="h-96 overflow-hidden px-4 py-3 leading-relaxed md:h-[28rem]">
              <div role="log" aria-live="polite" aria-label={t.outputLabel}>
                {entries.map((e) => (
                  <div key={e.id} className="mb-2 last:mb-0">
                    <div>
                      <Prompt path={e.path} /> {e.cmd}
                    </div>
                    {e.out != null && <div className="break-words">{e.out}</div>}
                  </div>
                ))}
              </div>
              <label className="mt-2 flex items-center gap-2">
                <span className="shrink-0">
                  <Prompt path={where} />
                </span>
                {/* While the intro types, the field shows it read-only; focusing the field ends the intro. */}
                <input
                  ref={field}
                  value={typing ?? input}
                  readOnly={typing !== null}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  onFocus={takeOver}
                  aria-label={t.inputLabel}
                  placeholder={t.placeholder}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="min-w-0 flex-1 bg-transparent text-foreground caret-primary outline-none placeholder:text-muted-foreground/50"
                />
              </label>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
