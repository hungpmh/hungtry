# HQT Group website

Bilingual (English / Vietnamese) static marketing website for **HQT Group — Import · Export · Cold-Chain Logistics**.

Built with Vite 5, React 18, TypeScript 5, Tailwind CSS 3 and lucide-react. No backend, no external images or CDNs; everything ships as static files.

## Quick start

```bash
cd hqt-website
npm install
npm run dev        # http://localhost:5173
```

| Script                     | What it does                                                             |
| -------------------------- | ------------------------------------------------------------------------ |
| `npm run dev`              | Start the Vite dev server with hot reload                                 |
| `npm run build`            | Type-check (`tsc -b`) and build the hosted site to `dist/`                |
| `npm run build:standalone` | Build the whole site as one file, `dist-standalone/index.html` (see below) |
| `npm run preview`          | Serve the production build locally                                        |
| `npm run typecheck`        | Type-check only, no emit                                                  |
| `npm test`                 | Build both outputs and run the Playwright smoke / accessibility suite     |

Node 20+ is recommended (CI uses Node 22).

## Deploying to GitHub Pages (or any sub-path)

The Vite `base` is read from `VITE_BASE_PATH` (default `/`). For a project site served at
`https://<owner>.github.io/<repo>/`, build with:

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

All asset links (favicon, JS/CSS, Open Graph image, JSON-LD URLs) respect this base path.

The canonical / Open Graph URL tags need the public origin of the site. It comes from
`siteOrigin` in `src/content/company.ts`, or per build from `VITE_SITE_ORIGIN`:

```bash
VITE_SITE_ORIGIN=https://<owner>.github.io VITE_BASE_PATH=/<repo>/ npm run build
```

When neither is set those tags are left out, so a build never points at a domain it is not
served from. The repository's `.github/workflows/deploy-pages.yml` passes both values
automatically.

## Single-file build for third-party hosting

```bash
npm run build:standalone      # -> dist-standalone/index.html
```

This produces the complete site as **one HTML file** with the script, styles and icon inside
it. It needs no other files, makes no network requests, and works from any host, any folder
or straight from disk, so it is the copy to hand to a partner who will host the site:
upload it as `index.html` and it is live.

- The file is plain ASCII, so Vietnamese text displays correctly even if the host declares
  the wrong character set.
- It carries no canonical / share-image tags, because its final address is not known. Once
  the official domain is set as `siteOrigin` in `company.ts`, the canonical URL is included.
- With scripts disabled it still shows the company name and contact details.
- Rebuild and resend it whenever the content changes. CI also attaches the tested file to
  every run as the `hqt-group-website-standalone` artifact.

## Company and contact details

**All company, contact and social values live in one file:**

```
src/content/company.ts
```

| Field                           | Value / meaning                                                              |
| ------------------------------- | ---------------------------------------------------------------------------- |
| `contact.email`                 | Enquiry mailbox, also the target of the contact form's `mailto:`             |
| `contact.phoneDisplay`          | Phone number as displayed                                                    |
| `contact.phoneE164`             | The same number in E.164 form (for `tel:` links / JSON-LD)                   |
| `contact.address.en` / `.vi`    | Office address in each language (the Vietnamese form feeds JSON-LD and the map link) |
| `contact.address.postalCode`    | Postcode, shown after the city                                               |
| `contact.mapUrl`                | Optional exact Google Maps link; empty = a search link built from the address |
| `contact.hours.en` / `.vi`      | Business hours as displayed                                                  |
| `contact.hours.days` / `.opens` / `.closes` | The same hours in structured form for JSON-LD                    |
| `social.whatsapp`               | `https://wa.me/<country code + number, digits only>` or `''` to hide         |
| `social.zalo`                   | `https://zalo.me/<number or OA id>` or `''` to hide                          |
| `social.linkedin`, `social.facebook` | Full profile URLs, listed in JSON-LD `sameAs` when set                  |

Two values are **still to be supplied** and are empty on purpose. An empty value is left out
of the page rather than filled with a guess:

| Field        | Add when known                                                                      |
| ------------ | ----------------------------------------------------------------------------------- |
| `legalName`  | Registered company name (JSON-LD only)                                              |
| `siteOrigin` | Official domain, e.g. `https://www.example.com` - no trailing slash, no sub-path     |

When the phone number changes, update `phoneDisplay`, `phoneE164` and the WhatsApp / Zalo
links together; the test suite fails if the displayed and dialled numbers disagree.

Changing `company.ts` updates the header/footer, the Contact section, the `mailto:` form, the
no-script fallback, the canonical / Open Graph tags and the JSON-LD `Organization` schema
injected into `index.html` at build time (see `vite.config.ts`). No other file needs editing
for contact changes.

Also consider replacing:

- `public/og-image.png` – 1200×630 social sharing image (currently generated from the site palette).
- `public/favicon.svg` – brand mark.
- `index.html` – the English default `<title>` / description if you want different SEO wording
  (the runtime title/description switch with the language).

## Editing copy / translations

- `src/i18n/en.ts` – English copy. This file defines the dictionary shape.
- `src/i18n/vi.ts` – Vietnamese copy. TypeScript enforces that it has exactly the same keys.

The active language is detected from the browser (`vi*` → Vietnamese, otherwise English),
persisted in `localStorage` (`hqt-lang`), and applied to `<html lang>`, `<title>` and the meta
description. Users switch with the `EN | VI` toggle in the header and footer.

## Contact form

The form has no backend. On submit it validates the required fields and opens the visitor's
email client via a `mailto:` link to `company.contact.email` with subject and body pre-filled.
WhatsApp / Zalo buttons link to `company.social.*`, and the address links to Google Maps.

## Project structure

```
hqt-website/
├── index.html                 # SEO meta, OG/Twitter tags, build-time placeholders
├── public/                    # favicon.svg, og-image.png, robots.txt
├── tests/                     # Playwright smoke, accessibility and standalone-file tests
├── src/
│   ├── main.tsx               # Entry: LanguageProvider + App
│   ├── App.tsx                # Page composition (skip link, header, sections, footer)
│   ├── index.css              # Tailwind layers, focus styles, reduced-motion, components
│   ├── content/
│   │   ├── company.ts         # <-- ALL contact / company / social values
│   │   └── nav.ts             # Section ids + nav order
│   ├── i18n/                  # en.ts, vi.ts, provider + useT() hook
│   ├── hooks/useActiveSection.ts
│   └── components/            # Header, Hero, About, Services, Products, Markets,
│                              # WhyUs, Process, Contact, Footer, Logo, Section, ...
├── vite.config.ts             # base path, build-time SEO injection, standalone single-file build
└── tailwind.config.js         # navy / ice / accent palette, dark mode via media query
```

## Accessibility & quality notes

- Semantic landmarks, a single `<h1>`, ordered headings, skip-to-content link, visible focus rings,
  `aria-expanded` on the mobile menu button, labelled form fields with inline error messages.
- Responsive from 360 px up; no horizontal scrolling.
- Respects `prefers-reduced-motion` and `prefers-color-scheme` (dark mode).
- No external requests at runtime (system font stack, inline SVG, lucide icons).
