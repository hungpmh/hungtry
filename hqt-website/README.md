# HQT Group website

Bilingual (English / Vietnamese) static marketing website for **HQT Group — Import · Export · Cold-Chain Logistics**.

Built with Vite 5, React 18, TypeScript 5, Tailwind CSS 3 and lucide-react. No backend, no external images or CDNs; everything ships as static files.

## Quick start

```bash
cd hqt-website
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with hot reload                        |
| `npm run build`     | Type-check (`tsc -b`) and build the production bundle to `dist/` |
| `npm run preview`   | Serve the production build locally                               |
| `npm run typecheck` | Type-check only, no emit                                         |

Node 20+ is recommended (CI uses Node 22).

## Deploying to GitHub Pages (or any sub-path)

The Vite `base` is read from `VITE_BASE_PATH` (default `/`). For a project site served at
`https://<owner>.github.io/<repo>/`, build with:

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

All asset links (favicon, JS/CSS, Open Graph image, JSON-LD URLs) respect this base path.
The public origin used for canonical / Open Graph URLs comes from `siteOrigin` in
`src/content/company.ts` and can be overridden per build with `VITE_SITE_ORIGIN`:

```bash
VITE_SITE_ORIGIN=https://<owner>.github.io VITE_BASE_PATH=/<repo>/ npm run build
```

The repository's `.github/workflows/deploy-pages.yml` handles this automatically.

## Replacing placeholder company details (do this first)

**All company, contact and social values live in one file:**

```
src/content/company.ts
```

Every value marked `// PLACEHOLDER` is fictional and must be replaced before going live:

| Field                       | Currently                              | Replace with                                        |
| --------------------------- | -------------------------------------- | --------------------------------------------------- |
| `legalName`                 | `HQT Group Import Export Co., Ltd.`    | Registered company name                             |
| `siteOrigin`                | `https://hqtgroup.example`             | Real domain, no trailing slash, no sub-path         |
| `contact.email`             | `contact@hqtgroup.example`             | Real sales / enquiry mailbox (used by the contact form's `mailto:`) |
| `contact.phoneDisplay`      | `+84 (0) 000 000 000`                  | Phone number as it should be displayed              |
| `contact.phoneE164`         | `+84000000000`                         | Same number in E.164 form (for `tel:` links / SEO)  |
| `contact.address.street`    | `Address to be confirmed`              | Street address                                      |
| `contact.address.city`      | `Ho Chi Minh City`                     | Confirm                                             |
| `contact.hours.en` / `.vi`  | Mon–Fri 08:00–17:30                    | Confirm business hours                              |
| `social.whatsapp`           | `https://wa.me/84000000000`            | `https://wa.me/<country code + number, digits only>` or `''` to hide |
| `social.zalo`               | `https://zalo.me/0000000000`           | `https://zalo.me/<number or OA id>` or `''` to hide |
| `social.linkedin`, `social.facebook` | `''` (hidden)                 | Full profile URLs to include them in JSON-LD `sameAs` |

Changing `company.ts` updates the header/footer, the Contact section, the `mailto:` form, the
canonical / Open Graph tags and the JSON-LD `Organization` schema injected into `index.html` at
build time (see `vite.config.ts`). No other file needs editing for contact changes.

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
WhatsApp / Zalo buttons link to `company.social.*`.

## Project structure

```
hqt-website/
├── index.html                 # SEO meta, OG/Twitter tags, JSON-LD placeholder
├── public/                    # favicon.svg, og-image.png, robots.txt
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
├── vite.config.ts             # base path + build-time SEO injection plugin
└── tailwind.config.js         # navy / ice / accent palette, dark mode via media query
```

## Accessibility & quality notes

- Semantic landmarks, a single `<h1>`, ordered headings, skip-to-content link, visible focus rings,
  `aria-expanded` on the mobile menu button, labelled form fields with inline error messages.
- Responsive from 360 px up; no horizontal scrolling.
- Respects `prefers-reduced-motion` and `prefers-color-scheme` (dark mode).
- No external requests at runtime (system font stack, inline SVG, lucide icons).
