import { useRef, useState, type PointerEvent } from 'react'
import { workmates } from '../data/workmates'
import { getCollection, type CollectionEntry } from '../lib/collection'

type MateCollectionProps = {
  onBack: () => void
  previewMode?: boolean
}

export function MateCollection({ onBack, previewMode = false }: MateCollectionProps) {
  const [entries] = useState<CollectionEntry[]>(() => getCollection())
  const [page, setPage] = useState(0)
  const [selectedMateId, setSelectedMateId] = useState<string | null>(null)
  const pointerStartRef = useRef<number | null>(null)
  const collectedMates = previewMode
    ? workmates
    : entries.reduce<typeof workmates>((mates, entry) => {
        const mate = workmates.find(({ id }) => id === entry.mateId)
        if (mate && !mates.some(({ id }) => id === mate.id)) mates.push(mate)
        return mates
      }, [])
  const pages = Array.from({ length: Math.max(1, Math.ceil(collectedMates.length / 7)) }, (_, index) =>
    collectedMates.slice(index * 7, index * 7 + 7),
  )
  const selectedMate = collectedMates.find(({ id }) => id === selectedMateId)

  function movePage(direction: number) {
    setSelectedMateId(null)
    setPage((currentPage) => Math.max(0, Math.min(pages.length - 1, currentPage + direction)))
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStartRef.current = event.clientX
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = pointerStartRef.current
    pointerStartRef.current = null
    if (start === null || pages.length < 2) return

    const distance = event.clientX - start
    if (Math.abs(distance) < 42) return
    movePage(distance < 0 ? 1 : -1)
  }

  return (
    <main className="screen collection-screen">
      <header className="topbar collection-topbar">
        <button className="collection-back" type="button" aria-label="返回今日班友" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 10.7 12 3l9 7.7v8.1a1.2 1.2 0 0 1-1.2 1.2h-5.1v-6.1H9.3V20H4.2A1.2 1.2 0 0 1 3 18.8z" />
          </svg>
        </button>
      </header>

      <section className="collection-content" aria-label="别处生物图鉴">
        <p className="collection-kicker">Same moment, lived otherwise</p>
        <h2>记录每一次来自别处的相遇</h2>
        <h1 className="collection-title">别处生物图鉴</h1>
        <div
          className="collection-board-viewport"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartRef.current = null
          }}
        >
          <div
            className="collection-board-track"
            style={{ transform: 'translateX(-' + page * 100 + '%)' }}
          >
            {pages.map((mates, pageIndex) => (
              <div className="collection-board" key={pageIndex} aria-label={'第 ' + (pageIndex + 1) + ' 个别处生物图鉴'}>
                {mates.length > 0 ? (
                  mates.map((mate) => (
                    <button
                      className={'collection-mate' + (selectedMateId === mate.id ? ' is-selected' : '')}
                      type="button"
                      key={mate.id}
                      data-mate-id={mate.id}
                      aria-label={'查看 ' + mate.name + ' 的简介'}
                      aria-pressed={selectedMateId === mate.id}
                      onClick={() => setSelectedMateId((current) => (current === mate.id ? null : mate.id))}
                    >
                      {mate.image ? (
                        <img className="collection-mate-image" src={mate.image} alt="" loading="lazy" />
                      ) : (
                        <span className="collection-mate-fallback" aria-hidden="true">{mate.name.slice(0, 1)}</span>
                      )}
                    </button>
                  ))
                ) : (
                  <p className="collection-hint">打开今日页，遇见的班友会自动出现在这里。</p>
                )}
              </div>
            ))}
          </div>
        </div>
        {pages.length > 1 && (
          <div className="collection-pagination" aria-label="切换图鉴页面">
            <button
              className="collection-page-arrow"
              type="button"
              aria-label="上一页图鉴"
              disabled={page === 0}
              onClick={() => movePage(-1)}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className="collection-page-dots" aria-hidden="true">
              {pages.map((_, index) => (
                <span className={index === page ? 'is-active' : ''} key={index} />
              ))}
            </div>
            <button
              className="collection-page-arrow"
              type="button"
              aria-label="下一页图鉴"
              disabled={page === pages.length - 1}
              onClick={() => movePage(1)}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        )}
        {selectedMate && (
          <aside className="collection-profile" aria-label={selectedMate.name + ' 的简介'}>
            <div className="collection-profile-image">
              {selectedMate.image ? <img src={selectedMate.image} alt="" /> : selectedMate.name.slice(0, 1)}
            </div>
            <div className="collection-profile-copy">
              <p className="collection-profile-name">{selectedMate.name}</p>
              <p className="collection-profile-mode">{selectedMate.workMode}</p>
              <p className="collection-profile-background">{selectedMate.background}</p>
            </div>
            <button
              className="collection-profile-close"
              type="button"
              aria-label="关闭简介"
              onClick={() => setSelectedMateId(null)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </aside>
        )}
      </section>
    </main>
  )
}
