/* eslint-disable react-refresh/only-export-components -- a data module (the file tree and its helpers) that renders bits of JSX, not a component file */
import type { ReactNode } from "react";
import { featured, projects, stack } from "@/data/projects";
import { jobs } from "@/data/experience";
import { type Locale, period, RESUME, type Text } from "@/lib/i18n";

/**
 * The terminal's file system: leo's home directory. The page's sections are folders (cd into one and
 * the page scrolls there) holding real content from the site's data; the rest, mostly dotfiles, is
 * where easter eggs hide. Names are the same in both languages; contents follow the page's.
 */

export const EMAIL = "contato@leogotardo.com.br";
export const LINKEDIN = "https://www.linkedin.com/in/leogotardo/";
export const GITHUB = "https://github.com/LeoGotardo";

export const link = (href: string, text: string) => (
  <a
    href={href}
    target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
    rel="noreferrer"
    className="text-primary underline-offset-4 hover:underline"
  >
    {text}
  </a>
);

export const dim = (text: string) => <span className="text-muted-foreground">{text}</span>;
export const art = (text: string) => <pre className="leading-snug">{text}</pre>;
export const kitten = (says: string) => [" /\\_/\\", `( o.o )  ${says}`, " > ^ <"].join("\n");
export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
/** A file name for a project or company: "Grimório de Venetia" → "grimorio-de-venetia". */
const kebab = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export type File = { kind: "file"; body: (l: Locale) => ReactNode };
// `section` is the page section a folder stands for; `locked` folders answer "permission denied".
export type Dir = {
  kind: "dir";
  children: Record<string, Node>;
  section?: string;
  locked?: boolean;
};
export type Node = File | Dir;

const file = (body: (l: Locale) => ReactNode): File => ({ kind: "file", body });
const text = (t: Text) => file((l) => <pre className="whitespace-pre-wrap">{t[l]}</pre>);
const dir = (children: Record<string, Node>, extra: Partial<Dir> = {}): Dir => ({
  kind: "dir",
  children,
  ...extra,
});

/** A project as a markdown-ish file: name and period, what it is, and where to see it. */
function projectFile(name: string, when: string, about: Text, href: string | undefined) {
  return file((l) => (
    <div>
      <div>
        <span className="text-primary"># {name}</span> {dim(`· ${period(when, l)}`)}
      </div>
      <div className="mt-1">{about[l]}</div>
      {href && <div className="mt-1">→ {link(href, href)}</div>}
    </div>
  ));
}

const work = dir(
  Object.fromEntries([
    ...featured.map((p) => [
      `${kebab(p.name)}.md`,
      projectFile(p.name, p.period, p.problem, p.links[0]?.href),
    ]),
    ...projects.map((p) => [
      `${kebab(p.name)}.md`,
      projectFile(p.name, p.period, p.desc, p.live ?? p.code),
    ]),
  ]),
  { section: "work" },
);

const experience = dir(
  Object.fromEntries(
    jobs.map((j) => [
      `${kebab(j.org)}.md`,
      file((l) => (
        <div>
          <div>
            <span className="text-primary"># {j.org}</span> {dim(`· ${period(j.period, l)}`)}
          </div>
          <div>
            {j.role[l]} {dim(`· ${j.place[l]}`)}
          </div>
          <div className="mt-1">{j.intro[l]}</div>
        </div>
      )),
    ]),
  ),
  { section: "experience" },
);

const about = dir(
  {
    "bio.txt": text({
      en: "Software developer in Londrina, Brazil, graduated in Analysis and Systems Development at IFPR (2026). I ship APIs, web and mobile apps end to end: FastAPI and PostgreSQL on AWS, React and Capacitor on the screen, Raspberry Pi when hardware is involved.",
      pt: "Desenvolvedor de software em Londrina, formado em Análise e Desenvolvimento de Sistemas pelo IFPR (2026). Entrego APIs, apps web e mobile de ponta a ponta: FastAPI e PostgreSQL na AWS, React e Capacitor na tela, Raspberry Pi quando tem hardware no meio.",
    }),
    "stack.txt": file((l) => (
      <div>
        {stack.map(({ group, items }) => (
          <div key={group.en}>
            <span className="text-primary">{group[l]}</span> {dim("·")} {items.join(", ")}
          </div>
        ))}
      </div>
    )),
  },
  { section: "about" },
);

