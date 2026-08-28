import type { Workmate, WorkmateActivity } from '../data/workmates'

const DAILY_MATE_STORAGE_KEY = 'daymate.daily-mate.v1'

export function getLocalMinute(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

export function formatLocalTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

export function getActivityForMinute(workmate: Workmate, minute: number): WorkmateActivity {
  const activity = workmate.activities.find(
    ({ startMinute, endMinute }) => minute >= startMinute && minute < endMinute,
  )

  if (!activity) throw new Error(`No activity configured for ${workmate.id} at minute ${minute}`)
  return activity
}

export function getMateForDate(candidates: Workmate[], date: Date): Workmate {
  if (candidates.length === 0) throw new Error('At least one workmate is required')

  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  try {
    const saved = window.localStorage.getItem(DAILY_MATE_STORAGE_KEY)
    if (saved) {
      const assignment = JSON.parse(saved) as { date?: string; mateId?: string }
      const savedMate = candidates.find(({ id }) => id === assignment.mateId)
      if (assignment.date === dateKey && savedMate) return savedMate
    }

    const selected = candidates[Math.floor(Math.random() * candidates.length)] ?? candidates[0]
    window.localStorage.setItem(DAILY_MATE_STORAGE_KEY, JSON.stringify({ date: dateKey, mateId: selected.id }))
    return selected
  } catch {
    // ponytail: deterministic fallback when storage is unavailable; add sync only if cross-device assignment matters.
    const dateSeed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    return candidates[Math.abs(dateSeed) % candidates.length] ?? candidates[0]
  }
}
