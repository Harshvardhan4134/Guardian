import React from 'react'
import type { DeploymentMode } from '../types/deploymentMode'
import { deploymentModeLabel } from '../data/integrationModeData'

const MODES: DeploymentMode[] = ['individual', 'enterprise', 'government']

interface DeploymentModeSwitcherProps {
  value: DeploymentMode
  onChange: (mode: DeploymentMode) => void
  className?: string
}

const DeploymentModeSwitcher = ({ value, onChange, className = '' }: DeploymentModeSwitcherProps) => {
  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg font-semibold text-textPrimary">Deployment mode</h2>
          <p className="text-sm text-textSecondary">
            Same Individual / Enterprise / Government views as Integrations — overview stats, policy grid, and exports follow this mode.
          </p>
        </div>
      </div>
      <div className="flex space-x-1 bg-sectionBg rounded-lg p-1 border border-borderLight">
        {MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
              value === mode
                ? 'bg-background text-textPrimary shadow-card'
                : 'text-textSecondary hover:text-textPrimary'
            }`}
          >
            {deploymentModeLabel(mode)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DeploymentModeSwitcher
