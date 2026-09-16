import clsx from 'clsx'

interface LogoProps {
  className?: string
  /** Render the mark on dark backgrounds. */
  inverted?: boolean
  showTagline?: boolean
  tagline?: string
}

/** Inline SVG brand mark (snowflake / network motif) + wordmark. */
export function Logo({ className, inverted = false, showTagline = false, tagline }: LogoProps) {
  return (
    <span className={clsx('inline-flex shrink-0 items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 64 64"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" className="fill-navy-900 dark:fill-navy-800" />
        <g fill="none" stroke="#8ccdee" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 14v36" />
          <path d="M16.4 23l31.2 18M47.6 23L16.4 41" />
          <path d="M32 14l-4.5 4.5M32 14l4.5 4.5M32 50l-4.5-4.5M32 50l4.5-4.5" />
          <path d="M16.4 23l6.1-1.6M16.4 23l1.6 6.1M47.6 41l-6.1 1.6M47.6 41l-1.6-6.1" />
          <path d="M47.6 23l-6.1-1.6M47.6 23l-1.6 6.1M16.4 41l6.1 1.6M16.4 41l1.6-6.1" />
        </g>
        <circle cx="32" cy="32" r="4.2" fill="#ef9f1a" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            'whitespace-nowrap text-lg font-bold tracking-tight',
            inverted ? 'text-white' : 'text-navy-900 dark:text-white',
          )}
        >
          HQT <span className={inverted ? 'text-ice-300' : 'text-ice-600 dark:text-ice-300'}>Group</span>
        </span>
        {showTagline && tagline && (
          <span
            className={clsx(
              'mt-1 text-[11px] font-medium tracking-wide',
              inverted ? 'text-navy-200' : 'text-navy-500 dark:text-navy-300',
            )}
          >
            {tagline}
          </span>
        )}
      </span>
    </span>
  )
}
