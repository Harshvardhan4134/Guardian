import React, { useMemo, useState } from 'react'
import { Search, Filter, Settings } from 'lucide-react'
import ManagePolicyModal from './ManagePolicyModal'
import type { DeploymentMode } from '../types/deploymentMode'
import { integrationModeData, deploymentModeLabel } from '../data/integrationModeData'

export interface Policy {
  id: number
  name: string
  description: string
  models: string[]
  riskScore: number
  actions: string[]
  automation: string
  lastDecision: string
  status: 'Active' | 'Paused'
}

interface PolicyTableProps {
  policies: Policy[]
  onUpdatePolicy: (policy: Policy) => void
  deploymentMode: DeploymentMode
}

const modeHeaderCopy: Record<
  DeploymentMode,
  { title: string; description: string; bannerClass: string; bannerTitle: string }
> = {
  individual: {
    title: 'Personal policy enforcement',
    description: 'Policies scoped to Individual mode — accounts, devices, and alerts from your Integrations view.',
    bannerClass: 'bg-blue-50 border-blue-200 text-blue-900',
    bannerTitle: 'Individual focus'
  },
  enterprise: {
    title: 'Enterprise policy enforcement',
    description: 'Policies for platforms, workforce tools, and APIs connected under Enterprise in Integrations.',
    bannerClass: 'bg-green-50 border-green-200 text-green-900',
    bannerTitle: 'Enterprise focus'
  },
  government: {
    title: 'Government policy enforcement',
    description: 'High-priority policies aligned to national monitoring, feeds, and agency handoffs from Integrations.',
    bannerClass: 'bg-red-50 border-red-200 text-red-900',
    bannerTitle: 'Government focus'
  }
}

const PolicyTable = ({ policies, onUpdatePolicy, deploymentMode }: PolicyTableProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [automationFilter, setAutomationFilter] = useState<'all' | 'Fully Automated' | 'Semi-Automated'>('all')
  const [managePolicyId, setManagePolicyId] = useState<number | null>(null)

  const getRiskBadgeColor = (score: number) => {
    if (score < 70) return 'bg-green-100 text-green-800'
    if (score < 80) return 'bg-yellow-100 text-yellow-800'
    if (score < 90) return 'bg-orange-100 text-orange-800'
    return 'bg-red-100 text-red-800'
  }

  const getAutomationBadgeColor = (status: string) => {
    return status === 'Fully Automated' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-primary/10 text-primary'
  }

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const normalizedQuery = searchTerm.toLowerCase().trim()
      const matchesSearch =
        normalizedQuery.length === 0 ||
        policy.name.toLowerCase().includes(normalizedQuery) ||
        policy.description.toLowerCase().includes(normalizedQuery)
      const matchesAutomation =
        automationFilter === 'all' || policy.automation === automationFilter
      return matchesSearch && matchesAutomation
    })
  }, [policies, searchTerm, automationFilter])

  const policyBeingManaged = managePolicyId
    ? policies.find((p) => p.id === managePolicyId)
    : undefined

  const header = modeHeaderCopy[deploymentMode]
  const modeGoal =
    deploymentMode === 'government'
      ? integrationModeData.government.goal
      : deploymentMode === 'enterprise'
        ? integrationModeData.enterprise.goal
        : integrationModeData.individual.goal

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div
          className={`mb-4 rounded-lg border px-4 py-3 text-sm ${header.bannerClass}`}
        >
          <span className="font-semibold">{header.bannerTitle} · {deploymentModeLabel(deploymentMode)}</span>
          <span className="mx-2 opacity-60">|</span>
          <span className="opacity-90">{modeGoal}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-textPrimary">{header.title}</h2>
            <p className="text-textSecondary">{header.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-textSecondary" />
              <input 
                type="text" 
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg bg-white">
              <Filter className="w-4 h-4" />
              <select
                value={automationFilter}
                onChange={(e) => setAutomationFilter(e.target.value as 'all' | 'Fully Automated' | 'Semi-Automated')}
                className="bg-transparent text-sm focus:outline-none"
              >
                <option value="all">All Automation</option>
                <option value="Fully Automated">Fully Automated</option>
                <option value="Semi-Automated">Semi-Automated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-section">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">POLICY NAME</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">AI MODELS APPLIED</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">AI RISK INTELLIGENCE</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">ENFORCEMENT ACTION</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">AUTOMATION STATUS</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">LAST MODEL DECISION</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">MANAGE</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map((policy) => (
              <tr key={policy.id} className="border-b border-border hover:bg-section/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-textPrimary">{policy.name}</span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          policy.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {policy.status}
                      </span>
                    </div>
                    <div className="text-sm text-textSecondary">{policy.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {policy.models.map((model, idx) => (
                      <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                        {model}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskBadgeColor(policy.riskScore)}`}>
                    {policy.riskScore}/100
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {policy.actions.map((action, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                        {action}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAutomationBadgeColor(policy.automation)}`}>
                    {policy.automation}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-textSecondary">
                  {policy.lastDecision}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setManagePolicyId(policy.id)}
                    className="p-2 hover:bg-section rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    title="Open policy settings"
                  >
                    <Settings className="w-4 h-4 text-textSecondary" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredPolicies.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-textSecondary">
                  No policies match your search/filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {policyBeingManaged && (
        <ManagePolicyModal
          policy={policyBeingManaged}
          onClose={() => setManagePolicyId(null)}
          onSave={onUpdatePolicy}
        />
      )}
    </div>
  )
}

export default PolicyTable