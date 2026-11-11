import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { addressLines, company } from './src/content/company'
import en from './src/i18n/en'
import vi from './src/i18n/vi'

/**
 * Two builds come out of this config:
 *
 *   npm run build             hosted site in dist/ (HTML + hashed assets + public files)
 *   npm run build:standalone  the whole site as one file, dist-standalone/index.html
 *
 * The standalone file has no other files to go with it and makes no requests,
 * so it can be handed to a third party and served from any host or path.
 */

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Non-ASCII characters as character references, so the markup reads the same under any charset. */
const toCharRefs = (html: string) =>
  html.replace(/[^\x00-\x7f]/gu, (ch) => `&#x${ch.codePointAt(0)!.toString(16)};`)

/** JSON that is safe to place inside a <script> element: ASCII only and no "<". */
const toScriptJson = (value: unknown) =>
  JSON.stringify(value).replace(/[<\u007f-\uffff]/g, (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`)

interface SeoOptions {
  /** Absolute URL of the page with a trailing slash, or '' while the public address is unknown. */
  siteUrl: string
  standalone: boolean
}

/**
 * Fills index.html with everything derived from src/content/company.ts: the
 * canonical / share-image tags, the JSON-LD Organization block and a no-script
 * fallback carrying the contact details. Tags that need the public address are
 * left out when it is unknown rather than pointing at a guess.
 */
function seoPlugin({ siteUrl, standalone }: SeoOptions): Plugin {
  const { contact, social } = company
  const { address, hours } = contact
  // og-image.png and favicon.svg are only published next to the hosted build.
  const shareImage = siteUrl && !standalone ? `${siteUrl}og-image.png` : ''
  const profiles = [social.linkedin, social.facebook].filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    ...(siteUrl ? { url: siteUrl } : {}),
    ...(shareImage ? { logo: `${siteUrl}favicon.svg`, image: shareImage } : {}),
    description:
      'HQT Group is a Vietnam-based importer, exporter and cold-chain logistics provider specialising in frozen seafood, meat and poultry.',
    slogan: company.tagline,
    email: contact.email,
    telephone: contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.vi.street,
      addressLocality: address.vi.ward,
      addressRegion: address.vi.city,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
    areaServed: [address.en.country, ...company.sourcingOrigins],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: contact.email,
      telephone: contact.phoneE164,
      availableLanguage: ['en', 'vi'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.days,
        opens: hours.opens,
        closes: hours.closes,
      },
    },
    ...(profiles.length ? { sameAs: profiles } : {}),
  }

  const url = escapeHtml(siteUrl)
  const image = escapeHtml(shareImage)
  const seoTags = [
    ...(siteUrl
      ? [
          `<link rel="canonical" href="${url}" />`,
          `<link rel="alternate" hreflang="en" href="${url}" />`,
          `<link rel="alternate" hreflang="vi" href="${url}" />`,
          `<link rel="alternate" hreflang="x-default" href="${url}" />`,
          `<meta property="og:url" content="${url}" />`,
        ]
      : []),
    ...(shareImage
      ? [
          `<meta property="og:image" content="${image}" />`,
          '<meta property="og:image:width" content="1200" />',
          '<meta property="og:image:height" content="630" />',
          '<meta property="og:image:alt" content="HQT Group - Import, Export and Cold-Chain Logistics" />',
          `<meta name="twitter:image" content="${image}" />`,
        ]
      : []),
    `<meta name="twitter:card" content="${shareImage ? 'summary_large_image' : 'summary'}" />`,
    `<script type="application/ld+json">${toScriptJson(jsonLd)}</script>`,
  ].join('\n    ')

  // Shown only when scripts are off, so the page is never blank and the company can still be reached.
  const bilingual = (a: string, b: string) => escapeHtml(a === b ? a : `${a} / ${b}`)
  const email = escapeHtml(contact.email)
  const linkStyle = 'color: inherit; text-decoration: underline'
  const noscript = `<noscript>
      <div style="max-width: 40rem; margin: 0 auto; padding: 3rem 1.25rem; font-family: system-ui, sans-serif; line-height: 1.6">
        <p style="margin: 0; font-size: 1.5rem; font-weight: 700">${escapeHtml(company.name)}</p>
        <p style="margin: 0.25rem 0 1.5rem">${escapeHtml(en.common.tagline)}<br />${escapeHtml(vi.common.tagline)}</p>
        <p style="margin: 0 0 1rem">${escapeHtml(en.common.noscript)}<br />${escapeHtml(vi.common.noscript)}</p>
        <p style="margin: 0">
          ${bilingual(en.contact.email, vi.contact.email)}: <a href="mailto:${email}" style="${linkStyle}">${email}</a><br />
          ${bilingual(en.contact.phone, vi.contact.phone)}: <a href="tel:${escapeHtml(contact.phoneE164)}" style="${linkStyle}">${escapeHtml(contact.phoneDisplay)}</a><br />
          ${bilingual(en.contact.address, vi.contact.address)}: ${escapeHtml(addressLines('vi').join(', '))}<br />
          ${bilingual(en.contact.hours, vi.contact.hours)}: ${bilingual(hours.en, hours.vi)}
        </p>
      </div>
    </noscript>`

  return {
    name: 'hqt-seo-inject',
    transformIndexHtml: {
      // Run before Vite's own %ENV% replacement so our placeholders never warn.
      order: 'pre',
      handler(html) {
        // Function replacers: the inserted text must not be read as a "$&"-style pattern.
        const filled = html
          .replace(/%COMPANY_NAME%/g, () => escapeHtml(company.name))
          .replace('%SEO_TAGS%', () => seoTags)
          .replace('%NOSCRIPT%', () => noscript)
        return standalone ? toCharRefs(inlineIcons(filled)) : filled
      },
    },
  }
}

/** Standalone build: the favicon travels inside the page as a data URI. */
function inlineIcons(html: string): string {
  const icon = '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
  const touchIcon = /\s*<link rel="apple-touch-icon"[^>]*>/
  if (!html.includes(icon) || !touchIcon.test(html)) {
    throw new Error('index.html: the icon <link> tags changed - update inlineIcons() in vite.config.ts to match')
  }
  const svg = readFileSync(fileURLToPath(new URL('./public/favicon.svg', import.meta.url)))
  const dataUri = `data:image/svg+xml;base64,${svg.toString('base64')}`
  // iOS ignores inline touch icons, so that tag is dropped instead of being left to 404.
  return html.replace(icon, () => icon.replace('/favicon.svg', dataUri)).replace(touchIcon, '')
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Standalone build: folds the built script and stylesheet into index.html and
 * drops them from the output, leaving exactly one file. The build fails if
 * anything would be left outside the file or if a non-ASCII byte remains.
 */
function singleFilePlugin(): Plugin {
  return {
    name: 'hqt-single-file',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const page = Object.values(bundle).find((file) => file.type === 'asset' && file.fileName.endsWith('.html'))
      if (!page || page.type !== 'asset') return this.error('standalone build: no HTML page in the bundle')
      let html = String(page.source)

      for (const [fileName, file] of Object.entries(bundle)) {
        if (file === page) continue
        const name = escapeRegExp(fileName)
        let tag: RegExp
        let inlined: string
        if (file.type === 'chunk') {
          tag = new RegExp(`<script\\b[^>]*\\bsrc="[^"]*${name}"[^>]*></script>`)
          // "</script" or "<!--" inside the code would end or derail the element; "\\x3C" is the same character to JS.
          inlined = `<script type="module">${file.code.trim().replace(/<(?=\/script|!--)/gi, '\\x3C')}</script>`
        } else if (fileName.endsWith('.css')) {
          tag = new RegExp(`<link\\b[^>]*\\bhref="[^"]*${name}"[^>]*>`)
          inlined = `<style>${String(file.source).trim().replace(/<(?=\/style)/gi, '\\3C ')}</style>`
        } else {
          return this.error(`standalone build: "${fileName}" would be left outside the single file`)
        }
        if (!tag.test(html)) return this.error(`standalone build: index.html has no tag for "${fileName}"`)
        html = html.replace(tag, () => inlined)
        delete bundle[fileName]
      }

      const stray = html.match(/[^\x00-\x7f]/u)
      if (stray) return this.error(`standalone build: non-ASCII character "${stray[0]}" left in the page`)
      page.source = html
    },
  }
}

export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone'
  const base = standalone ? './' : process.env.VITE_BASE_PATH || '/'
  // VITE_SITE_ORIGIN describes one hosted deployment. The standalone file belongs
  // to none, so only the official domain from company.ts applies to it.
  const origin = ((standalone ? '' : process.env.VITE_SITE_ORIGIN) || company.siteOrigin).replace(/\/+$/, '')
  const siteUrl = origin ? `${origin}${standalone ? '/' : base}` : ''

  return {
    base,
    publicDir: standalone ? false : 'public',
    plugins: [react(), seoPlugin({ siteUrl, standalone }), ...(standalone ? [singleFilePlugin()] : [])],
    server: {
      host: true,
      port: 5173,
    },
    // ASCII-only script and styles, so a host that sends the wrong charset cannot garble Vietnamese text.
    ...(standalone ? { esbuild: { charset: 'ascii' as const } } : {}),
    build: {
      target: 'es2020',
      sourcemap: false,
      ...(standalone
        ? {
            outDir: 'dist-standalone',
            cssCodeSplit: false,
            assetsInlineLimit: Number.MAX_SAFE_INTEGER,
            modulePreload: false as const,
            rollupOptions: { output: { inlineDynamicImports: true } },
          }
        : {}),
    },
  }
})
