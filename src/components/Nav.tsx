import { Hexagon, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
  menuOpen: boolean
  onToggle: () => void
  time: string
}

export default function Nav({ menuOpen, onToggle, time }: Props) {
  return (
    <header className={`nav${menuOpen ? ' is-open' : ''}`}>
      <Link to="/" className="nav-logo" data-cursor="首页" onClick={menuOpen ? onToggle : undefined}>
        <span className="nav-logo-mark">
          <Hexagon size={14} strokeWidth={2.2} />
        </span>
        <span className="nav-logo-text">XGOUO</span>
      </Link>
      <div className="nav-center">{time} — 东八区</div>
      <div className="nav-actions">
        <Link to="/work" className="nav-link" data-cursor="展卷">
          卷轴
        </Link>
        <Link to="/contact" className="nav-link" data-cursor="投书">
          投书
        </Link>
        <button
          type="button"
          className="nav-menu-btn"
          onClick={onToggle}
          data-cursor={menuOpen ? '关闭' : '菜单'}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
        >
          {menuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
          <span className="nav-menu-label">{menuOpen ? '关闭' : '菜单'}</span>
        </button>
      </div>
    </header>
  )
}
