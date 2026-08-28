type MateCollectionProps = {
  onBack: () => void
}

export function MateCollection({ onBack }: MateCollectionProps) {
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

      <section className="collection-empty" aria-label="班友图鉴示例">
        <div className="empty-orbit" aria-hidden="true">
          <span>✦</span>
          <span>◌</span>
          <span>·</span>
        </div>
        <p className="eyebrow">A SMALL ARCHIVE</p>
        <h2>每种工作方式，都值得被看见。</h2>
        <p>今天遇见的班友会出现在这里。现在先放一张示例卡，下一阶段接入自动收藏。</p>
        <article className="sample-card">
          <div className="sample-avatar" aria-hidden="true">☼</div>
          <div>
            <p className="sample-title">数字游民</p>
            <p className="sample-subtitle">远程产品设计师 · 示例班友</p>
          </div>
          <span className="sample-arrow" aria-hidden="true">↗</span>
        </article>
      </section>
    </main>
  )
}
