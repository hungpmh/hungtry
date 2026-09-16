/**
 * Single source of truth for company identity, contact details and social links.
 *
 * >>> Replace every placeholder value in this file before going live. <<<
 * Everything marked "PLACEHOLDER" is fictional and must be updated by the owner.
 * These values are used by the UI (Contact section, footer), the mailto:
 * contact form, and the build-time SEO tags / JSON-LD injected into index.html.
 */
export const company = {
  /** Short brand name shown in the header and footer. */
  name: 'HQT Group',
  /** Full legal / trading name used in SEO metadata and JSON-LD. */
  legalName: 'HQT Group Import Export Co., Ltd.', // PLACEHOLDER - confirm legal name
  tagline: 'Import · Export · Cold-Chain Logistics',
  foundingCountry: 'VN',

  /**
   * Public origin of the deployed site, without a trailing slash and without
   * the repository sub-path. It is combined with Vite's `base` at build time to
   * produce canonical / Open Graph URLs. Can be overridden with the
   * VITE_SITE_ORIGIN environment variable (e.g. https://<owner>.github.io).
   */
  siteOrigin: 'https://hqtgroup.example', // PLACEHOLDER

  contact: {
    email: 'contact@hqtgroup.example', // PLACEHOLDER
    /** Human-readable phone number. */
    phoneDisplay: '+84 (0) 000 000 000', // PLACEHOLDER
    /** E.164 form used in tel: links and JSON-LD. */
    phoneE164: '+84000000000', // PLACEHOLDER
    address: {
      street: 'Address to be confirmed', // PLACEHOLDER
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      countryCode: 'VN',
    },
    /** Business hours shown in the contact section (local time, ICT / UTC+7). */
    hours: {
      en: 'Mon – Fri, 08:00 – 17:30 (ICT)',
      vi: 'Thứ Hai – Thứ Sáu, 08:00 – 17:30 (giờ Việt Nam)',
    },
  },

  /** Messaging / social links. Leave a value empty ('') to hide that link. */
  social: {
    whatsapp: 'https://wa.me/84000000000', // PLACEHOLDER - digits only after wa.me/
    zalo: 'https://zalo.me/0000000000', // PLACEHOLDER - Zalo number or OA id
    linkedin: '', // e.g. https://www.linkedin.com/company/hqt-group
    facebook: '', // e.g. https://www.facebook.com/hqtgroup
  },

  /** Countries/regions HQT sources from (used in Markets section and JSON-LD). */
  sourcingOrigins: ['India', 'Russia'],
} as const

export type Company = typeof company
