import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en, { type Dictionary } from './en'
import vi from './vi'

export type Language = 'en' | 'vi'

const STORAGE_KEY = 'hqt-lang'
const dictionaries: Record<Language, Dictionary> = { en, vi }

interface LanguageContextValue {
  lang: Language
  t: Dictionary
  setLang: (lang: Language) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'vi' ? stored : null
  } catch {
    return null
  }
}

function writeStoredLanguage(lang: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Storage may be unavailable (private mode, blocked cookies). Ignore.
  }
}

/** Browser language starting with "vi" -> Vietnamese; everything else -> English. */
export function detectLanguage(): Language {
  const stored = readStoredLanguage()
  if (stored) return stored
  if (typeof navigator !== 'undefined') {
    const candidates = [navigator.language, ...(navigator.languages ?? [])].filter(Boolean)
    if (candidates.some((l) => l.toLowerCase().startsWith('vi'))) return 'vi'
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => detectLanguage())

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    writeStoredLanguage(next)
  }, [])

  const toggle = useCallback(() => setLang(lang === 'en' ? 'vi' : 'en'), [lang, setLang])

  // Keep <html lang>, <title> and the description in sync with the active language.
  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    const desc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (desc) desc.content = t.meta.description
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], setLang, toggle }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within <LanguageProvider>')
  return ctx
}

/** Convenience hook returning the active dictionary. */
export function useT(): Dictionary {
  return useLanguage().t
}
