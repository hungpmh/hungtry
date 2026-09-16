import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../i18n'
import { company } from '../content/company'
import { NAV_ITEMS } from '../content/nav'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const { contact } = company

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo inverted showTagline tagline={t.common.tagline} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-300">{t.about.mission}</p>
          <div className="mt-6">
            <LanguageToggle inverted />
          </div>
        </div>

        <nav aria-label={t.common.navFooter}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block rounded py-1 text-sm text-navy-200 transition-colors hover:text-white"
                >
                  {t.nav[item.labelKey]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-1.5 h-4 w-4 shrink-0 text-ice-300" aria-hidden="true" />
              <a href={`mailto:${contact.email}`} className="inline-block break-all rounded py-1 text-navy-200 hover:text-white">
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-1.5 h-4 w-4 shrink-0 text-ice-300" aria-hidden="true" />
              <a href={`tel:${contact.phoneE164}`} className="inline-block rounded py-1 text-navy-200 hover:text-white">
                {contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1.5 h-4 w-4 shrink-0 text-ice-300" aria-hidden="true" />
              <span className="inline-block py-1 text-navy-200">
                {contact.address.city}, {contact.address.country}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-800">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-400 sm:flex-row">
          <p>
            © {year} {company.name}. {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 rounded py-1.5 hover:text-white">
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
