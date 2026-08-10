import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, projects, site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined

  usePageMeta(project ? `${project.title} — XGOUO` : '卷轴 — XGOUO')

  if (!project) return <Navigate to="/work" replace />

  const idx = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]
  const links = project.links ?? []

  return (
    <div className="page detail-page">
      <Link to="/work" className="detail-back" data-cursor="返回" data-reveal>
        <ArrowLeft size={16} />
        返回卷轴
      </Link>

      <div className="detail-hero" data-reveal>
        <div className="detail-hero-cover" style={{ background: project.cover }}>
          <span>{project.num}</span>
        </div>
        <div className="detail-hero-copy">
          <div className="section-index">
            {project.year} · {project.type}
          </div>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-summary">{project.summary}</p>
          <div className="detail-facts">
            <div>
              <span>角色</span>
              <strong>{project.role}</strong>
            </div>
            <div>
              <span>周期</span>
              <strong>{project.duration}</strong>
            </div>
            <div>
              <span>委托</span>
              <strong>{project.client}</strong>
            </div>
          </div>
          {links.length > 0 ? (
            <div className="detail-links">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={`detail-link-btn${l.label === '观其境' ? ' primary' : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={l.label}
                >
                  {l.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="detail-verses" data-reveal>
        {project.verses.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>

      <div className="detail-body">
        <div className="detail-prose" data-reveal>
          {project.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
          <p className="detail-outcome">{project.outcome}</p>
        </div>
        <aside className="detail-aside" data-reveal>
          <div className="detail-aside-block">
            <h3>器用</h3>
            <ul>
              {project.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {links.length > 0 ? (
            <div className="detail-aside-block">
              <h3>观其境</h3>
              <div className="detail-aside-links">
                {links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" data-cursor={l.label}>
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          ) : null}
          <div className="detail-aside-block">
            <h3>同题而作</h3>
            <a href={`mailto:${site.email}?subject=关于「${project.title}」`} data-cursor="投书">
              投书问道 <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
      </div>

      <div className="detail-nav" data-reveal>
        <Link to={`/work/${prev.slug}`} className="detail-nav-item" data-cursor="上卷">
          <span>上卷</span>
          <strong>{prev.title}</strong>
        </Link>
        <Link to={`/work/${next.slug}`} className="detail-nav-item right" data-cursor="下卷">
          <span>下卷</span>
          <strong>
            {next.title} <ArrowRight size={16} />
          </strong>
        </Link>
      </div>
    </div>
  )
}
