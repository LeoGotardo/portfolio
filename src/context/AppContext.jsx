import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [lang,  setLang]  = useState(() => localStorage.getItem('lang')  || 'en')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleLang  = () => setLang(l  => l  === 'en'   ? 'pt'    : 'en')

  return (
    <AppCtx.Provider value={{ theme, toggleTheme, lang, toggleLang, tr: translations[lang] }}>
      {children}
    </AppCtx.Provider>
  )
}

export const useApp = () => useContext(AppCtx)
