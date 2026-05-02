import React, { useState } from 'react'
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
import DeploymentModeSwitcher from './components/DeploymentModeSwitcher'
import { defaultPoliciesByMode } from './data/defaultPoliciesByMode'
import type { DeploymentMode } from './types/deploymentMode'

function App() {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentMode>('individual')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showCreatePolicyModal, setShowCreatePolicyModal] = useState(false)
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false)
  const [policiesByMode, setPoliciesByMode] = useState<Record<DeploymentMode, Policy[]>>(() => ({
    individual: defaultPoliciesByMode.individual.map((p) => ({ ...p })),
    enterprise: defaultPoliciesByMode.enterprise.map((p) => ({ ...p })),
    government: defaultPoliciesByMode.government.map((p) => ({ ...p }))
  }))

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

  return (
    <div className="min-h-screen bg-background font-sans">
      <GlobalBanner />
      <Header
        onExportClick={() => setShowExportModal(true)}
        onIntegrationsClick={() => setShowIntegrationsModal(true)}
        onCreatePolicyClick={() => setShowCreatePolicyModal(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <DeploymentModeSwitcher value={deploymentMode} onChange={setDeploymentMode} />
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
