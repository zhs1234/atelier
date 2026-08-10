import { ArrowUpRight, Layers, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { projects } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Work() {
  usePageMeta('卷轴 — XGOUO', '案上精选数字长卷。')

  return (
    <div className="page">
      <PageHero
        index="01 — 案上卷轴"
        title={
          <>
            余音
            <br />
            未<em>绝</em>
          </>
        }
        lead="每一卷皆是一次造境：叙事为骨，光影为墨，交互为呼吸。"
        kicker="Selected Works"
      />

      <div className="work-grid">
        {projects.map((p) => (
          <Link key={p.slug} to={`/work/${p.slug}`} className="work-card" data-cursor="展卷" data-reveal>
            <div className="work-card-cover" style={{ background: p.cover }}>
              <span className="work-card-num">{p.num}</span>
              <span className="work-card-year">{p.year}</span>
            </div>
            <div className="work-card-body">
              <h2 className="work-card-title">{p.title}</h2>
              <p className="work-card-summary">{p.summary}</p>
              <div className="work-card-meta">
                <span>
                  <Sparkles size={12} />
                  {p.role}
                </span>
                <span>
                  <Layers size={12} />
                  {p.type}
                </span>
                <span className="work-card-go">
                  展卷 <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
