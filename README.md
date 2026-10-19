# Portfolio

Personal portfolio site for Leonardo Gotardo, software developer: backend Python and full-stack React/TypeScript, with embedded Linux and IoT background.

Live at [leogotardo.com.br](https://leogotardo.com.br)

## Stack

- TanStack Start (React 19, server-rendered) on Vite, designed in [Lovable](https://lovable.dev)
- Tailwind CSS v4 with OKLCH tokens; Lenis smooth scroll; Motion (`motion/react`) for reveals and the scroll-driven project panels
- Each project is a full-screen panel in that project's own palette and fonts, revealed by a radial wave as you scroll
- `prefers-reduced-motion` respected: no smooth scroll, stacking or wave
- Deployed on Vercel through nitro's `vercel` preset (`.vercel/output`), with Speed Insights

## Structure

```
src/
  routes/               __root.tsx (head: SEO, Open Graph, JSON-LD, favicons) and index.tsx (the page)
  components/portfolio/ Sections (Chrome, Hero, Work, Experience, About) and the project scene mocks
  data/                 projects.ts (featured work, projects, stack) and themes.ts (per-project palettes)
  lib/scroll.ts         Lenis instance shared by the page
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

Copy lives in `src/data/projects.ts` (projects, featured case studies, stack) and in the section components (`Experience.tsx`, `About.tsx`). Keep `public/llms.txt` in sync when it changes. Screenshots live in `public/previews/`. The portrait is picked up from `src/assets/photo.webp` at build time (the slot stays empty, with no request, until it exists).
