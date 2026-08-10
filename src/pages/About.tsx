import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

const beliefs = [
  { t: '先意境，后界面', d: '若无心中之境，按钮与动效皆是空响。' },
  { t: '少即是准', d: '克制不是简陋，是把力量用在刀刃上。' },
  { t: '可交付的诗', d: '诗意必须能上线、能维护、能在真实网络中呼吸。' },
  { t: '中文自有韵', d: '不为英文排版习气所役，让汉字站在主位。' },
]

export default function About() {
  usePageMeta('山人 — XGOUO', 'XGOUO 自况与联络。')

  return (
    <div className="page">
      <PageHero
        index="04 — 山人自况"
        title={
          <>
            游于
            <br />
            <em>艺与器</em>
          </>
        }
        lead="XGOUO：在艺术与工程的边界打磨数字体验。屏幕为纸，光影为墨。"
      />

      <div className="about-grid">
        <div className="about-story" data-reveal>
          <p>
            我相信浏览器可以是舞台，而不是表格的延伸。好的数字之物，应让人先有所感，再有所解——如读一首刚好的诗。
          </p>
          <p>
            从品牌意象到着色器，从字距到部署，我习惯亲自走完一程。不是因为多能，是因为完整的作者感，才会留下余味。
          </p>
          <p>若你也厌弃喧哗的模板与空洞的动效，欢迎来信。我们可以慢慢谈一念难成的想法。</p>
        </div>
        <aside className="about-card" data-reveal>
          <h3>问讯</h3>
          <a href={`mailto:${site.email}`} data-cursor="邮件">
            <Mail size={16} /> {site.email}
          </a>
          <a href={site.qqLink} data-cursor="QQ">
            <MessageCircle size={16} /> QQ {site.qq}
          </a>
          {site.sites.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" data-cursor="打开">
              <ArrowUpRight size={16} /> {s.label}
            </a>
          ))}
          <Link to="/contact" className="cta-btn about-cta" data-cursor="投书">
            去投书
          </Link>
        </aside>
      </div>

      <div className="belief-grid">
        {beliefs.map((b) => (
          <article key={b.t} className="belief-card" data-reveal>
            <h3>{b.t}</h3>
            <p>{b.d}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
