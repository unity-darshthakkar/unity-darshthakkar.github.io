import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// from-state per variant (element opts in via data-reveal="...")
const VARIANTS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: -64 },
  right: { x: 64 },
  scale: { scale: 0.9, y: 24 },
  flip: { rotateX: -55, y: 30, transformPerspective: 800, transformOrigin: 'center bottom' },
  zoom: { scale: 1.08, autoAlpha: 0 },
}

export function useScrollReveal(active) {
  useEffect(() => {
    if (!active) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.reveal', { autoAlpha: 1, x: 0, y: 0, scale: 1, rotateX: 0 })
      return
    }

    const ctx = gsap.context(() => {
      const all = gsap.utils.toArray('.reveal')
      // apply per-element from-state
      all.forEach((el) => {
        const v = VARIANTS[el.dataset.reveal] || VARIANTS.up
        gsap.set(el, { autoAlpha: 0, x: 0, y: 0, scale: 1, rotateX: 0, ...v })
      })

      const revealTo = (duration, stagger) => (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration,
          stagger,
          ease: 'power3.out',
          overwrite: true,
        })

      // Projects reveals a bit earlier + snappier than the rest.
      const early = gsap.utils.toArray('#projects .reveal')
      const normal = all.filter((el) => !early.includes(el))

      ScrollTrigger.batch(normal, {
        start: 'top 88%',
        onEnter: revealTo(0.85, 0.08),
      })
      ScrollTrigger.batch(early, {
        start: 'top 96%',
        onEnter: revealTo(0.55, 0.06),
      })

      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [active])
}
