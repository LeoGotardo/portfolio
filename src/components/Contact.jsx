import { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import Reveal from './Reveal'
import { ArrowUpRight, Copy, Check } from './icons'

const EMAIL = 'contato@leogotardo.com.br'

export default function Contact() {
  const { tr } = useApp()
  const c = tr.contact
  const [status, setStatus] = useState('idle') // idle | copied | failed
  const copied = status === 'copied'

  useEffect(() => {
    if (status === 'idle') return
    const id = setTimeout(() => {
      if (status === 'failed') window.location.href = `mailto:${EMAIL}`
      setStatus('idle')
    }, status === 'failed' ? 900 : 2200)
    return () => clearTimeout(id)
  }, [status])

  // Clipboard can be blocked (insecure context, permissions): say so, then fall back to the mail app.
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="contact-title">{c.title}</h2>
        <Reveal>
          <p className="contact-intro">{c.intro}</p>
          <div className="contact-email-row">
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" className="btn btn-on-blue" onClick={copy}>
              {copied ? <Check /> : <Copy />}
              {copied ? c.copied : c.copy}
            </button>
            <span className={status === 'failed' ? 'contact-status' : 'visually-hidden'} role="status" aria-live="polite">
              {copied ? c.copied : status === 'failed' ? c.copyFailed : ''}
            </span>
          </div>
          <ul className="contact-links">
            <li>
              <a href="https://www.linkedin.com/in/leogotardo/" target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight />
              </a>
            </li>
            <li>
              <a href="https://github.com/LeoGotardo" target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight />
              </a>
            </li>
            <li><a href={tr.hero.resumeFile} download>{c.resume}</a></li>
            <li><a href="tel:+5543988177963">{c.phone}: +55 43 98817-7963</a></li>
          </ul>
          <p className="contact-tlg">
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(c.tlgSubject)}`}>{c.tlg}</a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
