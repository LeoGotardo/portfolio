# Portfolio

Personal portfolio site for Leonardo Gotardo, software developer: backend Python and full-stack React/TypeScript, with embedded Linux and IoT background.

Live at [leogotardo.com.br](https://leogotardo.com.br)

## Stack

- TanStack Start (React 19, server-rendered) on Vite
- English at `/` and Brazilian Portuguese at `/pt`, each with its own head and hreflang; copy translated with i18next + react-i18next (JSON per language in `src/locales/`)
- Tailwind CSS v4 with OKLCH tokens; Lenis smooth scroll; Motion (`motion/react`) for reveals and the scroll-driven project panels
- Each project is a full-screen panel in that project's own palette and fonts, sliding up over the previous one as you scroll
- A small interactive terminal between the hero and the work (`help`, `projects`, `cd`, `open`, `contact`…)
- An original voxel scene in the hero (three.js, lazy-loaded), modelled in code: Athena, a tabby kitten, lying on an office chair at a desk
- `prefers-reduced-motion` respected: no smooth scroll, stacking or slide transition, and a still voxel scene
- Deployed on Vercel through nitro's `vercel` preset (`.vercel/output`), with Speed Insights

## Structure

```
src/
  routes/               __root.tsx (shared head: Open Graph, JSON-LD, favicons), index.tsx (/) and pt.tsx (/pt)
  components/portfolio/ Home (the page), sections (Chrome, Hero, Terminal, Work, Experience, About),
                        VoxelCat (the hero's 3D scene), TerminalFiles (the terminal's file system), scene mocks
  data/                 projects.ts, experience.ts and themes.ts (per-project palettes): what is the same in both languages
  locales/              en/ and pt/: the copy as JSON, one file per namespace (common, home, projects, jobs, terminal)
  lib/                  i18n.ts (one i18next instance per language, period/tag helpers), seo.ts (per-language head), scroll.ts (Lenis)
public/                 Static assets: resumes (EN/PT PDF), project previews, favicons, og-image, sitemap, robots.txt, llms.txt
docs/archive/          Docs of the previous design (Ultramarine); current: DESIGN.md and PRODUCT.md
```

## Development

```bash
bun install
bun run dev       # start dev server
bun run build     # production build to .vercel/output
bun run lint
```

## Content

Copy lives in `src/locales/en/*.json` and `src/locales/pt/*.json`, one file per namespace: `common` (head, nav, 404 and error pages, months, tags), `home` (the sections), `projects` (featured case studies, descriptions, stack groups), `jobs` (experience) and `terminal` (its output and files). English is the source: its keys type every `t()` call, so a key missing in Portuguese fails to compile, and `src/test/locales.test.ts` fails on extra keys, lists of a different length or a lost `{{placeholder}}` or `<tag>`. The data in `src/data/` holds what is the same in both languages (names, periods, numbers, links) and points to its copy by id. Headings with a styled word use `<Trans>` with named tags (`Things I've <outline>built</outline>.`). Keep `public/llms.txt` in sync when the copy changes. Screenshots live in `public/previews/`. The portrait is picked up from `src/assets/photo.webp` at build time and only shows where WebGL is unavailable; elsewhere the hero shows the voxel scene (`src/components/portfolio/VoxelCat.tsx`).

## Terminal easter eggs

Spoilers. The terminal between the hero and the work hides these; every answer comes in the page's language. Commands live in `src/components/portfolio/Terminal.tsx` (`run()`), the file system in `src/components/portfolio/TerminalFiles.tsx` (`HOME_DIR`), and everything they print in `src/locales/<language>/terminal.json`.

**Disguised in `help`.** The "shell" group lists them with straight-faced descriptions:

| Command | What it really does |
| --- | --- |
| `cat` | with no file, Athena (the kitten) says hi in ASCII |
| `uptime` | load average 0.42, "mostly Athena" |
| `neofetch` | an "LG" logo with drink: white Monster, pet: Athena, tabby kitten (asleep) |
| `fortune` | one of eight programmer jokes |
| `cowsay <msg>` | the ASCII cow says it ("moo" by default) |
| `git blame` / `git push --force` / `git status` | "it was Athena." / rejected, "not on a friday" / clean tree |
| `vim`, `vi`, `nvim`, `nano`, `emacs` → `:q` | "you'd never get out" → "put that on your resume" |
| `rm <file>` | permission denied: Athena is asleep on the keyboard |
| `make <target>` / `sudo make me a sandwich` | "No rule to make target…" / "okay." (`make me a sandwich` without sudo: "make it yourself", after xkcd) |
| `sudo <cmd>` | "not in the sudoers file. This incident will be reported." |
| `ping <host>` | "it's up (Athena checked)"; plain `ping` answers "pong" |
| `matrix` | "wake up, neo…" and an animated digital rain: lime glyphs falling down columns with pale heads and fading trails (a canvas that only runs while on screen; a still frame under reduced motion) |
| `exit` | "logout? not yet." |

**Unlisted:** `meow` (Athena), `coffee` and `monster` (the white Monster on the desk), `hi`/`hello`/`hey`/`oi`/`olá`, `42`, `xyzzy` ("Nothing happens.").

**In the file system** (`ls -a` reveals the dotfiles; the home `README.md` says so):

- `.secrets`: "Athena is the real senior dev. don't tell anyone."
- `.monster`: "white monster · zero sugar · the third one today"
- `.bash_history`: `fix`, `fix fix`, `final fix (for real)`, `git push --force`…
- `.config/kitten.conf`: name athena, mood sleepy, favourite spot the office chair, permissions root
- `.trash/`: `old-portfolio.html` (a `<marquee>` and "visitors: 3 (two of them were me)") and `tabs-vs-spaces.md`
- `.ssh/`: locked, "Permission denied (nice try)"
- `notes/`: `todo.txt` ("[x] name the cat (Athena)", "fix the off-by-one" twice) and `ideas.txt` ("nobody will ever find them. (you did.)")
- `desk/`: the voxel scene's objects (`kitten.txt`, `guitar.txt`, `cactus.txt`, `monster.can`)

**Konami code:** ↑ ↑ ↓ ↓ ← → ← → B A in the terminal turns cheat mode on ("+30 lives") and cycles the window's hues like the RGB on the desk; again turns it off.
