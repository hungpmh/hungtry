import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useT } from '../i18n'
import { NAV_ITEMS, SECTION_IDS } from '../content/nav'
import { useActiveSection } from '../hooks/useActiveSection'
import { LanguageToggle } from './LanguageToggle'
import { Logo } from './Logo'

export function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Elevate the header once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape and when resizing to desktop.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const linkClass = (id: string, mobile = false) =>
    clsx(
      'rounded-md font-medium transition-colors',
      mobile ? 'block px-3 py-2.5 text-base' : 'whitespace-nowrap px-2.5 py-2 text-sm xl:px-3',
      active === id
        ? 'text-ice-700 dark:text-ice-300'
        : 'text-navy-700 hover:text-navy-900 dark:text-navy-200 dark:hover:text-white',
      mobile && active === id && 'bg-ice-50 dark:bg-navy-800',
    )

  return (
    <header
      className={clsx(
        'sticky top-0 z-40 border-b backdrop-blur transition-shadow',
        'bg-white/90 dark:bg-navy-950/90',
        scrolled
          ? 'border-navy-100 shadow-sm dark:border-navy-800'
          : 'border-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0 rounded-md" aria-label="HQT Group">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-0 xl:gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={linkClass(item.id)}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  {t.nav[item.labelKey]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a href="#contact" className="btn-primary hidden whitespace-nowrap !py-2 sm:inline-flex lg:hidden xl:inline-flex">
            {t.nav.cta}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-800 hover:bg-navy-50 lg:hidden dark:text-navy-100 dark:hover:bg-navy-800"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.common.closeMenu : t.common.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Primary mobile"
        className={clsx(
          'border-t border-navy-100 bg-white lg:hidden dark:border-navy-800 dark:bg-navy-950',
          open ? 'block' : 'hidden',
        )}
      >
        <ul className="container-x flex flex-col gap-0.5 py-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id, true)}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {t.nav[item.labelKey]}
              </a>
            </li>
          ))}
          <li className="mt-2 sm:hidden">
            <a href="#contact" className="btn-primary w-full" onClick={() => setOpen(false)}>
              {t.nav.cta}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
