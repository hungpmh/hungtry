/**
 * Decorative inline SVG: origin cold store -> reefer ship -> HQT hub -> reefer truck.
 * Fully self-contained (no external assets). Animations are disabled by the
 * global prefers-reduced-motion rule in index.css.
 */
interface IllustrationLabels {
  frozen: string
  inTransit: string
  hub: string
}

interface ColdChainIllustrationProps {
  /** Accessible name for the whole graphic. */
  title: string
  /** Localised caption text drawn inside the graphic. */
  labels: IllustrationLabels
}

/** Approximate rendered width (SVG units) of an uppercase 11px label with 1px letter spacing. */
const chipWidth = (text: string) => Math.max(124, 46 + text.length * 8.4)

export function ColdChainIllustration({ title, labels }: ColdChainIllustrationProps) {
  const statusWidth = chipWidth(labels.inTransit)
  return (
    <svg
      viewBox="0 0 560 400"
      role="img"
      aria-label={title}
      className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
    >
      <defs>
        <linearGradient id="hc-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b3a6b" />
          <stop offset="1" stopColor="#0b1f3a" />
        </linearGradient>
        <linearGradient id="hc-ice" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ccdee" />
          <stop offset="1" stopColor="#2c98d1" />
        </linearGradient>
        <linearGradient id="hc-sea" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#195277" stopOpacity="0.9" />
          <stop offset="1" stopColor="#1d7ab1" stopOpacity="0.9" />
        </linearGradient>
        <filter id="hc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Card background */}
      <rect x="8" y="8" width="544" height="384" rx="28" fill="url(#hc-panel)" stroke="rgba(255,255,255,0.12)" />

      {/* Temperature readout */}
      <g transform="translate(36 36)">
        <rect width="150" height="54" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <circle cx="26" cy="27" r="10" fill="none" stroke="#8ccdee" strokeWidth="2.5" />
        <path d="M26 20v7l5 3" fill="none" stroke="#8ccdee" strokeWidth="2.5" strokeLinecap="round" />
        <text x="48" y="24" fill="#c0e3f6" fontSize="11" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="1">
          {labels.frozen}
        </text>
        <text x="48" y="43" fill="#ffffff" fontSize="17" fontWeight="700" fontFamily="ui-sans-serif, system-ui, sans-serif">
          -18 °C
        </text>
      </g>

      {/* Status chip */}
      <g transform={`translate(${524 - statusWidth} 36)`}>
        <rect width={statusWidth} height="30" rx="15" fill="rgba(239,159,26,0.16)" stroke="rgba(239,159,26,0.5)" />
        <circle cx="18" cy="15" r="4" fill="#f6b445">
          <animate attributeName="opacity" values="1;0.35;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <text x="32" y="19.5" fill="#f6b445" fontSize="11" fontWeight="600" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="1">
          {labels.inTransit}
        </text>
      </g>

      {/* Route line */}
      <path
        d="M70 250 C 150 250, 170 170, 260 170 S 380 250, 480 250"
        fill="none"
        stroke="url(#hc-ice)"
        strokeWidth="3"
        strokeDasharray="8 10"
        strokeLinecap="round"
        opacity="0.9"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="2.2s" repeatCount="indefinite" />
      </path>

      {/* Origin cold store */}
      <g transform="translate(40 200)">
        <rect x="0" y="20" width="64" height="50" rx="6" fill="#233858" stroke="#54b3e3" strokeWidth="2" />
        <path d="M0 22 L32 2 L64 22" fill="#2c466f" stroke="#54b3e3" strokeWidth="2" strokeLinejoin="round" />
        <rect x="24" y="42" width="16" height="28" rx="2" fill="#0b1f3a" />
        <path d="M32 26v10M27 31h10M28.5 27.5l7 7M35.5 27.5l-7 7" stroke="#8ccdee" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Reefer ship */}
      <g transform="translate(200 120)">
        <path d="M0 52 L12 30 H108 L120 52 L100 68 H20 Z" fill="#12294d" stroke="#8ccdee" strokeWidth="2" strokeLinejoin="round" />
        <rect x="26" y="8" width="26" height="22" rx="3" fill="#2c98d1" />
        <rect x="56" y="8" width="26" height="22" rx="3" fill="#54b3e3" />
        <rect x="41" y="-12" width="26" height="20" rx="3" fill="#ef9f1a" />
        <rect x="88" y="14" width="14" height="16" rx="2" fill="#0b1f3a" stroke="#8ccdee" strokeWidth="1.5" />
        <path d="M-20 74 Q 10 62, 40 74 T 100 74 T 160 74" fill="none" stroke="url(#hc-sea)" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* HQT hub */}
      <g transform="translate(330 250)">
        <circle cx="0" cy="0" r="40" fill="#2c98d1" opacity="0.35" filter="url(#hc-glow)" />
        <rect x="-44" y="-30" width="88" height="58" rx="8" fill="#12294d" stroke="#8ccdee" strokeWidth="2" />
        <path d="M-44 -30 L0 -50 L44 -30" fill="#1b3a6b" stroke="#8ccdee" strokeWidth="2" strokeLinejoin="round" />
        <rect x="-32" y="-14" width="16" height="42" rx="2" fill="#0b1f3a" />
        <rect x="-8" y="-14" width="16" height="42" rx="2" fill="#0b1f3a" />
        <rect x="16" y="-14" width="16" height="42" rx="2" fill="#0b1f3a" />
        <text x="0" y="46" textAnchor="middle" fill="#c0e3f6" fontSize="11" fontWeight="600" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="1.5">
          {labels.hub}
        </text>
      </g>

      {/* Reefer truck */}
      <g transform="translate(440 300)">
        <rect x="0" y="0" width="60" height="34" rx="4" fill="#54b3e3" />
        <rect x="60" y="10" width="26" height="24" rx="4" fill="#12294d" stroke="#8ccdee" strokeWidth="2" />
        <rect x="66" y="14" width="14" height="10" rx="1.5" fill="#8ccdee" />
        <circle cx="16" cy="38" r="7" fill="#0b1f3a" stroke="#8ccdee" strokeWidth="2" />
        <circle cx="70" cy="38" r="7" fill="#0b1f3a" stroke="#8ccdee" strokeWidth="2" />
        <path d="M30 10v14M23 17h14M25 12l10 10M35 12l-10 10" stroke="#0b1f3a" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Snowflake accents */}
      <g stroke="#8ccdee" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
        <path d="M130 90v18M121 99h18M124 93l12 12M136 93l-12 12" />
        <path d="M480 150v14M473 157h14M475.5 152.5l9 9M484.5 152.5l-9 9" />
        <path d="M110 330v12M104 336h12M106 332l8 8M114 332l-8 8" />
      </g>
    </svg>
  )
}