const contact = dir(
  {
    email: file(() => link(`mailto:${EMAIL}`, EMAIL)),
    linkedin: file(() => link(LINKEDIN, "linkedin.com/in/leogotardo")),
    github: file(() => link(GITHUB, "github.com/LeoGotardo")),
  },
  { section: "contact" },
);

/* ---------------------------------------------------------------------------------------------
 * EGGS in files: the README points at ls -a; the dotfiles, notes/ and desk/ (the objects of the
 * voxel scene in the hero) hold the rest.
 * ------------------------------------------------------------------------------------------- */

export const KITTEN_SAYS: Text = {
  en: "meow. the tabby on the chair says hi.",
  pt: "miau. o filhote malhado na cadeira manda um oi.",
};

export const HOME_DIR: Dir = dir({
  "README.md": text({
    en: "welcome to leo's home directory.\nthe sections of the page are folders here: cd into one and the page scrolls there.\nsome files are hidden. ls -a might help.",
    pt: "bem-vindo à pasta pessoal do leo.\nas seções da página são pastas aqui: entre numa com cd e a página rola até ela.\nalguns arquivos estão escondidos. ls -a pode ajudar.",
  }),
  work,
  experience,
  about,
  contact,
  notes: dir({
    "todo.txt": text({
      en: "[x] ship the portfolio\n[x] add a cat\n[ ] name the cat\n[ ] fix the off-by-one\n[ ] fix the off-by-one\n[ ] drink less white monster",
      pt: "[x] lançar o portfólio\n[x] colocar um gato\n[ ] dar um nome pro gato\n[ ] corrigir o off-by-one\n[ ] corrigir o off-by-one\n[ ] tomar menos monster branco",
    }),
    "ideas.txt": text({
      en: "a terminal inside the portfolio. with easter eggs. nobody will ever find them.\n\n(you did.)",
      pt: "um terminal dentro do portfólio. com easter eggs. ninguém nunca vai achar.\n\n(você achou.)",
    }),
  }),
  desk: dir({
    "kitten.txt": file((l) => art(kitten(KITTEN_SAYS[l]))),
    "guitar.txt": text({
      en: "acoustic. knows the same four chords as everyone else.",
      pt: "violão. sabe os mesmos quatro acordes que todo mundo.",
    }),
    "cactus.txt": text({
      en: "never watered. thriving.",
      pt: "nunca foi regado. está ótimo.",
    }),
    "monster.can": text({
      en: "empty. there's another one under the desk.",
      pt: "vazia. tem outra embaixo da mesa.",
    }),
  }),
  "resume.pdf": file((l) => (
    <>
      {link(RESUME[l], "resume.pdf")}{" "}
      {dim(
        l === "pt"
          ? "· arquivo binário; use resume para abrir"
          : "· binary file; use resume to open it",
      )}
    </>
  )),
  ".secrets": text({
    en: "the kitten is the real senior dev. don't tell anyone.",
    pt: "o gatinho é o verdadeiro dev sênior. não conta pra ninguém.",
  }),
  ".monster": text({
    en: "white monster · zero sugar · the third one today",
    pt: "monster branco · zero açúcar · o terceiro de hoje",
  }),
  ".bash_history": text({
    en: 'npm install\nrm -rf node_modules\nnpm install\ngit commit -m "fix"\ngit commit -m "fix fix"\ngit commit -m "final fix (for real)"\ngit push --force\nsudo make me a sandwich\nexit',
    pt: 'npm install\nrm -rf node_modules\nnpm install\ngit commit -m "fix"\ngit commit -m "fix do fix"\ngit commit -m "fix final (agora vai)"\ngit push --force\nsudo make me a sandwich\nexit',
  }),
  ".config": dir({
    "kitten.conf": text({
      en: "mood = sleepy\nnap_schedule = always\nfavourite_spot = office chair\npermissions = root",
      pt: "humor = sonolento\nhorario_da_soneca = sempre\nlugar_favorito = cadeira de escritório\npermissoes = root",
    }),
  }),
  ".trash": dir({
    "old-portfolio.html": text({
      en: "<marquee>welcome to my homepage!!</marquee>\n<!-- visitors: 3 (two of them were me) -->",
      pt: "<marquee>bem-vindo à minha homepage!!</marquee>\n<!-- visitantes: 3 (dois eram eu) -->",
    }),
    "tabs-vs-spaces.md": text({
      en: "decided: spaces. moving on.",
      pt: "decidido: espaços. próximo assunto.",
    }),
  }),
  ".ssh": dir({}, { locked: true }),
});

