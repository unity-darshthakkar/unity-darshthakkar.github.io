// Distinct decorative background per section. Pure CSS/transform animations
// (no extra WebGL contexts) so it stays smooth. Colors come from the parent
// section's `data-accent` (--c / --c2), so each section's background matches
// the rest of that section's accented elements.
export default function SectionBg({ variant }) {
  if (variant === 'dots') {
    return (
      <div className="sec-bg">
        <div className="dots" />
        <div
          className="orb h-[42vh] w-[42vh]"
          style={{
            top: '8%',
            left: '-6%',
            background: 'radial-gradient(circle, rgb(var(--c) / 0.6), transparent 65%)',
            animation: 'floatOrb 18s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  if (variant === 'beams') {
    return (
      <div className="sec-bg">
        <div className="beam" style={{ left: '8%' }} />
        <div className="beam" style={{ left: '46%', animationDelay: '-6s' }} />
        <div className="beam" style={{ left: '76%', animationDelay: '-3s' }} />
        <div
          className="orb h-[38vh] w-[38vh]"
          style={{
            top: '30%',
            right: '-6%',
            background: 'radial-gradient(circle, rgb(var(--c) / 0.5), transparent 64%)',
            animation: 'floatOrb2 22s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  if (variant === 'orbs') {
    return (
      <div className="sec-bg">
        <div
          className="orb h-[48vh] w-[48vh]"
          style={{
            top: '-6%',
            right: '-4%',
            background: 'radial-gradient(circle, rgb(var(--c) / 0.6), transparent 62%)',
            animation: 'floatOrb 20s ease-in-out infinite',
          }}
        />
        <div
          className="orb h-[40vh] w-[40vh]"
          style={{
            bottom: '-8%',
            left: '-6%',
            background: 'radial-gradient(circle, rgb(var(--c2) / 0.55), transparent 62%)',
            animation: 'floatOrb2 24s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className="sec-bg">
        <div className="persp-grid" />
        <div
          className="orb h-[36vh] w-[36vh]"
          style={{
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgb(var(--c) / 0.35), transparent 66%)',
            animation: 'floatOrb 20s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  if (variant === 'aurora') {
    return (
      <div className="sec-bg">
        <div
          className="orb h-[48vh] w-[48vh]"
          style={{
            top: '-10%',
            left: '10%',
            background: 'radial-gradient(circle, rgb(var(--c) / 0.5), transparent 60%)',
            animation: 'floatOrb 22s ease-in-out infinite',
          }}
        />
        <div
          className="orb h-[42vh] w-[42vh]"
          style={{
            bottom: '-12%',
            right: '8%',
            background: 'radial-gradient(circle, rgb(var(--c2) / 0.5), transparent 60%)',
            animation: 'floatOrb2 26s ease-in-out infinite',
          }}
        />
      </div>
    )
  }

  return null
}
