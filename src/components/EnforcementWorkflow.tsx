import React, { useEffect, useMemo, useState } from 'react'
import { CheckCircle, Shield, AlertTriangle, Users, FileText, Activity } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'

interface EnforcementWorkflowProps {
  deploymentMode: DeploymentMode
}

function defaultActionsForMode(mode: DeploymentMode): string[] {
  switch (mode) {
    case 'individual':
      return ['Flag Content', 'Notify User', 'Age-Gate']
    case 'enterprise':
      return ['Remove Content', 'Send to Moderator', 'Shadow Ban', 'Reduce Visibility']
    case 'government':
      return ['Escalate threat', 'Immediate enforcement', 'Flag accounts', 'Cross-platform tracking']
    default:
      return ['Flag Content', 'Notify User']
  }
}

const EnforcementWorkflow = ({ deploymentMode }: EnforcementWorkflowProps) => {
  const [selectedActions, setSelectedActions] = useState<string[]>(() => defaultActionsForMode(deploymentMode))
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null)

  useEffect(() => {
    setSelectedActions(defaultActionsForMode(deploymentMode))
    setLastSavedAt(null)
  }, [deploymentMode])

  const workflowSteps = useMemo(() => {
    if (deploymentMode === 'individual') {
      return [
        { number: 1, title: 'Personal feed scan', description: 'AI reviews linked accounts and device activity', icon: Activity },
        { number: 2, title: 'Household risk score', description: 'Lightweight scoring for alerts vs blocking', icon: AlertTriangle },
        { number: 3, title: 'Cross-app context', description: 'Correlates signals across platforms you connected', icon: Users },
        { number: 4, title: 'Safe response', description: 'Notify, block, or age-gate per your policy', icon: Shield },
        { number: 5, title: 'Private audit log', description: 'Personal timeline for exports and review', icon: FileText }
      ]
    }
    if (deploymentMode === 'enterprise') {
      return [
        { number: 1, title: 'Ingestion & APIs', description: 'Content from CMS, apps, and partner APIs', icon: Activity },
        { number: 2, title: 'Moderation scoring', description: 'Brand and HR policy thresholds', icon: AlertTriangle },
        { number: 3, title: 'Operator queues', description: 'Routes to L1/L2 moderation teams', icon: Users },
        { number: 4, title: 'Enforcement', description: 'Remove, shadow ban, or downgrade reach', icon: Shield },
        { number: 5, title: 'Compliance log', description: 'SOC2-friendly records for every action', icon: FileText }
      ]
    }
    return [
      { number: 1, title: 'National feed fusion', description: 'Licensed and public signals in secure pipelines', icon: Activity },
      { number: 2, title: 'Threat assessment', description: 'Severity models with escalation ladders', icon: AlertTriangle },
      { number: 3, title: 'Agency coordination', description: 'Handoff-ready evidence packages', icon: Users },
      { number: 4, title: 'Immediate enforcement', description: 'Time-critical blocks and cross-platform flags', icon: Shield },
      { number: 5, title: 'Chain of custody', description: 'Signed, immutable decision records', icon: FileText }
    ]
  }, [deploymentMode])

  const actionOptions = useMemo(
    () => [
      'Flag Content',
      'Notify User',
      'Send to Moderator',
      'Suspend Account',
      'Shadow Ban',
      'Remove Content',
      'Add Warning Label',
      'Reduce Visibility',
      'Age-Gate',
      'Temporary Ban',
      'Escalate threat',
      'Cross-platform tracking',
      'Immediate enforcement',
      'Flag accounts'
    ],
    []
  )

  const trustFeatures = useMemo(() => {
    if (deploymentMode === 'individual') {
      return ['Privacy-first processing', 'User-visible explanations', 'Per-device controls', 'Easy export for your records']
    }
    if (deploymentMode === 'enterprise') {
      return ['Model-Driven Enforcement', 'Explainable AI Decisions', 'Audit-Ready Intelligence', 'Enterprise-Grade Security']
    }
    return ['Classified-handling modes', 'Tamper-evident logging', 'Inter-agency interoperability', 'Mission-grade uptime']
  }, [deploymentMode])

  const toggleAction = (action: string) => {
    setSelectedActions((prev) => (prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]))
  }

  const handleSaveWorkflow = () => {
    if (selectedActions.length === 0) {
      window.alert('Select at least one enforcement action before saving.')
      return
    }
    setLastSavedAt(new Date().toLocaleTimeString())
  }

  return (
    <div className="rounded-xl border border-borderLight bg-cardBg p-6 shadow-card">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-textPrimary">AI Enforcement Workflow</h2>
        <p className="text-textBody">
          {deploymentMode === 'individual' &&
            'Tuned for personal accounts and devices — matches Individual Integrations and your policy grid.'}
          {deploymentMode === 'enterprise' &&
            'Tuned for platforms and internal tools — matches Enterprise Integrations and moderation SLAs.'}
          {deploymentMode === 'government' &&
            'Tuned for national-scale monitoring — matches Government Integrations and escalation playbooks.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Workflow Blocks</h3>
          <div className="space-y-4">
            {workflowSteps.map((step) => (
              <div
                key={step.number}
                className="flex items-start space-x-4 rounded-lg border border-borderLight bg-sectionBg p-4"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <step.icon className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-textPrimary">{step.title}</h4>
                  </div>
                  <p className="text-sm text-textBody">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-borderLight bg-sectionBg p-6">
            <h3 className="mb-4 text-lg font-semibold text-textPrimary">Action Types</h3>
            <p className="mb-4 text-textBody">Select enforcement actions to apply when violations are detected:</p>

            <div className="grid grid-cols-2 gap-3 mb-6 max-h-64 overflow-y-auto pr-1">
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
              <p className="mb-2 text-sm text-textSecondary">Selected Actions: {selectedActions.length}</p>
              <div className="flex flex-wrap gap-2">
                {selectedActions.map((action) => (
                  <span key={action} className="rounded-full bg-primary px-3 py-1 text-sm text-white">
                    {action}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveWorkflow}
              className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors duration-300 ease-out hover:bg-primaryHover"
            >
              Save Workflow Configuration
            </button>
            {lastSavedAt && (
              <p className="text-xs text-green-700 mt-2">Workflow saved successfully at {lastSavedAt}</p>
            )}
          </div>

          <div className="mt-6 rounded-lg border border-borderLight bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-semibold text-textPrimary">Trust &amp; system labels</h4>
            </div>
            <ul className="space-y-2">
              {trustFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="text-sm text-textBody">{feature}</span>
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
