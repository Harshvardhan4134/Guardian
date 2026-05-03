import React, { useState } from 'react'
import { Smartphone, Monitor, Globe, Shield, AlertTriangle, Eye, Database, Plus, Settings, RotateCcw, Trash2 } from 'lucide-react'
import SocialPlatformLogo from './integration/SocialPlatformLogo'
import BrowserExtensionVisual from './integration/BrowserExtensionVisual'

// Simple Add Webhook Modal Component
const SimpleAddWebhookModal = ({ onClose, onAdd }: { onClose: () => void, onAdd: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: 'content.flagged'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.url) {
      onAdd(formData)
      setFormData({ name: '', url: '', events: 'content.flagged' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Add New Webhook</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter webhook name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://api.example.com/webhook"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Event Type</label>
            <select
              value={formData.events}
              onChange={(e) => setFormData({ ...formData, events: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="content.flagged">content.flagged</option>
              <option value="user.reported">user.reported</option>
              <option value="threat.detected">threat.detected</option>
              <option value="policy.updated">policy.updated</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-borderLight rounded-lg text-textSecondary hover:bg-sectionBg transition-all duration-250"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover transition-all duration-250"
            >
              Add Webhook
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Individual Mode Component
export const IndividualModeContent = ({ 
  modeData, 
  webhooks, 
  onAddWebhook, 
  onConfigureWebhook, 
  onTestWebhook, 
  onDeleteWebhook 
}: { 
  modeData: any
  webhooks: any[]
  onAddWebhook: (data: any) => void
  onConfigureWebhook: (webhook: any) => void
  onTestWebhook: (id: string) => void
  onDeleteWebhook: (id: string) => void
}) => {
  const [platforms, setPlatforms] = useState(modeData.platforms)
  const [devices] = useState(modeData.devices)
  const [showAddWebhookModal, setShowAddWebhookModal] = useState(false)

  const getStatusColor = (status: string) => {
    return status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const handleConnect = (platformName: string) => {
    setPlatforms(platforms.map((p: any) => 
      p.name === platformName ? { ...p, status: 'Connected', isConnected: true, lastSync: 'Just now' } : p
    ))
  }

  const handleDisconnect = (platformName: string) => {
    setPlatforms(platforms.map((p: any) => 
      p.name === platformName ? { ...p, status: 'Disconnected', isConnected: false, lastSync: '—' } : p
    ))
  }

  const handleManageDevice = (deviceName: string) => {
    window.alert(`Device management opened for: ${deviceName}`)
  }

  const addWebhook = (webhookData: any) => {
    onAddWebhook(webhookData)
    setShowAddWebhookModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Goal */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Goal: Personal Device and Account Safety</h3>
        <p className="text-blue-700">{modeData.goal}</p>
      </div>

      {/* Connected Platforms */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Connected Platforms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform: any, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <SocialPlatformLogo brand={platform.brand} />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-textPrimary">{platform.name}</h4>
                    <p className="text-xs text-textSecondary">Last sync: {platform.lastSync}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </span>
              </div>
              <div className="flex space-x-2">
                {platform.isConnected ? (
                  <button 
                    onClick={() => handleDisconnect(platform.name)}
                    className="flex-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100 transition-all duration-250"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button 
                    onClick={() => handleConnect(platform.name)}
                    className="flex-1 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primaryHover transition-all duration-250"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Devices */}
      <div className="scroll-mt-4">
        <div className="mb-4 sm:mb-5">
          <h3 className="text-lg font-semibold tracking-tight text-primary sm:text-xl">Your Devices</h3>
          <p className="mt-1 max-w-2xl text-sm text-textSecondary">
            Manage where Guardian runs — mobile apps, desktop agent, or per-browser extension.
          </p>
        </div>
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {devices.map((device: any, index: number) => (
            <li key={index} className="flex h-full min-h-0 list-none">
              <div className="flex h-full w-full flex-col rounded-2xl border border-borderLight bg-cardBg/90 p-5 shadow-sm ring-1 ring-black/[0.03] transition-shadow duration-250 hover:shadow-card sm:p-6">
                {device.browserStack ? (
                  <>
                    <BrowserExtensionVisual />
                    <div className="text-center">
                      <h4 className="text-base font-semibold text-textPrimary sm:text-lg">{device.name}</h4>
                      <p className="mt-1 text-sm text-textSecondary">{device.os}</p>
                    </div>
                  </>
                ) : (
                  <div className="mb-5 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sectionBg ring-1 ring-borderLight/80 sm:h-16 sm:w-16">
                      <device.icon className="h-7 w-7 text-primary sm:h-8 sm:w-8" strokeWidth={1.75} />
                    </div>
                    <h4 className="text-base font-semibold text-textPrimary sm:text-lg">{device.name}</h4>
                    <p className="mt-1 text-sm text-textSecondary">{device.os}</p>
                  </div>
                )}
                <ul className="mb-6 mt-5 flex-1 space-y-2.5 text-left sm:mt-6">
                  {device.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex gap-3 text-sm leading-snug text-textBody">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handleManageDevice(device.name)}
                  className="mt-auto min-h-[44px] w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors duration-250 hover:bg-primaryHover active:bg-primaryHover sm:min-h-0 sm:py-2.5"
                >
                  Manage
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Individual Actions */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Individual Actions</h3>
        <div className="flex flex-wrap gap-2">
          {modeData.actions.map((action: string, index: number) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {action}
            </span>
          ))}
        </div>
      </div>

      {/* Webhooks for Individual */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-textPrimary">Personal Webhooks</h3>
          <button 
            onClick={() => setShowAddWebhookModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition-all duration-250 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Webhook</span>
          </button>
        </div>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-section">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">NAME</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">EVENT</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">STATUS</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-textPrimary">{webhook.name}</td>
                  <td className="px-4 py-3 text-sm text-textSecondary">{webhook.events}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {webhook.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onConfigureWebhook(webhook)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Configure"
                      >
                        <Settings className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onTestWebhook(webhook.id)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Test"
                      >
                        <RotateCcw className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onDeleteWebhook(webhook.id)}
                        className="p-1 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integration Control */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Integration Control</h3>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-textSecondary mb-3">Each integration supports:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Toggle ON/OFF</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Configure settings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">View logs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Check sync status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Webhook Modal */}
      {showAddWebhookModal && (
        <SimpleAddWebhookModal 
          onClose={() => setShowAddWebhookModal(false)}
          onAdd={addWebhook}
        />
      )}
    </div>
  )
}

// Enterprise Mode Component  
export const EnterpriseModeContent = ({ 
  modeData,
  webhooks,
  onAddWebhook,
  onConfigureWebhook,
  onTestWebhook,
  onDeleteWebhook
}: { 
  modeData: any
  webhooks: any[]
  onAddWebhook: (data: any) => void
  onConfigureWebhook: (webhook: any) => void
  onTestWebhook: (id: string) => void
  onDeleteWebhook: (id: string) => void
}) => {
  const [platforms, setPlatforms] = useState(modeData.platforms)
  const [systems, setSystems] = useState(modeData.systems)
  const [showAddWebhookModal, setShowAddWebhookModal] = useState(false)

  const getStatusColor = (status: string) => {
    return status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  const handlePlatformConnect = (platformName: string) => {
    setPlatforms(platforms.map((p: any) => 
      p.name === platformName ? { ...p, status: 'Connected', isConnected: true, lastSync: 'Just now' } : p
    ))
  }

  const handlePlatformDisconnect = (platformName: string) => {
    setPlatforms(platforms.map((p: any) => 
      p.name === platformName ? { ...p, status: 'Disconnected', isConnected: false, lastSync: '—' } : p
    ))
  }

  const handleSystemConnect = (systemName: string) => {
    setSystems(systems.map((s: any) => 
      s.name === systemName ? { ...s, status: 'Connected' } : s
    ))
  }

  const handleSystemConfigure = (systemName: string) => {
    window.alert(`Configuration opened for: ${systemName}`)
  }

  const handleSystemDisconnect = (systemName: string) => {
    setSystems(systems.map((s: any) => 
      s.name === systemName ? { ...s, status: 'Disconnected' } : s
    ))
  }

  const addWebhook = (webhookData: any) => {
    onAddWebhook(webhookData)
    setShowAddWebhookModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Goal */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-semibold text-green-800 mb-2">Goal: Platform Moderation & Brand Safety</h3>
        <p className="text-green-700">{modeData.goal}</p>
      </div>

      {/* Platform Integrations */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Platform Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((platform: any, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <SocialPlatformLogo brand={platform.brand} />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-textPrimary">{platform.name}</h4>
                    <p className="text-xs text-textSecondary">Last sync: {platform.lastSync}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </span>
              </div>
              <div className="flex space-x-2">
                {platform.isConnected ? (
                  <button 
                    onClick={() => handlePlatformDisconnect(platform.name)}
                    className="flex-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100 transition-all duration-250"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button 
                    onClick={() => handlePlatformConnect(platform.name)}
                    className="flex-1 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primaryHover transition-all duration-250"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Systems */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Enterprise Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systems.map((system: any, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border text-center">
              <div className="w-12 h-12 bg-section rounded-full flex items-center justify-center mx-auto mb-3">
                <system.icon className="w-6 h-6 text-textSecondary" />
              </div>
              <h4 className="font-semibold text-textPrimary">{system.name}</h4>
              <p className="text-sm text-textSecondary mb-3">{system.type}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getStatusColor(system.status)}`}>
                {system.status}
              </span>
              <div className="space-y-2">
                {system.status === 'Connected' ? (
                  <>
                    <button 
                      onClick={() => handleSystemConfigure(system.name)}
                      className="w-full bg-section text-textPrimary px-3 py-1 rounded text-sm hover:bg-border transition-all duration-250"
                    >
                      Configure
                    </button>
                    <button 
                      onClick={() => handleSystemDisconnect(system.name)}
                      className="w-full bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100 transition-all duration-250"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => handleSystemConnect(system.name)}
                    className="w-full bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primaryHover transition-all duration-250"
                  >
                    Connect Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Systems Monitoring */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Connected Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modeData.monitoring.map((item: string, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-textPrimary">{item}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-textSecondary">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise Actions */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Enterprise Actions</h3>
        <div className="flex flex-wrap gap-2">
          {modeData.actions.map((action: string, index: number) => (
            <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {action}
            </span>
          ))}
        </div>
      </div>

      {/* Enterprise Webhooks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-textPrimary">Enterprise Webhooks</h3>
          <button 
            onClick={() => setShowAddWebhookModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition-all duration-250 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Webhook</span>
          </button>
        </div>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-section">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">NAME</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">EVENT</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">STATUS</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-textPrimary">{webhook.name}</td>
                  <td className="px-4 py-3 text-sm text-textSecondary">{webhook.events}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {webhook.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onConfigureWebhook(webhook)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Configure"
                      >
                        <Settings className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onTestWebhook(webhook.id)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Test"
                      >
                        <RotateCcw className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onDeleteWebhook(webhook.id)}
                        className="p-1 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Integration Control */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Integration Control</h3>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-textSecondary mb-3">Each integration supports:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Toggle ON/OFF</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Configure settings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">View logs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-textPrimary">Check sync status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Webhook Modal */}
      {showAddWebhookModal && (
        <SimpleAddWebhookModal 
          onClose={() => setShowAddWebhookModal(false)}
          onAdd={addWebhook}
        />
      )}
    </div>
  )
}

// Government Mode Component
export const GovernmentModeContent = ({ 
  modeData,
  webhooks,
  onAddWebhook,
  onConfigureWebhook,
  onTestWebhook,
  onDeleteWebhook
}: { 
  modeData: any
  webhooks: any[]
  onAddWebhook: (data: any) => void
  onConfigureWebhook: (webhook: any) => void
  onTestWebhook: (id: string) => void
  onDeleteWebhook: (id: string) => void
}) => {
  const [systems, setSystems] = useState(modeData.systems)
  const [showAddWebhookModal, setShowAddWebhookModal] = useState(false)

  const handleSystemConnect = (systemName: string) => {
    setSystems(systems.map((s: any) => 
      s.name === systemName ? { ...s, status: 'Connected' } : s
    ))
  }

  const handleSystemDisconnect = (systemName: string) => {
    setSystems(systems.map((s: any) => 
      s.name === systemName ? { ...s, status: 'Disconnected' } : s
    ))
  }

  const addWebhook = (webhookData: any) => {
    onAddWebhook(webhookData)
    setShowAddWebhookModal(false)
  }
  const getStatusColor = (status: string) => {
    return status === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-8">
      {/* Goal */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="font-semibold text-red-800 mb-2">Goal: Threat Detection & National Security</h3>
        <p className="text-red-700">{modeData.goal}</p>
      </div>

      {/* System Connections */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">System Connections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {systems.map((system: any, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <system.icon className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-textPrimary">{system.name}</h4>
                    <p className="text-xs text-textSecondary">Secure connection</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                  {system.status}
                </span>
              </div>
              <div className="flex space-x-2">
                {system.status === 'Connected' ? (
                  <button 
                    onClick={() => handleSystemDisconnect(system.name)}
                    className="flex-1 bg-red-50 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-100 transition-all duration-250"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button 
                    onClick={() => handleSystemConnect(system.name)}
                    className="flex-1 bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primaryHover transition-all duration-250"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Infrastructure */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Connected Infrastructure</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modeData.infrastructure.map((item: string, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-textPrimary">{item}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-textSecondary">Monitoring</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-Time Feeds */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Real-Time Feeds</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modeData.feeds.map((feed: string, index: number) => (
            <div key={index} className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-semibold text-textPrimary">{feed}</h4>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-textSecondary">Live feed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Government Actions */}
      <div>
        <h3 className="text-xl font-semibold text-textPrimary mb-4">Government Actions</h3>
        <div className="flex flex-wrap gap-2">
          {modeData.actions.map((action: string, index: number) => (
            <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              {action}
            </span>
          ))}
        </div>
      </div>

      {/* Government Webhooks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-textPrimary">Government Webhooks</h3>
          <button 
            onClick={() => setShowAddWebhookModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primaryHover transition-all duration-250 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Webhook</span>
          </button>
        </div>
        
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-section">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">NAME</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">EVENT</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">STATUS</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-textPrimary">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook, index) => (
                <tr key={index} className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-textPrimary">{webhook.name}</td>
                  <td className="px-4 py-3 text-sm text-textSecondary">{webhook.events}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      {webhook.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onConfigureWebhook(webhook)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Configure"
                      >
                        <Settings className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onTestWebhook(webhook.id)}
                        className="p-1 hover:bg-sectionBg rounded"
                        title="Test"
                      >
                        <RotateCcw className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onDeleteWebhook(webhook.id)}
                        className="p-1 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Webhook Modal */}
      {showAddWebhookModal && (
        <SimpleAddWebhookModal 
          onClose={() => setShowAddWebhookModal(false)}
          onAdd={addWebhook}
        />
      )}
    </div>
  )
}