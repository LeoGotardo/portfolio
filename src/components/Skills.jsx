import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

export default function Skills() {
  const { tr } = useApp()
  const { title, groups } = tr.skills
  const gridRef = useReveal()
  return (
    <section id="skills" className="section">
      <SectionHeader title={title} />
      <div className="skills-grid reveal" ref={gridRef}>
        {groups.map(({ name, pills }) => (
          <div className="skill-group" key={name}>
            <h3>{name}</h3>
            <div className="skill-pills">
              {pills.map(p => <span className="skill-pill" key={p}>{p}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
