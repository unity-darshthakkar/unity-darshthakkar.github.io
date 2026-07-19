// Global fixed backdrop behind everything — a faint grid + two slow drifting
// glows that tie all the sections together.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="grid-lines" />
      <div
        className="orb h-[55vh] w-[55vh]"
        style={{
          top: '30%',
          left: '-10%',
          opacity: 0.18,
          background: 'radial-gradient(circle, rgb(148 163 184 / 0.6), transparent 60%)',
          animation: 'floatOrb 26s ease-in-out infinite',
        }}
      />
      <div
        className="orb h-[50vh] w-[50vh]"
        style={{
          bottom: '5%',
          right: '-8%',
          opacity: 0.16,
          background: 'radial-gradient(circle, rgb(52 211 153 / 0.5), transparent 60%)',
          animation: 'floatOrb2 30s ease-in-out infinite',
        }}
      />
      {/* subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, transparent 55%, rgb(var(--bg) / 0.55) 100%)',
        }}
      />
    </div>
  )
}
