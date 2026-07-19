import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync.
export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.__lenis = lenis
    // Start at the very top so a reload never begins mid-page.
    lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // recalc trigger positions once fonts / layout settle
    const refresh = () => ScrollTrigger.refresh()
    const t = setTimeout(refresh, 300)
    window.addEventListener('load', refresh)

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [enabled])
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -72 })
  else el.scrollIntoView({ behavior: 'smooth' })
}
