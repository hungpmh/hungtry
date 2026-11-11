import { expect, test } from '@playwright/test'
import { addressLines, company, mapLink } from '../src/content/company'
import { dictionaries, openSite, switchLanguage } from './helpers'

const { contact, social } = company

test.describe('contact details', () => {
  for (const lang of ['en', 'vi'] as const) {
    test(`contact card and footer show the company details (${lang})`, async ({ page }) => {
      await openSite(page)
      await switchLanguage(page, lang)
      const t = dictionaries[lang]
      const [line1, line2] = addressLines(lang)

      const card = page.locator('#contact dl')
      await expect(card.getByRole('link', { name: contact.email })).toHaveAttribute('href', `mailto:${contact.email}`)
      await expect(card.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute(
        'href',
        `tel:${contact.phoneE164}`,
      )
      await expect(card.locator('address')).toContainText(line1)
      await expect(card.locator('address')).toContainText(line2)
      await expect(card).toContainText(contact.hours[lang])
      // The map link says where it goes and that it leaves the page.
      const map = card.getByRole('link', { name: t.contact.viewMap })
      await expect(map).toHaveAttribute('href', mapLink())
      await expect(map).toHaveAccessibleName(`${t.contact.viewMap} (${t.common.opensInNewTab})`)

      const footer = page.locator('footer')
      await expect(footer.getByRole('link', { name: contact.email })).toHaveAttribute('href', `mailto:${contact.email}`)
      await expect(footer.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute(
        'href',
        `tel:${contact.phoneE164}`,
      )
      await expect(footer.getByRole('link', { name: line1 })).toHaveAttribute('href', mapLink())
      await expect(footer).toContainText(line2)
    })
  }

  test('messaging buttons link to the configured accounts', async ({ page }) => {
    await openSite(page)
    const card = page.locator('#contact')
    const t = dictionaries.en
    for (const [label, href] of [
      [t.contact.whatsapp, social.whatsapp],
      [t.contact.zalo, social.zalo],
    ] as const) {
      const link = card.getByRole('link', { name: label })
      // An empty value in company.ts hides that button.
      if (!href) {
        await expect(link).toHaveCount(0)
        continue
      }
      await expect(link).toHaveAttribute('href', href)
      await expect(link).toHaveAccessibleName(`${label} (${t.common.opensInNewTab})`)
    }
  })

  test('the map link searches for the office address', () => {
    const url = new URL(mapLink())
    expect(url.protocol).toBe('https:')
    // With no exact link configured, the search query is the address itself.
    if (!contact.mapUrl) {
      const { street, ward, city } = contact.address.vi
      const query = url.searchParams.get('query') ?? ''
      for (const part of [street, ward, city]) expect(query).toContain(part)
    }
  })

  test('JSON-LD carries the contact details and opening hours', async ({ page }) => {
    await openSite(page)
    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '')
    expect(data.email).toBe(contact.email)
    expect(data.telephone).toBe(contact.phoneE164)
    expect(data.address).toEqual({
      '@type': 'PostalAddress',
      streetAddress: contact.address.vi.street,
      addressLocality: contact.address.vi.ward,
      addressRegion: contact.address.vi.city,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.countryCode,
    })
    expect(data.contactPoint.telephone).toBe(contact.phoneE164)
    expect(data.contactPoint.hoursAvailable).toMatchObject({
      dayOfWeek: [...contact.hours.days],
      opens: contact.hours.opens,
      closes: contact.hours.closes,
    })
    // Unconfirmed values are left out, never published as a guess.
    if (!company.legalName) expect(data).not.toHaveProperty('legalName')
  })

  test('phone, email and messaging values are well formed and agree with each other', () => {
    const digits = (value: string) => value.replace(/\D/g, '')
    expect(contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i)
    expect(contact.phoneE164).toMatch(/^\+[1-9]\d{7,14}$/)
    // The number people read is the number the tel: link dials.
    expect(digits(contact.phoneDisplay)).toBe(digits(contact.phoneE164))
    if (social.whatsapp) expect(social.whatsapp).toMatch(/^https:\/\/wa\.me\/[1-9]\d{7,14}$/)
    if (social.zalo) expect(social.zalo).toMatch(/^https:\/\/zalo\.me\/[\w.-]+$/)
    expect(contact.hours.opens < contact.hours.closes).toBe(true)
  })

  test('no placeholder values are left in the page', async ({ page }) => {
    const response = await page.goto('./')
    const source = (await response!.text()) + (await page.locator('body').innerText())
    for (const placeholder of [/\.example\b/, /000 000/, /0{7,}/, /to be confirmed/i, /PLACEHOLDER/]) {
      expect(source).not.toMatch(placeholder)
    }
  })
})
