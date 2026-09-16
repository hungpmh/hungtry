import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useT } from '../i18n'
import { company } from '../content/company'
import { ColdChainIllustration } from './ColdChainIllustration'

export function Hero() {
  const t = useT()
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
    >
      {/* Layered cold gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_80%_10%,rgba(84,179,227,0.35),transparent_60%),radial-gradient(50%_50%_at_10%_90%,rgba(44,152,209,0.25),transparent_60%),linear-gradient(180deg,#0b1f3a_0%,#12294d_100%)]"
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-ice-100">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-ice-300">
            {company.name} · {t.common.tagline}
          </p>
          <h1
            id="hero-title"
            className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem]"
          >
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#services" className="btn-ghost-light">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <ColdChainIllustration title={t.hero.visualLabel} labels={t.hero.illustration} />
        </div>
      </div>

      {/* Stats strip - qualitative claims only */}
      <div className="border-t border-white/10 bg-navy-950/40">
        <ul className="container-x grid gap-x-8 gap-y-5 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.hero.stats.map((s) => (
            <li key={s.label} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-navy-200">{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
