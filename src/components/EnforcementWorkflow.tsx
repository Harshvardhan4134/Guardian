import React, { useState } from 'react'
import { CheckCircle, Shield, AlertTriangle, Users, FileText, Activity } from 'lucide-react'

const EnforcementWorkflow = () => {
  const [selectedActions, setSelectedActions] = useState(['Flag Content', 'Notify User'])
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)

  const workflowSteps = [
    {
      number: 1,
      title: 'Violation Detection Model',
      description: 'AI scans content in real-time',
      icon: Activity
    },
    {
      number: 2,
      title: 'Risk Threshold Evaluation',
      description: 'Calculates severity score',
      icon: AlertTriangle
    },
    {
      number: 3,
      title: 'Repeat Offender Analysis',
      description: 'Checks user history',
      icon: Users
    },
    {
      number: 4,
      title: 'Enforcement Action Selection',
      description: 'Determines appropriate response',
      icon: Shield
    },
    {
      number: 5,
      title: 'Audit Logging Engine',
      description: 'Records all decisions',
      icon: FileText
    }
  ]

  const actionOptions = [
    'Flag Content',
    'Notify User',
    'Send to Moderator',
    'Suspend Account',
    'Shadow Ban',
    'Remove Content',
    'Add Warning Label',
    'Reduce Visibility',
    'Age-Gate',
    'Temporary Ban'
  ]

  const trustFeatures = [
    'Model-Driven Enforcement',
    'Explainable AI Decisions',
    'Audit-Ready Intelligence',
    'Enterprise-Grade Security'
  ]

  const toggleAction = (action: string) => {
    setSelectedActions(prev => 
      prev.includes(action) 
        ? prev.filter(a => a !== action)
        : [...prev, action]
    )
  }

  const handleSaveWorkflow = () => {
    if (selectedActions.length === 0) {
      window.alert('Select at least one enforcement action before saving.')
      return
    }
    setLastSavedAt(new Date().toLocaleTimeString())
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-textPrimary mb-2">AI Enforcement Workflow</h2>
        <p className="text-textSecondary">Configure how Guardian AI models respond automatically to detected violations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workflow Blocks */}
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Workflow Blocks</h3>
          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <div key={step.number} className="flex items-start space-x-4 p-4 bg-section rounded-lg">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <step.icon className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-textPrimary">{step.title}</h4>
                  </div>
                  <p className="text-sm text-textSecondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Types */}
        <div>
          <div className="bg-section rounded-lg p-6">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Action Types</h3>
            <p className="text-textSecondary mb-4">Select enforcement actions to apply when violations are detected:</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {actionOptions.map((action) => (
                <label key={action} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(action)}
                    onChange={() => toggleAction(action)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-textPrimary">{action}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-sm text-textSecondary mb-2">Selected Actions: {selectedActions.length}</p>
              <div className="flex flex-wrap gap-2">
                {selectedActions.map((action) => (
                  <span key={action} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {action}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveWorkflow}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-teal-600 transition-colors font-semibold"
            >
              Save Workflow Configuration
            </button>
            {lastSavedAt && (
              <p className="text-xs text-green-700 mt-2">Workflow saved successfully at {lastSavedAt}</p>
            )}
          </div>

          {/* Trust & System Labels */}
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-textPrimary">Trust & System Labels</h4>
            </div>
            <ul className="space-y-2">
              {trustFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-sm text-textPrimary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnforcementWorkflow