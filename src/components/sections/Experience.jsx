import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { experience } from '../../data/content'

export default function Experience() {
  return (
    <section id="experience" className="section" data-accent="blue">
      <SectionBg variant="beams" />
      <div className="container-page">
        <SectionHeading
          index="02"
          label="Experience"
          title="Where I've worked & researched."
        />

        <div className="relative">
          {/* timeline spine */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[9px]" />

          <div className="space-y-10">
            {experience.map((job) => (
              <div
                key={job.role + job.org}
                className="reveal relative pl-8 md:pl-12"
                data-reveal="left"
              >
                <span className="absolute left-0 top-1.5 grid h-[18px] w-[18px] place-items-center rounded-full border border-line bg-bg">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      job.current ? 'bg-accent animate-pulse-dot' : 'bg-muted'
                    }`}
                  />
                </span>

                <div className="glass-card p-6 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-fg">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-accent">{job.period}</span>
                  </div>
                  <p className="mt-1 text-muted">
                    {job.org} · <span className="text-sm">{job.location}</span>
                  </p>

                  <ul className="mt-4 space-y-2">
                    {job.points.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-line bg-elevated/60 px-3 py-1 font-mono text-xs text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
