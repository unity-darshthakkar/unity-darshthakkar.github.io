import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { profile, stats, education } from '../../data/content'

export default function About() {
  return (
    <section id="about" className="section" data-accent="green">
      <SectionBg variant="dots" />
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div className="space-y-6">
            <SectionHeading
              index="01"
              label="About"
              title="I turn research ideas into shipping software."
            />
            <p className="reveal text-lg leading-relaxed text-muted" data-reveal="left">
              {profile.summary}
            </p>
            <p className="reveal text-lg leading-relaxed text-muted" data-reveal="left">
              I&apos;m a CS + Data Science student at{' '}
              <span className="text-fg">UW–Madison</span>, currently researching
              robot programming interfaces at the{' '}
              <span className="text-fg">People and Robots Lab</span>. I care about
              systems that run locally, respect privacy, and feel effortless to use —
              whether that&apos;s a voice OS, an offline legal assistant, or a gesture
              controller.
            </p>

            <div className="reveal glass-card p-6" data-reveal="left">
              <p className="mono-label mb-3">Education</p>
              <p className="font-display text-xl font-semibold text-fg">
                {education.school}
              </p>
              <p className="mt-1 text-lg text-fg">{education.degree}</p>
              <p className="mt-2 text-base text-muted">{education.detail}</p>
            </div>
          </div>

          <div className="space-y-4 self-start md:mt-9">
            <div
              className="reveal glow-border overflow-hidden rounded-2xl border border-line"
              data-reveal="scale"
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="reveal glass-card p-5" data-reveal="scale">
                  <div className="font-display text-3xl font-semibold text-gradient">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm leading-snug text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
