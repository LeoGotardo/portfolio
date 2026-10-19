import type { CSSProperties } from "react";

// Each project "dresses" its own full-screen panel; the page chrome follows the active one.
// Projects that live on this machine use the tokens and fonts from their own source code.
export type SceneTheme = {
  background: string;
  foreground: string;
  card: string;
  secondary: string;
  muted: string;
  primary: string;
  primaryFg: string;
  border: string;
  /** Body font of the panel. */
  font: string;
  /** Heading font, when the project pairs a display face with its body font. */
  display?: string;
};

export const themes: Record<string, SceneTheme> = {
  noHarm: { background: "oklch(0.972 0.008 140)", foreground: "oklch(0.30 0.022 155)", card: "oklch(0.995 0.004 140)", secondary: "oklch(0.955 0.012 140)", muted: "oklch(0.47 0.022 155)", primary: "oklch(0.585 0.075 156)", primaryFg: "oklch(0.995 0.004 140)", border: "oklch(0.91 0.01 150)", font: '"Figtree", system-ui, sans-serif' },
  "MainDug Web": { background: "#1b1918", foreground: "#f1f3f5", card: "#282525", secondary: "#212529", muted: "#adb5bd", primary: "#ff8c42", primaryFg: "#1b1918", border: "rgb(255 255 255 / 12%)", font: '"Inter", system-ui, sans-serif' },
  PiTest: { background: "#09090b", foreground: "#fafafa", card: "#111113", secondary: "#18181b", muted: "#a1a1aa", primary: "#60a5fa", primaryFg: "#09090b", border: "#27272a", font: '"Inter", system-ui, sans-serif' },
  ReportGen: { background: "#0c0e18", foreground: "#dde1f5", card: "#1e2138", secondary: "#181a2e", muted: "#8890bc", primary: "#6271f5", primaryFg: "#f4f5ff", border: "rgb(255 255 255 / 11%)", font: '"Plus Jakarta Sans", sans-serif', display: '"Syne", sans-serif' },
  ipTool: { background: "#04080f", foreground: "#c8f0e0", card: "#080d17", secondary: "#08121f", muted: "#8cbfaa", primary: "#00d296", primaryFg: "#04080f", border: "rgb(0 210 150 / 18%)", font: '"Share Tech Mono", monospace', display: '"Orbitron", monospace' },
  DDGame: { background: "#1a0f0f", foreground: "#f8f1e0", card: "#2d1810", secondary: "#2a2016", muted: "#d4af37", primary: "#ffd700", primaryFg: "#1a0f0f", border: "#5a4a2a", font: '"Trebuchet MS", "Segoe UI", sans-serif' },
  "Maze Solver": { background: "#10131a", foreground: "#e1e2ec", card: "#191b23", secondary: "#0b0e15", muted: "#c2c6d6", primary: "#4edea3", primaryFg: "#003824", border: "#32353c", font: '"Inter", system-ui, sans-serif' },
  "Grimório de Venetia": { background: "#131110", foreground: "#F5F0E8", card: "#1A1714", secondary: "#2D2520", muted: "#A8A09B", primary: "#D4A017", primaryFg: "#131110", border: "rgb(184 134 11 / 30%)", font: '"Manrope", system-ui, sans-serif', display: '"Cinzel", serif' },
  "Custom Thread": { background: "oklch(0.22 0.03 250)", foreground: "oklch(0.93 0.02 90)", card: "oklch(0.18 0.03 250)", secondary: "oklch(0.28 0.04 250)", muted: "oklch(0.68 0.03 250)", primary: "oklch(0.85 0.15 90)", primaryFg: "oklch(0.2 0.03 250)", border: "oklch(1 0 0 / 12%)", font: '"JetBrains Mono", monospace' },
  "Hash Table": { background: "oklch(0.15 0.01 260)", foreground: "oklch(0.9 0.01 260)", card: "oklch(0.2 0.01 260)", secondary: "oklch(0.26 0.01 260)", muted: "oklch(0.6 0.01 260)", primary: "oklch(0.7 0.15 250)", primaryFg: "oklch(0.15 0.01 260)", border: "oklch(1 0 0 / 12%)", font: '"JetBrains Mono", monospace' },
  GeoKnocker: { background: "oklch(0.14 0.03 160)", foreground: "oklch(0.9 0.05 160)", card: "oklch(0.18 0.04 160)", secondary: "oklch(0.24 0.05 160)", muted: "oklch(0.62 0.06 160)", primary: "oklch(0.78 0.17 60)", primaryFg: "oklch(0.14 0.03 160)", border: "oklch(0.78 0.17 60 / 25%)", font: '"Space Mono", monospace' },
  "Phishing Detector": { background: "#0D1117", foreground: "#E6EDF3", card: "#161B22", secondary: "#21262D", muted: "#8B949E", primary: "#79C0FF", primaryFg: "#0D1117", border: "#30363D", font: '"Inter", system-ui, sans-serif' },
  "Talent Scout": { background: "oklch(0.97 0.005 250)", foreground: "oklch(0.22 0.03 250)", card: "oklch(1 0 0)", secondary: "oklch(0.92 0.02 250)", muted: "oklch(0.48 0.03 250)", primary: "oklch(0.55 0.2 145)", primaryFg: "oklch(0.99 0 0)", border: "oklch(0.22 0.03 250 / 14%)", font: '"Sora", sans-serif' },
};

type ColorKey = Exclude<keyof SceneTheme, "font" | "display">;

const VARS: [ColorKey, string[]][] = [
  ["background", ["--background"]],
  ["foreground", ["--foreground", "--card-foreground", "--secondary-foreground", "--popover-foreground"]],
  ["card", ["--card", "--popover"]],
  ["secondary", ["--secondary", "--muted"]],
  ["muted", ["--muted-foreground"]],
  ["primary", ["--primary", "--accent", "--ring"]],
  ["primaryFg", ["--primary-foreground", "--accent-foreground"]],
  ["border", ["--border", "--input"]],
];

/** Scopes a project's theme to its own panel: colors as CSS variables, font inherited by the panel. */
export function sceneStyle(t: SceneTheme | undefined): CSSProperties | undefined {
  if (!t) return undefined;
  const style: Record<string, string> = { fontFamily: t.font };
  for (const [k, names] of VARS) for (const n of names) style[n] = t[k];
  return style as CSSProperties;
}

/**
 * Tints the page chrome ([data-chrome]: nav, progress bar, cursor, skip button) to the active
 * project. Colors only: the page font never swaps, and styles.css registers these properties so
 * they cross-fade. Scoped to those elements so a theme change restyles them, not the whole page.
 */
export function applyTheme(t: SceneTheme | null) {
  for (const el of document.querySelectorAll<HTMLElement>("[data-chrome]")) {
    for (const [k, names] of VARS) {
      for (const n of names) {
        if (t) el.style.setProperty(n, t[k]);
        else el.style.removeProperty(n);
      }
    }
  }
}
