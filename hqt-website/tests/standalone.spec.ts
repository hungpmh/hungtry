import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { expect, test } from '@playwright/test'
import { addressLines, company } from '../src/content/company'
import { dictionaries, trackErrors } from './helpers'

/**
 * The standalone build (`npm run build:standalone`) is the copy handed to third
 * parties: one HTML file that must work wherever it is put, with nothing else
 * beside it. These tests load it straight from disk rather than from the
 * preview server.
 */
const outDir = fileURLToPath(new URL('../dist-standalone/', import.meta.url))
const file = `${outDir}index.html`
const fileUrl = pathToFileURL(file).href
const { contact } = company

test.describe('standalone single-file build', () => {
  test.beforeAll(() => {
    expect(existsSync(file), 'dist-standalone/index.html is missing - run "npm run build:standalone" first').toBe(true)
  })

  test('is one self-contained, ASCII-only file', () => {
    expect(readdirSync(outDir)).toEqual(['index.html'])
    const html = readFileSync(file, 'utf8')
    // Pure ASCII reads the same under any charset a host might declare.
    expect(html.match(/[^\x00-\x7f]/u)?.[0]).toBeUndefined()
    // Nothing is loaded from elsewhere: script, styles and icon are all inside the file.
    expect(html).not.toMatch(/<script\b[^>]*\bsrc=/i)
    expect(html).not.toMatch(/<link\b[^>]*\brel="(?:stylesheet|modulepreload)"/i)
    expect(html).toMatch(/<link rel="icon" type="image\/svg\+xml" href="data:image\/svg\+xml;base64,/)
  })

  test('renders from disk with the network off, without errors or further requests', async ({ browser }) => {
    const context = await browser.newContext({ offline: true })
    const page = await context.newPage()
    const errors = trackErrors(page)
    const requests: string[] = []
    page.on('request', (request) => requests.push(request.url()))

    await page.goto(fileUrl)
    await expect(page.locator('h1')).toHaveText(dictionaries.en.hero.title)
    await page.waitForLoadState('networkidle')
    // Styles are applied (the hero heading is white on navy), not just markup rendered.
    await expect(page.locator('h1')).toHaveCSS('color', 'rgb(255, 255, 255)')

    expect(errors).toEqual([])
    expect(requests).toEqual([fileUrl])
    await context.close()
  })

  test('language toggle, navigation and contact details work', async ({ page }) => {
    await page.goto(fileUrl)
    await page.locator('header').getByRole('button', { name: 'Tiếng Việt', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page.locator('h1')).toHaveText(dictionaries.vi.hero.title)
    await expect(page).toHaveTitle(dictionaries.vi.meta.title)

    const card = page.locator('#contact dl')
    await expect(card.getByRole('link', { name: contact.email })).toHaveAttribute('href', `mailto:${contact.email}`)
    await expect(card.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute(
      'href',
      `tel:${contact.phoneE164}`,
    )
    await expect(card.locator('address')).toContainText(addressLines('vi')[0])
    await expect(card).toContainText(contact.hours.vi)

    // In-page navigation still works from a file:// address.
    await page.locator('header nav a[href="#contact"]').filter({ visible: true }).click()
    await expect(page).toHaveURL(`${fileUrl}#contact`)
  })

  test('carries no tags tied to a particular deployment', async ({ page }) => {
    await page.goto(fileUrl)
    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? '')
    expect(jsonLd.email).toBe(contact.email)
    // The share image and logo are separate files, which this build does not have.
    await expect(page.locator('meta[property="og:image"], meta[name="twitter:image"]')).toHaveCount(0)
    expect(jsonLd).not.toHaveProperty('image')

    const canonical = page.locator('link[rel="canonical"]')
    if (company.siteOrigin) {
      // Once the official domain is set in company.ts, the file points at it.
      await expect(canonical).toHaveAttribute('href', `${company.siteOrigin}/`)
      expect(jsonLd.url).toBe(`${company.siteOrigin}/`)
    } else {
      await expect(canonical).toHaveCount(0)
      await expect(page.locator('meta[property="og:url"]')).toHaveCount(0)
      expect(jsonLd).not.toHaveProperty('url')
    }
  })

  test('Vietnamese text survives a host that declares the wrong charset', async ({ page }) => {
    await page.route('http://standalone.test/', (route) =>
      route.fulfill({ body: readFileSync(file), contentType: 'text/html; charset=iso-8859-1' }),
    )
    await page.goto('http://standalone.test/')
    await page.locator('header').getByRole('button', { name: 'Tiếng Việt', exact: true }).click()
    await expect(page.locator('h1')).toHaveText(dictionaries.vi.hero.title)
    await expect(page).toHaveTitle(dictionaries.vi.meta.title)
    await expect(page.locator('#contact address')).toContainText(addressLines('vi')[0])
  })

  test('shows the company and contact details when scripts are disabled', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(fileUrl)
    // Text matching skips a <noscript> element itself, so read the block inside it.
    const fallback = page.locator('noscript > div')
    await expect(fallback).toContainText(company.name)
    await expect(fallback).toContainText(dictionaries.vi.common.noscript)
    await expect(fallback.getByRole('link', { name: contact.email })).toHaveAttribute('href', `mailto:${contact.email}`)
    await expect(fallback.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute(
      'href',
      `tel:${contact.phoneE164}`,
    )
    await expect(fallback).toContainText(addressLines('vi').join(', '))
    await context.close()
  })
})
