import { Beef, BadgeCheck, Fish, Search, Snowflake } from 'lucide-react'
import { useT } from '../i18n'
import { Section } from './Section'

const PRODUCT_ICONS = [Fish, Beef, Snowflake, Search]

export function Products() {
  const t = useT()
  return (
    <Section id="products" eyebrow={t.products.eyebrow} title={t.products.title} intro={t.products.intro}>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.products.items.map((p, i) => {
          const Icon = PRODUCT_ICONS[i] ?? Snowflake
          const isCustom = i === t.products.items.length - 1
          return (
            <li
              key={p.title}
              className={
                isCustom
                  ? 'card border-dashed border-ice-300 bg-ice-50/60 dark:border-ice-700 dark:bg-navy-900'
                  : 'card'
              }
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-ice-100 text-ice-700 dark:bg-navy-800 dark:text-ice-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy-900 dark:text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-200">{p.text}</p>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-navy-100 bg-navy-50/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between dark:border-navy-800 dark:bg-navy-900/60">
        <div className="max-w-2xl">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white">
            <BadgeCheck className="h-5 w-5 text-ice-600 dark:text-ice-300" aria-hidden="true" />
            {t.products.complianceTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-navy-700 dark:text-navy-200">{t.products.compliance}</p>
        </div>
        <ul className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
          {t.products.complianceBadges.map((b) => (
            <li
              key={b}
              className="rounded-full border border-ice-300 bg-white px-3 py-1 text-xs font-semibold text-navy-800 dark:border-ice-700 dark:bg-navy-950 dark:text-ice-100"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
