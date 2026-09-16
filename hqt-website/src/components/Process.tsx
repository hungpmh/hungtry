import { ClipboardList, FileSearch, Ship, Snowflake, Truck } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

const STEP_ICONS = [ClipboardList, FileSearch, Ship, Snowflake, Truck]

export function Process() {
  const t = useT()
  return (
    <Section id="process" eyebrow={t.process.eyebrow} title={t.process.title} tone="tint">
      <ol className="relative mt-12 grid gap-8 lg:grid-cols-5 lg:gap-6">
        {/* Connector line (desktop) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[10%] right-[10%] top-6 hidden h-0.5 bg-gradient-to-r from-ice-300 via-ice-500 to-ice-300 lg:block dark:from-ice-800 dark:via-ice-500 dark:to-ice-800"
        />
        {t.process.steps.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? ClipboardList
          const isLast = i === t.process.steps.length - 1
          return (
            <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
              {/* Connector line (mobile) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="absolute left-6 top-12 -ml-px h-[calc(100%+2rem)] w-0.5 bg-ice-200 lg:hidden dark:bg-navy-700"
                />
              )}
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-navy-50 bg-navy-900 text-ice-300 shadow-card dark:border-navy-950 dark:bg-ice-500 dark:text-navy-950">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="pt-1 lg:pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-ice-600 dark:text-ice-300">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-1 font-semibold text-navy-900 dark:text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{step.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
