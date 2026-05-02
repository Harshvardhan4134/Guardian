import React, { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Plus, Wifi, Activity, Database, Zap } from 'lucide-react'
import { IndividualModeContent, EnterpriseModeContent, GovernmentModeContent } from './IntegrationModes'
import { WebhooksSection, SecurityLayer } from './IntegrationComponents'
import { integrationModeData } from '../data/integrationModeData'
import type { DeploymentMode } from '../types/deploymentMode'

interface IntegrationsModalProps {
  onClose: () => void
  /** Keeps Integrations tab in sync with the main dashboard deployment mode. */
  initialMode?: DeploymentMode
}

interface Webhook {
  id: string
  name: string
  url: string
  events: string
  status: 'Active' | 'Paused'
  lastTriggered: string
}

interface CustomIntegration {
  id: string
  name: string
  category: 'App' | 'Web' | 'Software'
  endpoint: string
  status: 'Connected' | 'Disconnected'
}

const IntegrationsModal = ({ onClose, initialMode = 'individual' }: IntegrationsModalProps) => {
  const [activeMode, setActiveMode] = useState<DeploymentMode>(initialMode)

  useEffect(() => {
    setActiveMode(initialMode)
  }, [initialMode])
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: 'WH-001',
      name: 'Content Flag',
      url: 'https://api.example.com/flag',
      events: 'content.flagged',
      status: 'Active',
      lastTriggered: '2 min ago'
    },
    {
      id: 'WH-002',
      name: 'User Report',
      url: 'https://api.example.com/report',
      events: 'user.reported',
      status: 'Active',
      lastTriggered: '15 min ago'
    },
    {
      id: 'WH-003',
      name: 'Policy Update',
      url: 'https://api.example.com/policy',
      events: 'policy.updated',
      status: 'Paused',
      lastTriggered: '1 hour ago'
    }
  ])

  const [customIntegrations, setCustomIntegrations] = useState<CustomIntegration[]>([])
  const [showWebhookConfig, setShowWebhookConfig] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<Webhook | null>(null)
  const [customForm, setCustomForm] = useState({
    name: '',
    category: 'App' as 'App' | 'Web' | 'Software',
    endpoint: ''
  })

  const handleAddWebhook = (webhookData: Pick<Webhook, 'name' | 'url' | 'events'>) => {
    const newWebhook = {
      id: `WH-${String(webhooks.length + 1).padStart(3, '0')}`,
      ...webhookData,
      status: 'Active',
      lastTriggered: 'Never'
    }
    setWebhooks([...webhooks, newWebhook])
  }

  const handleConfigureWebhook = (webhook: Webhook) => {
    setEditingWebhook(webhook)
    setShowWebhookConfig(true)
  }

  const handleTestWebhook = (id: string) => {
    setWebhooks(webhooks.map(w => 
      w.id === id ? { ...w, lastTriggered: 'Just now' } : w
    ))
  }

  const handleDeleteWebhook = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this webhook? This action cannot be undone.')
    if (confirmed) {
      setWebhooks(webhooks.filter(w => w.id !== id))
    }
  }

  const handleWebhookConfigSave = () => {
    if (!editingWebhook) return
    setWebhooks((prev) => prev.map((w) => (w.id === editingWebhook.id ? editingWebhook : w)))
    setShowWebhookConfig(false)
    setEditingWebhook(null)
  }

  const handleAddCustomIntegration = (event: React.FormEvent) => {
    event.preventDefault()
    if (!customForm.name.trim() || !customForm.endpoint.trim()) {
      window.alert('Please provide both name and endpoint for custom integration.')
      return
    }

    const newIntegration: CustomIntegration = {
      id: `CUS-${Date.now()}`,
      name: customForm.name.trim(),
      category: customForm.category,
      endpoint: customForm.endpoint.trim(),
      status: 'Connected'
    }

    setCustomIntegrations((prev) => [newIntegration, ...prev])
    setCustomForm({ name: '', category: 'App', endpoint: '' })
  }

  const handleToggleCustomIntegration = (id: string) => {
    setCustomIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: integration.status === 'Connected' ? 'Disconnected' : 'Connected'
            }
          : integration
      )
    )
  }

  const statsCards = useMemo(() => {
    const connectedCorePlatforms =
      integrationModeData.individual.platforms.filter((platform) => platform.isConnected).length +
      integrationModeData.enterprise.platforms.filter((platform) => platform.isConnected).length +
      integrationModeData.enterprise.systems.filter((system) => system.status === 'Connected').length +
      integrationModeData.government.systems.filter((system) => system.status === 'Connected').length
    const activeWebhooks = webhooks.filter((webhook) => webhook.status === 'Active').length
    const connectedCustom = customIntegrations.filter((item) => item.status === 'Connected').length

    return [
    {
      icon: Wifi,
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10',
      number: String(connectedCorePlatforms + connectedCustom),
      title: 'Active Connections',
      subtitle: 'Total number of live integrations'
    },
    {
      icon: Activity,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      number: '99.2%',
      title: 'API Health',
      subtitle: 'Current uptime and response rate'
    },
    {
      icon: Database,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      number: `${(2.4 + connectedCustom * 0.1).toFixed(1)}M`,
      title: 'Data Synced Today',
      subtitle: 'Volume of data processed'
    },
    {
      icon: Zap,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      number: String(activeWebhooks),
      title: 'Active Webhooks',
      subtitle: 'Number of active event listeners'
    }
    ]
  }, [webhooks, customIntegrations])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-7xl w-full max-h-[95vh] overflow-y-auto shadow-card-hover">
        {/* Header */}
        <div className="p-6 border-b border-borderLight">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-sectionBg rounded-lg transition-all duration-250"
              >
                <ArrowLeft className="w-5 h-5 text-textSecondary" />
              </button>
              <div>
                <h2 className="text-2xl font-semibold text-textPrimary">Integrations</h2>
                <p className="text-textSecondary">Connect platforms, devices, and systems for real-time AI detection and enforcement</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-cardBg rounded-xl p-6 border border-borderLight shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-textPrimary">{stat.number}</div>
                  <div className="text-lg font-semibold text-textPrimary">{stat.title}</div>
                  <div className="text-sm text-textSecondary">{stat.subtitle}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mode Switcher */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-sectionBg rounded-lg p-1 border border-borderLight">
              {['individual', 'enterprise', 'government'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-250 ${
                    activeMode === mode
                      ? 'bg-background text-textPrimary shadow-card'
                      : 'text-textSecondary hover:text-textPrimary'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mode-Specific Content */}
          {activeMode === 'individual' && (
            <IndividualModeContent 
              modeData={integrationModeData.individual} 
              webhooks={webhooks}
              onAddWebhook={handleAddWebhook}
              onConfigureWebhook={handleConfigureWebhook}
              onTestWebhook={handleTestWebhook}
              onDeleteWebhook={handleDeleteWebhook}
            />
          )}

          {activeMode === 'enterprise' && (
            <EnterpriseModeContent 
              modeData={integrationModeData.enterprise}
              webhooks={webhooks}
              onAddWebhook={handleAddWebhook}
              onConfigureWebhook={handleConfigureWebhook}
              onTestWebhook={handleTestWebhook}
              onDeleteWebhook={handleDeleteWebhook}
            />
          )}

          {activeMode === 'government' && (
            <GovernmentModeContent 
              modeData={integrationModeData.government}
              webhooks={webhooks}
              onAddWebhook={handleAddWebhook}
              onConfigureWebhook={handleConfigureWebhook}
              onTestWebhook={handleTestWebhook}
              onDeleteWebhook={handleDeleteWebhook}
            />
          )}

          {/* Common Webhooks Section */}
          <WebhooksSection 
            webhooks={webhooks}
            onAddWebhook={() =>
              handleAddWebhook({
                name: 'Custom Event Hook',
                url: 'https://example.org/webhook',
                events: 'threat.detected'
              })
            }
            onConfigureWebhook={handleConfigureWebhook}
            onTestWebhook={handleTestWebhook}
            onDeleteWebhook={handleDeleteWebhook}
          />

          {/* Custom Integrations */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-textPrimary mb-2">Add Your Own App / Web / Software</h3>
            <p className="text-textSecondary mb-4">Create custom integrations for any client product and control them in real time.</p>

            <form onSubmit={handleAddCustomIntegration} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <input
                type="text"
                value={customForm.name}
                onChange={(e) => setCustomForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Integration name"
                className="border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select
                value={customForm.category}
                onChange={(e) => setCustomForm((prev) => ({ ...prev, category: e.target.value as 'App' | 'Web' | 'Software' }))}
                className="border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="App">App</option>
                <option value="Web">Web</option>
                <option value="Software">Software</option>
              </select>
              <input
                type="url"
                value={customForm.endpoint}
                onChange={(e) => setCustomForm((prev) => ({ ...prev, endpoint: e.target.value }))}
                placeholder="https://api.client.com/hook"
                className="border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white rounded-lg px-4 py-2 hover:bg-primaryHover transition-all duration-250 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Integration
              </button>
            </form>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-section">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">NAME</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">TYPE</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">ENDPOINT</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">STATUS</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {customIntegrations.map((integration) => (
                    <tr key={integration.id} className="border-b border-border">
                      <td className="px-4 py-3 font-medium text-textPrimary">{integration.name}</td>
                      <td className="px-4 py-3 text-sm text-textSecondary">{integration.category}</td>
                      <td className="px-4 py-3 text-sm text-textSecondary">{integration.endpoint}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${integration.status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
                          {integration.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleCustomIntegration(integration.id)}
                          className="text-sm bg-section hover:bg-border rounded px-3 py-1 transition-colors"
                        >
                          {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customIntegrations.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-textSecondary">
                        No custom integrations added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Layer */}
          <SecurityLayer />
        </div>
      </div>

      {showWebhookConfig && editingWebhook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Configure Webhook</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={editingWebhook.name}
                onChange={(e) => setEditingWebhook({ ...editingWebhook, name: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="url"
                value={editingWebhook.url}
                onChange={(e) => setEditingWebhook({ ...editingWebhook, url: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                value={editingWebhook.events}
                onChange={(e) => setEditingWebhook({ ...editingWebhook, events: e.target.value })}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowWebhookConfig(false)
                  setEditingWebhook(null)
                }}
                className="px-4 py-2 border border-border rounded-lg hover:bg-section"
              >
                Cancel
              </button>
              <button
                onClick={handleWebhookConfigSave}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IntegrationsModal