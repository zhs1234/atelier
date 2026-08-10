import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react'
import PageHero from '../components/PageHero'
import { site } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Contact() {
  usePageMeta('投书 — XGOUO', '开启一段合作，或只是问安。')
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`投书 · ${name || '未名'}`)
    const body = encodeURIComponent(`来自：${name}\n联系：${from}\n\n${msg}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="page">
      <PageHero
        index="05 — 投书"
        title={
          <>
            愿与君
            <br />
            <em>共写山河</em>
          </>
        }
        lead="一封信即可。说明你是谁、想做什么、时间与预算的大概边界。我会认真读完。"
      />

      <div className="contact-grid">
        <form className="contact-form" onSubmit={onSubmit} data-reveal>
          <label>
            <span>如何称呼</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="姓名或品牌" required />
          </label>
          <label>
            <span>如何回信</span>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="邮箱 / 微信 / QQ"
              required
            />
          </label>
          <label>
            <span>所托何事</span>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="一念难成之想，慢慢写来……"
              rows={7}
              required
            />
          </label>
          <button type="submit" className="cta-btn" data-cursor="投书">
            打开邮差投书
          </button>
          <p className="contact-hint">将调用本机邮件应用，发至 {site.email}</p>
        </form>

        <aside className="contact-side" data-reveal>
          <div className="contact-side-block">
            <h3>直达</h3>
            <a href={`mailto:${site.email}`} data-cursor="邮件">
              <Mail size={16} /> {site.email}
            </a>
            <a href={site.qqLink} data-cursor="QQ">
              <MessageCircle size={16} /> QQ {site.qq}
            </a>
          </div>
          <div className="contact-side-block">
            <h3>站点</h3>
            {site.sites.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noreferrer" data-cursor="打开">
                {s.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
          <div className="contact-side-block">
            <h3>节奏</h3>
            <p>通常数日内回信。若正在闭关做项目，也会说明何时能谈。</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
