import type { Dictionary } from '../i18n/en'

export type SectionId = 'about' | 'services' | 'products' | 'markets' | 'why-us' | 'process' | 'contact'

export interface NavItem {
  id: SectionId
  labelKey: keyof Dictionary['nav']
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', labelKey: 'about' },
  { id: 'services', labelKey: 'services' },
  { id: 'products', labelKey: 'products' },
  { id: 'markets', labelKey: 'markets' },
  { id: 'why-us', labelKey: 'whyUs' },
  { id: 'process', labelKey: 'process' },
  { id: 'contact', labelKey: 'contact' },
]

export const SECTION_IDS: readonly SectionId[] = NAV_ITEMS.map((n) => n.id)
