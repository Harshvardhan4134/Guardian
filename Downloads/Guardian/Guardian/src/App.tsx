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

function App() {
  const [showExportModal, setShowExportModal] = useState(false)
  const [showCreatePolicyModal, setShowCreatePolicyModal] = useState(false)
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false)
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 1,
      name: 'No Hate Speech',
      description: 'Detects hate, abusive, and discriminatory content using AI models',
      models: ['NLP', 'Multimodal Vision', 'Risk Scoring (XGBoost)'],
      riskScore: 89,
      actions: ['Flag Content', 'Send to Moderator'],
      automation: 'Semi-Automated',
      lastDecision: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Spam Detection',
      description: 'Identifies spam, promotional abuse, and bot-generated content',
      models: ['NLP', 'Repeat Offender (KMeans)', 'Pattern Recognition'],
      riskScore: 76,
      actions: ['Flag Content', 'Shadow Ban'],
      automation: 'Fully Automated',
      lastDecision: '15 minutes ago',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Misinformation Control',
      description: 'Detects false claims, deepfakes, and manipulated media',
      models: ['Multimodal Vision', 'Fact-Check API', 'Risk Scoring (XGBoost)'],
      riskScore: 92,
      actions: ['Flag Content', 'Add Warning Label'],
      automation: 'Semi-Automated',
      lastDecision: '1 hour ago',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Harassment Prevention',
      description: 'Identifies targeted harassment, bullying, and threatening behavior',
      models: ['NLP', 'Context Analysis', 'Repeat Offender (KMeans)'],
      riskScore: 84,
      actions: ['Flag Content', 'Notify User'],
      automation: 'Semi-Automated',
      lastDecision: '3 hours ago',
      status: 'Active'
    },
    {
      id: 5,
      name: 'NSFW Content Filter',
      description: 'Detects adult content, nudity, and inappropriate imagery',
      models: ['Multimodal Vision', 'Image Classification', 'Risk Scoring (XGBoost)'],
      riskScore: 95,
      actions: ['Flag Content', 'Age-Gate'],
      automation: 'Fully Automated',
      lastDecision: '30 minutes ago',
      status: 'Active'
    },
    {
      id: 6,
      name: 'Violence Detection',
      description: 'Identifies violent content, graphic imagery, and threats',
      models: ['Multimodal Vision', 'NLP', 'Severity Scoring'],
      riskScore: 88,
      actions: ['Flag Content', 'Send to Moderator'],
      automation: 'Semi-Automated',
      lastDecision: '45 minutes ago',
      status: 'Active'
    }
  ])

  const handlePolicyCreated = (policyData: Policy) => {
    setPolicies((prev) => [policyData, ...prev])
    setShowCreatePolicyModal(false)
  }

  const handleUpdatePolicy = (updated: Policy) => {
    setPolicies((prev) => prev.map((policy) => (policy.id === updated.id ? updated : policy)))
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
        <AIModelsCard />
        <StatsCards />
        <PolicyTable policies={policies} onUpdatePolicy={handleUpdatePolicy} />
        <EnforcementWorkflow />
      </main>

      <Footer />

      {/* Floating Chat Widget */}
      <ChatWidget />

      {showIntegrationsModal && (
        <IntegrationsModal onClose={() => setShowIntegrationsModal(false)} />
      )}

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      {showCreatePolicyModal && (
        <CreatePolicyModal 
          onClose={() => setShowCreatePolicyModal(false)} 
          onPolicyCreated={handlePolicyCreated}
        />
      )}
    </div>
  )
}

export default App