import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AmbientMusic from './AmbientMusic'
import Cursor from './Cursor'
import Footer from './Footer'
import Loader from './Loader'
import Menu from './Menu'
import Nav from './Nav'
import WebGLBackground from './WebGLBackground'
import { useReveal } from '../hooks/useReveal'

function formatTime(d: Date) {
  return d.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export default function Layout() {
  const [loaded, setLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState(() => formatTime(new Date()))
  const [coords, setCoords] = useState({ x: '0.000', y: '0.000' })
  const location = useLocation()
  const onLoaded = useCallback(() => setLoaded(true), [])

  useReveal(loaded)

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCoords({
        x: (e.clientX / window.innerWidth).toFixed(3),
        y: (e.clientY / window.innerHeight).toFixed(3),
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const cards = document.querySelectorAll<HTMLElement>('.cap-card')
    const cleaners: Array<() => void> = []
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
      }
      card.addEventListener('mousemove', onMove)
      cleaners.push(() => card.removeEventListener('mousemove', onMove))
    })
    return () => cleaners.forEach((fn) => fn())
  }, [loaded, location.pathname])

  return (
    <>
      {!loaded && <Loader onDone={onLoaded} />}
      <Cursor />
      <div className="noise" aria-hidden="true" />
      <WebGLBackground />
      <div className="coords" aria-hidden="true">
        X {coords.x} · Y {coords.y}
      </div>
      <Nav menuOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} time={time} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <AmbientMusic unlocked={loaded} />
      <div className="site">
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
