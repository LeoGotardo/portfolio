import { useEffect, useState } from 'react'
import { m, AnimatePresence, useMotionValue, useSpring } from 'motion/react'
import { useApp } from '../context/AppContext'
import Reveal, { EASE_OUT_EXPO } from './Reveal'
import { ArrowUpRight } from './icons'
import InlineList from './InlineList'

function ProjectLinks({ p, labels }) {
  const repos = p.repos ?? (p.github ? [{ url: p.github }] : [])
  return (
    <p className="project-links">
      {p.live && (
        <a className="text-link" href={p.live} target="_blank" rel="noopener noreferrer">
          {labels.live} <ArrowUpRight />
        </a>
      )}
      {repos.map(r => (
        <a key={r.url} className="text-link" href={r.url} target="_blank" rel="noopener noreferrer">
          {r.label ? `${labels.code} (${r.label})` : labels.code} <ArrowUpRight />
        </a>
      ))}
    </p>
  )
}

// A typographic stand-in for projects without a live screenshot.
function Cover({ name }) {
  return <div className="cover" aria-hidden="true"><span>{name}</span></div>
}

function BootDiagram({ d }) {
  return (
    <div className="diagram">
      <p className="diagram-node">{d.start}</p>
      <span className="diagram-arrow" aria-hidden="true" />
      <ul className="diagram-checks">
        {d.checks.map(c => <li key={c}>{c}</li>)}
      </ul>
      <span className="diagram-arrow" aria-hidden="true" />
      <p className="diagram-node">{d.end}</p>
    </div>
  )
}

function Feature({ p, index, labels }) {
  return (
    <Reveal as="article" className="feature">
      <div className="feature-media">
        <div className="feature-frame">
          {p.preview
            ? <img src={p.preview} alt={p.alt} width="1200" height="750" loading="lazy" decoding="async" />
            : <BootDiagram d={p.diagram} />}
        </div>
      </div>
      <div className="feature-body">
        <p className="feature-index">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="feature-name">{p.name}</h3>
        <p className="feature-period">{p.period}</p>
        <dl className="feature-story">
          <div><dt>{labels.problem}</dt><dd>{p.problem}</dd></div>
          <div><dt>{labels.decision}</dt><dd>{p.decision}</dd></div>
          <div><dt>{labels.result}</dt><dd>{p.result}</dd></div>
        </dl>
        <ul className="feature-metrics">
          {p.metrics.map(x => <li key={x}>{x}</li>)}
        </ul>
        <ProjectLinks p={p} labels={labels} />
      </div>
    </Reveal>
  )
}

function useFinePointer() {
  const query = '(hover: hover) and (pointer: fine)'
  const [fine, setFine] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setFine(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

function FloatingPreview({ item, visible, x, y }) {
  return (
    <m.div className="float-preview" style={{ x, y }} aria-hidden="true">
      <AnimatePresence initial={false}>
        {visible && item && (
          <m.div
            key={item.name}
            className="float-preview-card"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            {item.preview ? <img src={item.preview} alt="" /> : <Cover name={item.name} />}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

function ProjectIndex({ items, labels, start }) {
  const fine = useFinePointer()
  const [active, setActive] = useState(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 420, damping: 40, mass: 0.6 })
  const y = useSpring(py, { stiffness: 420, damping: 40, mass: 0.6 })

  const onMove = (e) => {
    px.set(e.clientX + 24)
    py.set(e.clientY - 90)
  }

  return (
    <div className="index" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <ol className="index-list">
        {items.map((p, i) => (
          <li
            key={p.name}
            className="index-row"
            onPointerEnter={() => setActive(i)}
          >
            <span className="index-num">{String(start + i).padStart(2, '0')}</span>
            <div className="index-thumb" aria-hidden="true">
              {p.preview ? <img src={p.preview} alt="" loading="lazy" decoding="async" /> : <Cover name={p.name} />}
            </div>
            <div className="index-main">
              <h3 className="index-name">{p.name}</h3>
              <p className="index-desc">{p.desc}</p>
            </div>
            <div className="index-stack"><InlineList items={p.tags.slice(0, 3)} /></div>
            <p className="index-period">{p.period}</p>
            <ProjectLinks p={p} labels={labels} />
          </li>
        ))}
      </ol>
      {fine && <FloatingPreview item={items[active]} visible={active !== null} x={x} y={y} />}
    </div>
  )
}

export default function Work() {
  const { tr } = useApp()
  const w = tr.projects
  const featured = w.items.filter(p => p.featured)
  const rest = w.items.filter(p => !p.featured)
  return (
    <>
      <section id="work" className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <h2 id="work-title" className="section-title">{w.title}</h2>
          </div>
          <div className="features">
            {featured.map((p, i) => <Feature key={p.name} p={p} index={i} labels={w} />)}
          </div>
        </div>
      </section>
      <section className="section section-tight" aria-labelledby="more-title">
        <div className="container">
          <div className="section-head">
            <h2 id="more-title" className="section-title section-title-sm">{w.moreTitle}</h2>
          </div>
          <ProjectIndex items={rest} labels={w} start={featured.length + 1} />
        </div>
      </section>
    </>
  )
}
