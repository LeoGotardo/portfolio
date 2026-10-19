---
name: Leonardo Gotardo · Portfolio
description: One committed ultramarine on tinted paper, oversized wide type, and work laid out to be inspected.
colors:
  bench-ultramarine: "oklch(0.45 0.22 266)"
  ultramarine-deep: "oklch(0.39 0.21 266)"
  on-ultramarine: "oklch(0.98 0.008 266)"
  on-ultramarine-soft: "oklch(0.88 0.045 266)"
  paper: "oklch(0.975 0.007 266)"
  paper-shade: "oklch(0.94 0.012 266)"
  ink: "oklch(0.21 0.035 266)"
  ink-soft: "oklch(0.40 0.03 266)"
  ink-muted: "oklch(0.50 0.025 266)"
  hairline: "oklch(0.87 0.015 266)"
  night-paper: "oklch(0.17 0.018 266)"
  night-paper-shade: "oklch(0.21 0.022 266)"
  night-ink: "oklch(0.95 0.008 266)"
  night-ink-soft: "oklch(0.80 0.015 266)"
  night-ink-muted: "oklch(0.68 0.02 266)"
  night-hairline: "oklch(0.30 0.025 266)"
  night-link: "oklch(0.74 0.13 266)"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 9.4vw, 9.25rem)"
    fontWeight: 820
    lineHeight: 0.86
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  display-xl:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 12.5vw, 12rem)"
    fontWeight: 830
    lineHeight: 0.85
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3.6vw, 4.5rem)"
    fontWeight: 780
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  headline-sm:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 3rem)"
    fontWeight: 780
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.75rem)"
    fontWeight: 790
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 115"
  statement:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 0.9rem + 2.6vw, 3.25rem)"
    fontWeight: 720
    lineHeight: 1.15
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 112"
  subtitle:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.3rem, 1.05rem + 1vw, 1.875rem)"
    fontWeight: 660
    lineHeight: 1.2
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 106"
  lead-lg:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.5
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  small:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Martian Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
rounded:
  xs: "2px"
  sm: "0.25rem"
  md: "0.5rem"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.5rem)"
  column-gap: "clamp(1rem, 2vw, 2rem)"
  section: "clamp(4.5rem, 10vw, 8.5rem)"
  header: "4.25rem"
  max-width: "86rem"
components:
  button-primary:
    backgroundColor: "{colors.bench-ultramarine}"
    textColor: "{colors.on-ultramarine}"
    rounded: "{rounded.md}"
    padding: "0 1.3rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.ultramarine-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 1.3rem"
    height: "3rem"
  button-on-ultramarine:
    backgroundColor: "{colors.on-ultramarine}"
    textColor: "{colors.bench-ultramarine}"
    rounded: "{rounded.md}"
    padding: "0 1.3rem"
    height: "3rem"
  button-on-ultramarine-hover:
    backgroundColor: "{colors.on-ultramarine-soft}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "2.5rem"
  feature-frame:
    backgroundColor: "{colors.bench-ultramarine}"
    rounded: "{rounded.md}"
    padding: "clamp(0.875rem, 2.6vw, 2.25rem)"
  index-row-hover:
    backgroundColor: "{colors.paper-shade}"
    rounded: "{rounded.sm}"
    padding: "1.35rem 0.75rem"
  ultramarine-band:
    backgroundColor: "{colors.bench-ultramarine}"
    textColor: "{colors.on-ultramarine}"
    padding: "clamp(4.5rem, 10vw, 8.5rem) 0"
---

# Design System: Leonardo Gotardo · Portfolio

## 1. Overview

**Creative North Star: "The Ultramarine Bench"**

The site is a workbench seen from above: a pale paper surface, one saturated tool color, and the work laid out to be inspected. Bench Ultramarine is not an accent sprinkled on top; it is the material of the large surfaces (the portrait panel, the Stack band, the contact block and the frames that hold each project). Everything else is paper and ink, tinted toward the same blue so nothing reads as default gray.

Personality comes from structure and type, not effects. Mona Sans at its widest and heaviest carries the name and the section titles, set huge and tight, against calm regular body text. Density is low at the top (one idea per fold in the hero, one primary action) and rises in the project index, where a tech lead scans facts. Motion is a single orchestrated entrance plus quiet reveals, and it disappears entirely for reduced-motion users. Light is the default theme because the reader is a recruiter in a bright office mid-afternoon; the night theme keeps the same contrast floor.

The system explicitly rejects the **generic portfolio template** (hero + about + skill pills + identical project cards, the layout every dev clones), the **AI-generated look** (default dark-navy + cyan/orange gradients, glow on everything, card grids, filler copy) and **gamer / neon overload** (particle backgrounds, mouse glows, heavy text-shadows and effects competing for attention).

**Key Characteristics:**
- One committed color, Bench Ultramarine, covering 30–60% of a full scroll as whole surfaces.
- Paper and ink neutrals tinted to hue 266; no pure black or white anywhere.
- Single family (Mona Sans) with wide/heavy display cuts; Martian Mono only on real data.
- Asymmetric 12-column grid, left-aligned, generous section rhythm.
- Flat surfaces; the only shadow belongs to project previews.
- One entrance choreography, ease-out-expo, zero bounce; static under `prefers-reduced-motion`.

## 2. Colors: The Bench Palette

One saturated ultramarine against paper and ink that all lean toward the same blue.

### Primary
- **Bench Ultramarine** (`oklch(0.45 0.22 266)`): the material of big surfaces: hero portrait panel, Stack band, contact block, project frames, primary buttons, link text in the light theme, focus rings. White-ish text on it reaches 7.5:1.
- **Ultramarine Deep** (`oklch(0.39 0.21 266)`): pressed and hovered state of primary buttons only.

### Neutral
- **Paper** (`oklch(0.975 0.007 266)`): page background in the light theme.
- **Paper Shade** (`oklch(0.94 0.012 266)`): hover tint for project index rows and icon buttons.
- **Ink** (`oklch(0.21 0.035 266)`): headings and primary text (16.5:1 on Paper).
- **Ink Soft** (`oklch(0.40 0.03 266)`): body copy under headings, descriptions, secondary paragraphs (8.6:1).
- **Ink Muted** (`oklch(0.50 0.025 266)`): dates, meta lines, labels in definition lists (5.6:1 on Paper, 5.0:1 on Paper Shade).
- **Hairline** (`oklch(0.87 0.015 266)`): 1px rules between sections, index rows and jobs; borders of ghost and icon buttons.
- **On-Ultramarine** (`oklch(0.98 0.008 266)`): all text and icons sitting on Bench Ultramarine; also the fill of the on-blue button.
- **On-Ultramarine Soft** (`oklch(0.88 0.045 266)`): secondary text on blue (Stack labels, the TLG line), 5.6:1. Hairlines on blue use On-Ultramarine at 24% alpha.

### Night (dark theme)
- **Night Paper** (`oklch(0.17 0.018 266)`), **Night Paper Shade** (`oklch(0.21 0.022 266)`), **Night Ink** (`oklch(0.95 0.008 266)`), **Night Ink Soft** (`oklch(0.80 0.015 266)`), **Night Ink Muted** (`oklch(0.68 0.02 266)`), **Night Hairline** (`oklch(0.30 0.025 266)`).
- **Night Link** (`oklch(0.74 0.13 266)`): link text and focus ring in the dark theme (8.2:1); Bench Ultramarine stays the surface color, slightly desaturated to chroma 0.2.

### Named Rules
**The Material Rule.** Bench Ultramarine is applied as whole surfaces (panels, bands, frames, the contact block), never as thin accents, glows, outlines or gradients. Across a full scroll it should cover 30–60% of the page.

**The Tinted Paper Rule.** No `#000` and no `#fff` anywhere. Every neutral carries hue 266 at chroma 0.007–0.035; a gray with zero chroma is a bug.

**The 4.5 Floor Rule.** Every text pair passes 4.5:1 in both themes, including muted text on Paper Shade and soft text on Ultramarine. If a new pair can't hit 4.5:1, change the pair, not the rule.

## 3. Typography

**Display Font:** Mona Sans, wide and heavy cuts (with ui-sans-serif, system-ui)
**Body Font:** Mona Sans, regular width (with ui-sans-serif, system-ui)
**Label/Mono Font:** Martian Mono (with ui-monospace, SF Mono, Menlo)

**Character:** one variable family stretched from poster to paragraph. The width axis does the shouting (125 for the name, 115–118 for titles) so the palette never has to; Martian Mono is the measuring tape, used only where a number is a fact.

### Hierarchy
- **Display** (820, `clamp(3rem, 9.4vw, 9.25rem)`, line-height 0.86, width 125): the name in the hero; on screens ≤ 860px the step widens to `clamp(3rem, 15.5vw, 7rem)` so the two lines still fill the width.
- **Display XL** (830, `clamp(3.25rem, 12.5vw, 12rem)`, 0.85, width 125): "Let's talk" in the contact block and the portrait monogram. Nothing else.
- **Headline** (780, `clamp(2.25rem, 1.4rem + 3.6vw, 4.5rem)`, 0.95, width 118): section titles (Selected work, Experience, Stack, About) and the mobile menu links. **Headline SM** (`clamp(1.75rem, 1.2rem + 2.2vw, 3rem)`) is the secondary section title (More projects).
- **Title** (790, `clamp(2.25rem, 1.5rem + 2.6vw, 3.75rem)`, 0.95, width 115): featured project names.
- **Statement** (720, `clamp(1.5rem, 0.9rem + 2.6vw, 3.25rem)`, 1.15, width 112): the Stack items and the contact email. Big text that is content, not a heading.
- **Subtitle** (660, `clamp(1.3rem, 1.05rem + 1vw, 1.875rem)`, 1.2, width 106–110): the hero role line (max 26ch), job roles, index project names and Covers.
- **Lead / Lead LG** (400, `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` / `clamp(1.125rem, 1rem + 0.6vw, 1.5rem)`): the hero value sentence; the About paragraphs, contact intro and diagram nodes.
- **Body** (400, 1.0625rem, 1.6, width 100): paragraphs, descriptions and buttons, capped at 50–66ch (hero value 50ch, story 52ch, jobs 62–66ch, about 60ch). Dark theme adds +0.06 line-height.
- **Small** (400, 0.9375rem): nav links, compact buttons, index descriptions and stack, tags, definition-list labels, footer.
- **Label** (Martian Mono 400–500, 0.8125rem, 0.875rem on screens ≤ 860px, tabular numerals): dates, periods, commit ratios, test counts, local time, index numbers.

**The Twelve Steps Rule.** Every font-size in the codebase is one of the twelve `--text-*` tokens above. A literal size in CSS is drift: add or reuse a step instead of inventing one.
### Named Rules
**The Wide-for-Voice Rule.** Width 106–125 and weight ≥ 660 belong to names, titles and the role line. Body text stays at width 100, weight 400. Never set a paragraph wide.

**The Real-Numbers Mono Rule.** Martian Mono appears only on real data: dates, commits, tests, time. It is prohibited on decorative labels, tracked uppercase eyebrows or "console" costume.

## 4. Elevation

The system is flat. Depth comes from Bench Ultramarine surfaces and 1px hairlines, not from stacking cards. There is exactly one lifted object: a project preview, which rests on its ultramarine frame like a sheet of paper on the bench, and the same object again when it floats under the cursor in the project index.

### Shadow Vocabulary
- **Bench Lift** (`box-shadow: 0 28px 56px -32px oklch(0.15 0.12 266 / 0.75)`): screenshots inside a feature frame. On hover the image rises 6px (transform only).
- **Floating Preview** (`box-shadow: 0 32px 64px -32px oklch(0.2 0.12 266 / 0.6)`): the cursor-following preview card in the project index.

### Named Rules
**The One Lift Rule.** Only project previews cast a shadow. Buttons, rows, panels, bands and the header are flat at rest and flat on hover; their state is shown by color (Ultramarine Deep, Paper Shade) or a 2px underline. If a second kind of object needs a shadow, it is a card, and cards are not part of this system.

## 5. Components

Precise and direct: gently squared corners, no ornament, an immediate response to touch.

### Buttons
- **Shape:** gently squared (8px, `{rounded.md}`), 3rem tall (2.5rem for the compact header variant), 1.3rem side padding, Mona Sans 620 at width 104.
- **Primary:** Bench Ultramarine fill, On-Ultramarine text. One per viewport: "Get in touch" in the hero, mirrored as the compact header CTA.
- **Hover / Focus:** fill shifts to Ultramarine Deep in 0.2s; `:active` presses 1px down (`translateY(1px)`, ease-out-expo). Focus is a 2px outline in the link color, 3px offset.
- **Ghost:** transparent with a Hairline border and Ink text; hover darkens the border to Ink Muted. Used for the resume download next to the primary.
- **On-Ultramarine:** On-Ultramarine fill with Bench Ultramarine text, for actions inside blue blocks (Copy email); hover fills with On-Ultramarine Soft. Copy shows a check and "Copied" for 2.2s and announces it via a polite live region; if the clipboard is blocked it says so in On-Ultramarine Soft and opens the mail app.

### Inline Lists
- **Style:** tags, index stack and Stack items render as real lists whose items never break internally; the separator (` · `, or ` / ` on the Stack band at 50% opacity) is a CSS `::after` with empty alt text, so a wrapped line never starts with a separator and screen readers skip it.

### Text Links
- **Style:** link color, weight 620, 1px underline at 35% of the text color, 0.22em offset; external links carry a 15px up-right arrow. Hover brings the underline to full color. On blue, links use On-Ultramarine with a 24% underline.

### Icon Buttons
- **Style:** 2.5rem square, 8px radius, Hairline border, transparent fill; hover fills Paper Shade. Holds the theme toggle (sun/moon, 1.75 stroke) and the language toggle (EN/PT in Martian Mono).

### Navigation
- **Style:** sticky header, 4.25rem tall, solid Paper background (no blur, no glass); a Hairline appears under it once the page scrolls. Wordmark "Leonardo Gotardo" in Mona Sans 760 at width 115.
- **Links:** Ink Soft, 0.9375rem, 540; hover goes to Ink. The current section gets Ink text and a 2px Bench Ultramarine underline that scales in from the left (0.45s ease-out-expo).
- **Header CTA:** the compact "Get in touch" stays hidden (and out of the tab order) while the hero's own CTA is on screen, then fades in; one primary action per viewport. Sections without a nav entry (hero, Stack band) clear the active underline.
- **Mobile (≤ 860px):** links collapse behind a menu icon into a full-screen Paper sheet with display-sized links (width 115) that ends with a primary "Get in touch" button. While open, the page behind is `inert`, scroll is locked, Esc closes it and focus returns to the menu button. On coarse pointers icon buttons and compact buttons grow to 44px.

### Feature (Selected Work)
- **Layout:** a 12-column row alternating sides: media 7 columns, story 5 (or 4 when mirrored). Stacks under 860px.
- **Frame:** Bench Ultramarine panel with fluid padding (`{components.feature-frame.padding}`) holding a 16:10 screenshot with Bench Lift. When no honest screenshot exists, the frame draws the thing itself (the PiTest boot diagram: start node, seven unchecked check boxes, end node, hairline arrows).
- **Story:** index number in Martian Mono (link color), Title-level name, period, then a definition list: Problem, Decision, Result (labels in Ink Muted 640, values in Ink Soft). Metrics follow as a Martian Mono list; links close the block.

