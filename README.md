# Portfolio

Personal portfolio site for Leonardo Gotardo — Software Developer specializing in embedded systems, REST APIs, IoT, and web development.

Live at [leogotardo.vercel.app](https://leogotardo.vercel.app)

## Stack

- React 18 + Vite
- Plain CSS (no framework)
- i18n (English / Portuguese) via a custom context provider
- Deployed on Vercel, with Speed Insights

## Structure

```
src/
  components/    Section components (Hero, About, Experience, Skills, Projects, Certificates, Contact, Nav)
  context/       AppContext — language/theme state shared across the app
  i18n/          Translation strings (en / pt-BR)
public/          Static assets, favicons, sitemap, robots.txt, llms.txt
```

## Development

```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Content

Copy for both languages lives in `src/i18n/translations.js`. Update experience, skills, and project entries there rather than in the components.
