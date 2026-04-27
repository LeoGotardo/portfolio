import {
  SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiLua,
  SiGnubash, SiFlask, SiFastapi, SiLaravel, SiJsonwebtokens,
  SiReact, SiVite, SiTailwindcss, SiReactrouter,
  SiMongodb, SiMysql, SiPostgresql, SiSqlite,
  SiLinux, SiGit, SiPypi, SiVercel, SiSocketdotio, SiRaspberrypi
} from 'react-icons/si'
import { FaJava, FaRobot } from 'react-icons/fa'
import SectionHeader from './SectionHeader'
import { useReveal } from './useReveal'
import { useApp } from '../context/AppContext'
import { TbBrandPowershell, TbCpu } from "react-icons/tb";

const ICON_MAP = {
  'Python':       SiPython,
  'JavaScript':   SiJavascript,
  'TypeScript':   SiTypescript,
  'Java':         FaJava,
  'HTML':         SiHtml5,
  'CSS':          SiCss,
  'Lua':          SiLua,
  'Bash':         SiGnubash,
  'Flask':        SiFlask,
  'FastAPI':      SiFastapi,
  'Laravel':      SiLaravel,
  'JWT':          SiJsonwebtokens,
  'React':        SiReact,
  'Vite':         SiVite,
  'Tailwind CSS': SiTailwindcss,
  'React Router': SiReactrouter,
  'React Hooks':  SiReact,
  'MongoDB':      SiMongodb,
  'MySQL':        SiMysql,
  'PostgreSQL':   SiPostgresql,
  'SQLite':       SiSqlite,
  'Linux':        SiLinux,
  'Git':          SiGit,
  'PyPI':         SiPypi,
  'SSH':          TbBrandPowershell,
  'Vercel':       SiVercel,
  'Socket':       SiSocketdotio,
  'WebSocket':    SiSocketdotio,
  'Hardware':     TbCpu,
  'Embedded':     SiRaspberrypi,
  'GPIO':         FaRobot,
}

function Pill({ name }) {
  const Icon = ICON_MAP[name]
  return (
    <span className="skill-pill">
      {Icon && <Icon className="skill-pill-icon" aria-hidden="true" />}
      {name}
    </span>
  )
}

function SkillGroup({ name, pills, delay }) {
  const ref = useReveal()
  return (
    <div className="skill-group reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <h3>{name}</h3>
      <div className="skill-pills">
        {pills.map(p => <Pill key={p} name={p} />)}
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
