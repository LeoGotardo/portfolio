# Design brief — portfolio v2 (confirmed 2026-10-19)

Source of truth for the redesign. Context: `PRODUCT.md` (register: brand).

## 1. Summary
Full redesign of leogotardo.com.br for recruiters, tech leads and TLG-Web-Dev clients. Replace the neon/sci-fi look with an own identity: oversized type, one committed color, rauno.me/Linear-level detail. Goal: start a conversation.

## 2. Primary action
"Get in touch" / "Fale comigo". Resume PDF is secondary.

## 3. Direction
- **Color strategy: Committed.** One saturated color on 30–60% of the surface (hero portrait panel, contact section, project accents). **Ultramarine** ≈ `oklch(0.45 0.26 268)` on paper neutrals tinted toward the hue. No cyan/orange.
- **Scene:** a recruiter opens the LinkedIn link on a laptop in a bright office mid-afternoon, skimming 20 profiles, deciding in 10 s → **light theme default**; dark theme kept as an option at the same contrast bar.
- **Anchors:** rauno.me (precision, crafted micro-interactions), linear.app (rhythm, hierarchy). Committed color + wide heavy type keep it from being a minimal clone.
- **Type:** single family **Mona Sans** (variable width/weight): wide heavy display for the name, regular body. **Martian Mono** only for real data (commits, test counts, dates). Rejected by reflex: Inter, Space Grotesk, Geist.

## 4. Scope
Production-ready, whole site, shipped-quality components, delivered in one pass. Keep: theme toggle, EN/PT, a visual preview per project. Drop as sections: Interests, Certificates (folded into About).

## 5. Layout
1. **Hero** (asymmetric, left-aligned): huge name; role line "Backend Python & full-stack React/TypeScript"; one value sentence; solid primary CTA + secondary resume; right side: real photo in an ultramarine panel (duotone); status line "Open to work · Londrina, BR" + live local time.
2. **Selected work**: 3 featured projects (noHarm, PiTest, MainDug) as wide rows, large preview, problem → decision → result with real numbers.
3. **More projects**: remaining 9 as a compact index list (name, one line, stack, links), preview on hover.
4. **Experience**: lean list; TLG with a client angle.
5. **Stack**: ~20 core technologies in 3 text lines (Backend / Front & Mobile / Infra & Embedded). No pill wall.
6. **About**: short paragraph + education and certificates.
7. **Contact**: full-bleed ultramarine block, giant "Let's talk", copy-email button, LinkedIn, GitHub, resume, TLG line ("need a site?").

## 6. States
Light/dark; EN/PT; project preview loading/loaded/static fallback (local screenshots, no microlink); copy email → "Copied ✓"; mobile menu open/closed; visible focus everywhere; `prefers-reduced-motion` → fully static.

## 7. Interaction
One orchestrated page-load (name assembles, photo reveals) with ease-out-expo, no bounce. Subtle scroll reveals (Motion). Project index: preview follows the cursor. Theme switch via View Transitions API. Nav marks the current section. Removed: particles, mouse glow, pulse border, corner brackets, side stripes, gradient text.

## 8. Content
New hero copy EN/PT; CTA labels; featured projects rewritten as problem → decision → result; descriptive alt text; plain section titles (no `< />`); no em dashes; phone with +55; project labels translated in PT; IrisPay stays technology-level (NDA).

## 9. References
impeccable: typography, spatial-design, color-and-contrast, motion-design, interaction-design, responsive-design, ux-writing. Skills: gsap-framer-scroll-animation, motion-design. New deps: `motion`, `gsap`, `@gsap/react`.

## 10. Open
- Photo: provided by the candidate (≥1200px, neutral background).
- Screenshots: captured from live sites into `public/`; projects without a live URL get another visual (code excerpt or diagram).
- After build: `/impeccable document` → `DESIGN.md`.
