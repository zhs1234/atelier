import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0, lx: 0, ly: 0 })

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const dot = dotRef.current
    const label = labelRef.current
    if (!dot || !label) return

    let raf = 0

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onDown = () => dot.classList.add('click')
    const onUp = () => dot.classList.remove('click')

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      if (t) {
        dot.classList.add('hover')
        const text = t.dataset.cursor
        if (text) {
          label.textContent = text
          label.classList.add('visible')
        } else {
          label.classList.remove('visible')
        }
      }
    }

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null
      if (!related?.closest?.('[data-cursor]')) {
        dot.classList.remove('hover')
        label.classList.remove('visible')
      }
    }

    const loop = () => {
      pos.current.lx += (pos.current.x - pos.current.lx) * 0.22
      pos.current.ly += (pos.current.y - pos.current.ly) * 0.22
      dot.style.transform = `translate(${pos.current.lx}px, ${pos.current.ly}px) translate(-50%, -50%)`
      label.style.transform = `translate(${pos.current.x + 18}px, ${pos.current.y + 18}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={labelRef} className="cursor-label" />
    </>
  )
}
