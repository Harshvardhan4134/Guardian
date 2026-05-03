import React, { useState } from 'react'
import { X, Plus, Brain, Shield, AlertTriangle, Settings, Eye, Save } from 'lucide-react'
import { Policy } from './PolicyTable'
import type { DeploymentMode } from '../types/deploymentMode'

interface CreatePolicyModalProps {
  onClose: () => void
  onPolicyCreated?: (policyData: Policy) => void
  deploymentMode: DeploymentMode
}

const CreatePolicyModal = ({ onClose, onPolicyCreated, deploymentMode }: CreatePolicyModalProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [policyData, setPolicyData] = useState({
    name: '',
    description: '',
    mode: deploymentMode,
    inputTypes: [] as string[],
    models: [] as string[],
    riskThreshold: 75,
    contentTypes: [] as string[],
    repeatOffender: false,
    contextRisk: 'medium',
    actions: [] as string[],
    automationLevel: 'semi-automated',
    modeBehavior: {
      individual: 'warnings',
      enterprise: 'balanced',
      government: 'strict'
    }
  })

  const steps = [
    { number: 1, title: 'Basic Info', icon: Shield },
    { number: 2, title: 'Input Target', icon: Brain },
    { number: 3, title: 'Detection Models', icon: AlertTriangle },
    { number: 4, title: 'Policy Conditions', icon: Shield },
    { number: 5, title: 'Enforcement Actions', icon: Plus },
    { number: 6, title: 'Automation Level', icon: Settings },
    { number: 7, title: 'Mode-Based Rules', icon: Brain },
    { number: 8, title: 'Preview Engine', icon: Eye },
    { number: 9, title: 'Save Policy', icon: Save }
  ]

  const inputTypes = ['Text', 'Image', 'Audio', 'Video']
  const detectionModels = [
    'NLP Classifier',
    'Multimodal Vision',
    'Speech Analysis',
    'Deepfake Detection',
    'Repeat Offender Model',
    'Risk Scoring (XGBoost)'
  ]
  const contentTypes = ['Spam', 'NSFW', 'Hate', 'Violence', 'Misinformation']
  const enforcementActions = [
    'Flag Content',
    'Notify User',
    'Send to Moderator',
    'Remove Content',
    'Shadow Ban',
    'Add Warning Label',
    'Reduce Visibility',
    'Age-Gate',
    'Temporary Ban',
    'Suspend Account'
  ]

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item))
    } else {
      setter([...array, item])
    }
  }

  const handleNext = () => {
    if (currentStep < 9) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (!policyData.name.trim()) {
      window.alert('Policy name is required.')
      return
    }

    if (policyData.models.length === 0 || policyData.actions.length === 0) {
      window.alert('Please select at least one model and one enforcement action.')
      return
    }

    const newPolicy: Policy = {
      id: Date.now(),
      name: policyData.name,
      description: policyData.description,
      models: policyData.models,
      riskScore: Math.max(policyData.riskThreshold, 65),
      actions: policyData.actions,
      automation: policyData.automationLevel === 'fully-automated' ? 'Fully Automated' : 'Semi-Automated',
      lastDecision: 'Just now',
      status: 'Active'
    }
    
    if (onPolicyCreated) {
      onPolicyCreated(newPolicy)
    }
    onClose()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Policy Name</label>
              <input
                type="text"
                value={policyData.name}
                onChange={(e) => setPolicyData({...policyData, name: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter policy name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Description</label>
              <textarea
                value={policyData.description}
                onChange={(e) => setPolicyData({...policyData, description: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder="Describe what this policy does"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Mode Selection</label>
              <div className="grid grid-cols-3 gap-3">
                {['individual', 'enterprise', 'government'].map((mode) => (
                  <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value={mode}
                      checked={policyData.mode === mode}
                      onChange={(e) => setPolicyData({...policyData, mode: e.target.value})}
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-textPrimary capitalize">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Select applicable input types</h3>
            <div className="grid grid-cols-2 gap-3">
              {inputTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-section">
                  <input
                    type="checkbox"
                    checked={policyData.inputTypes.includes(type)}
                    onChange={() => toggleArrayItem(policyData.inputTypes, type, (items) => setPolicyData({...policyData, inputTypes: items}))}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-textPrimary">{type}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Multi-select Detection Models</h3>
            <div className="grid grid-cols-1 gap-3">
              {detectionModels.map((model) => (
                <label key={model} className="flex items-center space-x-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-section">
                  <input
                    type="checkbox"
                    checked={policyData.models.includes(model)}
                    onChange={() => toggleArrayItem(policyData.models, model, (items) => setPolicyData({...policyData, models: items}))}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-textPrimary">{model}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">
                Risk Score Threshold: {policyData.riskThreshold}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={policyData.riskThreshold}
                onChange={(e) => setPolicyData({...policyData, riskThreshold: parseInt(e.target.value)})}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-textSecondary mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Content Type</label>
              <div className="grid grid-cols-3 gap-2">
                {contentTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={policyData.contentTypes.includes(type)}
                      onChange={() => toggleArrayItem(policyData.contentTypes, type, (items) => setPolicyData({...policyData, contentTypes: items}))}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-sm text-textPrimary">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={policyData.repeatOffender}
                  onChange={(e) => setPolicyData({...policyData, repeatOffender: e.target.checked})}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                />
                <span className="text-textPrimary">Repeat Offender (Yes / No)</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">Context Risk</label>
              <select 
                value={policyData.contextRisk}
                onChange={(e) => setPolicyData({...policyData, contextRisk: e.target.value})}
                className="w-full border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Available Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {enforcementActions.map((action) => (
                <label key={action} className="flex items-center space-x-2 cursor-pointer p-3 border border-border rounded-lg hover:bg-section">
                  <input
                    type="checkbox"
                    checked={policyData.actions.includes(action)}
                    onChange={() => toggleArrayItem(policyData.actions, action, (items) => setPolicyData({...policyData, actions: items}))}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-textPrimary">{action}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-textPrimary">Select Automation Mode</h3>
            <div className="space-y-3">
              {[
                { value: 'manual', label: 'Manual', description: 'All actions require human approval' },
                { value: 'semi-automated', label: 'Semi-Automated', description: 'Some actions automated, others require approval' },
                { value: 'fully-automated', label: 'Fully Automated', description: 'All actions executed automatically' }
              ].map((mode) => (
                <label key={mode.value} className="flex items-start space-x-3 cursor-pointer p-3 border border-border rounded-lg hover:bg-section">
                  <input
                    type="radio"
                    name="automationLevel"
                    value={mode.value}
                    checked={policyData.automationLevel === mode.value}
                    onChange={(e) => setPolicyData({...policyData, automationLevel: e.target.value})}
                    className="w-4 h-4 text-primary border-border focus:ring-primary mt-1"
                  />
                  <div>
                    <div className="font-semibold text-textPrimary">{mode.label}</div>
                    <div className="text-sm text-textSecondary">{mode.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">Adaptive Enforcement Logic</h3>
              <p className="text-textSecondary mb-4">Mode Behavior - Smart enforcement based on operational context</p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <h4 className="font-semibold text-textPrimary">Individual Mode</h4>
                </div>
                <p className="text-sm text-textSecondary mb-2">Prefer warnings, avoid harsh actions</p>
                <div className="text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded">
                  Focus: User education and gentle guidance
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <h4 className="font-semibold text-textPrimary">Enterprise Mode</h4>
                </div>
                <p className="text-sm text-textSecondary mb-2">Balanced enforcement, brand safety priority</p>
                <div className="text-xs text-green-800 bg-green-100 px-2 py-1 rounded">
                  Focus: Professional moderation with business impact consideration
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <h4 className="font-semibold text-textPrimary">Government Mode</h4>
                </div>
                <p className="text-sm text-textSecondary mb-2">Strict enforcement, real-time escalation</p>
                <div className="text-xs text-red-800 bg-red-100 px-2 py-1 rounded">
                  Focus: Immediate threat response and compliance enforcement
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Brain className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-textPrimary">Smart Adaptation</h4>
              </div>
              <p className="text-sm text-textSecondary">
                Policy automatically adjusts enforcement severity based on the selected mode, ensuring appropriate responses for each operational context.
              </p>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-2">Live Policy Simulation</h3>
              <p className="text-textSecondary">Real-time simulation of policy behavior before activation</p>
            </div>

            <div className="bg-section rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-textPrimary mb-3">Simulation Example</h4>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-textPrimary">Sample Content: "This is spam content"</span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Risk: 87/100</span>
                  </div>
                  <div className="text-sm text-textSecondary mb-2">
                    <strong>Triggered Models:</strong> {policyData.models.slice(0, 2).join(', ') || 'NLP Classifier, Risk Scoring'}
                  </div>
                  <div className="text-sm text-textSecondary mb-2">
                    <strong>Actions Taken:</strong> {policyData.actions.slice(0, 2).join(', ') || 'Flag Content, Notify User'}
                  </div>
                  <div className="text-sm text-textSecondary">
                    <strong>Automation:</strong> {policyData.automationLevel === 'fully-automated' ? 'Executed automatically' : 'Sent for review'}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-textPrimary">Sample Content: "Normal user message"</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Risk: 23/100</span>
                  </div>
                  <div className="text-sm text-textSecondary mb-2">
                    <strong>Triggered Models:</strong> NLP Classifier
                  </div>
                  <div className="text-sm text-textSecondary mb-2">
                    <strong>Actions Taken:</strong> No action required
                  </div>
                  <div className="text-sm text-textSecondary">
                    <strong>Result:</strong> Content approved
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Policy Performance Prediction</span>
                </div>
                <div className="text-sm text-textSecondary mt-1">
                  Expected accuracy: 94% | False positives: 3% | Processing time: 120ms
                </div>
              </div>
            </div>
          </div>
        )

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-textPrimary mb-2">Policy Ready for Activation</h3>
              <p className="text-textSecondary">Review your policy configuration and save to activate</p>
            </div>

            <div className="bg-section rounded-lg p-4 border border-border">
              <h4 className="font-semibold text-textPrimary mb-3">Policy Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-textSecondary">Name:</span>
                  <div className="font-medium text-textPrimary">{policyData.name || 'Untitled Policy'}</div>
                </div>
                <div>
                  <span className="text-textSecondary">Mode:</span>
                  <div className="font-medium text-textPrimary capitalize">{policyData.mode}</div>
                </div>
                <div>
                  <span className="text-textSecondary">Input Types:</span>
                  <div className="font-medium text-textPrimary">{policyData.inputTypes.join(', ') || 'None selected'}</div>
                </div>
                <div>
                  <span className="text-textSecondary">Models:</span>
                  <div className="font-medium text-textPrimary">{policyData.models.length} selected</div>
                </div>
                <div>
                  <span className="text-textSecondary">Risk Threshold:</span>
                  <div className="font-medium text-textPrimary">{policyData.riskThreshold}/100</div>
                </div>
                <div>
                  <span className="text-textSecondary">Automation:</span>
                  <div className="font-medium text-textPrimary capitalize">{policyData.automationLevel.replace('-', ' ')}</div>
                </div>
                <div>
                  <span className="text-textSecondary">Actions:</span>
                  <div className="font-medium text-textPrimary">{policyData.actions.length} configured</div>
                </div>
                <div>
                  <span className="text-textSecondary">Repeat Offender:</span>
                  <div className="font-medium text-textPrimary">{policyData.repeatOffender ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-green-800">Post-Save Behavior</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Policy will be added to the Policy Table</li>
                <li>• Activated immediately upon saving</li>
                <li>• Real-time monitoring begins</li>
                <li>• Audit logging enabled</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary">Create New Policy</h2>
              <p className="text-textSecondary">Define AI-driven enforcement rules for multimodal content and behavior</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-section rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-6 overflow-x-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number ? 'bg-primary text-white' : 'bg-section text-textSecondary'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-2 hidden sm:block min-w-0">
                  <div className={`text-sm font-medium truncate ${
                    currentStep >= step.number ? 'text-textPrimary' : 'text-textSecondary'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className="text-xs text-textSecondary truncate">{step.title}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderStepContent()}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-border rounded-lg hover:bg-section transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="text-sm text-textSecondary">
              Step {currentStep} of {steps.length}
            </div>

            {currentStep === 9 ? (
              <div className="flex space-x-3">
                <button 
                  onClick={onClose}
                  className="px-4 py-2 border border-border rounded-lg hover:bg-section transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 rounded-lg bg-primary px-6 py-2 text-white transition-colors duration-300 ease-out hover:bg-primaryHover"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Policy</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={handleNext}
                className="rounded-lg bg-primary px-4 py-2 text-white transition-colors duration-300 ease-out hover:bg-primaryHover"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePolicyModal