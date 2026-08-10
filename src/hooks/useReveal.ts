import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useReveal(ready = true) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!ready) return

    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.opacity = '1'
            el.style.transform = 'none'
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(40px)'
      el.style.transition = `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 5) * 0.07}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 5) * 0.07}s`
      io.observe(el)
    })

    return () => io.disconnect()
  }, [ready, pathname])
}
