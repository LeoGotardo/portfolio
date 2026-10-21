import type { Text } from "@/lib/i18n";

export type Featured = {
  n: string;
  name: string;
  period: string;
  problem: Text;
  decision: Text;
  result: Text;
  stats: { value: number; label: Text }[];
  image?: string;
  video?: string;
  links: { label: Text; href: string }[];
};

const LIVE: Text = { en: "Live site", pt: "Site no ar" };
const CODE: Text = { en: "Code", pt: "Código" };
const ALL_MINE: Text = { en: "commits, all mine", pt: "commits, todos meus" };

export const featured: Featured[] = [
  {
    n: "01",
    name: "noHarm",
    period: "Dec 2025 – Present",
    problem: {
      en: "A recovery-support app stores deeply private data and runs a public API that has to withstand abuse.",
      pt: "Um app de apoio à recuperação guarda dados extremamente privados e mantém uma API pública que precisa resistir a abusos.",
    },
    decision: {
      en: "FastAPI on Clean Architecture, AES-256 field-level encryption, JWT rotation with a token blacklist, Socket.IO chat and three-layer rate limiting on Redis with atomic Lua scripts.",
      pt: "FastAPI com Clean Architecture, criptografia AES-256 por campo, rotação de JWT com blacklist de tokens, chat via Socket.IO e rate limiting em três camadas no Redis com scripts Lua atômicos.",
    },
    result: {
      en: "Live at noharm.site, with the backend on AWS (ECS, RDS) provisioned by Terraform and Android/iOS builds via Capacitor.",
      pt: "No ar em noharm.site, com o backend na AWS (ECS, RDS) provisionado por Terraform e builds Android/iOS via Capacitor.",
    },
    stats: [
      { value: 173, label: { en: "of 184 backend commits", pt: "de 184 commits do backend" } },
      { value: 1170, label: { en: "pytest cases", pt: "casos de teste pytest" } },
      { value: 226, label: { en: "Playwright E2E runs", pt: "execuções E2E no Playwright" } },
    ],
    image: "/previews/noharm.webp",
    links: [
      { label: LIVE, href: "https://noharm.site/" },
      { label: { en: "Code (Front)", pt: "Código (front)" }, href: "https://github.com/LeoGotardo/noHarm" },
      { label: { en: "Code (Back)", pt: "Código (back)" }, href: "https://github.com/LeoGotardo/noHarmBack" },
    ],
  },
  {
    n: "02",
    name: "MainDug Web",
    period: "Dec 2024 – Present",
    problem: {
      en: "Most password managers lock you into someone else's vault.",
      pt: "A maioria dos gerenciadores de senha prende você no cofre de outra pessoa.",
    },
    decision: {
      en: "A self-hostable Flask + PostgreSQL webservice plus a browser extension that captures logins and offers autocomplete, with Argon2 hashing and reused/leaked password detection.",
      pt: "Um webservice Flask + PostgreSQL que você mesmo hospeda, mais uma extensão de navegador que captura logins e oferece preenchimento automático, com hash Argon2 e detecção de senhas reutilizadas e vazadas.",
    },
    result: {
      en: "My IFPR final-year project, documented in LaTeX with a threat model and covered by pytest and GitHub Actions CI.",
      pt: "Meu TCC no IFPR, documentado em LaTeX com modelo de ameaças e coberto por pytest e CI no GitHub Actions.",
    },
    stats: [
      { value: 107, label: ALL_MINE },
      { value: 67, label: { en: "pytest tests", pt: "testes pytest" } },
    ],
    image: "/previews/maindug.webp",
    links: [
      { label: LIVE, href: "https://maindug.leogotardo.com.br/" },
      { label: CODE, href: "https://github.com/LeoGotardo/MainDugWeb" },
    ],
  },
  {
    n: "03",
    name: "PiTest",
    period: "Jun 2026 – Present",
    problem: {
      en: "Bench operators need to validate Raspberry Pi boards before delivery or after a repair, without a keyboard or SSH.",
      pt: "Operadores de bancada precisam validar placas Raspberry Pi antes da entrega ou depois de um reparo, sem teclado nem SSH.",
    },
    decision: {
      en: "A systemd service that runs on every boot: 7 checks (LAN, Wi-Fi, boot, USB, GPIO, Bluetooth, hotspot) while the screen shows progress and test patterns.",
      pt: "Um serviço systemd que roda a cada boot: 7 testes (LAN, Wi-Fi, boot, USB, GPIO, Bluetooth, hotspot) enquanto a tela mostra o progresso e padrões de teste.",
    },
    result: {
      en: "Results go to a Flask + PostgreSQL dashboard that keeps each board's history by MAC address; the operator confirms screen and LEDs on the site.",
      pt: "Os resultados vão para um painel Flask + PostgreSQL que guarda o histórico de cada placa pelo endereço MAC; o operador confirma tela e LEDs no site.",
    },
    stats: [
      { value: 24, label: ALL_MINE },
      { value: 7, label: { en: "automatic checks", pt: "testes automáticos" } },
    ],
    links: [
      { label: LIVE, href: "https://pitest.leogotardo.com.br/" },
      { label: CODE, href: "https://github.com/LeoGotardo/pitest" },
    ],
  },
];

export type Project = { name: string; desc: Text; tags: string[]; period: string; image?: string; live?: string; code?: string };

