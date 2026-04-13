import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.185 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  C:          '#555555',
}

function ProjectCard({ icon, name, period, desc, bullets, tags, lang, github, live }) {
  const ref = useReveal()
  return (
    <div className="project-card reveal" ref={ref}>
      <div className="project-icon">{icon}</div>
      <div className="project-info">
        <div className="project-card-top">
          <div>
            <div className="project-name">{name}</div>
            <div className="project-period">{period}</div>
          </div>
          <div className="project-card-actions">
            {lang && (
              <span className="project-lang">
                <span className="project-lang-dot" style={{ background: LANG_COLORS[lang] ?? '#94a3b8' }} />
                {lang}
              </span>
            )}
            {live && (
              <a className="project-link-btn" href={live} target="_blank" rel="noopener" title="Live demo">
                <ExternalIcon /> Demo
              </a>
            )}
            <a className="project-link-btn project-link-btn--gh" href={github} target="_blank" rel="noopener" title="GitHub repo">
              <GitHubIcon /> Code
            </a>
          </div>
        </div>
        <p className="project-desc">{desc}</p>
        <ul className="project-bullets">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <div className="project-tags">
          {tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const { tr } = useApp()
  const { title, items } = tr.projects
  return (
    <section id="projects" className="section">
      <SectionHeader title={title} />
      <div className="projects-grid">
        {items.map(p => <ProjectCard key={p.name} {...p} />)}
      </div>
    </section>
  )
}
