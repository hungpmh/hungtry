/**
 * Single source of truth for company identity, contact details and social links.
 *
 * These values are used by the UI (Contact section, footer), the mailto:
 * contact form, and the build-time SEO tags / JSON-LD injected into index.html.
 * Two values are still unknown and deliberately left empty: `legalName` and
 * `siteOrigin`. An empty value is left out of the page rather than guessed.
 */
export const company = {
  /** Short brand name shown in the header and footer. */
  name: 'HQT Group',
  /**
   * Registered legal name, used only in the JSON-LD metadata.
   * Empty until confirmed - an empty value is omitted from the page.
   */
  legalName: '',
  tagline: 'Import · Export · Cold-Chain Logistics',
  foundingCountry: 'VN',

  /**
   * Official public address of the site, without a trailing slash and without
   * a sub-path (e.g. 'https://www.example.com'). It is used for the canonical
   * and Open Graph URLs. Empty until the domain is known - those tags are then
   * omitted instead of pointing at the wrong place. A hosted build can supply
   * its own origin with the VITE_SITE_ORIGIN environment variable (the GitHub
   * Pages workflow does).
   */
  siteOrigin: '',

  contact: {
    email: 'hqt.phanphoi@gmail.com',
    /** Human-readable phone number. */
    phoneDisplay: '+84 962 803 595',
    /** E.164 form used in tel: links and JSON-LD. */
    phoneE164: '+84962803595',
    /** Office address. Shown in the active language; the Vietnamese form is used for JSON-LD and the map link. */
    address: {
      en: { street: '43 An Trach 2', ward: 'O Cho Dua Ward', city: 'Ha Noi', country: 'Vietnam' },
      vi: { street: '43 An Trạch 2', ward: 'Phường Ô Chợ Dừa', city: 'Hà Nội', country: 'Việt Nam' },
      postalCode: '100000',
      countryCode: 'VN',
    },
    /**
     * Optional exact Google Maps link for the office (Maps -> Share -> Copy link).
     * When empty, a search link is built from the address above.
     */
    mapUrl: '',
    /**
     * Business hours (local time, ICT / UTC+7). `days`, `opens` and `closes` feed the JSON-LD.
     * The non-breaking spaces ( ) keep the time-zone note together when the line wraps.
     */
    hours: {
      en: 'Mon – Sat, 08:00 – 17:30 (ICT)',
      vi: 'Thứ Hai – Thứ Bảy, 08:00 – 17:30 (giờ Việt Nam)',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:30',
    },
  },

  /** Messaging / social links. Leave a value empty ('') to hide that link. */
  social: {
    whatsapp: 'https://wa.me/84962803595', // digits only after wa.me/ (country code, no "+")
    zalo: 'https://zalo.me/0962803595', // Zalo number or OA id
    linkedin: '', // e.g. https://www.linkedin.com/company/hqt-group
    facebook: '', // e.g. https://www.facebook.com/hqtgroup
  },

  /** Countries/regions HQT sources from (used in Markets section and JSON-LD). */
  sourcingOrigins: ['India', 'Russia'],
} as const

export type Company = typeof company

type AddressLanguage = 'en' | 'vi'

/** The office address as two display lines: street and ward, then city, postcode and country. */
export function addressLines(lang: AddressLanguage): readonly [string, string] {
  const { address } = company.contact
  const local = address[lang]
  return [`${local.street}, ${local.ward}`, `${local.city} ${address.postalCode}, ${local.country}`]
}

/** Link that opens the office location in Google Maps. */
export function mapLink(): string {
  if (company.contact.mapUrl) return company.contact.mapUrl
  const { street, ward, city, country } = company.contact.address.vi
  const query = [street, ward, city, country].join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
