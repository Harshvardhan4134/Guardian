import React, { useEffect, useState } from 'react'
import { Settings, X } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'
import PlanSelectionPanel from './PlanSelectionPanel'

interface SettingsModalProps {
  onClose: () => void
  deploymentMode: DeploymentMode
  activeTierId: string
  onPlanChanged: (segment: DeploymentMode, tierId: string) => void
}

const SettingsModal = ({ onClose, deploymentMode, activeTierId, onPlanChanged }: SettingsModalProps) => {
  const [segment, setSegment] = useState<DeploymentMode>(deploymentMode)

  useEffect(() => {
    setSegment(deploymentMode)
  }, [deploymentMode])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-card border border-borderLight"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-borderLight bg-background/95 backdrop-blur px-6 py-4">
          <div className="flex items-center gap-2 min-w-0">
            <Settings className="h-5 w-5 text-accent shrink-0" aria-hidden />
            <h2 id="settings-title" className="text-lg font-semibold text-textPrimary truncate">
              Settings
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-textSecondary hover:bg-sectionBg hover:text-textPrimary transition-colors"
            aria-label="Close settings"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-textPrimary">Change plan</h3>
            <p className="text-sm text-textSecondary mt-1">
              Switch your segment or tier here. Your dashboard updates to match the plan you select — the main dashboard
              stays focused on your current plan only.
            </p>
          </div>

          <PlanSelectionPanel
            segment={segment}
            onSegmentChange={setSegment}
            activeTierId={activeTierId}
            onConfirmTier={(nextSegment, tierId) => {
              onPlanChanged(nextSegment, tierId)
              onClose()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
