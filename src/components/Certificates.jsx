import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

const certs = [
  { name: 'Hardware Course', issuer: 'Software & hardware repair, server administration and maintenance', year: '2015 – 2018' },
  { name: 'Python para iniciantes: do zero ao primeiro projeto', issuer: 'Asimov Academy', year: '2025' },
  { name: 'Python para dados: do zero à análise completa', issuer: 'Asimov Academy', year: '2025' },
  { name: 'Python para IA: do zero ao primeiro chatbot', issuer: 'Asimov Academy', year: '2025' },
]

export default function Certificates() {
  const { tr } = useApp()
  const listRef = useReveal()
  return (
    <section id="certificates" className="section">
      <SectionHeader title={tr.certificates.title} />
      <div className="certs-list reveal" ref={listRef}>
        {certs.map(({ name, issuer, year }) => (
          <div className="cert" key={name}>
            <div>
              <div className="cert-name">{name}</div>
              <div className="cert-issuer">{issuer}</div>
            </div>
            <span className="cert-year">{year}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
