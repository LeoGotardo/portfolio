import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

// Presentational recreations of each project's UI, rebuilt from the projects' own source
// (tokens, fonts, labels and component structure). Demo data, no network.

function Frame({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {title && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">{title}</span>
        </div>
      )}
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}

function useTick(ms: number, max: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % max), ms);
    return () => clearInterval(id);
  }, [ms, max]);
  return n;
}

const pop = (i: number) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay: 0.25 * i, duration: 0.5 } });
const font = (family: string) => ({ fontFamily: family });

/* noHarm: the streak card from noharm.site's landing (sage theme, Figtree). */
function NoHarm() {
  const days = 47;
  const goal = 60;
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto max-w-md pt-6">
      <motion.div {...pop(2)} className="absolute right-0 top-0 z-10 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-lg">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">30</span>
        <span className="text-sm leading-tight"><b className="block">One Month</b><span className="text-xs text-muted-foreground">unlocked</span></span>
      </motion.div>
      <div className="rounded-[2rem] border border-border bg-card p-6 shadow-2xl">
        <div className="text-sm text-muted-foreground">Good evening</div>
        <div className="text-lg font-bold">Sam</div>
        <svg viewBox="0 0 180 180" className="mx-auto my-4 h-44 w-44 -rotate-90">
          <circle cx="90" cy="90" r={r} className="fill-none stroke-secondary" strokeWidth="12" />
          <motion.circle cx="90" cy="90" r={r} className="fill-none stroke-primary" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={c} initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * (1 - days / goal) }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
        </svg>
        <div className="-mt-[8.5rem] mb-[4.25rem] text-center">
          <div className="text-6xl font-extrabold leading-none">{days}</div>
          <div className="text-muted-foreground">clean days</div>
        </div>
        <div className="text-center text-sm text-muted-foreground">Since 12 August</div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-secondary p-3"><div className="text-xs text-muted-foreground">Next badge in 13 days</div><div className="font-bold">Two Months</div></div>
          <div className="rounded-2xl bg-secondary p-3"><div className="text-xs text-muted-foreground">Personal best</div><div className="font-bold">47 days</div></div>
        </div>
      </div>
      <motion.div {...pop(3)} className="-mt-6 ml-[-1rem] w-56 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
        <div className="text-xs text-muted-foreground">Maya</div>
        <div className="text-sm">Proud of you. Same time tomorrow? 💚</div>
      </motion.div>
    </div>
  );
}

