import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { company } from './src/content/company'

/**
 * Injects company-derived SEO metadata into index.html at build time so that
 * canonical / Open Graph URLs and the JSON-LD Organization schema are correct
 * for the configured base path and site origin without hard-coding them.
 */
function seoPlugin(base: string): Plugin {
  const origin = (process.env.VITE_SITE_ORIGIN || company.siteOrigin).replace(/\/+$/, '')
  const siteUrl = `${origin}${base}`
  const ogImage = `${siteUrl}og-image.png`

  const sameAs = Object.values(company.social).filter(Boolean)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}favicon.svg`,
    image: ogImage,
    description:
      'HQT Group is a Vietnam-based importer, exporter and cold-chain logistics provider specialising in frozen seafood, meat and poultry.',
    slogan: company.tagline,
    email: company.contact.email,
    telephone: company.contact.phoneE164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.contact.address.street,
      addressLocality: company.contact.address.city,
      addressCountry: company.contact.address.countryCode,
    },
    areaServed: [company.contact.address.country, ...company.sourcingOrigins],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: company.contact.email,
      telephone: company.contact.phoneE164,
      availableLanguage: ['en', 'vi'],
    },
    ...(sameAs.length ? { sameAs } : {}),
  }

  return {
    name: 'hqt-seo-inject',
    transformIndexHtml: {
      // Run before Vite's own %ENV% replacement so our placeholders never warn.
      order: 'pre',
      handler(html) {
        return html
          .replaceAll('%SITE_URL%', siteUrl)
          .replaceAll('%OG_IMAGE%', ogImage)
          .replaceAll('%COMPANY_NAME%', company.name)
          .replaceAll('%JSON_LD%', JSON.stringify(jsonLd))
      },
    },
  }
}

const base = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react(), seoPlugin(base)],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2020',
    sourcemap: false,
  },
})
