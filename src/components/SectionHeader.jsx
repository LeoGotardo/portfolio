import { useReveal } from './useReveal'

export default function SectionHeader({ title, style }) {
  const ref = useReveal()
  return (
    <h2 className="section-header reveal" ref={ref} style={style}>
      <span className="bracket">&lt;</span>
      <span className="title">{title}</span>
      <span className="slash">/&gt;</span>
    </h2>
  )
}
