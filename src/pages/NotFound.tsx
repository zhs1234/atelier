import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('迷津 — XGOUO')

  return (
    <div className="page notfound-page">
      <div data-reveal>
        <div className="section-index">404</div>
        <h1 className="page-hero-title">
          此卷
          <br />
          <em>未载</em>
        </h1>
        <p className="page-hero-lead">路走到了雾里。回首，或从头再来。</p>
        <Link to="/" className="cta-btn" data-cursor="归去">
          归去来兮
        </Link>
      </div>
    </div>
  )
}
