---
name: Leonardo Gotardo · Portfolio
description: A dark terminal base with one lime accent; each project takes over the whole screen in its own palette, sliding up over the previous one, which recedes.
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

One dark, quiet base (near-black, warm off-white text, a single lime accent) that steps aside for the work. Each project is a full-screen panel dressed in **that project's real palette and fonts**, with a mock of its actual UI, so the visitor sees the products rather than reading about them. Panels stack: the next one slides up over the one underneath, which sinks back (scales down, drifts up and darkens), and the page chrome cross-fades to the active project's colors.

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

Flat. Depth comes from the stacked panels themselves, a `glow` (lime box-shadow) on the timeline dots, a faint 64px `grid-bg`, and a fixed film `grain` overlay at 6% opacity.

## 5. Components

- **Nav**: always fixed; mono links in a blurred pill, lime "Resume" button; a 2px lime scroll-progress bar on top.
- **Hero**: name in display type, typed role in lime mono, intro, "Get in touch" and "Resume (PDF)" magnetic buttons, the voxel scene (below) in a square card up to 512px, with a small terminal window over its corner (title bar with three dots, `leo@londrina:~$` prompt in lime, types `whoami` once, answers `dev`, blinking cursor), clock badge (Londrina).
- **Hero voxel scene** (`VoxelCat.tsx`, lazy-loaded with three.js and @react-three/fiber, only on the client and only with WebGL): an original voxel dev corner floating on the page background (no card, grid or glow), with no model file. A 49×49 wooden floor tile carries a white desk (two legs and a drawer unit with graphite handles) holding a PC (monitor showing code; a white keyboard whose keys sit in RGB light; a white mouse with an RGB glow; a white tower under the desk with three RGB fans), a Raspberry Pi wired to the monitor, a white Monster (Ultra) can drawn in half-size voxels so the claw mark fits, and a potted cactus with a pink flower; an office chair turned toward the visitor; and an acoustic guitar on a floor stand, its back to the left edge by the Pi. A brown mackerel tabby kitten (big head, ears and eyes, short body; an M on the forehead, lines from the eyes, narrow stripes down the flanks from a dark spine line, ringed legs and tail, cream muzzle, chest and paws) lies on the chair in a sphinx pose, drawn at 0.5 of the scene's voxel size: it is modelled as rounded solids voxelized into four instanced meshes (body, head, eyes, tail); the corner is boxes and discs merged into one instanced mesh plus one for what glows. What glows is unlit and not tone-mapped: lime for the kitten's eyes (dark pupils), the code, the blinking cursor and the Pi's LED; an RGB rainbow drifting across the keyboard, mouse and fans (held still under reduced motion). The camera swings in on load (easeOutCirc), then circles slowly; a mouse drag turns it, and touch is ignored so swipes keep scrolling. The kitten blinks, sways its tail and bobs its head. Frames run only while the hero is on screen. Without WebGL, or if the chunk fails, the card keeps the portrait slot.
- **Work panels** (`Work.tsx`): sticky `h-svh` sections, 5/7 grid: index and period, title, Problem/Decision/Result rows or a lede, counters, tags, links; the right side renders `SceneWidget` (the project's UI mock). Transition: the next panel scrolls up natively over one viewport and pins; meanwhile the covered one goes to `scale 0.94`, `y -10%` and a black overlay at 0.6 (transform and opacity only), with a shadow on the incoming top edge. Each panel then holds for `DWELL = 0.6` viewports.
- **Skip projects**: fixed bottom-right button, shown only inside the stack, jumps and moves focus to Experience.
- **Experience**: vertical timeline whose lime line grows with scroll; cards with intro, points and tags.
- **About & stack**: statement, facts list, stack groups as chips that spring in.
- **Contact**: giant sliding "Let's talk →", magnetic contact buttons, small footer.
- **Cursor**: a lime dot with `mix-blend-difference` on hover devices; grows over links and buttons.

## 6. Motion

- Lenis smooth scroll (`lerp 0.1`); in-page jumps go through `src/lib/scroll.ts`.
- Reveals: 0.8s, `cubic-bezier(0.22, 1, 0.36, 1)`, from 40px down with an 8px blur.
- `prefers-reduced-motion`: no Lenis, no stacking, no slide or recede, a still voxel scene that only turns when dragged; panels become ordinary full-height sections. Stacking also needs at least 1024px of width.

## 7. Do's and Don'ts

### Do:
- Take project palettes and fonts from the project's real code, and keep the mocks faithful to the real UI.
- Keep the lime accent for one job at a time per screen.
- Keep every project palette at WCAG AA contrast, same as the portfolio theme.

### Don't:
- Don't add per-project component code; extend `themes.ts` and `SceneWidget` instead.
- Don't mention IrisPay products, clients, numbers or incidents anywhere (NDA); technologies and conditions only.
