import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'

type ActionDockProps = {
  name: string
  workMode: string
  onSendQuestion: (question: string) => void
}

export function ActionDock({ name, workMode, onSendQuestion }: ActionDockProps) {
  const [composerOpen, setComposerOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const introPrompt = `你想问点${name}什么？`
  const questionPrompt = `${workMode}是干什么的？`

  useEffect(() => {
    if (composerOpen) inputRef.current?.focus()
  }, [composerOpen])

  function closeComposer() {
    setComposerOpen(false)
    setDraft('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const question = draft.trim()

    if (!question) return

    onSendQuestion(question)
    closeComposer()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') closeComposer()
  }

  return (
    <div className="action-dock" aria-label="和班友交流">
      {composerOpen ? (
        <form className="question-composer" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="question-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={questionPrompt}
            aria-label={`输入关于${workMode}的问题`}
            autoComplete="off"
          />
          <button
            className="composer-send"
            type="submit"
            aria-label="发送问题"
            disabled={!draft.trim()}
          >
            <span aria-hidden="true">↑</span>
          </button>
          <button className="composer-close" type="button" aria-label="关闭输入框" onClick={closeComposer}>
            <span aria-hidden="true">×</span>
          </button>
        </form>
      ) : (
        <button className="action-button" type="button" onClick={() => setComposerOpen(true)}>
          <span>{introPrompt}</span>
        </button>
      )}
    </div>
  )
}
