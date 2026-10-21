# Portfolio

Personal portfolio site for Leonardo Gotardo, software developer: backend Python and full-stack React/TypeScript, with embedded Linux and IoT background.

Live at [leogotardo.com.br](https://leogotardo.com.br)

## Stack

- TanStack Start (React 19, server-rendered) on Vite
- English at `/` and Brazilian Portuguese at `/pt` (`src/lib/i18n.ts`), each with its own head and hreflang
- Tailwind CSS v4 with OKLCH tokens; Lenis smooth scroll; Motion (`motion/react`) for reveals and the scroll-driven project panels
- Each project is a full-screen panel in that project's own palette and fonts, sliding up over the previous one as you scroll
- A small interactive terminal between the hero and the work (`help`, `projects`, `cd`, `open`, `contact`…)
- An original voxel scene in the hero (three.js, lazy-loaded), modelled in code: a tabby kitten lying on an office chair at a desk
- `prefers-reduced-motion` respected: no smooth scroll, stacking or slide transition, and a still voxel scene
- Deployed on Vercel through nitro's `vercel` preset (`.vercel/output`), with Speed Insights

## Structure

```
src/
  routes/               __root.tsx (shared head: Open Graph, JSON-LD, favicons), index.tsx (/) and pt.tsx (/pt)
  components/portfolio/ Home (the page), sections (Chrome, Hero, Terminal, Work, Experience, About),
                        VoxelCat (the hero's 3D scene), TerminalFiles (the terminal's file system), scene mocks
  data/                 projects.ts, experience.ts and themes.ts (per-project palettes)
  lib/                  i18n.ts (locales, { en, pt } copy helpers), seo.ts (per-language head), scroll.ts (Lenis)
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

Copy lives in `src/data/projects.ts` (projects, featured case studies, stack) and in the section components (`Experience.tsx`, `About.tsx`, `Terminal.tsx`…), written in both languages as `{ en, pt }`. Keep `public/llms.txt` in sync when it changes. Screenshots live in `public/previews/`. The portrait is picked up from `src/assets/photo.webp` at build time and only shows where WebGL is unavailable; elsewhere the hero shows the voxel scene (`src/components/portfolio/VoxelCat.tsx`).

## Terminal easter eggs

Spoilers. The terminal between the hero and the work hides these; every answer comes in the page's language. Commands and copy live in `src/components/portfolio/Terminal.tsx` (the `EN`/`PT` objects and `run()`), the file system in `src/components/portfolio/TerminalFiles.tsx` (`HOME_DIR`).

**Disguised in `help`.** The "shell" group lists them with straight-faced descriptions:

| Command | What it really does |
| --- | --- |
| `cat` | with no file, an ASCII kitten says hi |
| `uptime` | load average 0.42, "mostly the kitten" |
| `neofetch` | an "LG" logo with drink: white Monster, pet: tabby kitten (asleep) |
| `fortune` | one of eight programmer jokes |
| `cowsay <msg>` | the ASCII cow says it ("moo" by default) |
| `git blame` / `git push --force` / `git status` | "it was the cat." / rejected, "not on a friday" / clean tree |
| `vim`, `vi`, `nvim`, `nano`, `emacs` → `:q` | "you'd never get out" → "put that on your resume" |
| `rm <file>` | permission denied: the kitten is asleep on the keyboard |
| `make <target>` / `sudo make me a sandwich` | "No rule to make target…" / "okay." (`make me a sandwich` without sudo: "make it yourself", after xkcd) |
| `sudo <cmd>` | "not in the sudoers file. This incident will be reported." |
| `ping <host>` | "it's up (the kitten checked)"; plain `ping` answers "pong" |
| `matrix` | "wake up, neo…" and a rain of lime glyphs |
| `exit` | "logout? not yet." |

**Unlisted:** `meow` (the kitten), `coffee` and `monster` (the white Monster on the desk), `hi`/`hello`/`hey`/`oi`/`olá`, `42`, `xyzzy` ("Nothing happens.").

**In the file system** (`ls -a` reveals the dotfiles; the home `README.md` says so):

- `.secrets`: "the kitten is the real senior dev. don't tell anyone."
- `.monster`: "white monster · zero sugar · the third one today"
- `.bash_history`: `fix`, `fix fix`, `final fix (for real)`, `git push --force`…
- `.config/kitten.conf`: mood sleepy, favourite spot the office chair, permissions root
- `.trash/`: `old-portfolio.html` (a `<marquee>` and "visitors: 3 (two of them were me)") and `tabs-vs-spaces.md`
- `.ssh/`: locked, "Permission denied (nice try)"
- `notes/`: `todo.txt` ("name the cat", "fix the off-by-one" twice) and `ideas.txt` ("nobody will ever find them. (you did.)")
- `desk/`: the voxel scene's objects (`kitten.txt`, `guitar.txt`, `cactus.txt`, `monster.can`)

**Konami code:** ↑ ↑ ↓ ↓ ← → ← → B A in the terminal turns cheat mode on ("+30 lives") and cycles the window's hues like the RGB on the desk; again turns it off.
