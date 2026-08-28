import { useCallback, useEffect, useRef, useState } from 'react'
import { workmates } from '../data/workmates'
import { formatLocalTime, getActivityForMinute, getLocalMinute, getMateForDate } from '../lib/time'
import { ActionDock } from './ActionDock'
import { MateReaction } from './MateReaction'

type TodayMateProps = {
  onOpenCollection: () => void
}

function pickTrivia(trivia: string[]) {
  return trivia[Math.floor(Math.random() * trivia.length)] ?? null
}

const REACTION_DURATION = 10_000
const REACTION_POP_DURATION = 420

export function TodayMate({ onOpenCollection }: TodayMateProps) {
  const [now, setNow] = useState(() => new Date())
  const todayMate = getMateForDate(workmates, now)
  const currentActivity = getActivityForMinute(todayMate, getLocalMinute(now))
  const [reaction, setReaction] = useState<string | null>(() => pickTrivia(todayMate.trivia))
  const [reactionPopping, setReactionPopping] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileBursting, setProfileBursting] = useState(false)
  const mateIdRef = useRef(todayMate.id)
  const reactionDismissTimerRef = useRef<number | null>(null)
  const reactionPopTimerRef = useRef<number | null>(null)
  const profileTimerRef = useRef<number | null>(null)
  const burstTimerRef = useRef<number | null>(null)

  const clearReactionTimers = useCallback(() => {
    if (reactionDismissTimerRef.current !== null) window.clearTimeout(reactionDismissTimerRef.current)
    if (reactionPopTimerRef.current !== null) window.clearTimeout(reactionPopTimerRef.current)
    reactionDismissTimerRef.current = null
    reactionPopTimerRef.current = null
  }, [])

  const scheduleReactionDismiss = useCallback(() => {
    clearReactionTimers()
    const popDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : REACTION_POP_DURATION

    reactionDismissTimerRef.current = window.setTimeout(() => {
      reactionDismissTimerRef.current = null
      setReactionPopping(true)
      reactionPopTimerRef.current = window.setTimeout(() => {
        setReaction(null)
        setReactionPopping(false)
        reactionPopTimerRef.current = null
      }, popDuration)
    }, REACTION_DURATION)
  }, [clearReactionTimers])

  const showReaction = useCallback((message: string | null) => {
    clearReactionTimers()
    setReactionPopping(false)
    setReaction(message)
    if (message) scheduleReactionDismiss()
  }, [clearReactionTimers, scheduleReactionDismiss])

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      const nextNow = new Date()
      const nextMate = getMateForDate(workmates, nextNow)

      if (nextMate.id !== mateIdRef.current) {
        mateIdRef.current = nextMate.id
        showReaction(pickTrivia(nextMate.trivia))
      }

      setNow(nextNow)
    }, 30_000)
    return () => window.clearInterval(clockTimer)
  }, [showReaction])

  useEffect(() => {
    scheduleReactionDismiss()

    return () => {
      clearReactionTimers()
    }
  }, [clearReactionTimers, scheduleReactionDismiss, todayMate.id])

  useEffect(() => {
    return () => {
      if (profileTimerRef.current !== null) window.clearTimeout(profileTimerRef.current)
      if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    }
  }, [])

  function respondToQuestion(question: string) {
    if (question.trim()) {
      showReaction(currentActivity.id === 'sleep' ? currentActivity.bubble : todayMate.questionReply)
    }
  }

  function showCurrentActivity() {
    showReaction(currentActivity.bubble)
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
        <p className="time-label">{formatLocalTime(now)}</p>
        <h2 id="today-heading" />
        <p className="scene-copy" />
      </section>

      <section className="mate-card" aria-label="今日班友">
        <div className="mate-stage">
          <div
            className="mate-avatar"
            role="button"
            tabIndex={0}
            aria-label={`查看 ${todayMate.name} 正在进行的${currentActivity.label}`}
            onClick={showCurrentActivity}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                showCurrentActivity()
              }
            }}
          >
            <div className="avatar-halo" aria-hidden="true" />
            <div className="avatar-face">
              <span className="avatar-eye left" aria-hidden="true" />
              <span className="avatar-eye right" aria-hidden="true" />
              <span className="avatar-mouth" aria-hidden="true" />
            </div>
            <div className="avatar-body" aria-hidden="true" />
          </div>
          <MateReaction message={reaction} isPopping={reactionPopping} />
        </div>

        <div className="mate-identity">
          <div className="identity-row">
            <span className="mate-name">{todayMate.name}</span>
            <button
              className="info-button"
              type="button"
              aria-label={`查看 ${todayMate.name} 的职位信息`}
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
              {todayMate.workMode} · {todayMate.background}
            </div>
          )}
        </div>
      </section>

      <ActionDock
        name={todayMate.name}
        workMode={todayMate.workMode}
        onSendQuestion={respondToQuestion}
      />
    </main>
  )
}
