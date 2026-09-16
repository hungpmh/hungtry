import { Check, PackageOpen, Ship, Snowflake } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

const SERVICE_ICONS = [PackageOpen, Ship, Snowflake]

export function Services() {
  const t = useT()
  return (
    <Section
      id="services"
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      intro={t.services.intro}
      tone="tint"
    >
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {t.services.items.map((s, i) => {
          const Icon = SERVICE_ICONS[i] ?? PackageOpen
          return (
            <li key={s.title} className="card flex flex-col">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-ice-300 dark:bg-ice-500 dark:text-navy-950">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-navy-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{s.text}</p>
              <ul className="mt-5 space-y-2.5 border-t border-navy-100 pt-5 dark:border-navy-800">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-navy-700 dark:text-navy-100">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ice-600 dark:text-ice-300" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
