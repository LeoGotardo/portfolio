import type { Resources } from "@/lib/i18n";

// The copy is in src/locales/<language>/projects.json, keyed by the ids here; the data keeps what
// is the same in both languages (names, periods, numbers, links).
type Copy = Resources["projects"];

export type Featured = {
  n: string;
  id: keyof Copy["featured"];
  name: string;
  period: string;
  stats: { value: number; label: keyof Copy["stats"] }[];
  image?: string;
  video?: string;
  links: { label: keyof Copy["links"]; href: string }[];
};

export const featured: Featured[] = [
  {
    n: "01",
    id: "noharm",
    name: "noHarm",
    period: "Dec 2025 – Present",
    stats: [
      { value: 173, label: "backendCommits" },
      { value: 1170, label: "pytestCases" },
      { value: 226, label: "e2eRuns" },
    ],
    image: "/previews/noharm.webp",
    links: [
      { label: "live", href: "https://noharm.site/" },
      { label: "codeFront", href: "https://github.com/LeoGotardo/noHarm" },
      { label: "codeBack", href: "https://github.com/LeoGotardo/noHarmBack" },
    ],
  },
  {
    n: "02",
    id: "maindug",
    name: "MainDug Web",
    period: "Dec 2024 – Present",
    stats: [
      { value: 107, label: "allMine" },
      { value: 67, label: "pytestTests" },
    ],
    image: "/previews/maindug.webp",
    links: [
      { label: "live", href: "https://maindug.leogotardo.com.br/" },
      { label: "code", href: "https://github.com/LeoGotardo/MainDugWeb" },
    ],
  },
  {
    n: "03",
    id: "pitest",
    name: "PiTest",
    period: "Jun 2026 – Present",
    stats: [
      { value: 24, label: "allMine" },
      { value: 7, label: "checks" },
    ],
    links: [
      { label: "live", href: "https://pitest.leogotardo.com.br/" },
      { label: "code", href: "https://github.com/LeoGotardo/pitest" },
    ],
  },
];

export type Project = { id: keyof Copy["desc"]; name: string; tags: string[]; period: string; image?: string; live?: string; code?: string };

export const projects: Project[] = [
  { id: "reportgen", name: "ReportGen", tags: ["React", "JavaScript", "Vite"], period: "Feb 2026 – Present", image: "/previews/reportgen.webp", live: "https://reportgen.leogotardo.com.br/", code: "https://github.com/LeoGotardo/reportGen" },
  { id: "iptool", name: "ipTool", tags: ["React", "JavaScript", "Vite"], period: "Mar 2026 – Present", image: "/previews/iptool.webp", live: "https://iptool.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ipTool" },
  { id: "customThread", name: "Custom Thread", tags: ["Python", "Threading", "PyPI"], period: "Jun 2024 – Present", live: "https://pypi.org/project/CustomThread/", code: "https://github.com/LeoGotardo/CustomThread" },
  { id: "ddgame", name: "DDGame", tags: ["TypeScript", "Vite", "Vercel"], period: "Feb 2026 – Present", image: "/previews/ddgame.webp", live: "https://ddgame.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ddgame" },
  { id: "maze", name: "Maze Solver", tags: ["React", "JavaScript", "Tailwind"], period: "Jun 2025 – Present", image: "/previews/maze.webp", live: "https://maze.leogotardo.com.br/", code: "https://github.com/LeoGotardo/RedBlackTree" },
  { id: "geoknocker", name: "GeoKnocker", tags: ["Python", "Sockets", "Threading"], period: "Jun 2024 – Aug 2024", code: "https://github.com/LeoGotardo/GeoKnocker" },
  { id: "hashTable", name: "Hash Table", tags: ["C", "Data Structures"], period: "Nov 2025 – Dec 2025", code: "https://github.com/LeoGotardo/hashtable" },
  { id: "venetia", name: "Grimório de Venetia", tags: ["React", "TypeScript", "Capacitor"], period: "Jun 2026 – Present", image: "/previews/venetia.webp", live: "https://venetia.leogotardo.com.br/", code: "https://github.com/LeoGotardo/venetia-grimory" },
  { id: "phishing", name: "Phishing Detector", tags: ["Python", "Flask", "Security"], period: "May 2026 – Present", code: "https://github.com/LeoGotardo/phising" },
];

export const stack: { id: keyof Copy["stack"]; items: string[] }[] = [
  { id: "backend", items: ["Python", "FastAPI", "Flask", "SQLAlchemy", "PostgreSQL", "Redis", "Socket.IO", "REST & WebSocket"] },
  { id: "front", items: ["TypeScript", "React", "Next.js", "Vite", "Capacitor", "Tailwind CSS"] },
  { id: "infra", items: ["Docker", "Terraform", "AWS", "GitHub Actions", "Linux", "Raspberry Pi", "systemd"] },
];

// Drop the portrait at src/assets/photo.webp; until it exists the slot stays empty and nothing is requested.
const portrait = import.meta.glob<string>("../assets/photo.webp", { eager: true, import: "default" });
export const PORTRAIT: string | undefined = Object.values(portrait)[0];

projects.push(
  { id: "talentScout", name: "Talent Scout", tags: ["Flask", "scikit-learn", "ML"], period: "Oct 2025 – Present", code: "https://github.com/LeoGotardo/phisics" },
);
