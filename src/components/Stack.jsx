import { useApp } from '../context/AppContext'
import Reveal from './Reveal'
import InlineList from './InlineList'

export default function Stack() {
  const { tr } = useApp()
  const s = tr.stack
  return (
    <section id="stack" className="section band" aria-labelledby="stack-title">
      <div className="container">
        <div className="section-head">
          <h2 id="stack-title" className="section-title">{s.title}</h2>
        </div>
        <dl className="stack-lines">
          {s.lines.map((l, i) => (
            <Reveal className="stack-line" key={l.label} delay={i * 0.06}>
              <dt>{l.label}</dt>
              <dd><InlineList items={l.items} className="stack-items" /></dd>
            </Reveal>
          ))}
        </dl>
        <p className="stack-also">{s.also}</p>
      </div>
    </section>
  )
}
