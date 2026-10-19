import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { translations } from '../i18n/translations'

const AppCtx = createContext(null)

const readStored = (key) => {
  try { return localStorage.getItem(key) } catch { return null }
}
const writeStored = (key, value) => {
  try { localStorage.setItem(key, value) } catch { /* private mode: keep in memory only */ }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => (readStored('theme') === 'dark' ? 'dark' : 'light'))
  const [lang,  setLang]  = useState(() => (readStored('lang') === 'pt' ? 'pt' : 'en'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0c0f17' : '#f4f7fc')
    writeStored('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    writeStored('lang', lang)
  }, [lang])

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      setTheme(next)
      return
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)))
  }, [theme])

  const toggleLang = useCallback(() => setLang(l => (l === 'en' ? 'pt' : 'en')), [])

  return (
    <AppCtx.Provider value={{ theme, toggleTheme, lang, toggleLang, tr: translations[lang] }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