### Project Index
- **Row:** number, name and two-line description, top three stack items, period (mono, no wrap), links; fixed column widths so every row aligns. Hairline between rows; hover or focus-within tints the row Paper Shade (4px radius).
- **Preview:** on fine pointers, a 16:10 card follows the cursor on a spring (stiffness 420, damping 40) and cross-fades between projects (0.35s). On touch or under 860px it becomes an inline thumbnail. Projects without a screenshot get a **Cover**: an Ultramarine tile with the name set in Mona Sans 800 at width 125.

### Ultramarine Band (Stack) and Contact
- **Band:** full-bleed Bench Ultramarine with On-Ultramarine text; hairlines and focus rings switch to their on-blue versions. Stack lines pair a soft label (3 columns) with items set large (up to 3.25rem, width 112) separated by thin slashes at 50% opacity.
- **Contact:** the closing block, full-bleed Ultramarine, Display-sized title, the email as a 3rem underlined link plus the Copy button, then plain text links. It is the emotional end of the page; nothing after it but a one-line footer on Paper.

### Portrait Panel
- **Style:** 4:5 Ultramarine panel, 8px radius, spanning the hero's right four columns. The photo is greyscaled and screened onto the blue (`mix-blend-mode: screen`) for a two-tone ultramarine portrait. Until the photo exists, the panel shows the "LG" monogram in display type.
- **Entrance:** revealed by a bottom-up `clip-path` inset over 1.4s while the name's letters rise (GSAP SplitText, `yPercent: 115`, stagger 0.024s, `expo.out`), split only after the font has loaded.

## 6. Do's and Don'ts

### Do:
- **Do** spend Bench Ultramarine (`oklch(0.45 0.22 266)`) on whole surfaces: panels, bands, frames, the contact block. 30–60% of a full scroll.
- **Do** keep one primary action per viewport; in the hero that is "Get in touch", with the resume as a ghost button beside it.
- **Do** set names and section titles in Mona Sans at width 115–125, weight 760–830, tight negative tracking; keep body at width 100 and 50–66ch.
- **Do** use Martian Mono only for real numbers and dates, with tabular numerals.
- **Do** ease everything with ease-out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`), animate only transform, opacity and clip-path, and render the final state immediately under `prefers-reduced-motion`.
- **Do** verify every new text pair at 4.5:1 in both themes before shipping.
- **Do** show real work: local screenshots in `public/previews/`, or draw the system honestly (a diagram) when the live app is behind a login.

### Don't:
- **Don't** rebuild the **generic portfolio template**: hero + about + skill pills + identical project cards, the layout every dev clones.
- **Don't** drift into the **AI-generated look**: default dark-navy + cyan/orange gradients, glow on everything, card grids, filler copy.
- **Don't** add **gamer / neon overload**: particle backgrounds, mouse glows, heavy text-shadows and effects competing for attention.
- **Don't** use `background-clip: text` gradients, `border-left`/`border-right` stripes wider than 1px, glassmorphism or `backdrop-filter` blur on the header.
- **Don't** list skills as a pill wall; the Stack band holds about 20 items in three lines and the rest lives in `llms.txt`.
- **Don't** use `#000`, `#fff` or zero-chroma grays, and don't reintroduce a second accent color.
- **Don't** animate `width`, `height` or other layout properties (the old scroll-progress bar did), and don't use bounce or elastic easing.
- **Don't** reach for Inter, Space Grotesk, Geist or IBM Plex by reflex, and don't use tracked uppercase mono eyebrows.
- **Don't** write em dashes in copy; use commas, colons, semicolons, periods or parentheses.
