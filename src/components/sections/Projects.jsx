import { ArrowUpRight, Github } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { GlowCard } from '@/components/ui/spotlight-card'
import { projects } from '../../data/content'

function TagRow({ tags }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-[11px] text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function FeaturedCard({ p, glow }) {
  return (
    <GlowCard
      glowColor={glow}
      data-reveal="scale"
      className="reveal p-8 transition-all duration-500"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
      />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            {p.award && (
              <span className="mono-label mb-3 inline-block">🏆 {p.award}</span>
            )}
            <h3 className="font-display text-2xl font-semibold text-fg">{p.name}</h3>
            <p className="mt-1 text-sm text-accent">{p.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} GitHub repository`}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/50 hover:text-fg"
              >
                <Github size={16} />
              </a>
            )}
            <span className="font-mono text-xs text-muted">{p.year}</span>
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-muted">{p.blurb}</p>

        {p.points.length > 0 && (
          <ul className="mt-4 space-y-2">
            {p.points.map((pt, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                {pt}
              </li>
            ))}
          </ul>
        )}

        <TagRow tags={p.tags} />
      </div>
    </GlowCard>
  )
}

function MiniCard({ p }) {
  return (
    <article
      data-reveal="up"
      className="reveal glow-border group relative overflow-hidden rounded-2xl border border-line bg-surface/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">{p.name}</h3>
          <p className="mt-0.5 text-sm text-accent">{p.subtitle}</p>
        </div>
        {p.github ? (
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${p.name} GitHub repository`}
            className="text-muted transition-colors hover:text-accent"
          >
            <ArrowUpRight
              size={18}
              className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </a>
        ) : (
          <span />
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.blurb}</p>
      <TagRow tags={p.tags} />

      {p.github && (
        <a
          href={p.github}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-fg"
        >
          <Github size={15} />
          View repository
        </a>
      )}
    </article>
  )
}

export default function Projects() {
  const featured = projects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const priority = {
        ShadowOps: 0,
        'Little Lemon Restaurant API': 1,
        'Adaptive Rover-Drone Autonomy': 2,
        Voix: 3,
      }
      return (priority[a.name] ?? 99) - (priority[b.name] ?? 99)
    })
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section" data-accent="grey">
      <SectionBg variant="orbs" />
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Projects"
          title="Things I've designed, built, and shipped."
          kicker="From a voice OS for Windows to offline computer-vision tools — a mix of hackathon wins and deep-dive builds."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((p) => (
            <FeaturedCard key={p.name} p={p} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <MiniCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
