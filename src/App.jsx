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

function Divider() {
  return <hr className="divider" />
}

function AppInner() {
  const { tr } = useApp()
  return (
    <>
      <ParticleWeb />
      <MouseGlow />
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Experience />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Certificates />
      <Divider />
      <Contact />
      <footer>
        <p>{tr.footer}</p>
      </footer>
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
