import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, SectionLabel } from "./primitives";
import { jobs } from "@/data/experience";
import { Trans, useTranslation } from "react-i18next";
import { period, tag, useLocale } from "@/lib/i18n";

export function Experience() {
  const locale = useLocale();
  const { t } = useTranslation(["home", "jobs"]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="px-6 py-32 md:px-10">
      <SectionLabel n="02">{t("experience.label")}</SectionLabel>
      <Reveal>
        <h2 className="mb-16 font-display text-6xl font-bold tracking-tighter md:text-8xl">
          <Trans t={t} i18nKey="experience.title" components={{ outline: <span className="text-outline" /> }} />
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
                  <div className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")} · {period(j.period, locale)}</div>
                  <h3 className="mt-2 font-display text-4xl font-bold">{j.org}</h3>
                  <div className="mt-1 text-muted-foreground">{t(`jobs:${j.id}.role`)}</div>
                  <div className="font-mono text-xs text-muted-foreground">{t(`jobs:${j.id}.place`)}</div>
                </div>
                <div className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50">
                  <p className="text-foreground">{t(`jobs:${j.id}.intro`)}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {t(`jobs:${j.id}.points`, { returnObjects: true }).map((p, k) => (
                      <motion.li key={k} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: 0.1 * k }} className="flex gap-3">
                        <span className="text-primary">→</span>{p}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {j.tags.map((name) => <span key={name} className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px]">{tag(name, locale)}</span>)}
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
