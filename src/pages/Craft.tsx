import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { capabilities } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Craft() {
  usePageMeta('三昧 — XGOUO', '观物取象 · 以代码入诗 · 字舞风生。')

  return (
    <div className="page">
      <PageHero
        index="02 — 手中三昧"
        title={
          <>
            工不
            <br />
            可<em>欺</em>
          </>
        }
        lead="三门功夫，一门心性：看见、写就、点化。技术藏于意境之后，工艺显于毫厘之间。"
      />

      <div className="craft-list">
        {capabilities.map((c, i) => {
          const Icon = c.icon
          return (
            <article key={c.title} className="craft-row" data-reveal>
              <div className="craft-row-index">0{i + 1}</div>
              <div className="craft-row-main">
                <div className="cap-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </div>
                <h2>{c.title}</h2>
                <p>{c.desc}</p>
                <ul>
                  {c.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <span className="cap-tag">{c.tag}</span>
              </div>
            </article>
          )
        })}
      </div>

      <section className="cta" data-reveal>
        <div className="cta-inner">
          <h2 className="cta-title">
            以何
            <br />
            <em>入卷</em>
          </h2>
          <p className="cta-desc">若你的念头需要被认真对待，请来信。</p>
          <Link to="/contact" className="cta-btn" data-cursor="投书">
            投书问道 <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
