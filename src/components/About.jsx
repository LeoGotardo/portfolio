import { useApp } from '../context/AppContext'
import Reveal from './Reveal'

export default function About() {
  const { tr } = useApp()
  const a = tr.about
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <h2 id="about-title" className="section-title">{a.title}</h2>
        </div>
        <div className="about-grid">
          <Reveal className="about-text">
            <p>{a.p1a}<strong>IrisPay</strong>{a.p1b}</p>
            <p>{a.p2}</p>
          </Reveal>
          <Reveal className="about-side" delay={0.08}>
            <dl className="about-meta">
              {a.meta.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <h3 className="about-courses-title">{a.coursesTitle}</h3>
            <ul className="about-courses">
              {a.courses.map(c => (
                <li key={c.name}>
                  <span className="course-name">{c.name}</span>
                  <span className="course-detail">{c.detail}</span>
                  <span className="course-year">{c.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
