import { FileCheck2, Headset, Network, Receipt, Scale, Thermometer } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

const WHY_ICONS = [Thermometer, FileCheck2, Network, Scale, Receipt, Headset]

export function WhyUs() {
  const t = useT()
  return (
    <Section id="why-us" eyebrow={t.whyUs.eyebrow} title={t.whyUs.title}>
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {t.whyUs.items.map((item, i) => {
          const Icon = WHY_ICONS[i] ?? Thermometer
          return (
            <li key={item.title} className="group relative rounded-2xl border border-navy-100 p-6 transition-colors hover:border-ice-300 dark:border-navy-800 dark:hover:border-ice-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-ice-300 dark:bg-ice-500 dark:text-navy-950">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{item.text}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
