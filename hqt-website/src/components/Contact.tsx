import { Clock, Info, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useLanguage } from '../i18n'
import { company } from '../content/company'
import { Section } from './Section'

type Interest = 'import' | 'export' | 'logistics' | 'other'

interface FormState {
  name: string
  company: string
  email: string
  phone: string
  interest: Interest
  message: string
}

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const INITIAL: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  interest: 'import',
  message: '',
}

export function Contact() {
  const { t, lang } = useLanguage()
  const f = t.contact.form
  const { contact, social } = company
  const uid = useId()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [mailtoHref, setMailtoHref] = useState<string>(`mailto:${company.contact.email}`)

  const id = (name: keyof FormState) => `${uid}-${name}`

  const update = (name: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((prev) => ({ ...prev, [name]: e.target.value }))
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (submitted) setSubmitted(false)
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = f.errors.name
    if (!EMAIL_RE.test(form.email.trim())) next.email = f.errors.email
    if (form.message.trim().length < 10) next.message = f.errors.message
    return next
  }

  function buildMailto(): string {
    const who = form.company.trim() ? `${form.name.trim()} (${form.company.trim()})` : form.name.trim()
    const subject = `${f.subjectPrefix} ${who} - ${f.interests[form.interest]}`
    const lines = [
      `${f.name}: ${form.name.trim()}`,
      `${f.company}: ${form.company.trim() || '-'}`,
      `${f.email}: ${form.email.trim()}`,
      `${f.phone.replace(/\s*\(.*\)\s*$/, '')}: ${form.phone.trim() || '-'}`,
      `${f.interest}: ${f.interests[form.interest]}`,
      '',
      form.message.trim(),
    ]
    const params = new URLSearchParams({ subject, body: lines.join('\n') })
    // URLSearchParams encodes spaces as "+", which mail clients do not decode.
    return `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = (['name', 'email', 'message'] as const).find((k) => next[k])
      if (first) document.getElementById(id(first))?.focus()
      return
    }
    const href = buildMailto()
    setMailtoHref(href)
    window.location.href = href
    setSubmitted(true)
  }

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} intro={t.contact.intro}>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
        {/* Details */}
        <div className="card h-fit bg-navy-900 text-white dark:bg-navy-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ice-300">{t.contact.detailsTitle}</h3>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="flex items-center gap-3 text-xs uppercase tracking-wider text-navy-300">
                <Mail className="h-5 w-5 shrink-0 text-ice-300" aria-hidden="true" />
                {t.contact.email}
              </dt>
              <dd className="mt-0.5 break-all pl-8">
                <a href={`mailto:${contact.email}`} className="inline-block rounded py-1 font-medium hover:text-ice-200">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-xs uppercase tracking-wider text-navy-300">
                <Phone className="h-5 w-5 shrink-0 text-ice-300" aria-hidden="true" />
                {t.contact.phone}
              </dt>
              <dd className="mt-0.5 pl-8">
                <a href={`tel:${contact.phoneE164}`} className="inline-block rounded py-1 font-medium hover:text-ice-200">
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-xs uppercase tracking-wider text-navy-300">
                <MapPin className="h-5 w-5 shrink-0 text-ice-300" aria-hidden="true" />
                {t.contact.address}
              </dt>
              <dd className="mt-0.5 pl-8 font-medium">
                {contact.address.street}
                <br />
                {contact.address.city}, {contact.address.country}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-3 text-xs uppercase tracking-wider text-navy-300">
                <Clock className="h-5 w-5 shrink-0 text-ice-300" aria-hidden="true" />
                {t.contact.hours}
              </dt>
              <dd className="mt-0.5 pl-8 font-medium">{contact.hours[lang]}</dd>
            </div>
          </dl>

          {(social.whatsapp || social.zalo) && (
            <div className="mt-7 border-t border-white/10 pt-6">
              <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-300">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t.contact.messaging}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {social.whatsapp && (
                  <a
                    href={social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-light !px-4 !py-2 text-xs"
                  >
                    {t.contact.whatsapp}
                  </a>
                )}
                {social.zalo && (
                  <a
                    href={social.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost-light !px-4 !py-2 text-xs"
                  >
                    {t.contact.zalo}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="card" onSubmit={onSubmit} noValidate aria-labelledby={`${uid}-form-title`}>
          <h3 id={`${uid}-form-title`} className="text-lg font-semibold text-navy-900 dark:text-white">
            {f.title}
          </h3>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id={id('name')} label={f.name} required requiredText={f.required} error={errors.name}>
              <input
                id={id('name')}
                name="name"
                type="text"
                autoComplete="name"
                className="field-input"
                value={form.name}
                onChange={update('name')}
                required
                aria-required="true"
                aria-invalid={errors.name ? 'true' : undefined}
                aria-describedby={errors.name ? `${id('name')}-error` : undefined}
              />
            </Field>
            <Field id={id('company')} label={f.company}>
              <input
                id={id('company')}
                name="company"
                type="text"
                autoComplete="organization"
                className="field-input"
                value={form.company}
                onChange={update('company')}
              />
            </Field>
            <Field id={id('email')} label={f.email} required requiredText={f.required} error={errors.email}>
              <input
                id={id('email')}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                className="field-input"
                value={form.email}
                onChange={update('email')}
                required
                aria-required="true"
                aria-invalid={errors.email ? 'true' : undefined}
                aria-describedby={errors.email ? `${id('email')}-error` : undefined}
              />
            </Field>
            <Field id={id('phone')} label={f.phone}>
              <input
                id={id('phone')}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="field-input"
                value={form.phone}
                onChange={update('phone')}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id={id('interest')} label={f.interest}>
                <select
                  id={id('interest')}
                  name="interest"
                  className="field-input"
                  value={form.interest}
                  onChange={update('interest')}
                >
                  {(Object.keys(f.interests) as Interest[]).map((k) => (
                    <option key={k} value={k}>
                      {f.interests[k]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id={id('message')} label={f.message} required requiredText={f.required} error={errors.message}>
                <textarea
                  id={id('message')}
                  name="message"
                  rows={5}
                  className="field-input resize-y"
                  placeholder={f.messagePlaceholder}
                  value={form.message}
                  onChange={update('message')}
                  required
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? `${id('message')}-error` : undefined}
                />
              </Field>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-navy-500 dark:text-navy-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{f.note}</span>
            </p>
            <button type="submit" className="btn-primary shrink-0">
              <Send className="h-4 w-4" aria-hidden="true" />
              {f.submit}
            </button>
          </div>

          <div role="status" aria-live="polite">
            {submitted && (
              <p className="mt-5 rounded-lg border border-ice-300 bg-ice-50 p-4 text-sm text-navy-800 dark:border-ice-700 dark:bg-navy-950 dark:text-navy-100">
                {f.success}{' '}
                <a
                  href={mailtoHref}
                  data-testid="mailto-fallback"
                  className="rounded font-semibold text-ice-700 underline dark:text-ice-300"
                >
                  {contact.email}
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  )
}

interface FieldProps {
  id: string
  label: string
  required?: boolean
  requiredText?: string
  error?: string
  children: React.ReactNode
}

function Field({ id, label, required, requiredText, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="ml-1 text-accent-600 dark:text-accent-400" aria-hidden="true">
            *
          </span>
        )}
        {required && requiredText && <span className="sr-only"> ({requiredText})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
