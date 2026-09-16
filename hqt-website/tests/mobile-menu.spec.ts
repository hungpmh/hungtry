import { expect, test } from '@playwright/test'
import { dictionaries, openSite } from './helpers'

test.use({ viewport: { width: 390, height: 800 } })

test.describe('mobile menu', () => {
  test('toggles aria-expanded and closes on link click, Escape and outside click', async ({ page }) => {
    await openSite(page)
    // The accessible name flips to "Close menu" when open, so locate the button structurally.
    const button = page.locator('header button[aria-controls="mobile-menu"]')
    const menu = page.locator('#mobile-menu')

    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(button).toHaveAccessibleName(dictionaries.en.common.openMenu)
    await expect(menu).toBeHidden()

    // Open
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await expect(button).toHaveAccessibleName(dictionaries.en.common.closeMenu)
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link')).toHaveCount(8) // 7 sections + CTA

    // Close via the button
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(menu).toBeHidden()

    // Escape closes and returns focus to the button
    await button.focus()
    await page.keyboard.press('Enter')
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(button).toBeFocused()

    // Click outside closes
    await button.click()
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    await page.mouse.click(195, 700)
    await expect(button).toHaveAttribute('aria-expanded', 'false')

    // Following a link closes the menu and lands on the section
    await button.click()
    await menu.getByRole('link', { name: dictionaries.en.nav.services }).click()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await expect(page).toHaveURL(/#services$/)
  })

  test('menu button meets the 44px touch-target size', async ({ page }) => {
    await openSite(page)
    const box = await page.locator('header button[aria-controls="mobile-menu"]').boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThanOrEqual(44)
    expect(box!.height).toBeGreaterThanOrEqual(44)
  })
})
