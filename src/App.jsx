import { useState, useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import ParticleWeb from './components/ParticleWeb'
import MouseGlow from './components/MouseGlow'

function ScrollBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop || document.body.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div id="scroll-bar" style={{ width: `${pct}%` }} />
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      id="back-to-top"
      className={visible ? 'visible' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

function Divider() {
  return <hr className="divider" />
}

function AppInner() {
  const { tr } = useApp()
  return (
    <>
      <ScrollBar />
      <ParticleWeb />
      <MouseGlow />
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certificates />
      <Divider />
      <Contact />
      <footer>
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-logo">LG<span>.</span></span>
            <p className="footer-tagline">{tr.footer}</p>
          </div>
          <div className="footer-right">
            <a className="footer-link" href="https://github.com/LeoGotardo" target="_blank" rel="noopener">GitHub</a>
            <a className="footer-link" href="https://www.linkedin.com/in/leogotardo/" target="_blank" rel="noopener">LinkedIn</a>
            <a className="footer-link" href="mailto:leonardo.gotardo2@gmail.com">Email</a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
