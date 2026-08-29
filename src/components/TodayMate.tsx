import { useCallback, useEffect, useRef, useState } from 'react'
import { workmates } from '../data/workmates'
import { addToCollection, getDateKey } from '../lib/collection'
import { askDeepSeek } from '../lib/chat'
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
  const previewMode = new URLSearchParams(window.location.search).get('preview') === '1'
  const [previewIndex, setPreviewIndex] = useState(0)
  const previewMate = previewMode ? workmates[previewIndex] ?? workmates[0] : undefined
  const todayMate = previewMate ?? getMateForDate(workmates, now)
  const dateKey = getDateKey(now)
  const currentActivity = getActivityForMinute(todayMate, getLocalMinute(now))
  const [reaction, setReaction] = useState<string | null>(() => pickTrivia(todayMate.trivia))
  const [reactionPopping, setReactionPopping] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [failedImage, setFailedImage] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileBursting, setProfileBursting] = useState(false)
  const mateIdRef = useRef(todayMate.id)
  const reactionDismissTimerRef = useRef<number | null>(null)
  const reactionPopTimerRef = useRef<number | null>(null)
  const profileTimerRef = useRef<number | null>(null)
  const burstTimerRef = useRef<number | null>(null)
  const imageSrc = todayMate.image
  const showImage = Boolean(imageSrc) && failedImage !== imageSrc

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
    if (mateIdRef.current === todayMate.id) return

    mateIdRef.current = todayMate.id
    setFailedImage(null)
    setProfileOpen(false)
    setProfileBursting(false)
    if (profileTimerRef.current !== null) window.clearTimeout(profileTimerRef.current)
    if (burstTimerRef.current !== null) window.clearTimeout(burstTimerRef.current)
    profileTimerRef.current = null
    burstTimerRef.current = null
    showReaction(pickTrivia(todayMate.trivia))
  }, [showReaction, todayMate.id, todayMate.trivia])

  useEffect(() => {
    if (previewMode) return
    addToCollection(todayMate.id, dateKey)
  }, [dateKey, previewMode, todayMate.id])

  useEffect(() => {
    const clockTimer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(clockTimer)
  }, [])

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

  async function respondToQuestion(question: string) {
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || isReplying) return

    if (currentActivity.id === 'sleep') {
      showReaction(currentActivity.bubble)
      return
    }

    const requestMateId = todayMate.id
    const requestActivity = currentActivity
    const requestContext = {
      localDate: dateKey,
      localTime: formatLocalTime(now),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '本地时区',
    }
    setIsReplying(true)
    showReaction('让我想想……')

    try {
      const answer = await askDeepSeek(trimmedQuestion, todayMate, requestActivity, requestContext)
      if (mateIdRef.current === requestMateId) showReaction(answer)
    } catch {
      if (mateIdRef.current === requestMateId) showReaction(requestActivity.bubble)
    } finally {
      setIsReplying(false)
    }
  }

  function showCurrentActivity() {
    showReaction(currentActivity.bubble)
  }

  function movePreview(direction: number) {
    setPreviewIndex((index) => (index + direction + workmates.length) % workmates.length)
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
            {showImage && imageSrc ? (
              <img
                className="mate-image"
                src={imageSrc}
                alt=""
                onError={() => setFailedImage(imageSrc)}
              />
            ) : (
              <div className="avatar-fallback" aria-hidden="true">
                <div className="avatar-face">
                  <span className="avatar-eye left" />
                  <span className="avatar-eye right" />
                  <span className="avatar-mouth" />
                </div>
                <div className="avatar-body" />
              </div>
            )}
          </div>
          {previewMode && (
            <div className="preview-controls" aria-label="预览班友切换">
              <button
                className="preview-arrow"
                type="button"
                aria-label="上一个班友"
                onClick={() => movePreview(-1)}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <span className="preview-status" aria-live="polite">
                {previewIndex + 1} / {workmates.length}
              </span>
              <button
                className="preview-arrow"
                type="button"
                aria-label="下一个班友"
                onClick={() => movePreview(1)}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          )}
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
        key={todayMate.id}
        name={todayMate.name}
        workMode={todayMate.workMode}
        onSendQuestion={respondToQuestion}
      />
    </main>
  )
}
