import type { ReactNode } from 'react'

type Props = {
  index: string
  title: ReactNode
  lead?: string
  kicker?: string
}

export default function PageHero({ index, title, lead, kicker }: Props) {
  return (
    <header className="page-hero">
      <div className="page-hero-top">
        <div className="section-index" data-reveal>
          {index}
        </div>
        {kicker ? (
          <div className="page-hero-kicker" data-reveal>
            {kicker}
          </div>
        ) : null}
      </div>
      <h1 className="page-hero-title" data-reveal>
        {title}
      </h1>
      {lead ? (
        <p className="page-hero-lead" data-reveal>
          {lead}
        </p>
      ) : null}
    </header>
  )
}
