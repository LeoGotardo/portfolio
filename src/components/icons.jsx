const base = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: 'false' }
const stroke = { ...base, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const ArrowUpRight = (p) => (
  <svg {...stroke} {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>
)
export const ArrowDown = (p) => (
  <svg {...stroke} {...p}><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></svg>
)
export const Sun = (p) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
export const Moon = (p) => (
  <svg {...stroke} {...p}><path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" /></svg>
)
export const Copy = (p) => (
  <svg {...stroke} {...p}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></svg>
)
export const Check = (p) => (
  <svg {...stroke} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
)
export const Menu = (p) => (
  <svg {...stroke} {...p}><path d="M4 8h16M4 16h16" /></svg>
)
export const Close = (p) => (
  <svg {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
