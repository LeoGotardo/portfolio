import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const sectionIds = ['about', 'experience', 'skills', 'projects', 'certificates', 'contact']

export default function Nav() {
  const { theme, toggleTheme, lang, toggleLang, tr } = useApp()
  const [hidden,        setHidden]        = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > lastY.current && y > 80)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px' })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="nav" className={hidden ? 'hidden' : ''}>
      <span className="nav-logo">LG<span>.</span></span>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} onClick={closeMenu}>
        {tr.nav.map((label, i) => (
          <li key={sectionIds[i]}>
            <a
              href={`#${sectionIds[i]}`}
              className={activeSection === sectionIds[i] ? 'active' : ''}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-controls">
        <button
          className="nav-toggle-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="nav-toggle-btn"
          onClick={toggleLang}
          aria-label={lang === 'en' ? 'Mudar para Português' : 'Switch to English'}
          title={lang === 'en' ? 'PT' : 'EN'}
        >
          {lang === 'en' ? 'PT' : 'EN'}
        </button>
      </div>

      <button
        className={`hamburger${menuOpen ? ' open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(o => !o)}
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}
