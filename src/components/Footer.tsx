import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks, site } from '../data/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand">{site.name}</div>
          <p className="footer-tagline">以诗心造境，为有志之品牌写就数字长卷。</p>
        </div>
        <div>
          <div className="footer-col-title">目录</div>
          <div className="footer-links">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} data-cursor="前往">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-col-title">网站</div>
          <div className="footer-links">
            {site.sites.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" data-cursor="打开">
                {s.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-col-title">信笺</div>
          <div className="footer-links">
            <a href={`mailto:${site.email}`} data-cursor="邮件">
              {site.email}
            </a>
            <a href={site.qqLink} data-cursor="QQ">
              QQ {site.qq}
            </a>
            <Link to="/" data-cursor="归去">
              归去来兮
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {site.name} · 墨未干</span>
        <div className="footer-bottom-links">
          {site.sites.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
          <span>QQ {site.qq}</span>
        </div>
      </div>
    </footer>
  )
}
