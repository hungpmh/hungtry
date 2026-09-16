import { ArrowDown, ArrowRight, Globe2, MapPin, Warehouse } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

export function Markets() {
  const t = useT()
  return (
    <Section
      id="markets"
      eyebrow={t.markets.eyebrow}
      title={t.markets.title}
      intro={t.markets.intro}
      tone="tint"
    >
      <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_auto_auto_1fr]">
        <p className="sr-only">{t.markets.diagramLabel}</p>
        {/* Origins */}
        <div className="card">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-300">
            <Globe2 className="h-4 w-4 text-ice-600 dark:text-ice-300" aria-hidden="true" />
            {t.markets.originsTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.markets.origins.map((o) => (
              <li key={o.name} className="rounded-lg border border-navy-100 p-3.5 dark:border-navy-800">
                <p className="font-semibold text-navy-900 dark:text-white">{o.name}</p>
                <p className="mt-0.5 text-sm text-navy-600 dark:text-navy-200">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <FlowArrow />

        {/* Hub */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl bg-navy-900 px-6 py-8 text-center text-white shadow-card lg:w-56 dark:bg-navy-800">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(60%_60%_at_50%_0%,rgba(84,179,227,0.35),transparent_70%)]"
          />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <Warehouse className="h-7 w-7 text-ice-300" aria-hidden="true" />
          </span>
          <p className="relative mt-4 text-sm font-semibold leading-snug">{t.markets.hub}</p>
          <p className="relative mt-1 text-xs text-navy-200">-18 °C · HACCP</p>
        </div>

        <FlowArrow />

        {/* Destinations */}
        <div className="card">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-300">
            <MapPin className="h-4 w-4 text-ice-600 dark:text-ice-300" aria-hidden="true" />
            {t.markets.destinationsTitle}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.markets.destinations.map((d) => (
              <li key={d.name} className="rounded-lg border border-navy-100 p-3.5 dark:border-navy-800">
                <p className="font-semibold text-navy-900 dark:text-white">{d.name}</p>
                <p className="mt-0.5 text-sm text-navy-600 dark:text-navy-200">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function FlowArrow() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center text-ice-500 dark:text-ice-300">
      <ArrowDown className="h-6 w-6 lg:hidden" />
      <ArrowRight className="hidden h-6 w-6 lg:block" />
    </div>
  )
}
