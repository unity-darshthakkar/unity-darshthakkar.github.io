import { useEffect, useRef, useState } from 'react'
import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react'
import { SplineScene } from '@/components/ui/spline-scene'
import { Spotlight } from '@/components/ui/spotlight'
import { Card } from '@/components/ui/card'
import { GooeyText } from '@/components/ui/gooey-text'
import { profile } from '../../data/content'

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function Hero() {
  const [sceneLoaded, setSceneLoaded] = useState(false)
  const splineRef = useRef(null)

  // Pause the Spline render loop while the hero is off-screen so it doesn't
  // keep taxing the GPU during the sections below (big smoothness win).
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const app = splineRef.current
        if (!app) return
        try {
          if (entry.isIntersecting) app.play?.()
          else app.stop?.()
        } catch {
          /* older runtime without play/stop — ignore */
        }
      },
      { threshold: 0.02 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [sceneLoaded])

  // Let the robot track the cursor across the WHOLE hero (not just its canvas)
  // by forwarding pointer moves anywhere in the hero to the Spline canvas.
  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero || !sceneLoaded) return
    let canvas = null
    const onMove = (e) => {
      canvas = canvas || hero.querySelector('canvas')
      if (!canvas || e.target === canvas) return // canvas already gets native events
      const opts = {
        clientX: e.clientX,
        clientY: e.clientY,
        bubbles: true,
        cancelable: true,
        pointerType: 'mouse',
      }
      canvas.dispatchEvent(new PointerEvent('pointermove', opts))
      canvas.dispatchEvent(new MouseEvent('mousemove', opts))
    }
    hero.addEventListener('pointermove', onMove, { passive: true })
    return () => hero.removeEventListener('pointermove', onMove)
  }, [sceneLoaded])

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-24 pb-16">
      <div className="container-page">
        <Card className="relative h-auto w-full overflow-hidden border-white/10 bg-[#050506] md:h-[600px]">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

          {/* On desktop: text column (left) + robot (right).
              On mobile: name (A) → robot → description (B), via `contents`. */}
          <div className="flex h-full flex-col md:flex-row">
            {/* Text wrapper — collapses to `contents` on mobile so its two halves
                can sit on either side of the robot in the flex order. */}
            <div className="contents md:flex md:flex-1 md:flex-col md:justify-center md:p-12">
              {/* A — label + name + gooey roles */}
              <div className="relative z-10 order-1 px-8 pt-10 md:order-none md:p-0">
                <p className="mono-label mb-5 flex items-center gap-2 text-cyan-300">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse-dot" />
                  {profile.location} · Open to full-time roles · 2027
                </p>

                <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tightest text-transparent sm:text-6xl md:text-7xl">
                  <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text">
                    Darsh
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text">
                    Thakkar
                  </span>
                </h1>

                <div className="mt-4 h-12">
                  <GooeyText
                    texts={profile.roles}
                    morphTime={2}
                    cooldownTime={1}
                    className="h-12 w-[340px]"
                    textClassName="font-display text-3xl md:text-4xl font-semibold text-cyan-300 whitespace-nowrap"
                  />
                </div>
              </div>

              {/* B — description + CTAs */}
              <div className="relative z-10 order-3 px-8 pb-10 md:order-none md:p-0">
                <p className="mt-2 max-w-md text-base leading-relaxed text-neutral-300 sm:text-lg md:mt-6">
                  {profile.tagline} I build LLM systems, robotics interfaces, and
                  privacy-first, offline AI tools.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a href="#projects" className="btn-primary">
                    View my work
                  </a>
                  {/* Preview résumé in a new tab */}
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-flex border border-white/15 bg-white/5 text-white transition-colors hover:border-cyan-300/60 hover:bg-white/10"
                  >
                    <FileText size={16} /> Résumé
                  </a>
                  <div className="ml-1 flex items-center gap-1">
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-cyan-300/60 hover:text-white"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-cyan-300/60 hover:text-white"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Robot — order-2 on mobile places it between name and description */}
            <div className="relative order-2 h-[320px] w-full md:order-none md:h-auto md:w-auto md:flex-1">
              {!sceneLoaded && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="loader" />
                </div>
              )}
              <SplineScene
                scene={SPLINE_SCENE}
                className="h-full w-full"
                onLoad={(app) => {
                  splineRef.current = app
                  setSceneLoaded(true)
                }}
              />
              <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                drag / move me
              </div>
            </div>
          </div>
        </Card>

        {/* scroll cue */}
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-muted">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em]">
              Scroll
            </span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
