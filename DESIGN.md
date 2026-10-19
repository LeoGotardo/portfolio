---
name: Leonardo Gotardo · Portfolio
description: A dark terminal base with one lime accent; each project takes over the whole screen in its own palette, revealed by a radial wave.
colors:
  background: "oklch(0.16 0.005 260)"
  card: "oklch(0.2 0.006 260)"
  secondary: "oklch(0.24 0.008 260)"
  foreground: "oklch(0.95 0.01 110)"
  muted-foreground: "oklch(0.65 0.015 260)"
  primary: "oklch(0.9 0.21 125)"
  primary-foreground: "oklch(0.16 0.005 260)"
  border: "oklch(1 0 0 / 10%)"
  destructive: "oklch(0.65 0.22 25)"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "15vw (9vw at lg)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "tighter"
  section-heading:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "text-6xl → md:text-8xl"
    fontWeight: 700
  project-title:
    fontFamily: "per project (themes.ts display or font)"
    fontSize: "text-5xl → md:text-7xl (featured), text-4xl → md:text-6xl"
    fontWeight: 700
  body:
    fontFamily: "Space Grotesk, sans-serif"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "text-xs"
    letterSpacing: "0.3em"
    textTransform: uppercase
rounded:
  base: "0.5rem"
  card: "rounded-xl"
  pill: "rounded-full"
---

# Design System: Leonardo Gotardo · Portfolio

Built with TanStack Start and Tailwind v4. Tokens live in `src/styles.css`; per-project palettes in `src/data/themes.ts`. The previous design ("The Ultramarine Bench") is archived in `docs/archive/ultramarine/`.

## 1. Overview

One dark, quiet base (near-black, warm off-white text, a single lime accent) that steps aside for the work. Each project is a full-screen panel dressed in **that project's real palette and fonts**, with a mock of its actual UI, so the visitor sees the products rather than reading about them. Panels stack: the next one grows from the centre of the screen as a circle (the radial wave) over the one underneath, and the page chrome cross-fades to the active project's colors.

## 2. Colors

- **Portfolio theme** (`:root`): background `oklch(0.16 0.005 260)`, foreground `oklch(0.95 0.01 110)`, primary lime `oklch(0.9 0.21 125)`. Lime is the only accent: links, the active button, the typed role, section numbers, the timeline.
- **Project themes** (`themes.ts`): taken from each project's own code (e.g. MainDug `#ff8c42` on `#1b1918`, ipTool `#00d296` on `#04080f`, Venetia `#D4A017` on `#131110`). Each sets the same token names, so components need no per-project code.
- Color tokens are registered with `@property ... <color>` and `html` transitions them over 0.7s, which is what makes the chrome cross-fade smoothly.

## 3. Typography

- **Space Grotesk** for display and body; **JetBrains Mono** for labels, metadata, tags and the nav.
- Display is huge and tight (hero `15vw` → `9vw`, leading 0.85); the second line uses `text-outline` (transparent fill, 1px stroke).
- Project titles switch to the project's display font when it has one (Syne, Orbitron, Cinzel).
- Section labels: mono, `text-xs`, uppercase, `tracking-[0.3em]`, a lime number and a hairline.

## 4. Elevation and texture

Flat. Depth comes from the stacked panels themselves, a `glow` (lime box-shadow) on the portrait and timeline dots, a faint 64px `grid-bg`, and a fixed film `grain` overlay at 6% opacity.

## 5. Components

- **Nav**: always fixed; mono links in a blurred pill, lime "Resume" button; a 2px lime scroll-progress bar on top.
- **Hero**: name in display type, typed role in lime mono, intro, "Get in touch" and "Resume (PDF)" magnetic buttons, portrait card with pointer tilt, clock badge (Londrina).
- **Work panels** (`Work.tsx`): sticky `h-svh` sections, 5/7 grid: index and period, title, Problem/Decision/Result rows or a lede, counters, tags, links; the right side renders `SceneWidget` (the project's UI mock). Wave: `clip-path: circle(r% at 50% 50%)` driven by scroll over `WAVE = 0.9` viewports, then a `DWELL = 0.4` pause.
- **Skip projects**: fixed bottom-right button, shown only inside the stack, jumps and moves focus to Experience.
- **Experience**: vertical timeline whose lime line grows with scroll; cards with intro, points and tags.
- **About & stack**: statement, facts list, stack groups as chips that spring in.
- **Contact**: giant sliding "Let's talk →", magnetic contact buttons, small footer.
- **Cursor**: a lime dot with `mix-blend-difference` on hover devices; grows over links and buttons.

## 6. Motion

- Lenis smooth scroll (`lerp 0.1`); in-page jumps go through `src/lib/scroll.ts`.
- Reveals: 0.8s, `cubic-bezier(0.22, 1, 0.36, 1)`, from 40px down with an 8px blur.
- `prefers-reduced-motion`: no Lenis, no stacking, no wave; panels become ordinary full-height sections. Stacking also needs at least 1024px of width.

## 7. Do's and Don'ts

### Do:
- Take project palettes and fonts from the project's real code, and keep the mocks faithful to the real UI.
- Keep the lime accent for one job at a time per screen.
- Keep every project palette at WCAG AA contrast, same as the portfolio theme.

### Don't:
- Don't add per-project component code; extend `themes.ts` and `SceneWidget` instead.
- Don't mention IrisPay products, clients, numbers or incidents anywhere (NDA); technologies and conditions only.