export const projects: Project[] = [
  { name: "ReportGen", desc: { en: "Technical report builder: React front, Express + Puppeteer rendering PDFs on the server. Exports to PDF, DOCX and JSON.", pt: "Gerador de relatórios técnicos: front em React, Express + Puppeteer renderizando PDFs no servidor. Exporta para PDF, DOCX e JSON." }, tags: ["React", "JavaScript", "Vite"], period: "Feb 2026 – Present", image: "/previews/reportgen.webp", live: "https://reportgen.leogotardo.com.br/", code: "https://github.com/LeoGotardo/reportGen" },
  { name: "ipTool", desc: { en: "Geographic IP lookup with interactive map, IPv4/IPv6 validation and detailed network data.", pt: "Consulta geográfica de IP com mapa interativo, validação IPv4/IPv6 e dados detalhados de rede." }, tags: ["React", "JavaScript", "Vite"], period: "Mar 2026 – Present", image: "/previews/iptool.webp", live: "https://iptool.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ipTool" },
  { name: "Custom Thread", desc: { en: "Extends threading.Thread with return values, exception propagation and callbacks. Zero dependencies, on PyPI.", pt: "Estende threading.Thread com valores de retorno, propagação de exceções e callbacks. Zero dependências, no PyPI." }, tags: ["Python", "Threading", "PyPI"], period: "Jun 2024 – Present", live: "https://pypi.org/project/CustomThread/", code: "https://github.com/LeoGotardo/CustomThread" },
  { name: "DDGame", desc: { en: "D&D-themed clicker in React and TypeScript: roll the dice for XP and spend it in the upgrade shop. Deployed on Vercel.", pt: "Clicker com tema de D&D em React e TypeScript: role os dados para ganhar XP e gaste na loja de upgrades. Publicado na Vercel." }, tags: ["TypeScript", "Vite", "Vercel"], period: "Feb 2026 – Present", image: "/previews/ddgame.webp", live: "https://ddgame.leogotardo.com.br/", code: "https://github.com/LeoGotardo/ddgame" },
  { name: "Maze Solver", desc: { en: "Maze generator and pathfinding visualizer rewritten in React 19. Compare DFS and BFS on the same maze.", pt: "Gerador de labirintos e visualizador de pathfinding reescrito em React 19. Compare DFS e BFS no mesmo labirinto." }, tags: ["React", "JavaScript", "Tailwind"], period: "Jun 2025 – Present", image: "/previews/maze.webp", live: "https://maze.leogotardo.com.br/", code: "https://github.com/LeoGotardo/RedBlackTree" },
  { name: "GeoKnocker", desc: { en: "Desktop tool for port scanning and IP geolocation with concurrent scanning via threading.", pt: "Ferramenta desktop de varredura de portas e geolocalização de IP, com varredura concorrente via threading." }, tags: ["Python", "Sockets", "Threading"], period: "Jun 2024 – Aug 2024", code: "https://github.com/LeoGotardo/GeoKnocker" },
  { name: "Hash Table", desc: { en: "Hash table in C with chaining and automatic rehashing at 75% load factor.", pt: "Tabela hash em C com encadeamento e rehash automático a 75% de fator de carga." }, tags: ["C", "Data Structures"], period: "Nov 2025 – Dec 2025", code: "https://github.com/LeoGotardo/hashtable" },
  { name: "Grimório de Venetia", desc: { en: "D&D 5.5 character creator with a 13-step wizard, 333 Vitest tests and 108 Playwright runs. Android via Capacitor.", pt: "Criador de personagens de D&D 5.5 com um assistente de 13 etapas, 333 testes Vitest e 108 execuções Playwright. Android via Capacitor." }, tags: ["React", "TypeScript", "Capacitor"], period: "Jun 2026 – Present", image: "/previews/venetia.webp", live: "https://venetia.leogotardo.com.br/", code: "https://github.com/LeoGotardo/venetia-grimory" },
  { name: "Phishing Detector", desc: { en: "Typosquatting heuristics plus Google Safe Browsing, VirusTotal and URLhaus verdicts.", pt: "Heurísticas de typosquatting mais os veredictos do Google Safe Browsing, VirusTotal e URLhaus." }, tags: ["Python", "Flask", "Security"], period: "May 2026 – Present", code: "https://github.com/LeoGotardo/phising" },
];

export const stack: { group: Text; items: string[] }[] = [
  { group: { en: "Backend", pt: "Backend" }, items: ["Python", "FastAPI", "Flask", "SQLAlchemy", "PostgreSQL", "Redis", "Socket.IO", "REST & WebSocket"] },
  { group: { en: "Front & mobile", pt: "Front & mobile" }, items: ["TypeScript", "React", "Next.js", "Vite", "Capacitor", "Tailwind CSS"] },
  { group: { en: "Infra & embedded", pt: "Infra & embarcados" }, items: ["Docker", "Terraform", "AWS", "GitHub Actions", "Linux", "Raspberry Pi", "systemd"] },
];

// Drop the portrait at src/assets/photo.webp; until it exists the slot stays empty and nothing is requested.
const portrait = import.meta.glob<string>("../assets/photo.webp", { eager: true, import: "default" });
export const PORTRAIT: string | undefined = Object.values(portrait)[0];

projects.push(
  { name: "Talent Scout", desc: { en: "Classifies athletes into tiers with a K-Nearest Neighbors model: PCA, correlation matrix, radar charts.", pt: "Classifica atletas em níveis com um modelo K-Nearest Neighbors: PCA, matriz de correlação, gráficos de radar." }, tags: ["Flask", "scikit-learn", "ML"], period: "Oct 2025 – Present", code: "https://github.com/LeoGotardo/phisics" },
);
