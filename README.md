# Portfolio

Personal portfolio site for Leonardo Gotardo, software developer: backend Python and full-stack React/TypeScript, with embedded Linux and IoT background.

Live at [leogotardo.com.br](https://leogotardo.com.br)

## Stack

- React 18 + Vite
- Plain CSS with OKLCH design tokens (no framework); fonts: Mona Sans + Martian Mono
- Motion (`motion/react`) for scroll reveals and the project hover preview; GSAP SplitText for the hero entrance
- `prefers-reduced-motion` respected everywhere; light theme by default, dark optional
- i18n (English / Portuguese) via a custom context provider
- Deployed on Vercel, with Speed Insights

## Structure

```
src/
  components/    Sections (Nav, Hero, Work, Experience, Stack, About, Contact) + Reveal and icons
  context/       AppContext: language/theme state shared across the app
  i18n/          Translation strings (en / pt-BR)
public/          Static assets: resumes (EN/PT PDF), project previews, favicons, sitemap, robots.txt, llms.txt
docs/            Design brief (see also PRODUCT.md)
```

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Content

Copy for both languages lives in `src/i18n/translations.js`. Update experience, stack and project entries there rather than in the components. Featured projects carry `problem` / `decision` / `result` / `metrics`; screenshots live in `public/previews/`. The portrait is loaded from `public/photo.webp` (the panel shows a monogram until it exists).
