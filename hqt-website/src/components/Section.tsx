import clsx from 'clsx'
import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
  /** Alternate background tint for visual rhythm between sections. */
  tone?: 'plain' | 'tint'
  className?: string
  /** Center the heading block (default) or align it to the left. */
  align?: 'center' | 'left'
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  tone = 'plain',
  className,
  align = 'center',
}: SectionProps) {
  const headingId = `${id}-title`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={clsx(
        'scroll-mt-20 py-16 sm:py-20 lg:py-24',
        tone === 'tint' && 'bg-navy-50/70 dark:bg-navy-900/40',
        className,
      )}
    >
      <div className="container-x">
        <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 id={headingId} className="section-title">
            {title}
          </h2>
          {intro && <p className="section-intro">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
