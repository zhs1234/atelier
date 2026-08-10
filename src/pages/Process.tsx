import PageHero from '../components/PageHero'
import { processSteps } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ProcessPage() {
  usePageMeta('行笔 — XGOUO', '听风、立骨、琢玉、放舟。')

  return (
    <div className="page">
      <PageHero
        index="03 — 行笔四步"
        title={
          <>
            法即
            <br />
            <em>道</em>
          </>
        }
        lead="有法可依以成事，无定法以开新。四步不是枷锁，是行笔时的呼吸。"
      />

      <div className="process-page-grid">
        {processSteps.map((s) => {
          const Icon = s.icon
          return (
            <article key={s.num} className="process-page-card" data-reveal>
              <div className="process-page-head">
                <span className="process-num">{s.num}</span>
                <Icon size={28} strokeWidth={1.4} />
              </div>
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </div>
  )
}
