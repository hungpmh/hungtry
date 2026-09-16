import { expect, test } from '@playwright/test'
import { dictionaries, openSite, switchLanguage } from './helpers'

test.describe('language toggle', () => {
  test('switches <html lang>, title, meta description and visible copy', async ({ page }) => {
    await openSite(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.locator('h1')).toHaveText(dictionaries.en.hero.title)

    await switchLanguage(page, 'vi')
    await expect(page.locator('h1')).toHaveText(dictionaries.vi.hero.title)
    await expect(page).toHaveTitle(dictionaries.vi.meta.title)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      dictionaries.vi.meta.description,
    )
    // Header nav, section headings, form and footer all follow the language.
    await expect(page.locator('header nav').first().getByRole('link').first()).toHaveText(dictionaries.vi.nav.about)
    await expect(page.locator('#contact-title')).toHaveText(dictionaries.vi.contact.title)
    await expect(page.locator('form button[type="submit"]')).toHaveText(dictionaries.vi.contact.form.submit)
    await expect(page.locator('footer')).toContainText(dictionaries.vi.footer.rights)
    // The toggle reflects the pressed state.
    await expect(page.locator('header').getByRole('button', { name: 'Tiếng Việt', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await expect(page.locator('header').getByRole('button', { name: 'English', exact: true })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
    // No untranslated English strings leak into the Vietnamese page.
    const bodyText = await page.locator('body').innerText()
    for (const leak of ['Skip to main content', 'Open menu', 'Get a quote', 'All rights reserved', 'IN TRANSIT']) {
      expect(bodyText, `"${leak}" should be translated`).not.toContain(leak)
    }

    await switchLanguage(page, 'en')
    await expect(page.locator('h1')).toHaveText(dictionaries.en.hero.title)
    await expect(page).toHaveTitle(dictionaries.en.meta.title)
  })

  test('persists the chosen language across a reload', async ({ page }) => {
    await openSite(page)
    await switchLanguage(page, 'vi')
    expect(await page.evaluate(() => localStorage.getItem('hqt-lang'))).toBe('vi')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page.locator('h1')).toHaveText(dictionaries.vi.hero.title)
  })

  test('falls back to the browser language and survives a broken localStorage', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'vi-VN' })
    await context.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new Error('QuotaExceededError')
      }
      Storage.prototype.getItem = () => {
        throw new Error('SecurityError')
      }
    })
    const page = await context.newPage()
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    await openSite(page)
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await switchLanguage(page, 'en')
    await expect(page.locator('h1')).toHaveText(dictionaries.en.hero.title)
    expect(errors).toEqual([])
    await context.close()
  })
})
