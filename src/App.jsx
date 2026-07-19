import { useCallback, useEffect, useRef, useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Background from './components/Background'
import Cursor from './components/Cursor'
import Hero from './components/hero/Hero'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Certifications from './components/sections/Certifications'
import Involvement from './components/sections/Involvement'
import Contact from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'
import { useScrollReveal } from './hooks/useScrollReveal'

export default function App() {
  const [started, setStarted] = useState(false)
  const doneRef = useRef(false)

  useLenis(started)
  useScrollReveal(started)

  useEffect(() => {
    document.body.classList.toggle('is-loading', !started)
  }, [started])

  // Smart border glow: one listener updates the hovered card's --mx/--my so
  // the border lights up nearest the cursor. Covers every .glass-card / .glow-border.
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest('.glass-card, .glow-border')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const handleDone = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    setStarted(true)
  }, [])

  // Safety net: never let the preloader trap the page if a frame callback stalls.
  useEffect(() => {
    const t = setTimeout(handleDone, 6000)
    return () => clearTimeout(t)
  }, [handleDone])

  return (
    <>
      <Preloader onDone={handleDone} />
      <Cursor />
      <Background />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Involvement />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
