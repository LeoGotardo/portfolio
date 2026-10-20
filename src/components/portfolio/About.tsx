import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { stack, RESUME } from "@/data/projects";
import { Magnetic, Reveal, SectionLabel } from "./primitives";

export function About() {
  return (
    <section id="about" className="px-6 py-32 md:px-10">
      <SectionLabel n="03">About & stack</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-display text-3xl font-medium leading-tight md:text-4xl">
              Software Developer in Londrina. Currently at <span className="text-primary">IrisPay</span>, turning traditional machines into smart vending systems — embedded, APIs, sockets, cryptography, IoT and web.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted-foreground">
              Graduated in Analysis and Systems Development at IFPR (2026). I keep building side projects that push me into new areas: cryptography, GUI programming, mobile apps, cloud infrastructure and Python libraries on PyPI.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-xs">
              {[["Location", "Londrina, Brasil"], ["Languages", "PT (Native) · EN (Full Prof.)"], ["Education", "ADS, IFPR (2026)"], ["Focus", "Python · React/TS · Mobile"]].map(([k, v]) => (
                <div key={k} className="border-l border-primary pl-3">
                  <dt className="uppercase text-muted-foreground">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="space-y-6">
          {Object.entries(stack).map(([group, items], gi) => (
            <Reveal key={group} delay={gi * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((t, i) => (
                    <motion.span key={t} initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 18 }}
                      whileHover={{ scale: 1.1 }}
                      className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary">
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <p className="font-mono text-xs text-muted-foreground">Also: PHP (Laravel, Yii2), C, pytest, Playwright and Vitest.</p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Slides in from the right and settles flush with the content by the time it reaches mid-screen;
  // ending past 0% pushed the first letter off the left edge. At 17vw the line fits inside the side padding.
  const x = useTransform(scrollYProgress, [0, 0.75], ["30%", "0%"]);
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 pb-12 pt-32 md:px-10">
      <SectionLabel n="04">Contact</SectionLabel>
      <motion.h2 style={{ x }} className="whitespace-nowrap font-display text-[17vw] font-bold leading-none tracking-tighter">
        Let's <span className="text-primary">talk</span> <span className="text-outline">→</span>
      </motion.h2>
      <Reveal>
        <p className="mt-8 max-w-lg text-muted-foreground">Open to new opportunities and interesting projects. Let's build something together.</p>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        <Magnetic href="mailto:contato@leogotardo.com.br" className="border-primary bg-primary text-primary-foreground">contato@leogotardo.com.br</Magnetic>
        <Magnetic href="https://www.linkedin.com/in/leogotardo/">LinkedIn</Magnetic>
        <Magnetic href="https://github.com/LeoGotardo">GitHub</Magnetic>
        <Magnetic href={RESUME}>Resume (PDF)</Magnetic>
        <Magnetic href="tel:+5543988177963">+55 43 98817-7963</Magnetic>
      </div>
      <a href="mailto:contato@leogotardo.com.br?subject=Website%20project" className="mt-10 inline-block font-mono text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        Need a website for your business? Tell me about it.
      </a>
      <footer className="mt-24 flex justify-between border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        <span>© 2026 Leonardo Gotardo</span><span>Londrina · BR</span>
      </footer>
    </section>
  );
}
