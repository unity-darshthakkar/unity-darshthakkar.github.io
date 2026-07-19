import { useEffect, useRef } from 'react'

// Custom cursor: an instant dot + a smoothed ring that brightens/scales over
// interactive elements. Ported from the previous site. Fine-pointer only —
// touch devices keep their native behavior.
const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], .glow-card, .glass-card, .glow-border'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }
    const loop = () => {
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      rx += (mx - rx) * 0.2
      ry += (my - ry) * 0.2
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      raf = requestAnimationFrame(loop)
    }
    loop()

    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) ring.classList.add('cursor-hover')
    }
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) ring.classList.remove('cursor-hover')
    }
    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }
    const onDown = () => ring.classList.add('cursor-down')
    const onUp = () => ring.classList.remove('cursor-down')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
