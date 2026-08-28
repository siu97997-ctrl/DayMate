import { useEffect, useRef, useState } from 'react'
import { digitalNomad } from '../data/workmates'
import { ActionDock } from './ActionDock'
import { MateReaction } from './MateReaction'

type TodayMateProps = {
  onOpenCollection: () => void
}

export function TodayMate({ onOpenCollection }: TodayMateProps) {
  const [reaction, setReaction] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileBursting, setProfileBursting] = useState(false)
  const profileTimerRef = useRef<number | null>(null)
  const burstTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (profileTimerRef.current !== null) window.clearTimeout(profileTimerRef.current)
      if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    }
  }, [])

  function respondToQuestion(question: string) {
    if (question.trim()) setReaction(digitalNomad.questionReply)
  }

  function clearProfileTimers() {
    if (profileTimerRef.current !== null) window.clearTimeout(profileTimerRef.current)
    if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    profileTimerRef.current = null
    burstTimerRef.current = null
  }

  function dismissProfile() {
    clearProfileTimers()
    setProfileBursting(true)
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380

    burstTimerRef.current = window.setTimeout(() => {
      setProfileOpen(false)
      setProfileBursting(false)
      burstTimerRef.current = null
    }, duration)
  }

  function openProfile() {
    clearProfileTimers()
    setProfileOpen(true)
    setProfileBursting(false)
    profileTimerRef.current = window.setTimeout(dismissProfile, 3000)
  }

  function toggleProfile() {
    if (profileOpen && !profileBursting) {
      dismissProfile()
      return
    }

    openProfile()
  }

  return (
    <main className="screen today-screen">
      <header className="topbar">
        <div>
          <p className="eyebrow" />
          <h1>DayMate</h1>
        </div>
        <button className="text-button" type="button" onClick={onOpenCollection}>
          班友图鉴 <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="intro-block" aria-labelledby="today-heading">
        <p className="time-label">14:20</p>
        <h2 id="today-heading" />
        <p className="scene-copy" />
      </section>

      <section className="mate-card" aria-label="今日班友">
        <div className="mate-stage">
          <div className="mate-avatar" aria-label={`${digitalNomad.name} 班友占位形象`} role="img">
            <div className="avatar-halo" aria-hidden="true" />
            <div className="avatar-face">
              <span className="avatar-eye left" aria-hidden="true" />
              <span className="avatar-eye right" aria-hidden="true" />
              <span className="avatar-mouth" aria-hidden="true" />
            </div>
            <div className="avatar-body" aria-hidden="true" />
          </div>
          <MateReaction message={reaction} />
        </div>

        <div className="mate-identity">
          <div className="identity-row">
            <span className="mate-name">{digitalNomad.name}</span>
            <button
              className="info-button"
              type="button"
              aria-label={`查看 ${digitalNomad.name} 的职位信息`}
              aria-expanded={profileOpen && !profileBursting}
              aria-controls="mate-profile"
              aria-describedby={profileOpen && !profileBursting ? 'mate-profile' : undefined}
              onClick={toggleProfile}
              onKeyDown={(event) => {
                if (event.key === 'Escape') dismissProfile()
              }}
            >
              <span aria-hidden="true">i</span>
            </button>
          </div>
          {profileOpen && (
            <div
              id="mate-profile"
              className={`mate-profile-popover${profileBursting ? ' is-bursting' : ''}`}
              role="tooltip"
            >
              {digitalNomad.workMode} · {digitalNomad.background}
            </div>
          )}
        </div>
      </section>

      <ActionDock
        name={digitalNomad.name}
        workMode={digitalNomad.workMode}
        onSendQuestion={respondToQuestion}
      />
    </main>
  )
}
