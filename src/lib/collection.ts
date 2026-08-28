export type CollectionEntry = {
  mateId: string
  dateKey: string
}

const COLLECTION_STORAGE_KEY = 'daymate.collection.v1'

export function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function isCollectionEntry(value: unknown): value is CollectionEntry {
  if (!value || typeof value !== 'object') return false

  const entry = value as Record<string, unknown>
  return typeof entry.mateId === 'string' && typeof entry.dateKey === 'string'
}

export function getCollection(): CollectionEntry[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem(COLLECTION_STORAGE_KEY)
    if (!saved) return []

    const parsed: unknown = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.filter(isCollectionEntry) : []
  } catch {
    return []
  }
}

export function addToCollection(mateId: string, dateKey = getDateKey(new Date())): void {
  const entries = getCollection()
  if (entries.some((entry) => entry.mateId === mateId && entry.dateKey === dateKey)) return

  try {
    window.localStorage.setItem(
      COLLECTION_STORAGE_KEY,
      JSON.stringify([{ mateId, dateKey }, ...entries]),
    )
  } catch {
    // 收藏不可用时保持页面可用；跨设备同步放到后端阶段。
  }
}
