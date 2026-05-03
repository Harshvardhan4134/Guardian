import React from 'react'
import { Home } from 'lucide-react'
import { deploymentModeLabel } from '../data/integrationModeData'
import { findTierById } from '../data/pricingPlans'

interface HeaderProps {
  onExportClick: () => void
  onIntegrationsClick: () => void
  onCreatePolicyClick: () => void
  onHomeClick: () => void
  activeTierId: string
}

const Header = ({
  onExportClick,
  onIntegrationsClick,
  onCreatePolicyClick,
  onHomeClick,
  activeTierId
}: HeaderProps) => {
  const resolved = findTierById(activeTierId)
  const planSummary =
    resolved != null
      ? `${deploymentModeLabel(resolved.segment)} · ${resolved.tier.name}`
      : 'Plan'

  return (
    <header className="bg-primary border-b border-borderLight px-4 py-3 sm:py-4">
      <h1 className="sr-only">Guardian AI — Model-Driven Policy Enforcement Dashboard</h1>
      <div className="max-w-7xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <img
            src="/guardian-logo.png"
            alt="Guardian AI — Where Safety Meets Technology"
            className="h-9 sm:h-11 w-auto max-w-[min(100%,220px)] sm:max-w-[280px] object-contain object-left shrink-0"
          />
          <div className="hidden md:block border-l border-white/25 pl-4 min-w-0">
            <p className="text-sm text-white/80 leading-snug">
              Model-Driven Policy Enforcement Dashboard
            </p>
            <p className="text-xs text-white/60 mt-1 truncate" title={planSummary}>
              {planSummary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={onHomeClick}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-sm text-white transition-all duration-300 ease-out hover:bg-white/10"
          >
            <Home className="h-4 w-4 shrink-0" aria-hidden />
            Home
          </button>
          <button
            type="button"
            onClick={onExportClick}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white transition-all duration-300 ease-out hover:bg-white/10 sm:px-4"
          >
            Export Data
          </button>
          <button
            type="button"
            onClick={onIntegrationsClick}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white transition-all duration-300 ease-out hover:bg-white/10 sm:px-4"
          >
            Integrations
          </button>
          <button
            type="button"
            onClick={onCreatePolicyClick}
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-300 ease-out hover:bg-white/90 sm:px-4"
          >
            Create Policy
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
