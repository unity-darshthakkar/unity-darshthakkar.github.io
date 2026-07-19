import { profile } from '../data/content'
import { scrollToId } from '../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
        <button
          onClick={() => scrollToId('hero')}
          className="flex items-center gap-2 font-display text-sm font-medium text-muted transition-colors hover:text-fg cursor-pointer"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-accent to-accent2 text-[10px] font-bold text-black">
            DT
          </span>
          Back to top
        </button>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with React, Three.js &amp; GSAP
        </p>

        <div className="flex gap-4 text-sm text-muted">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={profile.resume} target="_blank" rel="noreferrer" className="hover:text-fg">
            Résumé
          </a>
        </div>
      </div>
    </footer>
  )
}
