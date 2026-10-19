import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionLabel } from "./primitives";

type Job = { role: string; org: string; period: string; place: string; intro: string; points: string[]; tags: string[] };

// IrisPay is under NDA: only technologies, working conditions and skills — no products, clients or numbers.
const jobs: Job[] = [
  {
    role: "Software Developer",
    org: "IrisPay",
    period: "Sep 2024 – Present",
    place: "Londrina-PR, Brazil",
    intro: "Brazilian fintech that converts traditional machines into smart self-service and vending systems with proprietary payment technology.",
    points: [
      "Embedded Linux on Raspberry Pi devices running unattended in the field: kiosk display, systemd/OpenRC services, watchdogs, LUKS encryption.",
      "Python services that control hardware: GPIO, NFC readers, serial protocols and thermal printers, with state machines, threading and asyncio.",
      "Python APIs (FastAPI, Flask) and real-time communication over WebSockets and sockets; PHP/Laravel frontends and legacy Yii2 maintenance.",
      "Over-the-air updates with versioned releases, automatic rollback and sandboxed end-to-end tests; containerised services on AWS via GitHub Actions.",
      "No keyboard, no screen, unreliable network: everything has to recover by itself, and every failure is isolated layer by layer before fixing.",
    ],
    tags: ["Raspberry Pi", "Python", "FastAPI", "systemd", "Bash", "Docker", "AWS", "Laravel"],
  },
  {
    role: "Partner",
    org: "TLG-Web-Dev",
    period: "Apr 2026 – Present",
    place: "Web development studio",
    intro: "Small studio where I'm one of the partners and build client sites.",
    points: [
      "GP Barril site (Next.js + TypeScript): Image Optimizer locked to 3 hosts, closing an open-proxy hole.",
      "Canonical domain fix and a robots policy that separates AI search agents from training crawlers.",
      "Contact Server Action validated on the server and rate-limited to 3 sends per IP per 10 minutes.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "SEO", "Web Security"],
  },
  {
    role: "Service Desk",
    org: "Persis Internet",
    period: "Jul 2023 – Mar 2024",
    place: "Londrina-PR, Brazil",
    intro: "Regional ISP with more than 100,000 customers.",
    points: [
      "Solved complex network problems for non-technical customers, often from ambiguous descriptions.",
      "Kept service quality high under pressure and turned persistent issues into useful feedback.",
    ],
    tags: ["Networking", "Technical Support", "Problem Solving"],
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="px-6 py-32 md:px-10">
      <SectionLabel n="02">Experience</SectionLabel>
      <Reveal>
        <h2 className="mb-16 font-display text-6xl font-bold tracking-tighter md:text-8xl">
          Where I <span className="text-outline">work</span>.
        </h2>
      </Reveal>
      <div ref={ref} className="relative pl-8 md:pl-16">
        <div className="absolute left-2 top-0 h-full w-px bg-border md:left-6" />
        <motion.div style={{ scaleY: line }} className="absolute left-2 top-0 h-full w-px origin-top bg-primary md:left-6" />
        <div className="space-y-16">
          {jobs.map((j, i) => (
            <motion.article
              key={j.org}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                className="absolute -left-[30px] top-2 h-3 w-3 rounded-full bg-primary glow md:-left-[46px]"
              />
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div>
                  <div className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")} · {j.period}</div>
                  <h3 className="mt-2 font-display text-4xl font-bold">{j.org}</h3>
                  <div className="mt-1 text-muted-foreground">{j.role}</div>
                  <div className="font-mono text-xs text-muted-foreground">{j.place}</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                  <p className="text-foreground">{j.intro}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {j.points.map((p, k) => (
                      <motion.li key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.1 * k }} className="flex gap-3">
                        <span className="text-primary">→</span>{p}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {j.tags.map((t) => <span key={t} className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px]">{t}</span>)}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
