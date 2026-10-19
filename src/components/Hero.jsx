import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { useApp } from '../context/AppContext'
import { ArrowDown } from './icons'

gsap.registerPlugin(useGSAP, SplitText)

function LocalTime({ lang }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  const fmt = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo',
  })
  return <time dateTime={now.toISOString()}>{fmt.format(now)}</time>
}

// The portrait lands as /photo.webp; until then the panel shows the monogram.
function Portrait({ alt }) {
  const [missing, setMissing] = useState(false)
  return (
    <figure className="portrait" data-hero="portrait">
      {missing
        ? <span className="portrait-fallback" aria-hidden="true">LG</span>
        : (
          <img
            src="/photo.webp"
            alt={alt}
            width="960"
            height="1200"
            decoding="async"
            fetchpriority="high"
            onError={() => setMissing(true)}
          />
        )}
    </figure>
  )
}

export default function Hero() {
  const { tr, lang } = useApp()
  const h = tr.hero
  const scope = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', (context) => {
      const root = scope.current
      const name = root.querySelector('.hero-name')
      const fades = root.querySelectorAll('[data-hero="fade"]')
      const portrait = root.querySelector('[data-hero="portrait"]')
      gsap.set(name, { autoAlpha: 0 })
      gsap.set(fades, { autoAlpha: 0, y: 18 })
      gsap.set(portrait, { clipPath: 'inset(100% 0% 0% 0%)' })

      let split
      let cancelled = false
      // Split only after Mona Sans is in: the wide cut changes the line breaks.
      document.fonts.ready.then(() => {
        if (cancelled) return
        context.add(() => {
          split = SplitText.create(name, { type: 'chars', mask: 'chars' })
          gsap.timeline({ defaults: { ease: 'expo.out' } })
            .set(name, { autoAlpha: 1 })
            .from(split.chars, { yPercent: 115, duration: 1.15, stagger: 0.024 })
            .to(portrait, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 }, 0.1)
            .to(fades, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.4)
        })
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    })
  }, { scope })

  return (
    <section id="top" className="hero" ref={scope} aria-labelledby="hero-name">
      <div className="hero-grid">
        <h1 id="hero-name" className="hero-name">
          <span className="hero-line">Leonardo</span>{' '}
          <span className="hero-line">Gotardo</span>
        </h1>

        <div className="hero-copy">
          <p className="hero-role" data-hero="fade">{h.role}</p>
          <p className="hero-value" data-hero="fade">{h.value}</p>
          <div className="hero-actions" data-hero="fade">
            <a className="btn btn-primary" href="#contact">
              {h.cta}
              <ArrowDown />
            </a>
            <a className="btn btn-ghost" href={h.resumeFile} download>{h.downloadResume}</a>
          </div>
          <p className="hero-meta" data-hero="fade">
            <span>{h.location}</span>
            <span aria-hidden="true">·</span>
            <span><LocalTime lang={lang} /> {h.localTime}</span>
          </p>
        </div>

        <Portrait alt={h.photoAlt} />
      </div>
    </section>
  )
}
