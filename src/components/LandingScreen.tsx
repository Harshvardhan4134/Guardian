import React from 'react'
import Footer from './Footer'
import PlanSelectionPanel from './PlanSelectionPanel'
import type { DeploymentMode } from '../types/deploymentMode'

interface LandingScreenProps {
  planSegment: DeploymentMode
  onPlanSegmentChange: (segment: DeploymentMode) => void
  activeTierId: string | null
  onConfirmPlan: (segment: DeploymentMode, tierId: string) => void
  isOnboarded: boolean
  onGoToDashboard: () => void
}

const LandingScreen = ({
  planSegment,
  onPlanSegmentChange,
  activeTierId,
  onConfirmPlan,
  isOnboarded,
  onGoToDashboard
}: LandingScreenProps) => {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <header className="bg-primary border-b border-borderLight px-4 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/guardian-logo.png"
              alt="Guardian AI — Where Safety Meets Technology"
              className="h-9 sm:h-11 w-auto max-w-[min(100%,220px)] object-contain object-left shrink-0"
            />
          </div>
          {isOnboarded && (
            <button
              type="button"
              onClick={onGoToDashboard}
              className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all duration-300 ease-out hover:bg-white/90"
            >
              Go to dashboard
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-textPrimary sm:text-4xl">Plans &amp; pricing</h1>
          <p className="mt-3 text-base text-textBody sm:text-lg">
            Pick your segment and tier, then continue to a dashboard scoped to that plan — Enterprise for business,
            Government for agencies, Individual for creators and personal safety.
          </p>
        </div>

        <PlanSelectionPanel
          segment={planSegment}
          onSegmentChange={onPlanSegmentChange}
          activeTierId={activeTierId}
          onConfirmTier={onConfirmPlan}
        />
      </main>

      <Footer />
    </div>
  )
}

export default LandingScreen
