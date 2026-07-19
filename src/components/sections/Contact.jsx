import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { profile, gmailCompose } from '../../data/content'

export default function Contact() {
  return (
    <section id="contact" className="section" data-accent="teal">
      <SectionBg variant="aurora" />
      <div className="container-page">
        <div
          className="reveal glow-border relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-10 sm:p-14"
          data-reveal="zoom"
        >
          {/* soft inner glow — radial gradients, no expensive blur filter */}
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.5) 0%, transparent 62%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgb(var(--accent2) / 0.5) 0%, transparent 62%)' }}
          />

          <div className="relative">
            <SectionHeading
              index="05"
              label="Contact"
              title="Let's build something."
              kicker="I'm a final-year student graduating May 2027, seeking full-time roles in ML, AI systems, and full-stack. My inbox is always open."
            />

            <div className="flex flex-wrap gap-3">
              <a
                href={gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Mail size={16} /> Say hello
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Github size={16} /> GitHub
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
              <a
                href={gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted transition-colors hover:text-fg"
              >
                <Mail size={18} className="text-accent" />
                <span className="text-sm">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-3 text-muted transition-colors hover:text-fg"
              >
                <Phone size={18} className="text-accent" />
                <span className="text-sm">{profile.phone}</span>
              </a>
              <div className="flex items-center gap-3 text-muted">
                <MapPin size={18} className="text-accent" />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