// `cd projects` still works: it is the work folder under the name of the nav link.
const ALIASES: Record<string, string> = { projects: "work" };

export type Resolved =
  { ok: true; node: Node; path: string[] } | { ok: false; reason: "missing" | "denied" | "notdir" };

/** Resolves a path (absolute from ~ or /, or relative to cwd; with . and ..) to a node in HOME_DIR. */
export function resolve(cwd: string[], raw: string): Resolved {
  const input = raw.trim();
  const fromHome = input === "" || input === "~" || input.startsWith("~/") || input.startsWith("/");
  const parts = (fromHome ? input.replace(/^~\/?|^\/+/, "") : input).split("/").filter(Boolean);
  const path = fromHome ? [] : [...cwd];
  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      path.pop();
      continue;
    }
    const here = at(path);
    if (here?.kind !== "dir") return { ok: false, reason: "notdir" };
    if (here.locked) return { ok: false, reason: "denied" };
    const name = path.length === 0 ? (ALIASES[part] ?? part) : part;
    if (!here.children[name]) return { ok: false, reason: "missing" };
    path.push(name);
  }
  const node = at(path);
  return node ? { ok: true, node, path } : { ok: false, reason: "missing" };
}

function at(path: string[]): Node | undefined {
  let node: Node = HOME_DIR;
  for (const part of path) {
    if (node.kind !== "dir") return undefined;
    const next: Node | undefined = node.children[part];
    if (!next) return undefined;
    node = next;
  }
  return node;
}

export const label = (path: string[]) => (path.length ? `~/${path.join("/")}` : "~");

/** A directory's entries in ls order: folders first, then files, alphabetical; dotfiles only with all. */
export function entries(d: Dir, all: boolean): [string, Node][] {
  return Object.entries(d.children)
    .filter(([name]) => all || !name.startsWith("."))
    .sort(([a, x], [b, y]) => (x.kind === y.kind ? a.localeCompare(b) : x.kind === "dir" ? -1 : 1));
}

export function ls(d: Dir, all: boolean): ReactNode {
  const names = entries(d, all);
  return (
    <div className="flex flex-wrap gap-x-4">
      {all && dim(". ..")}
      {names.map(([name, node]) =>
        node.kind === "dir" ? (
          <span key={name} className="text-primary">
            {name}/
          </span>
        ) : (
          <span key={name}>{name}</span>
        ),
      )}
    </div>
  );
}

/** The tree below a folder, with box-drawing branches; locked folders are listed but not opened. */
export function tree(d: Dir, all: boolean, name: string): string {
  const lines = [name];
  const walk = (node: Dir, prefix: string) => {
    const list = entries(node, all);
    list.forEach(([child, n], i) => {
      const last = i === list.length - 1;
      lines.push(`${prefix}${last ? "└── " : "├── "}${child}${n.kind === "dir" ? "/" : ""}`);
      if (n.kind === "dir" && !n.locked) walk(n, prefix + (last ? "    " : "│   "));
    });
  };
  walk(d, "");
  return lines.join("\n");
}

/** Completes the last segment of a path against the folder it points into. */
export function completePath(cwd: string[], partial: string): { value: string; options: string[] } {
  const cut = partial.lastIndexOf("/") + 1;
  const head = partial.slice(0, cut);
  const prefix = partial.slice(cut);
  const target = resolve(cwd, head || ".");
  if (!target.ok || target.node.kind !== "dir" || target.node.locked)
    return { value: partial, options: [] };
  const names = entries(target.node, prefix.startsWith("."))
    .filter(([name]) => name.startsWith(prefix))
    .map(([name, n]) => (n.kind === "dir" ? `${name}/` : name));
  return names.length === 1
    ? { value: head + names[0], options: [] }
    : { value: partial, options: names };
}
