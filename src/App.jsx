import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { AppProvider, useApp } from './context/AppContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Experience from './components/Experience'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'

function AppInner() {
  const { tr } = useApp()
  return (
    <>
      <SpeedInsights />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <p>{tr.footer}</p>
        <p>
          <a href="https://github.com/LeoGotardo/Portifoil" target="_blank" rel="noopener noreferrer">React + Vite</a>
        </p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <AppInner />
        </MotionConfig>
      </LazyMotion>
    </AppProvider>
  )
}
