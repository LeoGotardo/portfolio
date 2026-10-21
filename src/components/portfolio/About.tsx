import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { stack } from "@/data/projects";
import { RESUME, useLocale } from "@/lib/i18n";
import { Magnetic, Reveal, SectionLabel } from "./primitives";

const ABOUT = {
  en: {
    label: "About & stack",
    lead: ["Software Developer in Londrina. Currently at", ", turning traditional machines into smart vending systems — embedded, APIs, sockets, cryptography, IoT and web."],
    bio: "Graduated in Analysis and Systems Development at IFPR (2026). I keep building side projects that push me into new areas: cryptography, GUI programming, mobile apps, cloud infrastructure and Python libraries on PyPI.",
    facts: [["Location", "Londrina, Brasil"], ["Languages", "PT (Native) · EN (Full Prof.)"], ["Education", "ADS, IFPR (2026)"], ["Focus", "Python · React/TS · Mobile"]],
    also: "Also: PHP (Laravel, Yii2), C, pytest, Playwright and Vitest.",
  },
  pt: {
    label: "Sobre & stack",
    lead: ["Desenvolvedor de software em Londrina. Hoje na", ", transformando máquinas tradicionais em sistemas inteligentes de vending — embarcados, APIs, sockets, criptografia, IoT e web."],
    bio: "Formado em Análise e Desenvolvimento de Sistemas pelo IFPR (2026). Sigo criando projetos pessoais que me levam a novas áreas: criptografia, interfaces gráficas, apps mobile, infraestrutura em nuvem e bibliotecas Python no PyPI.",
    facts: [["Localização", "Londrina, Brasil"], ["Idiomas", "PT (nativo) · EN (prof. plena)"], ["Formação", "ADS, IFPR (2026)"], ["Foco", "Python · React/TS · Mobile"]],
    also: "Também: PHP (Laravel, Yii2), C, pytest, Playwright e Vitest.",
  },
};

const CONTACT = {
  en: {
    label: "Contact",
    title: ["Let's", "talk"],
    // At 17vw the line fits inside the side padding.
    size: "text-[17vw]",
    lede: "Open to new opportunities and interesting projects. Let's build something together.",
    resume: "Resume (PDF)",
    site: "Need a website for your business? Tell me about it.",
    subject: "Website project",
  },
  pt: {
    label: "Contato",
    title: ["Vamos", "falar"],
    // A touch longer than the English line, so a touch smaller to fit inside the side padding.
    size: "text-[14vw]",
    lede: "Aberto a novas oportunidades e projetos interessantes. Vamos construir algo juntos.",
    resume: "Currículo (PDF)",
    site: "Precisa de um site para o seu negócio? Me conta.",
    subject: "Projeto de site",
  },
};

export function About() {
  const locale = useLocale();
  const t = ABOUT[locale];
  return (
    <section id="about" className="px-6 py-32 md:px-10">
      <SectionLabel n="03">{t.label}</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-display text-3xl font-medium leading-tight md:text-4xl">
              {t.lead[0]} <span className="text-primary">IrisPay</span>{t.lead[1]}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted-foreground">
              {t.bio}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-xs">
              {t.facts.map(([k, v]) => (
                <div key={k} className="border-l border-primary pl-3">
                  <dt className="uppercase text-muted-foreground">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="space-y-6">
          {stack.map(({ group, items }, gi) => (
            <Reveal key={group.en} delay={gi * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{group[locale]}</h3>
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
          <p className="font-mono text-xs text-muted-foreground">{t.also}</p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const locale = useLocale();
  const t = CONTACT[locale];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Slides in from the right and settles flush with the content by the time it reaches mid-screen;
  // ending past 0% pushed the first letter off the left edge. Each language sets the size its line fits at.
  const x = useTransform(scrollYProgress, [0, 0.75], ["30%", "0%"]);
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 pb-12 pt-32 md:px-10">
      <SectionLabel n="04">{t.label}</SectionLabel>
      <motion.h2 style={{ x }} className={`whitespace-nowrap font-display font-bold leading-none tracking-tighter ${t.size}`}>
        {t.title[0]} <span className="text-primary">{t.title[1]}</span> <span className="text-outline">→</span>
      </motion.h2>
      <Reveal>
        <p className="mt-8 max-w-lg text-muted-foreground">{t.lede}</p>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        <Magnetic href="mailto:contato@leogotardo.com.br" className="border-primary bg-primary text-primary-foreground">contato@leogotardo.com.br</Magnetic>
        <Magnetic href="https://www.linkedin.com/in/leogotardo/">LinkedIn</Magnetic>
        <Magnetic href="https://github.com/LeoGotardo">GitHub</Magnetic>
        <Magnetic href={RESUME[locale]}>{t.resume}</Magnetic>
        <Magnetic href="tel:+5543988177963">+55 43 98817-7963</Magnetic>
      </div>
      <a href={`mailto:contato@leogotardo.com.br?subject=${encodeURIComponent(t.subject)}`} className="mt-10 inline-block font-mono text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        {t.site}
      </a>
      <footer className="mt-24 flex justify-between border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        <span>© 2026 Leonardo Gotardo</span><span>Londrina · BR</span>
      </footer>
    </section>
  );
}
