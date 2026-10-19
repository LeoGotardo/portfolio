import { useApp } from '../context/AppContext'
import Reveal from './Reveal'
import InlineList from './InlineList'

export default function Experience() {
  const { tr } = useApp()
  const { title, jobs } = tr.experience
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-head">
          <h2 id="experience-title" className="section-title">{title}</h2>
        </div>
        <ol className="jobs">
          {jobs.map(j => (
            <Reveal as="li" className="job" key={j.company}>
              <p className="job-period">{j.period}</p>
              <div className="job-body">
                <h3 className="job-role">
                  {j.title}<span className="job-at">, {j.company}</span>
                </h3>
                <p className="job-desc">{j.desc}</p>
                <ul className="job-bullets">
                  {j.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
              <div className="job-tags"><InlineList items={j.tags} /></div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
