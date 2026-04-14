import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

function SkillGroup({ name, pills, delay }) {
  const ref = useReveal()
  return (
    <div className="skill-group reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <h3>{name}</h3>
      <div className="skill-pills">
        {pills.map(p => <span className="skill-pill" key={p}>{p}</span>)}
      </div>
    </div>
  )
}

export default function Skills() {
  const { tr } = useApp()
  const { title, groups } = tr.skills
  return (
    <section id="skills" className="section">
      <SectionHeader title={title} />
      <div className="skills-grid">
        {groups.map(({ name, pills }, i) => (
          <SkillGroup key={name} name={name} pills={pills} delay={i * 60} />
        ))}
      </div>
    </section>
  )
}
