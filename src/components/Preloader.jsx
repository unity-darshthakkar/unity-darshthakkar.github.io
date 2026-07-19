import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const STATUS = [
  'initializing systems',
  'loading neural weights',
  'compiling shaders',
  'assembling particles',
  'almost ready',
]

export default function Preloader({ onDone }) {
  const rootRef = useRef(null)
  const [pct, setPct] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const DURATION = reduce ? 600 : 3600
    let raf
    let start = null

    const tick = (t) => {
      if (start === null) start = t
      const p = Math.min(1, (t - start) / DURATION)
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setPct(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.25,
          onStart: onDone,
          onComplete: () => setHidden(true),
        })
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  if (hidden) return null

  const statusIndex = Math.min(STATUS.length - 1, Math.floor((pct / 100) * STATUS.length))

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent)) 0%, transparent 60%)' }}
      />

      {/* animated monogram */}
      <div className="relative mb-10 grid h-24 w-24 place-items-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgb(var(--line))"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#pg)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 46}
            strokeDashoffset={2 * Math.PI * 46 * (1 - pct / 100)}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgb(var(--accent))" />
              <stop offset="1" stopColor="rgb(var(--accent2))" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display text-3xl font-semibold text-gradient">DT</span>
      </div>

      {/* progress readout */}
      <div className="w-[min(78vw,320px)]">
        <div className="mb-3 flex items-end justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {STATUS[statusIndex]}
          </span>
          <span className="font-mono text-sm tabular-nums text-fg">
            {String(pct).padStart(3, '0')}%
          </span>
        </div>
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line">
          <div
            className="relative h-full rounded-full shimmer"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--accent2)))',
            }}
          />
        </div>
      </div>

      <p className="absolute bottom-10 font-display text-sm tracking-wide text-muted">
        Darsh Thakkar — AI / ML Engineer
      </p>
    </div>
  )
}
