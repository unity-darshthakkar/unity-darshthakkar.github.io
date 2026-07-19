export default function SectionHeading({ index, label, title, kicker }) {
  return (
    <div className="mb-14 max-w-2xl">
      <div className="reveal mono-label mb-4 flex items-center gap-3">
        <span className="tabular-nums text-muted">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span>{label}</span>
      </div>
      <h2 className="reveal font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {kicker && <p className="reveal mt-4 text-lg text-muted">{kicker}</p>}
    </div>
  )
}
