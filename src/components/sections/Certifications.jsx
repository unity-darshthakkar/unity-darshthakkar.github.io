import { Award } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { certifications } from '../../data/content'

export default function Certifications() {
  return (
    <section id="certifications" className="section" data-accent="blue">
      <SectionBg variant="orbs" />
      <div className="container-page">
        <SectionHeading
          index="05"
          label="Certifications"
          title="Certifications & credentials."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((c) => (
            <div
              key={c.name}
              className="reveal flex items-start gap-4 glass-card p-5"
              data-reveal="left"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-accent2/20 text-accent">
                <Award size={18} />
              </span>
              <div>
                <p className="font-medium leading-snug text-fg">{c.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {c.issuer} · {c.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
