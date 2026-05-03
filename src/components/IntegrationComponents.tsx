import React from 'react'
import { Plus, Settings, RotateCcw, Trash2, Shield, Lock, ArrowRight } from 'lucide-react'

// Webhooks Section Component
export const WebhooksSection = ({ 
  webhooks, 
  onAddWebhook, 
  onConfigureWebhook, 
  onTestWebhook, 
  onDeleteWebhook 
}: {
  webhooks: any[]
  onAddWebhook: () => void
  onConfigureWebhook: (webhook: any) => void
  onTestWebhook: (id: string) => void
  onDeleteWebhook: (id: string) => void
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-textPrimary mb-2">Webhooks</h3>
          <p className="text-textSecondary">Manage webhook endpoints for real-time event delivery</p>
        </div>
        <button 
          onClick={onAddWebhook}
          className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-white transition-colors duration-300 ease-out hover:bg-primaryHover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Webhook</span>
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-section">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">WEBHOOK ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">EVENT TYPE</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">URL</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">STATUS</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">LAST TRIGGERED</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-textPrimary">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((webhook, index) => (
                <tr key={index} className="border-b border-border hover:bg-section/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-textSecondary font-mono">{webhook.id}</td>
                  <td className="px-6 py-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-mono">
                      {webhook.events}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-textSecondary font-mono">{webhook.url}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-textSecondary">{webhook.lastTriggered}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onConfigureWebhook(webhook)}
                        className="p-2 hover:bg-section rounded-lg transition-colors"
                        title="Configure"
                      >
                        <Settings className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onTestWebhook(webhook.id)}
                        className="p-2 hover:bg-section rounded-lg transition-colors"
                        title="Test Webhook"
                      >
                        <RotateCcw className="w-4 h-4 text-textSecondary" />
                      </button>
                      <button 
                        onClick={() => onDeleteWebhook(webhook.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
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

      <div className="mt-4 text-sm text-textSecondary">
        <p><strong>Supported Events:</strong> content.flagged, user.reported, threat.detected</p>
      </div>
    </div>
  )
}

// Security Layer Component
export const SecurityLayer = () => {
  const securityFeatures = [
    'API authentication',
    'Role-based access control', 
    'Encryption status indicators',
    'Secure token management'
  ]

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-textPrimary mb-4">Security Layer</h3>
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-primary" />
          <h4 className="text-lg font-semibold text-textPrimary">Core Security Features</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-section rounded-lg">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-textPrimary">{feature}</span>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Integration Control:</strong> Each integration supports Toggle ON/OFF, Configure settings, View logs, Check sync status
          </p>
        </div>
      </div>
    </div>
  )
}

// Data Flow Visual Component
export const DataFlowVisual = () => {
  const flowSteps = [
    'Device / Platform',
    'AI Detection', 
    'Enforcement Engine',
    'Logs'
  ]

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-textPrimary mb-4">Data Flow</h3>
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between">
          {flowSteps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                  <span className="text-primary font-semibold">{index + 1}</span>
                </div>
                <div className="text-sm font-medium text-textPrimary">{step}</div>
              </div>
              {index < flowSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-textSecondary mx-4" />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-textPrimary">
            This visual illustrates how data moves securely through Guardian AI's detection and enforcement pipeline.
          </p>
        </div>
      </div>
    </div>
  )
}