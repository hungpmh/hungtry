import { expect, type Page } from '@playwright/test'
import en from '../src/i18n/en'
import vi from '../src/i18n/vi'

export const dictionaries = { en, vi }
export type Lang = keyof typeof dictionaries

/** Collects console errors / uncaught exceptions for later assertion. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console.error: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
  return errors
}

/** Opens the site (relative to baseURL) and waits for React to render the hero. */
export async function openSite(page: Page, path = './') {
  await page.goto(path)
  await expect(page.locator('h1')).toBeVisible()
}

/** Switches language via the header toggle and waits for <html lang> to update. */
export async function switchLanguage(page: Page, lang: Lang) {
  const name = lang === 'vi' ? 'Tiếng Việt' : 'English'
  await page.locator('header').getByRole('button', { name, exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', lang)
}
