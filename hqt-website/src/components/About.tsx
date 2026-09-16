import { Handshake, ShieldCheck, Target } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

const VALUE_ICONS = [Target, ShieldCheck, Handshake]

export function About() {
  const t = useT()
  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title} intro={t.about.intro}>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        <div className="card relative overflow-hidden bg-navy-900 text-white dark:bg-navy-800">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ice-500/30 blur-3xl"
          />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ice-300">{t.about.missionTitle}</h3>
          <p className="mt-4 text-xl font-medium leading-relaxed">{t.about.mission}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-300">
            {t.about.valuesTitle}
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {t.about.values.map((v, i) => {
              const Icon = VALUE_ICONS[i] ?? Target
              return (
                <li key={v.title} className="flex gap-4 rounded-xl border border-navy-100 p-4 dark:border-navy-800">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ice-100 text-ice-700 dark:bg-navy-800 dark:text-ice-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-navy-900 dark:text-white">{v.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{v.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </Section>
  )
}
