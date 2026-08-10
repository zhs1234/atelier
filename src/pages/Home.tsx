import { ArrowRight, ArrowUpRight, Box, Compass, Cpu, Layers, Sparkles, Wand2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { capabilities, marqueeItems, processSteps, projects } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  usePageMeta('XGOUO — 以光写意', '以诗心造境的数字体验。')

  return (
    <>
      <section className="hero" id="top">
        <div className="hero-meta">
          <div className="hero-meta-block" data-reveal>
            <div className="meta-label">
              <Compass size={11} />
              所在
            </div>
            <p className="meta-text">居于代码与诗意的交界，形神相生。</p>
          </div>
          <div className="hero-meta-block right" data-reveal>
            <div className="meta-label">
              <Cpu size={11} />
              时令
            </div>
            <p className="meta-text">秋水未央，尚可同舟共济。</p>
          </div>
        </div>

        <div className="hero-title-wrap">
          <div className="hero-kicker" data-reveal>
            XGOUO / 以光写意
          </div>
          <h1 className="hero-title">
            <span className="line">
              <span className="word" data-reveal>
                落笔
              </span>
            </span>
            <span className="line">
              <span className="word italic" data-reveal>
                成江海
              </span>
            </span>
          </h1>
        </div>

        <div className="hero-bottom">
          <p className="hero-desc" data-reveal>
            浏览器为纸，光影为墨——界面如呼吸，叙事如行云流水。
          </p>
          <div className="scroll-hint" data-reveal>
            <span>顺流而下</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      <div className="marquee-section" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={`${item}-${i}`} className={`marquee-item${i % 2 === 1 ? ' outline' : ''}`}>
              {item}
              <span className="dot" />
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-index" data-reveal>
              <Box size={12} />
              01 — 案上卷轴
            </div>
            <h2 className="section-title" data-reveal>
              余音
              <br />
              未<em>绝</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            精选数卷数字长卷——叙事、动势与技艺，于此合而为一。
          </p>
        </div>

        <div className="projects">
          {projects.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="project" data-cursor="展卷" data-reveal>
              <span className="project-num">{p.num}</span>
              <h3 className="project-title">{p.title}</h3>
              <div className="project-meta">
                <span>
                  <Sparkles size={11} />
                  {p.role}
                </span>
                <span>
                  <Layers size={11} />
                  {p.type}
                </span>
                <span>{p.year}</span>
              </div>
              <div className="project-arrow">
                <ArrowUpRight size={18} strokeWidth={1.75} />
              </div>
            </Link>
          ))}
        </div>

        <div className="section-more" data-reveal>
          <Link to="/work" className="text-link" data-cursor="全部">
            观全部卷轴 <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '4rem' }}>
        <div className="section-header">
          <div>
            <div className="section-index" data-reveal>
              <Wand2 size={12} />
              02 — 手中三昧
            </div>
            <h2 className="section-title" data-reveal>
              工不
              <br />
              可<em>欺</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            自一念初生，至末帧落定——始终亲笔，始终如一。
          </p>
        </div>

        <div className="capabilities">
          {capabilities.map((c) => {
            const Icon = c.icon
            return (
              <article key={c.title} className="cap-card" data-cursor="聚焦" data-reveal>
                <div>
                  <div className="cap-icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="cap-title">{c.title}</h3>
                  <p className="cap-desc">{c.desc}</p>
                </div>
                <div className="cap-tag">{c.tag}</div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-bg-text" aria-hidden="true">
          意境
        </div>
        <div className="manifesto-inner">
          <blockquote className="manifesto-quote" data-reveal>
            屏幕非器——
            <br />
            乃光与韵的<span className="hl">舞台</span>，
            <br />
            一见即成永恒。
          </blockquote>
          <div className="manifesto-foot" data-reveal>
            <span className="manifesto-foot-line" />
            心语 / XGOUO
            <span className="manifesto-foot-line" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-header">
          <div>
            <div className="section-index" data-reveal>
              <Compass size={12} />
              03 — 行笔四步
            </div>
            <h2 className="section-title" data-reveal>
              法即
              <br />
              <em>道</em>
            </h2>
          </div>
          <p className="section-lead" data-reveal>
            刚柔相济——有法可依以成事，无定法以开新。
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((s) => {
            const Icon = s.icon
            return (
              <article key={s.num} className="process-step" data-reveal>
                <span className="process-num">{s.num}</span>
                <Icon className="process-icon" size={22} strokeWidth={1.5} />
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="cta" data-reveal>
        <div className="cta-inner">
          <div className="cta-label">
            <Sparkles size={12} />
            下一卷
          </div>
          <h2 className="cta-title">
            愿与君
            <br />
            <em>共写山河</em>
          </h2>
          <p className="cta-desc">寄来那一念难成之想。我们化作可感、可触、可久久回味之境。</p>
          <Link to="/contact" className="cta-btn" data-cursor="投书">
            投书问道
            <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  )
}
