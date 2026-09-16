import { expect, test } from '@playwright/test'
import { company } from '../src/content/company'
import { dictionaries, openSite, switchLanguage } from './helpers'

test.describe('contact form', () => {
  test('validates required fields and focuses the first invalid one', async ({ page }) => {
    await openSite(page)
    const form = page.locator('form')
    const errors = dictionaries.en.contact.form.errors

    await form.locator('button[type="submit"]').click()

    await expect(form.getByRole('alert')).toHaveText([errors.name, errors.email, errors.message])
    await expect(form.locator('[aria-invalid="true"]')).toHaveCount(3)
    await expect(form.locator('input[name="name"]')).toBeFocused()
    // Each error is linked to its field.
    const describedBy = await form.locator('input[name="email"]').getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    // React's useId() produces ids containing ":", so match on the attribute rather than a #id selector.
    await expect(page.locator(`[id="${describedBy}"]`)).toHaveText(errors.email)

    // Fixing a field clears its error.
    await form.locator('input[name="name"]').fill('Test User')
    await expect(form.locator('input[name="name"]')).not.toHaveAttribute('aria-invalid', 'true')

    // Invalid email and short message are still rejected.
    await form.locator('input[name="email"]').fill('not-an-email')
    await form.locator('textarea[name="message"]').fill('short')
    await form.locator('button[type="submit"]').click()
    await expect(form.getByRole('alert')).toHaveText([errors.email, errors.message])
    await expect(page.getByRole('status')).toBeEmpty()
  })

  test('builds a correctly encoded mailto link (Vietnamese characters, newlines, no "+")', async ({ page }) => {
    await openSite(page)
    await switchLanguage(page, 'vi')
    const f = dictionaries.vi.contact.form
    const form = page.locator('form')

    await form.locator('input[name="name"]').fill('Nguyễn Văn A')
    await form.locator('input[name="company"]').fill('Công ty TNHH Á Châu')
    await form.locator('input[name="email"]').fill('buyer@example.com')
    await form.locator('input[name="phone"]').fill('+84 912 345 678')
    await form.locator('select[name="interest"]').selectOption('logistics')
    await form.locator('textarea[name="message"]').fill('Cần báo giá 2 container tôm đông lạnh & cá, giao HCM.')
    await form.locator('button[type="submit"]').click()

    // Headless Chromium cannot open a mail client, but the page must stay intact and show the fallback.
    await expect(page.locator('h1')).toBeVisible()
    const status = page.getByRole('status')
    await expect(status).toContainText(f.success)

    const href = await page.getByTestId('mailto-fallback').getAttribute('href')
    expect(href).toBeTruthy()
    expect(href!.startsWith(`mailto:${company.contact.email}?`)).toBe(true)
    expect(href).not.toContain('+') // spaces must be %20, not "+"

    const params = new URL(href!.replace(/^mailto:[^?]*\?/, 'https://x/?')).searchParams
    const subject = params.get('subject')!
    const body = params.get('body')!
    expect(subject).toBe(`${f.subjectPrefix} Nguyễn Văn A (Công ty TNHH Á Châu) - ${f.interests.logistics}`)
    expect(body).toContain(`${f.name}: Nguyễn Văn A`)
    expect(body).toContain(`${f.company}: Công ty TNHH Á Châu`)
    expect(body).toContain(`${f.email}: buyer@example.com`)
    expect(body).toContain('+84 912 345 678')
    expect(body).toContain(`${f.interest}: ${f.interests.logistics}`)
    expect(body.split('\n').length).toBeGreaterThanOrEqual(7) // one line per field + blank line + message
    expect(body.endsWith('Cần báo giá 2 container tôm đông lạnh & cá, giao HCM.')).toBe(true)
    // Raw href must be percent-encoded (no bare Vietnamese characters or newlines).
    expect(href).toMatch(/^mailto:[\x21-\x7e]+$/)
    expect(href).toContain('%0A')
  })

  test('fields are labelled and use sensible autocomplete/input types', async ({ page }) => {
    await openSite(page)
    const f = dictionaries.en.contact.form
    await expect(page.getByLabel(f.name, { exact: false })).toHaveAttribute('autocomplete', 'name')
    await expect(page.getByLabel(f.email, { exact: false })).toHaveAttribute('type', 'email')
    await expect(page.getByLabel(f.phone, { exact: false })).toHaveAttribute('type', 'tel')
    await expect(page.getByLabel(f.interest)).toHaveCount(1)
    await expect(page.getByLabel(f.message, { exact: false })).toHaveAttribute('placeholder', f.messagePlaceholder)
  })
})
