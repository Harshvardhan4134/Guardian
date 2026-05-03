import React, { useMemo } from 'react'
import { Brain } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'

interface AIModelsCardProps {
  deploymentMode: DeploymentMode
}

function DescriptionWithAccent({ text }: { text: string }) {
  const parts = text.split('AI-driven')
  if (parts.length === 1) {
    return <>{text}</>
  }
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-semibold text-accent">AI-driven</span>}
        </React.Fragment>
      ))}
    </>
  )
}

const AIModelsCard = ({ deploymentMode }: AIModelsCardProps) => {
  const { title, description, models } = useMemo(() => {
    if (deploymentMode === 'individual') {
      return {
        title: 'AI models for personal safety',
        description:
          'On-device friendly and cloud classifiers tuned for accounts, DMs, and media you linked in Individual Integrations. Coverage is AI-driven and aligned to your policies.',
        models: ['NLP Classifier', 'Multimodal Vision', 'Risk Scoring (XGBoost)', 'Repeat Offender (KMeans)']
      }
    }
    if (deploymentMode === 'enterprise') {
      return {
        title: 'AI models for platform & workforce trust',
        description:
          'Production stacks for UGC, internal comms, and API partners — aligned with Enterprise Integrations. Enforcement is AI-driven and audit-ready.',
        models: [
          'NLP Classifier',
          'Multimodal Vision',
          'Fact-Check API',
          'Risk Scoring (XGBoost)',
          'Repeat Offender (KMeans)'
        ]
      }
    }
    return {
      title: 'AI models for national-scale enforcement',
      description:
        'High-assurance models for threat correlation, synthetic media, and agency-grade evidence — tied to Government Integrations. Operations stay AI-driven with full traceability.',
      models: [
        'Multimodal Vision',
        'Deepfake / synthetic detection',
        'Geo & feed fusion',
        'Risk Scoring (XGBoost)',
        'Audit & chain-of-custody NLP'
      ]
    }
  }, [deploymentMode])

  return (
    <div className="rounded-xl border border-borderLight bg-cardBg p-6 shadow-card">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Brain className="mt-1 h-6 w-6 shrink-0 text-primary" strokeWidth={1.75} />
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-textPrimary">{title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-textBody">
              <DescriptionWithAccent text={description} />
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {models.map((model, index) => (
            <span
              key={index}
              className="rounded-full border border-borderLight bg-white px-3 py-1 text-sm font-medium text-textBody shadow-sm"
            >
              {model}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIModelsCard
