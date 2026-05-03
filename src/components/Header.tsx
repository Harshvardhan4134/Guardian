import React from 'react'
import { Home, Settings } from 'lucide-react'
import { deploymentModeLabel } from '../data/integrationModeData'
import { findTierById } from '../data/pricingPlans'

interface HeaderProps {
  onExportClick: () => void
  onIntegrationsClick: () => void
  onCreatePolicyClick: () => void
  onHomeClick: () => void
  onSettingsClick: () => void
  activeTierId: string
}

const Header = ({
  onExportClick,
  onIntegrationsClick,
  onCreatePolicyClick,
  onHomeClick,
  onSettingsClick,
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
            className="inline-flex items-center gap-1.5 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-250 text-sm"
          >
            <Home className="h-4 w-4 shrink-0" aria-hidden />
            Home
          </button>
          <button
            type="button"
            onClick={onSettingsClick}
            className="inline-flex items-center gap-1.5 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-250 text-sm"
          >
            <Settings className="h-4 w-4 shrink-0" aria-hidden />
            Settings
          </button>
          <button
            type="button"
            onClick={onExportClick}
            className="border border-white/20 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-250 text-sm"
          >
            Export Data
          </button>
          <button
            type="button"
            onClick={onIntegrationsClick}
            className="border border-white/20 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-250 text-sm"
          >
            Integrations
          </button>
          <button
            type="button"
            onClick={onCreatePolicyClick}
            className="bg-accent text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-accentHover transition-all duration-250 text-sm font-medium"
          >
            Create Policy
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
