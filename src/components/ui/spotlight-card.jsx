import { useRef } from 'react'
import { cn } from '@/lib/utils'

const GLOW = {
  cyan: '34 211 238',
  violet: '124 58 237',
  blue: '59 130 246',
  emerald: '16 185 129',
  rose: '244 63 94',
  orange: '249 115 22',
}

// A card with a spotlight glow that follows the cursor (easemize spotlight-card).
export function GlowCard({ children, className, glowColor, ...props }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  // Falls back to the inherited section accent (--accent) when no explicit color.
  const glow = glowColor && GLOW[glowColor] ? GLOW[glowColor] : 'var(--accent)'

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn('glow-card group', className)}
      style={{ '--glow': glow }}
      {...props}
    >
      <div className="glow-card__spot" aria-hidden="true" />
      <div className="glow-card__border" aria-hidden="true" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
