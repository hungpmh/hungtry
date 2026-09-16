import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { openSite, switchLanguage, type Lang } from './helpers'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']

function seriousViolations(results: Awaited<ReturnType<AxeBuilder['analyze']>>) {
  return results.violations
    .filter((v) => v.impact === 'serious' || v.impact === 'critical')
    .map((v) => `${v.impact} ${v.id}: ${v.help} -> ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
}

for (const lang of ['en', 'vi'] as Lang[]) {
  test(`axe: no serious or critical violations (${lang}, light)`, async ({ page }) => {
    await openSite(page)
    await switchLanguage(page, lang)
    const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
    expect(seriousViolations(results)).toEqual([])
  })
}

test('axe: no serious or critical violations in dark mode with menu open and form errors shown (vi)', async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: 'dark', viewport: { width: 390, height: 800 } })
  const page = await context.newPage()
  await openSite(page)
  await switchLanguage(page, 'vi')
  await page.locator('form button[type="submit"]').click()
  await expect(page.locator('form [role="alert"]').first()).toBeVisible()
  await page.locator('header button[aria-controls="mobile-menu"]').click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
  const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
  expect(seriousViolations(results)).toEqual([])
  await context.close()
})

test('keyboard: skip link is first, becomes visible on focus and moves focus to main', async ({ page }) => {
  await openSite(page)
  await page.keyboard.press('Tab')
  const skip = page.locator('a[href="#main"]').first()
  await expect(skip).toBeFocused()
  const box = await skip.boundingBox()
  expect(box!.width).toBeGreaterThan(50)
  expect(box!.height).toBeGreaterThan(20)
  await page.keyboard.press('Enter')
  await expect(page.locator('main#main')).toBeFocused()
})

test('keyboard: focused controls show a visible focus ring', async ({ page }) => {
  await openSite(page)
  await page.keyboard.press('Tab') // skip link
  await page.keyboard.press('Tab') // logo link
  await page.keyboard.press('Tab') // language toggle EN
  const shadow = await page.evaluate(() => getComputedStyle(document.activeElement!).boxShadow)
  expect(shadow).not.toBe('none')
})
