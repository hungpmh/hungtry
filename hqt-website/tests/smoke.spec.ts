import { expect, test } from '@playwright/test'
import { dictionaries, openSite, switchLanguage, trackErrors } from './helpers'

test.describe('page load', () => {
  test('renders without console errors, failed requests or 404s', async ({ page }) => {
    const errors = trackErrors(page)
    const badResponses: string[] = []
    page.on('response', (res) => {
      if (res.status() >= 400) badResponses.push(`${res.status()} ${res.url()}`)
    })
    page.on('requestfailed', (req) => badResponses.push(`failed ${req.url()}`))

    await openSite(page)
    await page.waitForLoadState('networkidle')

    expect(errors).toEqual([])
    expect(badResponses).toEqual([])
    await expect(page).toHaveTitle(dictionaries.en.meta.title)
  })

  test('has exactly one h1 and the expected landmarks', async ({ page }) => {
    await openSite(page)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveText(dictionaries.en.hero.title)
    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('main#main')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(1)
    await expect(page.getByRole('navigation')).toHaveCount(2) // desktop primary + footer (mobile nav is display:none)
    // Skip link is the first focusable element and targets <main>.
    const skip = page.locator('a[href="#main"]').first()
    await expect(skip).toHaveText(dictionaries.en.common.skipToContent)
  })

  test('JSON-LD is valid and describes the organisation', async ({ page }) => {
    await openSite(page)
    const raw = await page.locator('script[type="application/ld+json"]').textContent()
    const data = JSON.parse(raw ?? '')
    expect(data['@type']).toBe('Organization')
    expect(data.name).toBe('HQT Group')
    expect(typeof data.url).toBe('string')
    expect(data.url.endsWith('/')).toBe(true)
  })

  test('asset URLs honour the configured base path', async ({ page, baseURL }) => {
    await openSite(page)
    const basePath = new URL(baseURL!).pathname
    const icon = await page.locator('link[rel="icon"]').getAttribute('href')
    expect(icon).toBe(`${basePath}favicon.svg`)
    const res = await page.request.get(`${baseURL}robots.txt`)
    expect(res.ok()).toBe(true)
    expect(await res.text()).toContain('User-agent: *')
  })
})

test.describe('navigation', () => {
  test('every header nav anchor resolves to a section that is not hidden under the sticky header', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await openSite(page)
    const links = page.locator('header nav a[href^="#"]').filter({ visible: true })
    const hrefs = await links.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))
    expect(hrefs.length).toBeGreaterThanOrEqual(7)

    for (const href of hrefs) {
      const id = href.slice(1)
      const section = page.locator(`#${id}`)
      await expect(section, `${href} should point at an existing section`).toHaveCount(1)
      await page.locator(`header nav a[href="${href}"]`).filter({ visible: true }).click()
      await expect(page).toHaveURL(new RegExp(`${href}$`))
      // Smooth scrolling: wait until the scroll position has actually settled.
      await page.waitForFunction(
        () =>
          new Promise<boolean>((resolve) => {
            let last = Number.NaN
            let stable = 0
            const tick = () => {
              const y = window.scrollY
              if (Math.abs(y - last) < 0.5) {
                if (++stable > 3) return resolve(true)
              } else {
                stable = 0
              }
              last = y
              requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }),
        null,
        { timeout: 5_000 },
      )
      const pos = await page.evaluate((sectionId) => {
        const top = document.getElementById(sectionId)!.getBoundingClientRect().top
        const headerBottom = document.querySelector('header')!.getBoundingClientRect().bottom
        return { top, headerBottom }
      }, id)
      expect(pos.top, `${href} top should be below the sticky header`).toBeGreaterThanOrEqual(pos.headerBottom - 1)
      expect(pos.top, `${href} should be near the top of the viewport`).toBeLessThan(pos.headerBottom + 160)
    }
  })

  test('Vietnamese header links and CTA stay on a single line at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await openSite(page)
    await switchLanguage(page, 'vi')
    const items = page.locator('header nav a, header a.btn-primary').filter({ visible: true })
    const count = await items.count()
    expect(count).toBeGreaterThanOrEqual(8) // 7 nav links + "Nhận báo giá"
    for (let i = 0; i < count; i++) {
      const el = items.nth(i)
      const box = await el.boundingBox()
      const lineHeight = await el.evaluate((node) => parseFloat(getComputedStyle(node).lineHeight))
      const text = (await el.textContent())?.trim()
      expect(box, `${text} should be rendered`).not.toBeNull()
      // padding-y is at most 8px per side, so anything over one line + padding means the text wrapped.
      expect(box!.height, `"${text}" should not wrap`).toBeLessThan(lineHeight + 20)
    }
    const headerHeight = await page.locator('header').evaluate((h) => h.getBoundingClientRect().height)
    expect(headerHeight).toBeLessThanOrEqual(72)
  })

  test('has no horizontal overflow at 360px in either language', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 })
    await openSite(page)
    for (const lang of ['en', 'vi'] as const) {
      await switchLanguage(page, lang)
      const widths = await page.evaluate(() => ({
        doc: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
      }))
      expect(widths.doc, `${lang}: document should not be wider than the viewport`).toBeLessThanOrEqual(widths.viewport)
    }
  })

  test('external messaging links open safely in a new tab', async ({ page }) => {
    await openSite(page)
    const external = page.locator('a[target="_blank"]')
    const count = await external.count()
    for (let i = 0; i < count; i++) {
      const rel = (await external.nth(i).getAttribute('rel')) ?? ''
      expect(rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
    }
  })

  test('footer shows the current year', async ({ page }) => {
    await openSite(page)
    await expect(page.locator('footer')).toContainText(`© ${new Date().getFullYear()} HQT Group`)
  })
})
