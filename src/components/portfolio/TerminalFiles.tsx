/* eslint-disable react-refresh/only-export-components -- a data module (the file tree and its helpers) that renders bits of JSX, not a component file */
import type { ReactNode } from "react";
import { featured, projects, stack } from "@/data/projects";
import { jobs } from "@/data/experience";
import { i18nFor, type Locale, period, type Resources, RESUME } from "@/lib/i18n";

/**
 * The terminal's file system: leo's home directory. The page's sections are folders (cd into one and
 * the page scrolls there) holding real content from the site's data; the rest, mostly dotfiles, is
 * where easter eggs hide. Names are the same in both languages; contents follow the page's.
 */

/** The terminal's copy in one language; projects: and jobs: reach the copy the page shows. */
export const terminalT = (l: Locale) => i18nFor(l).getFixedT(l, ["terminal", "projects", "jobs"]);
export type TerminalT = ReturnType<typeof terminalT>;

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
/** The kitten's face, with what she says beside it; the words wrap, so a phone never cuts them off. */
export const kitten = (says: string) => (
  <div className="flex items-center gap-3">
    <pre className="shrink-0 leading-snug">{" /\\_/\\\n( o.o )\n > ^ <"}</pre>
    <span>{says}</span>
  </div>
);
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

const file = (body: (t: TerminalT, l: Locale) => ReactNode): File => ({
  kind: "file",
  body: (l) => body(terminalT(l), l),
});
const text = (key: keyof Resources["terminal"]["files"]) =>
  file((t) => <pre className="whitespace-pre-wrap">{t(`files.${key}`)}</pre>);
const dir = (children: Record<string, Node>, extra: Partial<Dir> = {}): Dir => ({
  kind: "dir",
  children,
  ...extra,
});

/** A project as a markdown-ish file: name and period, what it is, and where to see it. */
function projectFile(
  name: string,
  when: string,
  about: (t: TerminalT) => string,
  href: string | undefined,
) {
  return file((t, l) => (
    <div>
      <div>
        <span className="text-primary"># {name}</span> {dim(`· ${period(when, l)}`)}
      </div>
      <div className="mt-1">{about(t)}</div>
      {href && <div className="mt-1">→ {link(href, href)}</div>}
    </div>
  ));
}

const work = dir(
  Object.fromEntries([
    ...featured.map((p) => [
      `${kebab(p.name)}.md`,
      projectFile(
        p.name,
        p.period,
        (t) => t(`projects:featured.${p.id}.problem`),
        p.links[0]?.href,
      ),
    ]),
    ...projects.map((p) => [
      `${kebab(p.name)}.md`,
      projectFile(p.name, p.period, (t) => t(`projects:desc.${p.id}`), p.live ?? p.code),
    ]),
  ]),
  { section: "work" },
);

const experience = dir(
  Object.fromEntries(
    jobs.map((j) => [
      `${kebab(j.org)}.md`,
      file((t, l) => (
        <div>
          <div>
            <span className="text-primary"># {j.org}</span> {dim(`· ${period(j.period, l)}`)}
          </div>
          <div>
            {t(`jobs:${j.id}.role`)} {dim(`· ${t(`jobs:${j.id}.place`)}`)}
          </div>
          <div className="mt-1">{t(`jobs:${j.id}.intro`)}</div>
        </div>
      )),
    ]),
  ),
  { section: "experience" },
);

const about = dir(
  {
    // The same bio the about command prints.
    "bio.txt": file((t) => <pre className="whitespace-pre-wrap">{t("about")}</pre>),
    "stack.txt": file((t) => (
      <div>
        {stack.map(({ id, items }) => (
          <div key={id}>
            <span className="text-primary">{t(`projects:stack.${id}`)}</span> {dim("·")}{" "}
            {items.join(", ")}
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

export const HOME_DIR: Dir = dir({
  "README.md": text("readme"),
  work,
  experience,
  about,
  contact,
  notes: dir({
    "todo.txt": text("todo"),
    "ideas.txt": text("ideas"),
  }),
  desk: dir({
    "kitten.txt": file((t) => kitten(t("files.kittenSays"))),
    "guitar.txt": text("guitar"),
    "cactus.txt": text("cactus"),
    "monster.can": text("monsterCan"),
  }),
  "resume.pdf": file((t, l) => (
    <>
      {link(RESUME[l], "resume.pdf")} {dim(t("files.resumeHint"))}
    </>
  )),
  ".secrets": text("secrets"),
  ".monster": text("monster"),
  ".bash_history": text("bashHistory"),
  ".config": dir({
    "kitten.conf": text("kittenConf"),
  }),
  ".trash": dir({
    "old-portfolio.html": text("oldPortfolio"),
    "tabs-vs-spaces.md": text("tabsVsSpaces"),
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
