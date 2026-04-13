import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

function Job({ title, company, period, desc, bullets, tags }) {
  const ref = useReveal()
  return (
    <div className="job reveal" ref={ref}>
      <div className="job-header">
        <div>
          <div className="job-title">{title}</div>
          <div className="job-company">{company}</div>
        </div>
        <span className="job-period">{period}</span>
      </div>
      <p className="job-desc">{desc}</p>
      <ul className="job-bullets">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <div className="job-tags">
        {tags.map(t => <span className="tag" key={t}>{t}</span>)}
      </div>
    </div>
  )
}

export default function Experience() {
  const { tr } = useApp()
  const { title, jobs } = tr.experience
  return (
    <section id="experience" className="section">
      <SectionHeader title={title} />
      <div className="timeline">
        {jobs.map(j => <Job key={j.company} {...j} />)}
      </div>
    </section>
  )
}
