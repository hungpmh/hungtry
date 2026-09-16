import clsx from 'clsx'
import { useLanguage, type Language } from '../i18n'

interface LanguageToggleProps {
  className?: string
  /** Use light styling for dark backgrounds (footer). */
  inverted?: boolean
}

const OPTIONS: { code: Language; label: string; ariaLabel: string }[] = [
  { code: 'en', label: 'EN', ariaLabel: 'English' },
  { code: 'vi', label: 'VI', ariaLabel: 'Tiếng Việt' },
]

export function LanguageToggle({ className, inverted = false }: LanguageToggleProps) {
  const { lang, setLang, t } = useLanguage()
  return (
    <div
      role="group"
      aria-label={t.common.language}
      className={clsx(
        'inline-flex items-center rounded-full border p-0.5 text-xs font-semibold',
        inverted
          ? 'border-white/25 bg-white/10'
          : 'border-navy-200 bg-navy-50 dark:border-navy-700 dark:bg-navy-900',
        className,
      )}
    >
      {OPTIONS.map((opt, i) => {
        const active = opt.code === lang
        return (
          <button
            key={opt.code}
            type="button"
            lang={opt.code}
            aria-pressed={active}
            aria-label={opt.ariaLabel}
            onClick={() => setLang(opt.code)}
            className={clsx(
              'rounded-full px-2.5 py-1 leading-none transition-colors',
              i === 0 && 'mr-0.5',
              active
                ? inverted
                  ? 'bg-white text-navy-900'
                  : 'bg-navy-900 text-white dark:bg-ice-400 dark:text-navy-950'
                : inverted
                  ? 'text-navy-100 hover:bg-white/15'
                  : 'text-navy-600 hover:bg-navy-100 dark:text-navy-200 dark:hover:bg-navy-800',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
