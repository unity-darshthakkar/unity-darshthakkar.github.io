import SectionHeading from '../SectionHeading'
import SectionBg from '../SectionBg'
import { skills } from '../../data/content'

const marquee = [
  'Python', 'C++', 'PyTorch', 'React', 'llama.cpp', 'OpenCV', 'Flask',
  'Docker', 'RAG', 'PostgreSQL', 'MediaPipe', 'Qt/QML', 'scikit-learn',
  'asyncio', 'CUDA', 'Git', 'NumPy', 'FFmpeg',
]

export default function Skills() {
  return (
    <section id="skills" className="section" data-accent="white">
      <SectionBg variant="grid" />
      <div className="container-page">
        <SectionHeading
          index="04"
          label="Skills & Toolkit"
          title="The stack I build with."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((cat) => (
            <div key={cat.group} className="reveal glass-card p-6" data-reveal="flip">
              <h3 className="mono-label mb-4">{cat.group}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-line bg-elevated/50 px-3 py-1.5 text-sm text-fg transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* full-bleed scrolling tech strip */}
      <div className="relative mt-16 overflow-hidden border-y border-line/60 py-4">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((t, i) => (
            <span
              key={i}
              className="mx-4 font-mono text-sm uppercase tracking-widest text-muted"
            >
              {t}
              <span className="ml-8 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
