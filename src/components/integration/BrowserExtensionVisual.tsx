import React from 'react'
import { Puzzle } from 'lucide-react'

const browserItem = (src: string, label: string) => (
  <div
    key={label}
    className="flex min-w-[4.5rem] flex-1 flex-col items-center gap-1.5 sm:min-w-0 sm:flex-initial"
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-borderLight/80 sm:h-14 sm:w-14">
      <img src={src} alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
    </div>
    <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-textSecondary sm:text-[11px]">
      {label}
    </span>
  </div>
)

/**
 * Chrome, Edge, and Safari marks plus extension affordance for the Browser Extension device card.
 */
const BrowserExtensionVisual = () => {
  return (
    <div className="mb-5 space-y-4">
      <div className="rounded-2xl bg-sectionBg/90 px-3 py-4 ring-1 ring-borderLight/70 sm:px-5 sm:py-5">
        <div className="flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap sm:justify-between sm:gap-3 md:gap-5">
          {browserItem('/browsers/chrome.svg', 'Chrome')}
          {browserItem('/browsers/edge.svg', 'Edge')}
          {browserItem('/browsers/safari.svg', 'Safari')}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/[0.07] px-4 py-2.5 shadow-sm">
        <Puzzle className="h-4 w-4 shrink-0 text-accent" aria-hidden />
        <span className="text-center text-xs font-semibold leading-snug text-textPrimary sm:text-sm">
          Guardian browser extension
        </span>
      </div>
    </div>
  )
}

export default BrowserExtensionVisual
