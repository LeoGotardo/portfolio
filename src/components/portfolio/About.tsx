import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { stack } from "@/data/projects";
import { Trans, useTranslation } from "react-i18next";
import { type Locale, RESUME, useLocale } from "@/lib/i18n";
import { Magnetic, Reveal, SectionLabel } from "./primitives";

// At 17vw the English line fits inside the side padding; the Portuguese one is a touch longer, so a touch smaller.
const CONTACT_SIZE: Record<Locale, string> = { en: "text-[17vw]", pt: "text-[14vw]" };

export function About() {
  const { t } = useTranslation(["home", "projects"]);
  return (
    <section id="about" className="px-6 py-32 md:px-10">
      <SectionLabel n="03">{t("about.label")}</SectionLabel>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="font-display text-3xl font-medium leading-tight md:text-4xl">
              <Trans t={t} i18nKey="about.lead" components={{ brand: <span className="text-primary" /> }} />
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted-foreground">
              {t("about.bio")}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-8 grid grid-cols-2 gap-4 font-mono text-xs">
              {t("about.facts", { returnObjects: true }).map(({ term, value }) => (
                <div key={term} className="border-l border-primary pl-3">
                  <dt className="uppercase text-muted-foreground">{term}</dt>
                  <dd className="mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <div className="space-y-6">
          {stack.map(({ id, items }, gi) => (
            <Reveal key={id} delay={gi * 0.1}>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-primary">{t(`projects:stack.${id}`)}</h3>
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
          <p className="font-mono text-xs text-muted-foreground">{t("about.also")}</p>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const locale = useLocale();
  const { t } = useTranslation("home");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Slides in from the right and settles flush with the content by the time it reaches mid-screen;
  // ending past 0% pushed the first letter off the left edge. Each language sets the size its line fits at.
  const x = useTransform(scrollYProgress, [0, 0.75], ["30%", "0%"]);
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 pb-12 pt-32 md:px-10">
      <SectionLabel n="04">{t("contact.label")}</SectionLabel>
      <motion.h2 style={{ x }} className={`whitespace-nowrap font-display font-bold leading-none tracking-tighter ${CONTACT_SIZE[locale]}`}>
        <Trans t={t} i18nKey="contact.title" components={{ accent: <span className="text-primary" />, outline: <span className="text-outline" /> }} />
      </motion.h2>
      <Reveal>
        <p className="mt-8 max-w-lg text-muted-foreground">{t("contact.lede")}</p>
      </Reveal>
      <div className="mt-10 flex flex-wrap gap-3">
        <Magnetic href="mailto:contato@leogotardo.com.br" className="border-primary bg-primary text-primary-foreground">contato@leogotardo.com.br</Magnetic>
        <Magnetic href="https://www.linkedin.com/in/leogotardo/">LinkedIn</Magnetic>
        <Magnetic href="https://github.com/LeoGotardo">GitHub</Magnetic>
        <Magnetic href={RESUME[locale]}>{t("contact.resume")}</Magnetic>
        <Magnetic href="tel:+5543988177963">+55 43 98817-7963</Magnetic>
      </div>
      <a href={`mailto:contato@leogotardo.com.br?subject=${encodeURIComponent(t("contact.subject"))}`} className="mt-10 inline-block font-mono text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
        {t("contact.site")}
      </a>
      <footer className="mt-24 flex justify-between border-t border-border pt-6 font-mono text-xs text-muted-foreground">
        <span>© 2026 Leonardo Gotardo</span><span>Londrina · BR</span>
      </footer>
    </section>
  );
}
