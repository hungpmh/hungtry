import { useEffect, useState } from 'react'

/**
 * Tracks which section (by id) is currently most visible in the viewport so the
 * navigation can highlight it. Falls back gracefully when IntersectionObserver
 * is unavailable.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio)
          else visible.delete(entry.target.id)
        }
        let best: string | null = null
        let bestRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        })
        if (best) setActive(best)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
