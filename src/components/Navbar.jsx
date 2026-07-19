import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { navLinks, profile } from '../data/content'
import { scrollToId } from '../hooks/useLenis'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line/70 bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <button
          onClick={() => go('hero')}
          className="group flex items-center gap-2 font-display text-lg font-semibold cursor-pointer"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-sm font-bold text-black">
            DT
          </span>
          <span className="hidden sm:block">Darsh</span>
        </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`rounded-full px-3 py-2 text-sm transition-colors cursor-pointer ${
                active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-line px-4 py-2 text-sm text-fg transition-colors hover:border-accent/60 sm:inline-block"
          >
            Résumé
          </a>
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-fg lg:hidden cursor-pointer"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="container-page flex flex-col py-4">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="py-3 text-left font-display text-lg text-fg"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
