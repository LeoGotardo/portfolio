export type Featured = {
  n: string;
  name: string;
  period: string;
  problem: string;
  decision: string;
  result: string;
  stats: { value: number; label: string }[];
  image?: string;
  video?: string;
  links: { label: string; href: string }[];
};

export const featured: Featured[] = [
  {
    n: "01",
    name: "noHarm",
    period: "Dec 2025 – Present",
    problem: "A recovery-support app stores deeply private data and runs a public API that has to withstand abuse.",
    decision: "FastAPI on Clean Architecture, AES-256 field-level encryption, JWT rotation with a token blacklist, Socket.IO chat and three-layer rate limiting on Redis with atomic Lua scripts.",
    result: "Live at noharm.site, with the backend on AWS (ECS, RDS) provisioned by Terraform and Android/iOS builds via Capacitor.",
    stats: [
      { value: 173, label: "of 184 backend commits" },
      { value: 1170, label: "pytest cases" },
      { value: 226, label: "Playwright E2E runs" },
    ],
    image: "/previews/noharm.webp",
    links: [
      { label: "Live site", href: "https://noharm.site/" },
      { label: "Code (Front)", href: "https://github.com/LeoGotardo/noHarm" },
      { label: "Code (Back)", href: "https://github.com/LeoGotardo/noHarmBack" },
    ],
  },
  {
    n: "02",
    name: "MainDug Web",
    period: "Dec 2024 – Present",
    problem: "Most password managers lock you into someone else's vault.",
    decision: "A self-hostable Flask + PostgreSQL webservice plus a browser extension that captures logins and offers autocomplete, with Argon2 hashing and reused/leaked password detection.",
    result: "My IFPR final-year project, documented in LaTeX with a threat model and covered by pytest and GitHub Actions CI.",
    stats: [
      { value: 107, label: "commits, all mine" },
      { value: 67, label: "pytest tests" },
    ],
    image: "/previews/maindug.webp",
    links: [
      { label: "Live site", href: "https://maindug.leogotardo.com.br/" },
      { label: "Code", href: "https://github.com/LeoGotardo/MainDugWeb" },
    ],
  },
  {
    n: "03",
    name: "PiTest",
    period: "Jun 2026 – Present",
    problem: "Bench operators need to validate Raspberry Pi boards before delivery or after a repair, without a keyboard or SSH.",
    decision: "A systemd service that runs on every boot: 7 checks (LAN, Wi-Fi, boot, USB, GPIO, Bluetooth, hotspot) while the screen shows progress and test patterns.",
    result: "Results go to a Flask + PostgreSQL dashboard that keeps each board's history by MAC address; the operator confirms screen and LEDs on the site.",
    stats: [
      { value: 24, label: "commits, all mine" },
      { value: 7, label: "automatic checks" },
    ],
    links: [
      { label: "Live site", href: "https://pitest.leogotardo.com.br/" },
      { label: "Code", href: "https://github.com/LeoGotardo/pitest" },
    ],
  },
];

export type Project = { name: string; desc: string; tags: string[]; period: string; image?: string; live?: string; code?: string };

export const projects: Project[] = [
  { name: "ReportGen", desc: "Technical report builder: React front, Express + Puppeteer rendering PDFs on the server. Exports to PDF, DOCX and JSON.", tags: ["React", "JavaScript", "Vite"], period: "Feb 2026 – Present", image: "/previews/reportgen.webp", live: "https://reportgen.leogotardo.com.br/", code: "https://github.com/LeoGotardo/reportGen" },
  { name: "ipTool", desc: "Geographic IP lookup with interactive map, IPv4/IPv6 validation and detailed network data.", tags: ["React", "JavaScript", "Vite"], period: "Mar 2026 – Present", image: "/previews/iptool.webp", live: "https://iptool.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ipTool" },
  { name: "Custom Thread", desc: "Extends threading.Thread with return values, exception propagation and callbacks. Zero dependencies, on PyPI.", tags: ["Python", "Threading", "PyPI"], period: "Jun 2024 – Present", live: "https://pypi.org/project/CustomThread/", code: "https://github.com/LeoGotardo/CustomThread" },
  { name: "DDGame", desc: "D&D-themed clicker in React and TypeScript: roll the dice for XP and spend it in the upgrade shop. Deployed on Vercel.", tags: ["TypeScript", "Vite", "Vercel"], period: "Feb 2026 – Present", image: "/previews/ddgame.webp", live: "https://ddgame.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ddgame" },
  { name: "Maze Solver", desc: "Maze generator and pathfinding visualizer rewritten in React 19. Compare DFS and BFS on the same maze.", tags: ["React", "JavaScript", "Tailwind"], period: "Jun 2025 – Present", image: "/previews/maze.webp", live: "https://maze.leogotardo.com.br/", code: "https://github.com/LeoGotardo/RedBlackTree" },
  { name: "GeoKnocker", desc: "Desktop tool for port scanning and IP geolocation with concurrent scanning via threading.", tags: ["Python", "Sockets", "Threading"], period: "Jun 2024 – Aug 2024", code: "https://github.com/LeoGotardo/GeoKnocker" },
  { name: "Hash Table", desc: "Hash table in C with chaining and automatic rehashing at 75% load factor.", tags: ["C", "Data Structures"], period: "Nov 2025 – Dec 2025", code: "https://github.com/LeoGotardo/hashtable" },
  { name: "Grimório de Venetia", desc: "D&D 5.5 character creator with a 13-step wizard, 333 Vitest tests and 108 Playwright runs. Android via Capacitor.", tags: ["React", "TypeScript", "Capacitor"], period: "Jun 2026 – Present", image: "/previews/venetia.webp", live: "https://venetia.leogotardo.com.br/", code: "https://github.com/LeoGotardo/venetia-grimory" },
  { name: "Phishing Detector", desc: "Typosquatting heuristics plus Google Safe Browsing, VirusTotal and URLhaus verdicts.", tags: ["Python", "Flask", "Security"], period: "May 2026 – Present", code: "https://github.com/LeoGotardo/phising" },
];

export const stack = {
  Backend: ["Python", "FastAPI", "Flask", "SQLAlchemy", "PostgreSQL", "Redis", "Socket.IO", "REST & WebSocket"],
  "Front & mobile": ["TypeScript", "React", "Next.js", "Vite", "Capacitor", "Tailwind CSS"],
  "Infra & embedded": ["Docker", "Terraform", "AWS", "GitHub Actions", "Linux", "Raspberry Pi", "systemd"],
};

// Drop the portrait at src/assets/photo.webp; until it exists the slot stays empty and nothing is requested.
const portrait = import.meta.glob<string>("../assets/photo.webp", { eager: true, import: "default" });
export const PORTRAIT: string | undefined = Object.values(portrait)[0];
export const RESUME = "/Leonardo_Gotardo_CV_EN.pdf";

projects.push(
  { name: "Talent Scout", desc: "Classifies athletes into tiers with a K-Nearest Neighbors model: PCA, correlation matrix, radar charts.", tags: ["Flask", "scikit-learn", "ML"], period: "Oct 2025 – Present", code: "https://github.com/LeoGotardo/phisics" },
);
