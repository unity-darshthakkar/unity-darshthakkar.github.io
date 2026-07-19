import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { involvement } from '../../data/content'

export default function Involvement() {
  return (
    <section id="involvement" className="section" data-accent="green">
      <SectionBg variant="beams" />
      <div className="container-page">
        <SectionHeading
          index="06"
          label="Involvement"
          title="Beyond the code."
        />

        <div className="glass-card divide-y divide-line/60">
          {involvement.map((item) => (
            <div
              key={item.role + item.org}
              className="reveal grid gap-1 p-6 sm:grid-cols-[180px_1fr]"
              data-reveal="left"
            >
              <div className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                <span className="font-display font-semibold text-fg">{item.role}</span>
              </div>
              <div className="leading-relaxed text-muted">
                <span className="text-fg">{item.org}</span>
                {item.detail && <> — {item.detail}</>}
                <span className="ml-1 whitespace-nowrap font-mono text-xs text-accent">
                  {' '}
                  ({item.period})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
