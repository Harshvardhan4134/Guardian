import React from 'react'
import { Puzzle } from 'lucide-react'

/**
 * Chrome, Edge, and Safari marks plus extension affordance for the Browser Extension device card.
 */
const BrowserExtensionVisual = () => {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <img src="/browsers/chrome.svg" alt="" className="h-11 w-11 object-contain drop-shadow-sm" />
          <span className="text-[10px] font-medium text-textSecondary uppercase tracking-wide">Chrome</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src="/browsers/edge.svg" alt="" className="h-11 w-11 object-contain drop-shadow-sm" />
          <span className="text-[10px] font-medium text-textSecondary uppercase tracking-wide">Edge</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <img src="/browsers/safari.svg" alt="" className="h-11 w-11 object-contain drop-shadow-sm" />
          <span className="text-[10px] font-medium text-textSecondary uppercase tracking-wide">Safari</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 rounded-xl border border-accent/25 bg-accent/5 px-3 py-2">
        <Puzzle className="h-4 w-4 text-accent shrink-0" aria-hidden />
        <span className="text-xs font-semibold text-textPrimary">Guardian browser extension</span>
      </div>
    </div>
  )
}

export default BrowserExtensionVisual
