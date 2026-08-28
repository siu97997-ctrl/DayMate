import { useState } from 'react'
import { workmates } from '../data/workmates'
import { getCollection, type CollectionEntry } from '../lib/collection'

type MateCollectionProps = {
  onBack: () => void
}

function formatDateKey(dateKey: string) {
  const [, month, day] = dateKey.split('-')
  return month && day ? `${month}月${day}日` : dateKey
}

export function MateCollection({ onBack }: MateCollectionProps) {
  const [entries] = useState<CollectionEntry[]>(() => getCollection())
  const cards = entries
    .flatMap((entry) => {
      const mate = workmates.find(({ id }) => id === entry.mateId)
      return mate ? [{ entry, mate }] : []
    })
    .sort((a, b) => b.entry.dateKey.localeCompare(a.entry.dateKey))

  return (
    <main className="screen collection-screen">
      <header className="topbar">
        <div>
          <p className="eyebrow">DAYMATE / COLLECTION</p>
          <h1>班友图鉴</h1>
        </div>
        <button className="text-button" type="button" onClick={onBack}>
          返回 <span aria-hidden="true">↙</span>
        </button>
      </header>

      <section className="collection-content" aria-label="班友图鉴">
        <div className="empty-orbit" aria-hidden="true">
          <span>✦</span>
          <span>◌</span>
          <span>·</span>
        </div>
        <p className="eyebrow">A SMALL ARCHIVE</p>
        <h2>每种工作方式，都值得被看见。</h2>
        {cards.length > 0 ? (
          <div className="collection-list">
            {cards.map(({ entry, mate }) => (
              <article className="collection-card" key={`${entry.mateId}-${entry.dateKey}`}>
                <div className="collection-avatar" aria-hidden="true">{mate.name.slice(0, 1)}</div>
                <div className="collection-card-copy">
                  <p className="collection-title">{mate.name}</p>
                  <p className="collection-subtitle">{mate.workMode} · {mate.background}</p>
                </div>
                <time className="collection-date" dateTime={entry.dateKey}>
                  {formatDateKey(entry.dateKey)}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <p className="collection-hint">打开今日页，遇见的班友会自动出现在这里。</p>
        )}
      </section>
    </main>
  )
}
