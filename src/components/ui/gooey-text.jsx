import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Fluid "gooey" morphing between a list of words using a blur + threshold filter.
export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}) {
  const text1Ref = useRef(null)
  const text2Ref = useRef(null)

  useEffect(() => {
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let raf

    const setMorph = (fraction) => {
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return

      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const inv = 1 - fraction
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`

      t1.textContent = texts[textIndex % texts.length]
      t2.textContent = texts[(textIndex + 1) % texts.length]
    }

    const doCooldown = () => {
      morph = 0
      const t1 = text1Ref.current
      const t2 = text2Ref.current
      if (!t1 || !t2) return
      t2.style.filter = ''
      t2.style.opacity = '100%'
      t1.style.filter = ''
      t1.style.opacity = '0%'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime
      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }
      setMorph(fraction)
    }

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime - time) / 1000
      time = newTime

      cooldown -= dt
      if (cooldown <= 0) {
        if (shouldIncrementIndex) textIndex++
        doMorph()
      } else {
        doCooldown()
      }
    }

    animate()
    return () => cancelAnimationFrame(raf)
  }, [texts, morphTime, cooldownTime])

  return (
    <div className={cn('relative', className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: 'url(#gooey-threshold)' }}
      >
        <span
          ref={text1Ref}
          className={cn(
            'absolute inline-block select-none text-center',
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            'absolute inline-block select-none text-center',
            textClassName,
          )}
        />
      </div>
    </div>
  )
}
