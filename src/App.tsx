import React, { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import GlobalBanner from './components/GlobalBanner'
import AIModelsCard from './components/AIModelsCard'
import StatsCards from './components/StatsCards'
import PolicyTable, { Policy } from './components/PolicyTable'
import EnforcementWorkflow from './components/EnforcementWorkflow'
import Footer from './components/Footer'
import ExportModal from './components/ExportModal'
import CreatePolicyModal from './components/CreatePolicyModal'
import IntegrationsModal from './components/IntegrationsModal'
import ChatWidget from './components/ChatWidget'
import LandingScreen from './components/LandingScreen'
import { defaultPoliciesByMode } from './data/defaultPoliciesByMode'
import { defaultTierIdForSegment, tierBelongsToSegment } from './data/pricingPlans'
import { loadPersistedPlan, savePersistedPlan } from './lib/planStorage'
import type { DeploymentMode } from './types/deploymentMode'

type AppView = 'landing' | 'dashboard'

function App() {
  const [hydrated, setHydrated] = useState(false)
  const [appView, setAppView] = useState<AppView>('landing')
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('individual')
  const [tierId, setTierId] = useState<string>(() => defaultTierIdForSegment('individual'))
  const [pricingSegment, setPricingSegment] = useState<DeploymentMode>('individual')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showCreatePolicyModal, setShowCreatePolicyModal] = useState(false)
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const prevAppViewRef = useRef<AppView | null>(null)
  const [policiesByMode, setPoliciesByMode] = useState<Record<DeploymentMode, Policy[]>>(() => ({
    individual: defaultPoliciesByMode.individual.map((p) => ({ ...p })),
    enterprise: defaultPoliciesByMode.enterprise.map((p) => ({ ...p })),
    government: defaultPoliciesByMode.government.map((p) => ({ ...p }))
  }))

  useEffect(() => {
    const saved = loadPersistedPlan()
    if (saved) {
      const tierOk = tierBelongsToSegment(saved.tierId, saved.segment)
      const resolvedTier = tierOk ? saved.tierId : defaultTierIdForSegment(saved.segment)
      setDeploymentMode(saved.segment)
      setTierId(resolvedTier)
      setPricingSegment(saved.segment)
      setHasCompletedOnboarding(saved.onboarded)
      if (saved.onboarded) {
        setAppView('dashboard')
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    const prev = prevAppViewRef.current
    if (appView === 'landing' && prev === 'dashboard') {
      setPricingSegment(deploymentMode)
    }
    prevAppViewRef.current = appView
  }, [appView, deploymentMode])

  const policies = policiesByMode[deploymentMode]

  const updatePoliciesForCurrentMode = (updater: (prev: Policy[]) => Policy[]) => {
    setPoliciesByMode((prev) => ({
      ...prev,
      [deploymentMode]: updater(prev[deploymentMode])
    }))
  }

  const handlePolicyCreated = (policyData: Policy) => {
    updatePoliciesForCurrentMode((prev) => [policyData, ...prev])
    setShowCreatePolicyModal(false)
  }

  const handleUpdatePolicy = (updated: Policy) => {
    updatePoliciesForCurrentMode((prev) => prev.map((policy) => (policy.id === updated.id ? updated : policy)))
  }

  const applyPlan = (segment: DeploymentMode, nextTierId: string, options: { goToDashboard: boolean }) => {
    setDeploymentMode(segment)
    setTierId(nextTierId)
    setHasCompletedOnboarding(true)
    savePersistedPlan({
      segment,
      tierId: nextTierId,
      onboarded: true
    })
    if (options.goToDashboard) {
      setAppView('dashboard')
    }
  }

  const handleLandingConfirmPlan = (segment: DeploymentMode, nextTierId: string) => {
    applyPlan(segment, nextTierId, { goToDashboard: true })
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-textSecondary text-sm">
        Loading…
      </div>
    )
  }

  if (appView === 'landing') {
    return (
      <>
        <LandingScreen
          planSegment={pricingSegment}
          onPlanSegmentChange={setPricingSegment}
          activeTierId={tierId}
          onConfirmPlan={handleLandingConfirmPlan}
          isOnboarded={hasCompletedOnboarding}
          onGoToDashboard={() => setAppView('dashboard')}
        />
        <ChatWidget />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <GlobalBanner />
      <Header
        onExportClick={() => setShowExportModal(true)}
        onIntegrationsClick={() => setShowIntegrationsModal(true)}
        onCreatePolicyClick={() => setShowCreatePolicyModal(true)}
        onHomeClick={() => setAppView('landing')}
        activeTierId={tierId}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AIModelsCard deploymentMode={deploymentMode} />
        <StatsCards deploymentMode={deploymentMode} policies={policies} />
        <PolicyTable
          policies={policies}
          onUpdatePolicy={handleUpdatePolicy}
          deploymentMode={deploymentMode}
        />
        <EnforcementWorkflow deploymentMode={deploymentMode} />
      </main>

      <Footer />

      <ChatWidget />

      {showIntegrationsModal && (
        <IntegrationsModal
          onClose={() => setShowIntegrationsModal(false)}
          initialMode={deploymentMode}
        />
      )}

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} deploymentMode={deploymentMode} />
      )}

      {showCreatePolicyModal && (
        <CreatePolicyModal
          onClose={() => setShowCreatePolicyModal(false)}
          onPolicyCreated={handlePolicyCreated}
          deploymentMode={deploymentMode}
        />
      )}

    </div>
  )
}

export default App
