import React, { useMemo } from 'react'
import { Brain } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'

interface AIModelsCardProps {
  deploymentMode: DeploymentMode
}

const AIModelsCard = ({ deploymentMode }: AIModelsCardProps) => {
  const { title, description, models } = useMemo(() => {
    if (deploymentMode === 'individual') {
      return {
        title: 'AI models for personal safety',
        description:
          'On-device friendly and cloud classifiers tuned for accounts, DMs, and media you linked in Individual Integrations.',
        models: ['NLP Classifier', 'Multimodal Vision', 'Risk Scoring (XGBoost)', 'Repeat Offender (KMeans)']
      }
    }
    if (deploymentMode === 'enterprise') {
      return {
        title: 'AI models for platform & workforce trust',
        description:
          'Production stacks for UGC, internal comms, and API partners — aligned with Enterprise Integrations.',
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
        'High-assurance models for threat correlation, synthetic media, and agency-grade evidence — tied to Government Integrations.',
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
    <div className="bg-cardBg rounded-xl p-6 border border-borderLight shadow-card">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div className="flex items-start space-x-3 min-w-0">
          <Brain className="w-6 h-6 text-accent shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-semibold text-textPrimary">{title}</h2>
            <p className="text-textSecondary mt-1">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {models.map((model, index) => (
            <span key={index} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
              {model}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AIModelsCard
