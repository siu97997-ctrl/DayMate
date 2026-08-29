import type { Workmate, WorkmateActivity } from '../data/workmates'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export async function askDeepSeek(
  question: string,
  mate: Workmate,
  activity: WorkmateActivity,
): Promise<string> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      question,
      mate: {
        name: mate.name,
        workMode: mate.workMode,
        background: mate.background,
        persona: mate.persona,
        voice: mate.voice,
        catchphrases: mate.catchphrases,
        trivia: mate.trivia,
        currentActivity: {
          label: activity.label,
          bubble: activity.bubble,
        },
      },
    }),
  })

  const payload: unknown = await response.json().catch(() => null)
  const errorMessage =
    isRecord(payload) && typeof payload.error === 'string'
      ? payload.error
      : '班友暂时没有接通远程录音室'

  if (!response.ok) throw new Error(errorMessage)

  if (!isRecord(payload) || typeof payload.answer !== 'string' || !payload.answer.trim()) {
    throw new Error('班友返回了空回答')
  }

  return payload.answer.trim()
}
