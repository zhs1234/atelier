import { useEffect, useState } from 'react'

type Props = {
  onDone: () => void
}

export default function Loader({ onDone }: Props) {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let frame = 0
    let current = 0
    const target = 100

    const tick = () => {
      current += Math.random() * 4.5 + 1.2
      if (current >= target) {
        current = target
        setPct(100)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 650)
        }, 350)
        return
      }
      setPct(Math.floor(current))
      frame = requestAnimationFrame(tick)
    }

    const start = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, 200)

    return () => {
      clearTimeout(start)
      cancelAnimationFrame(frame)
    }
  }, [onDone])

  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden={done}>
      <div className="loader-top">
        <div className="loader-logo">XGOUO</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${pct}%` }} />
        </div>
        <div className="loader-pct">{String(pct).padStart(3, '0')}%</div>
      </div>
      <div className="loader-bottom">
        <span>墨将浓</span>
        <span>卷将开</span>
      </div>
    </div>
  )
}