/* MainDug: the "Estatísticas de Segurança" page (Bootstrap dark, orange brand). */
function MainDug() {
  const stats = [
    { label: "Senhas Fracas", value: 2, color: "#ea868f" },
    { label: "Senhas Reutilizadas", value: 3, color: "#ffda6a" },
    { label: "Vazamentos Detectados", value: 1, color: "#6edff6" },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
      <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3">
        <span className="flex items-center gap-2 font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">M</span>MainDug
        </span>
        <span className="text-muted-foreground">☰</span>
      </div>
      <div className="p-6">
        <div className="text-2xl font-bold">Estatísticas de Segurança</div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <motion.div {...pop(i)} key={s.label} className="rounded-lg border border-border bg-card px-3 py-4 text-center">
              <div className="text-sm font-semibold" style={{ color: s.color }}>{s.label}</div>
              <div className="text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-xl font-bold">Detalhes</div>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          {["Senhas Fracas (2)", "Senhas Reutilizadas (3)"].map((t) => (
            <div key={t} className="flex justify-between border-b border-border bg-secondary px-4 py-2.5 text-sm"><span>{t}</span><span className="text-muted-foreground">⌄</span></div>
          ))}
          <div className="flex justify-between border border-[#0d6efd] bg-[#031633] px-4 py-2.5 text-sm text-[#6ea8fe]"><span>Vazamentos Detectados (1)</span><span>⌃</span></div>
          <div className="bg-secondary p-3">
            <motion.div {...pop(3)} className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2.5 text-xs text-[#ea868f]">
              <span>Sua senha para "facebook.com" foi encontrada em um vazamento de dados.</span>
              <span className="shrink-0 rounded bg-[#dc3545] px-2 py-1 font-semibold text-white">Alterar Imediatamente</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* PiTest: "Latest Results" on the bench dashboard (zinc surfaces, pass/fail cards, JetBrains Mono data). */
function PiTest() {
  const tests = ["LAN", "WLAN", "Boot", "USB", "GPIO", "Bluetooth", "Hotspot"];
  const n = useTick(450, tests.length + 6);
  const mono = font('"JetBrains Mono", monospace');
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-2xl">
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-semibold">Latest Results</div>
        <div className="text-xs text-muted-foreground" style={mono}>b8:27:eb:4f:1a:22</div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {tests.map((t, i) => {
          const done = i < n;
          return (
            <div key={t} className={`rounded-xl border p-3 transition-colors duration-300 ${done ? "border-[#14532d] bg-[#052e16]" : "border-border bg-card"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[0.72rem] font-medium uppercase tracking-wide ${done ? "text-[#4ade80]/70" : "text-[#52525b]"}`}>{t}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${done ? "bg-[#4ade80]/15 text-[#4ade80]" : "bg-secondary text-[#52525b]"}`}>{done ? "✓" : "·"}</span>
              </div>
              <div className="mt-2 text-[0.82rem] text-muted-foreground">{done ? "✓ Passou" : "Loading..."}</div>
            </div>
          );
        })}
        <div className="rounded-xl border border-border bg-card p-3">
          <div className="text-[0.72rem] font-medium uppercase tracking-wide text-[#52525b]">Screen</div>
          <div className="mt-2 text-[0.82rem] text-muted-foreground">Screen Test (manual)</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground" style={mono}>
        <span>Last Seen 14:02</span>
        <span className="text-primary">{Math.min(n, tests.length)}/7 automatic</span>
      </div>
    </div>
  );
}

/* ReportGen: the editor, with the "Informações Gerais" form beside the live ABNT preview. */
function ReportGen() {
  const syne = font('"Syne", sans-serif');
  const plex = font('"IBM Plex Mono", monospace');
  const field = (label: string, value: string, wide = false) => (
    <div className={wide ? "col-span-2" : ""}>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#525880]" style={plex}>{label}</div>
      <div className="rounded-[9px] border border-border bg-secondary px-3 py-2 text-xs">{value}</div>
    </div>
  );
  return (
    <div className="grid overflow-hidden rounded-[13px] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] border border-border bg-[#131525] shadow-2xl">
      <div className="space-y-3 border-b border-border p-5 sm:border-b-0 sm:border-r">
        <div className="text-lg font-bold" style={syne}>Informações Gerais</div>
        <div className="grid grid-cols-2 gap-3">
          {field("Formato", "ABNT (A4)")}
          {field("Versão", "1.0")}
          {field("Título", "Análise de Segurança: API de Pagamentos", true)}
          {field("Autor / Equipe", "Leonardo Gotardo")}
          {field("Data", "19/10/2026")}
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex gap-4 text-[11px] text-muted-foreground" style={plex}>
          <span className="text-primary">● Preview</span><span>JSON</span><span>Exportar</span>
        </div>
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="rounded-md bg-white p-5 text-[#1a1a1a] shadow-xl" style={font('"Times New Roman", serif')}>
          <div className="text-[9px] uppercase tracking-widest text-[#666]">Relatório de Bugs · Análise Técnica</div>
          <div className="mt-2 text-xl font-bold">Análise de Segurança: API de Pagamentos</div>
          <div className="mt-1 text-[10px] text-[#666]">Autor: Leonardo Gotardo · Versão: 1.0 · Data: 19/10/2026 · ABNT</div>
          <div className="mt-4 space-y-1.5">{[100, 94, 97, 72, 90, 64].map((w, i) => <div key={i} className="h-1.5 rounded bg-[#e6e6e6]" style={{ width: `${w}%` }} />)}</div>
        </motion.div>
        <div className="mt-3 flex justify-end gap-2 text-[11px]" style={plex}>
          {["PDF", "DOCX", "JSON"].map((f) => <span key={f} className="rounded-[9px] bg-primary px-2.5 py-1 text-primary-foreground">{f}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ipTool: the "IPTool lookup" terminal (Orbitron title, Share Tech Mono data, mint glow). */
function IpTool() {
  const orbitron = font('"Orbitron", monospace');
  const fields: [string, string][] = [["Country", "Brazil"], ["Region", "Paraná"], ["Capital", "Brasília"], ["Connection", "Fiber"], ["LATITUDE", "-25.4284"], ["LONGITUDE", "-49.2733"]];
  return (
    <div className="rounded-lg border border-[rgb(0_210_150/45%)] bg-[#080d17] p-6 shadow-[0_0_40px_rgb(0_210_150/15%)]">
      <div className="text-center text-xl font-bold tracking-[0.2em] text-primary [text-shadow:0_0_18px_rgb(0_210_150/60%)]" style={orbitron}>IPTOOL LOOKUP</div>
      <div className="mt-5 flex gap-2">
        <div className="flex-1 border border-border bg-[#04080f] px-3 py-2 text-sm">&gt; 177.53.142.10<span className="animate-blink">_</span></div>
        <div className="border border-[rgb(0_210_150/45%)] px-4 py-2 text-sm text-primary" style={orbitron}>LOOKUP</div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative aspect-[10/7] overflow-hidden border border-border bg-[#04080f] sm:aspect-auto">
          <svg viewBox="0 0 100 70" className="h-full w-full">
            {Array.from({ length: 11 }).map((_, i) => <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="70" stroke="rgb(0 210 150 / 12%)" strokeWidth="0.4" />)}
            {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="rgb(0 210 150 / 12%)" strokeWidth="0.4" />)}
          </svg>
          <motion.div animate={{ scale: [1, 2.6], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute left-[42%] top-[62%] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
          <div className="absolute left-[42%] top-[62%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_#00d296]" />
          <div className="absolute bottom-1.5 left-2 text-[9px] text-primary">&gt; GEOLOCATION_LOCK</div>
        </div>
        <dl className="space-y-1.5 text-[11px]">
          {fields.map(([k, v], i) => (
            <motion.div {...pop(i * 0.4)} key={k} className="flex justify-between border-b border-border pb-1">
              <dt className="text-muted-foreground">{k}</dt><dd className="text-foreground">{v}</dd>
            </motion.div>
          ))}
        </dl>
        <div className="pt-2.5 text-[11px] text-primary">&gt; ACTIVE</div>
      </div>
    </div>
  );
}

/* DDGame: the clicker (XP display, crimson dice and the "Loja de Melhorias" upgrade list). */
function DDGame() {
  const xp = 3 + useTick(220, 140);
  const upgrades = [
    { icon: "🗡️", name: "Espada Curta", cost: 15, count: 1, unlockAt: 0 },
    { icon: "🧙‍♂️", name: "Aprendiz de Mago", cost: 100, count: 0, unlockAt: 50 },
    { icon: "⚔️", name: "Espada Longa", cost: 500, count: 0, unlockAt: 250 },
  ];
  return (
    <div className="grid gap-4 rounded-2xl border-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] border-[#5a4a2a] bg-[#1a0f0f] p-5 shadow-2xl">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-center text-lg font-bold text-primary">⚔️ D&D CLICKER ⚔️</div>
        <div className="w-full rounded-2xl border-2 border-[#ffd700] bg-[linear-gradient(145deg,rgb(45_24_16/92%),rgb(26_15_15/92%))] px-4 py-3 text-center">
          <div className="text-[11px] uppercase tracking-widest text-[#d4af37]">Pontos de Experiência</div>
          <div className="text-4xl font-bold text-white">{xp}</div>
          <div className="text-sm text-[#90ee90]">⚡ 0.0 XP/s</div>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} animate={{ rotate: [0, -8, 8, 0] }} transition={{ repeat: Infinity, duration: 2.4, repeatDelay: 1.2 }}
          className="flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-[#8b0000] bg-[radial-gradient(circle_at_30%_30%,#ff4444_0%,#dc143c_50%,#8b0000_100%)] text-4xl shadow-[0_8px_24px_rgb(139_0_0/50%)]">
          🎲
        </motion.div>
      </div>
      <div className="rounded-xl border border-[#5a4a2a] bg-[#2d1810]/60 p-3">
        <div className="text-center text-sm font-bold text-primary">🏪 LOJA DE MELHORIAS</div>
        <div className="mt-3 space-y-2">
          {upgrades.map((u) => {
            const unlocked = xp >= u.unlockAt;
            const affordable = unlocked && xp >= u.cost;
            return (
              <div key={u.name} className={`rounded-xl border-2 p-2.5 transition-colors ${affordable ? "border-[#32cd32] bg-[linear-gradient(145deg,rgb(45_52_34/88%),rgb(26_32_16/88%))]" : "border-[#5a4a2a] bg-[linear-gradient(145deg,rgb(45_36_22/62%),rgb(26_20_16/62%))]"} ${unlocked ? "" : "opacity-50"}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{u.icon}</span>
                  <span className="text-sm font-bold text-[#f8f1e0]">{u.name}</span>
                </div>
                <div className="mt-1 flex justify-between text-[11px]">
                  <span className="text-[#ffd700]">💰 {u.cost} XP</span>
                  <span className="text-[#d4af37]">{unlocked ? `Quantidade: ${u.count}` : `🔒 ${u.unlockAt} XP total`}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Maze Solver: "Control Center" grid running a real BFS over a fixed maze, in the app's palette. */
const MAZE = [
  "###############",
  "#S....#.......#",
  "#.###.#.#####.#",
  "#.#...#.....#.#",
  "#.#.#######.#.#",
  "#...#.....#...#",
  "###.#.###.###.#",
  "#.....#......E#",
  "###############",
];
const MW = 15;
const COLORS = { wall: "#32353c", path: "#0b0e15", start: "#4edea3", end: "#ffb4ab", visited: "#C0DD97", solution: "#EF9F27" };

function solveMaze() {
  const cells = MAZE.join("");
  const start = cells.indexOf("S");
  const end = cells.indexOf("E");
  const prev = new Map<number, number>([[start, -1]]);
  const order: number[] = [];
  const queue = [start];
  while (queue.length) {
    const cur = queue.shift() as number;
    order.push(cur);
    if (cur === end) break;
    for (const next of [cur - MW, cur + MW, cur - 1, cur + 1]) {
      if (cells[next] !== "#" && !prev.has(next)) { prev.set(next, cur); queue.push(next); }
    }
  }
  const path: number[] = [];
  for (let c = end; c !== -1; c = prev.get(c) ?? -1) path.unshift(c);
  return { cells, order, path };
}
const SOLVED = solveMaze();

function Maze() {
  const { cells, order, path } = SOLVED;
  const n = useTick(70, order.length + path.length + 20);
  const visited = new Set(order.slice(0, Math.min(n, order.length)));
  const solution = new Set(path.slice(0, Math.max(0, n - order.length)));
  const stats: [string, string][] = [
    ["NODES EXPLORED", String(visited.size)],
    ["EXECUTION TIME", "0.4ms"],
    ["PATH LENGTH", solution.size ? String(solution.size) : "-"],
    ["ALGORITHM", "BFS"],
  ];
  return (
    <div className="rounded-xl border border-border bg-[#080b11] p-4 shadow-2xl">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-lg bg-card px-2.5 py-2">
            <div className="text-[8px] font-semibold tracking-widest text-[#c2c6d6]/70">{k}</div>
            <div className="text-sm font-bold text-[#adc6ff]">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-[3px] rounded-lg bg-card p-2" style={{ gridTemplateColumns: `repeat(${MW}, 1fr)` }}>
        {[...cells].map((ch, i) => {
          const bg = ch === "#" ? COLORS.wall : ch === "S" ? COLORS.start : ch === "E" ? COLORS.end
            : solution.has(i) ? COLORS.solution : visited.has(i) ? COLORS.visited : COLORS.path;
          return <div key={i} className="aspect-square rounded-[3px] transition-colors duration-150" style={{ backgroundColor: bg }} />;
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
        {([[COLORS.start, "START"], [COLORS.end, "END"], [COLORS.wall, "WALL"], [COLORS.visited, "BFS VISITED"], [COLORS.solution, "BFS PATH"]] as const).map(([c, l]) => (
          <span key={l} className="flex items-center gap-1.5 text-[9px] font-semibold tracking-widest text-[#c2c6d6]"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />{l}</span>
        ))}
        <span className="ml-auto rounded-md bg-primary px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary-foreground">START SOLVER</span>
      </div>
    </div>
  );
}

/* Grimório de Venetia: the abilities step of the creation wizard, with the app's own Tailwind classes. */
function Venetia() {
  const cinzel = font('"Cinzel", serif');
  const abilities: [string, string, number][] = [["FOR", "Força", 8], ["DES", "Destreza", 14], ["CON", "Constituição", 13], ["INT", "Inteligência", 15], ["SAB", "Sabedoria", 12], ["CAR", "Carisma", 10]];
  return (
    <div className="space-y-5 rounded-xl border border-[#B8860B]/30 bg-[#1A1714] p-6 shadow-2xl">
      <div>
        <h3 className="mb-1 text-2xl font-bold text-[#F5F0E8]" style={cinzel}>Atributos</h3>
        <p className="text-sm text-[#A8A09B]">Passo 6 de 13 · Mago nível 5</p>
      </div>
      <div className="flex gap-2 border-b border-[#B8860B]/20 pb-2 text-sm">
        {["Compra de Pontos", "Conjunto Padrão", "Rolagem"].map((t, i) => (
          <span key={t} className={`rounded-t px-3 py-2 font-medium ${i === 0 ? "bg-[#B8860B]/15 text-[#D4A017]" : "text-[#A8A09B]"}`}>{t}</span>
        ))}
      </div>
      <div className="space-y-3 rounded-lg border border-[#B8860B]/40 bg-[#B8860B]/10 p-4">
        <h4 className="font-semibold text-[#D4A017]" style={cinzel}>Atributos primários</h4>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-baseline gap-1.5 rounded border border-[#B8860B]/50 bg-[#2D2520] px-2.5 py-1 text-sm">
            <span className="font-bold text-[#D4A017]" style={cinzel}>INT</span><span className="text-[#F5F0E8]">Inteligência</span>
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {abilities.map(([k, name, v], i) => (
          <motion.div {...pop(i * 0.3)} key={k} className="flex flex-col gap-1">
            <span className={`text-sm font-semibold ${k === "INT" ? "text-[#D4A017]" : "text-[#B8860B]"}`}>{name}</span>
            <span className="rounded border border-[#B8860B]/30 bg-[#2D2520] px-2 py-1.5 text-sm text-[#F5F0E8]">{v}</span>
          </motion.div>
        ))}
      </div>
      <span className="inline-block rounded-lg border border-[#B8860B]/30 bg-[#7B1D1D] px-6 py-3 text-lg font-semibold text-[#F5F0E8]" style={cinzel}>Rolar atributos</span>
    </div>
  );
}

function Code({ title, lines }: { title: string; lines: string[] }) {
  return (
    <Frame title={title}>
      <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed">
        {lines.map((l, i) => (
          <motion.div {...pop(i * 0.3)} key={i}><span className="mr-4 text-muted-foreground">{String(i + 1).padStart(2, " ")}</span><span className={l.startsWith("#") || l.startsWith("//") || l.startsWith(">") ? "text-primary" : ""}>{l}</span></motion.div>
        ))}
      </pre>
    </Frame>
  );
}

/* Phishing Detector: the checker page (GitHub-dark tokens, "Site Perigoso" verdict, Verificações list). */
function Phishing() {
  const checks: [string, string, "danger" | "suspicious" | "safe"][] = [
    ["Heurística local", "Typosquat de paypal.com (l → 1)", "danger"],
    ["Google Safe Browsing", "Malicioso", "danger"],
    ["VirusTotal", "14 / 92 detecções", "danger"],
    ["URLhaus", "Não listado", "safe"],
  ];
  const tone = { danger: "#FF7B72", suspicious: "#E3B341", safe: "#7EE787" };
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-2xl">
      <div className="text-xl font-bold">Phishing Detector</div>
      <div className="mt-1 text-sm text-muted-foreground">Verifique se um site é seguro antes de inserir seus dados</div>
      <div className="mt-5 flex gap-2">
        <div className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm">paypa1-secure.com/login</div>
        <div className="rounded-md bg-[#238636] px-4 py-2 text-sm font-semibold text-white">Verificar Site</div>
      </div>
      <motion.div {...pop(1)} className="mt-5 rounded-lg border border-[#DA3633] bg-[rgb(255_123_114/8%)] p-4">
        <div className="text-lg font-bold text-[#FF7B72]">⛔ Site Perigoso</div>
        <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verificações</div>
        <div className="mt-2 space-y-1.5 text-sm">
          {checks.map(([k, v, t], i) => (
            <motion.div {...pop(1.5 + i * 0.4)} key={k} className="flex justify-between gap-3 rounded-md bg-secondary px-3 py-2">
              <span>{k}</span><span style={{ color: tone[t] }}>{v}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function TalentScout() {
  // The model's real inputs: height, wingspan, throw, standing long jump, sit-ups.
  const axes = ["Altura", "Envergadura", "Arremesso", "Salto", "Abdominais"];
  const pts = [0.7, 0.8, 0.65, 0.85, 0.75];
  const xy = (r: number, i: number) => { const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2; return `${50 + Math.cos(a) * 40 * r},${50 + Math.sin(a) * 40 * r}`; };
  return (
    <Frame title="KNN · Competitivo">
      <svg viewBox="0 0 100 100" className="mx-auto h-56 w-56">
        {[1, 0.66, 0.33].map((r) => <polygon key={r} points={pts.map((_, i) => xy(r, i)).join(" ")} className="fill-none stroke-border" strokeWidth="0.5" />)}
        <motion.polygon initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ transformOrigin: "50% 50%" }}
          points={pts.map((r, i) => xy(r, i)).join(" ")} className="fill-primary/30 stroke-primary" strokeWidth="1" />
      </svg>
      <div className="flex flex-wrap justify-center gap-x-2 font-mono text-[10px] text-muted-foreground">{axes.map((a) => <span key={a}>{a}</span>)}</div>
    </Frame>
  );
}

export function SceneWidget({ name }: { name: string }) {
  switch (name) {
    case "noHarm": return <NoHarm />;
    case "MainDug Web": return <MainDug />;
    case "PiTest": return <PiTest />;
    case "ReportGen": return <ReportGen />;
    case "ipTool": return <IpTool />;
    case "DDGame": return <DDGame />;
    case "Maze Solver": return <Maze />;
    case "Grimório de Venetia": return <Venetia />;
    case "Phishing Detector": return <Phishing />;
    case "Talent Scout": return <TalentScout />;
    case "Custom Thread": return <Code title="pip install CustomThread" lines={["from CustomThread.customThread import CustomThread", "", "thread = CustomThread(target=add, args=(5, 10))", "thread.start()", "result = thread.join()  # returns 15", "", "# exceptions raised in the thread reach the caller"]} />;
    case "Hash Table": return <Code title="hashtable.c" lines={["// chaining + automatic rehash at load factor 0.75", "if ((float)t->count / t->size >= 0.75f)", "    rehash(t);  // doubles: 10 → 20 → 40 buckets", "", "while (*cpf) h = h * 31 + *cpf++;  // hash", "Person *p = search(t, \"123.456.789-01\");", "> João Silva, 25"]} />;
    case "GeoKnocker": return <Code title="geoknocker -t 8.8.8.8" lines={["> host 8.8.8.8 · ports 1-1024 · threaded scan", "22/tcp    closed", "53/tcp    OPEN    domain", "443/tcp   OPEN    https", "", "# geolocation via public REST API", "> scan complete"]} />;
    default: return null;
  }
}
