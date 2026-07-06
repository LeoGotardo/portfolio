import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

export default function Interests() {
  const { tr } = useApp()
  const { title, items } = tr.interests
  const ref = useReveal()
  return (
    <section id="interests" className="section">
      <SectionHeader title={title} />
      <div className="skill-pills reveal" ref={ref}>
        {items.map(item => <span className="skill-pill" key={item}>{item}</span>)}
      </div>
    </section>
  )
}
