import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

export default function About() {
  const { tr } = useApp()
  const a = tr.about
  const boxRef = useReveal()
  return (
    <section id="about" className="section">
      <SectionHeader title={a.title} />
      <div className="about-box reveal" ref={boxRef}>
        <p>
          {a.p1a}
          <strong style={{ color: 'var(--accent-cyan)' }}>IrisPay</strong>
          {a.p1b}
        </p>
        <p>{a.p2}</p>
        <div className="about-meta">
          {a.meta.map(({ label, value }) => (
            <div className="about-meta-item" key={label}>
              <div className="label">{label}</div>
              <div className="value">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
