# QA / QC Report — HQT Group website

**Scope:** `hqt-website/` — bilingual (English / Vietnamese) single-page marketing
site for HQT Group, deployed to GitHub Pages under the `/hungtry/` base path.

**Environment:** Node 22, Vite 5, React 18, Chromium (Playwright 1.63),
axe-core 4.13. Verified at the default base path (`/`) and at `/hungtry/`.

---

## Summary

| Area | Result |
|---|---|
| Production build (`/` and `/hungtry/`) | Pass |
| TypeScript type check | Pass, no errors |
| Automated suite (22 tests) | Pass |
| Accessibility (axe, serious + critical) | No violations |
| Console errors / failed requests / 404s | None |
| Horizontal overflow at 360–1440 px | None |
| Bundle | JS 213 kB (66 kB gzip), CSS 31 kB (6 kB gzip), no chunk over 500 kB |

---

## Defects found and fixed

| # | Severity | Area | Defect | Fix |
|---|---|---|---|---|
| 1 | Medium | Hero illustration | The captions drawn inside the cold-chain graphic stayed in English when the site was switched to Vietnamese. | Captions moved into the translation dictionaries and passed in as props; the chip that holds the status text now sizes itself to the translated string so the longer Vietnamese label cannot overflow. |
| 2 | Medium | Header | Vietnamese navigation links and the quote button could wrap onto a second line at desktop widths, making the sticky header taller than intended. | Header spacing tightened and a regression test added that fails if any link or the button wraps at 1280 px. |
| 3 | Medium | Process section | The connector line was a `div` placed directly inside an ordered list, so the list contained a non-list child. | The decorative line moved outside the list into a wrapping element. |
| 4 | Medium | Contact and footer | Several links were below the 44 px minimum touch target on mobile, and the menu button was 40 px. | Vertical padding added to the affected links; the menu button is now 44 px square, covered by a test. |
| 5 | Medium | Contact form | The fallback address shown after submitting linked to a bare mailto without the enquiry, so a visitor whose mail client failed to open lost what they had typed. | The fallback link now carries the fully built enquiry. |
| 6 | Low | Process section | The step numbers did not have enough contrast against the tinted background in light mode. | Darkened one step on the colour ramp. |
| 7 | Low | Header and footer | Both navigation landmarks carried hard-coded English accessible names. | Names now come from the translation dictionaries. |
| 8 | Low | Markets section | A caption was hard-coded rather than translated. | Routed through the dictionaries. |
| 9 | Low | Meta description | Both descriptions exceeded the length search engines display. | Shortened to 161 (English) and 168 (Vietnamese) characters. |
| 10 | Low | Mobile menu | The menu did not close when tapping outside it. | Added an outside-pointer handler, covered by a test. |
| 11 | Low | Skip link | Activating it moved the viewport but not keyboard focus. | `main` is now focusable as a target, covered by a test. |

Three failures in the first full run of the new suite were defects in the
**test code**, not the site, and were corrected:

- A selector built from a React-generated id containing colons, which is not
  valid CSS. Replaced with an attribute selector.
- A menu-button locator matched by accessible name, which stops matching once
  the name flips to "Close menu" on open. Replaced with a structural locator.
- A scroll assertion whose wait condition was satisfied immediately, so it
  measured before smooth scrolling finished. Replaced with a real settle wait.

Anchor scrolling was then verified manually for all seven sections: each lands
160 px from the top of the viewport with the sticky header ending at 65 px, so
no heading is hidden behind the header.

---

## What was verified

**Build and deployment.** Clean install and build succeed at both base paths.
The built page references the favicon, styles, script, canonical URL, Open Graph
URLs and JSON-LD under the correct prefix. The output contains no source maps
and no stray files.

**Accessibility.** axe-core reports no serious or critical violations in English
or Vietnamese, including a dark-mode pass at mobile width with the menu open and
form errors displayed. Keyboard checks cover the skip link, visible focus rings,
menu operation by keyboard including Escape, and focus moving to the first
invalid field on a failed submit.

**Internationalisation.** The toggle switches the document language, page title,
meta description, navigation, headings, form and footer, and the choice survives
a reload. A Vietnamese browser locale is detected on first visit. The site still
works when `localStorage` throws, which happens in private browsing and with
site data blocked. A check asserts that known English strings do not leak into
the Vietnamese page.

**Contact form.** Required-field validation, per-field error messages tied to
their inputs, invalid-email rejection, and a correctly percent-encoded mailto
link carrying Vietnamese characters and line breaks.

**Other.** Footer year, external links carrying both `noopener` and `noreferrer`,
valid JSON-LD describing the organisation, and `robots.txt` served correctly.

---

## Test suite

Five spec files under `tests/`, 22 tests, about 30 seconds.

```bash
npm test                                  # builds, serves, runs the suite
VITE_BASE_PATH=/hungtry/ npm test         # same, at the deployed base path
PW_SKIP_BUILD=1 npm test                  # reuse an existing dist/
PW_CHROMIUM_PATH=/path/to/chromium npm test   # use a pre-installed Chromium
```

Continuous integration runs the suite on every push through the
`hqt-website` job in `.github/workflows/ci.yml`, at the same base path used for
the deployment, and uploads the Playwright report if anything fails.

---

## Recommendations for the owner

1. **Replace the placeholders.** Every fictional value lives in
   `src/content/company.ts` and is marked. The site is not ready to publish
   until the email address, phone number, legal name, address, public domain
   and messaging links are real.
2. **Confirm the food-safety wording.** The copy says suppliers operate under
   HACCP-based systems and that seafood comes from certified plants. These are
   claims about the supply base rather than about HQT holding a certificate,
   which is the safer framing, but they should still be checked against what
   can be evidenced before going live.
3. **Consider a real form endpoint.** The enquiry form opens the visitor's mail
   application. Visitors with only webmail configured may see nothing happen,
   which is why the address is shown as a fallback. A hosted form service would
   capture enquiries more reliably.
4. **Static metadata is English.** The title and description in the page source
   are English and switch to Vietnamese once scripts run. This is fine for
   visitors and for search engines that execute JavaScript, but a crawler that
   does not will index the English text for both languages.
5. **Add analytics only with consent.** Nothing tracks visitors today, which
   keeps the site free of cookie-consent obligations. Adding analytics later
   will change that.
