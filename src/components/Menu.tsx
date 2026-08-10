import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site'

type Props = {
  open: boolean
  onClose: () => void
}

export default function Menu({ open, onClose }: Props) {
  return (
    <div className={`menu-overlay${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="menu-grid">
        <nav className="menu-nav">
          <Link to="/" className="menu-link" data-cursor="入卷" onClick={onClose}>
            <span className="menu-link-num">00</span>
            首页
          </Link>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="menu-link" data-cursor={l.cursor} onClick={onClose}>
              <span className="menu-link-num">{l.num}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="menu-side">
          <div className="menu-side-block">
            <h4>自况</h4>
            <p>XGOUO — 游于艺与器之间，以光影写意。</p>
          </div>
          <div className="menu-side-block">
            <h4>信箱</h4>
            <a href={`mailto:${site.email}`} data-cursor="投书">
              {site.email} <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="menu-side-block">
            <h4>问讯</h4>
            <p>
              <MessageCircle size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              QQ {site.qq}
            </p>
            <p style={{ marginTop: 8 }}>
              <Mail size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              {site.email}
            </p>
            <p style={{ marginTop: 8 }}>
              <MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} />
              xgouo.cn · wcnmb.top
            </p>
          </div>
        </div>
      </div>
      <div className="menu-footer">
        <span>XGOUO</span>
        <span>山高水长 · 墨未干</span>
      </div>
    </div>
  )
}
