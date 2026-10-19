import { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { Sun, Moon, Menu, Close } from './icons'

export default function Nav() {
  const { theme, toggleTheme, toggleLang, tr } = useApp()
  const n = tr.nav
  const [open, setOpen]         = useState(false)
  const [active, setActive]     = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [heroCtaVisible, setHeroCtaVisible] = useState(true)
  const menuBtn = useRef(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const heroActions = document.querySelector('.hero-actions')
    if (!heroActions) return
    const obs = new IntersectionObserver(([e]) => setHeroCtaVisible(e.isIntersecting))
    obs.observe(heroActions)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    // Sections without a nav link (hero, Stack band) clear the active state.
    const ids = ['top', ...n.links.map(l => l.id), 'stack']
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [n.links])

  // While the full-screen menu is open, the page behind it leaves the tab order.
  useEffect(() => {
    const behind = [document.getElementById('main'), document.querySelector('.site-footer')]
    behind.forEach(el => { if (el) el.inert = open })
    if (!open) {
      if (wasOpen.current) menuBtn.current?.focus()
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
      behind.forEach(el => { if (el) el.inert = false })
    }
  }, [open])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">{n.skip}</a>
      <div className="header-inner">
        <a href="#top" className="wordmark" aria-label={n.home}>Leonardo Gotardo</a>

        <nav className="site-nav" aria-label={n.menu}>
          <ul id="nav-menu" className={`nav-list${open ? ' is-open' : ''}`}>
            {n.links.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-menu-cta">
              <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>{n.cta}</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={toggleLang} aria-label={n.toLang}>
            <span className="lang-code" aria-hidden="true">{n.langCode}</span>
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? n.toLight : n.toDark}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a
            className={`btn btn-primary btn-sm header-cta${heroCtaVisible ? ' is-hidden' : ''}`}
            href="#contact"
            tabIndex={heroCtaVisible ? -1 : undefined}
            aria-hidden={heroCtaVisible || undefined}
          >
            {n.cta}
          </a>
          <button
            ref={menuBtn}
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? n.close : n.menu}
            onClick={() => setOpen(o => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  )
}
