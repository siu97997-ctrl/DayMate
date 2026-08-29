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

// 同一活动有多个素材时，首版固定使用 01，避免时钟刷新导致画面跳变。
function getSceneImagePath(mateId: string, activityId: string) {
  return `/scenes/${mateId}/${activityId}01.png`
}

const PIXEL_GLYPHS: Record<string, string[]> = {
  '0': ['01110', '11011', '11011', '11011', '11011', '11011', '01110'],
  '1': ['00110', '01110', '00110', '00110', '00110', '00110', '11111'],
  '2': ['01110', '11011', '00011', '00110', '01100', '11000', '11111'],
  '3': ['01110', '11011', '00011', '00110', '00011', '11011', '01110'],
  '4': ['11011', '11011', '11011', '11111', '00011', '00011', '00011'],
  '5': ['11111', '11000', '11110', '00011', '00011', '11011', '01110'],
  '6': ['01110', '11011', '11000', '11110', '11011', '11011', '01110'],
  '7': ['11111', '00011', '00110', '01100', '01100', '01100', '01100'],
  '8': ['01110', '11011', '11011', '01110', '11011', '11011', '01110'],
  '9': ['01110', '11011', '11011', '01111', '00011', '11011', '01110'],
  ':': ['00', '00', '11', '11', '00', '11', '11'],
}

function PixelTime({ value }: { value: string }) {
  const layout = value.split('').reduce<{
    offset: number
    glyphs: Array<{ character: string; glyph: string[]; index: number; x: number }>
  }>(
    (result, character, index) => {
      const glyph = PIXEL_GLYPHS[character] ?? PIXEL_GLYPHS['0']
      const x = result.offset

      return {
        offset: result.offset + glyph[0].length + 1,
        glyphs: [...result.glyphs, { character, glyph, index, x }],
      }
    },
    { offset: 0, glyphs: [] },
  )
  const { glyphs } = layout

  return (
    <svg
      className="pixel-time"
      viewBox={`0 0 ${Math.max(1, layout.offset - 1)} 7`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={`当前时间 ${value}`}
    >
      {glyphs.map(({ character, glyph, index, x }) =>
        glyph.map((row, rowIndex) =>
          [...row].map((cell, columnIndex) =>
            cell === '1' ? (
              <rect
                key={`${character}-${index}-${rowIndex}-${columnIndex}`}
                x={x + columnIndex}
                y={rowIndex}
                width="1"
                height="1"
              />
            ) : null,
          ),
        ),
      )}
    </svg>
  )
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
  const sceneImage = getSceneImagePath(todayMate.id, currentActivity.id)
  const [reaction, setReaction] = useState<string | null>(() => pickTrivia(todayMate.trivia))
  const [reactionPopping, setReactionPopping] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const mateIdRef = useRef(todayMate.id)
  const reactionDismissTimerRef = useRef<number | null>(null)
  const reactionPopTimerRef = useRef<number | null>(null)

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

  return (
    <main className="screen today-screen">
      <header className="topbar">
        <div className="brand-link">
          <img className="brand-logo" src="/brand/elsewise.png" alt="Elsewise" />
        </div>
        <button className="collection-link" type="button" onClick={onOpenCollection}>
          <img className="collection-logo" src="/brand/elsewhere.png" alt="在别处" />
        </button>
      </header>

      <section className="intro-block" aria-labelledby="today-heading">
        <p className="time-label">
          <PixelTime value={formatLocalTime(now)} />
        </p>
        <p className="activity-summary">正在{currentActivity.label}</p>
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
            <img
              key={sceneImage}
              className="mate-image"
              src={sceneImage}
              alt=""
              onError={(event) => {
                const image = event.currentTarget
                if (todayMate.image && image.dataset.fallback !== '1') {
                  image.dataset.fallback = '1'
                  image.src = todayMate.image
                }
              }}
            />
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
          <span className="mate-name">{todayMate.name}</span>
          <span className="mate-background">
            {todayMate.workMode} · {todayMate.background}
          </span>
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
