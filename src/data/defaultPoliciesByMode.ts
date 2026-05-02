import type { Policy } from '../components/PolicyTable'
import type { DeploymentMode } from '../types/deploymentMode'

export const defaultPoliciesByMode: Record<DeploymentMode, Policy[]> = {
  individual: [
    {
      id: 101,
      name: 'Personal Account Safety',
      description: 'Protects linked social accounts from phishing, impersonation, and scam content',
      models: ['NLP', 'Risk Scoring (XGBoost)'],
      riskScore: 78,
      actions: ['Notify User', 'Flag Content'],
      automation: 'Semi-Automated',
      lastDecision: '12 minutes ago',
      status: 'Active'
    },
    {
      id: 102,
      name: 'Family Media Filter',
      description: 'Screens images and video shared on personal devices for age-inappropriate content',
      models: ['Multimodal Vision', 'NLP'],
      riskScore: 91,
      actions: ['Flag Content', 'Age-Gate'],
      automation: 'Fully Automated',
      lastDecision: '4 minutes ago',
      status: 'Active'
    },
    {
      id: 103,
      name: 'Direct Message Harassment',
      description: 'Detects bullying and targeted harassment in DMs across connected platforms',
      models: ['NLP', 'Context Analysis'],
      riskScore: 82,
      actions: ['Notify User', 'Block harmful content'],
      automation: 'Semi-Automated',
      lastDecision: '1 hour ago',
      status: 'Active'
    },
    {
      id: 104,
      name: 'Device App Reputation',
      description: 'Scores installed apps and browser extensions for known abuse patterns',
      models: ['Repeat Offender (KMeans)', 'NLP'],
      riskScore: 71,
      actions: ['Notify User'],
      automation: 'Fully Automated',
      lastDecision: '3 hours ago',
      status: 'Paused'
    }
  ],
  enterprise: [
    {
      id: 201,
      name: 'Brand Safety — UGC',
      description: 'Moderates user-generated posts and comments against brand guidelines',
      models: ['NLP', 'Multimodal Vision', 'Risk Scoring (XGBoost)'],
      riskScore: 88,
      actions: ['Remove Content', 'Send to Moderator'],
      automation: 'Semi-Automated',
      lastDecision: '8 minutes ago',
      status: 'Active'
    },
    {
      id: 202,
      name: 'Workforce Communications',
      description: 'Monitors internal Slack/Teams for policy violations and data leakage risk',
      models: ['NLP', 'Context Analysis'],
      riskScore: 79,
      actions: ['Notify User', 'Send to Moderator'],
      automation: 'Semi-Automated',
      lastDecision: '22 minutes ago',
      status: 'Active'
    },
    {
      id: 203,
      name: 'Spam & Bot Campaigns',
      description: 'Identifies coordinated inauthentic behavior and promotional abuse',
      models: ['NLP', 'Repeat Offender (KMeans)'],
      riskScore: 85,
      actions: ['Shadow Ban', 'Reduce Visibility'],
      automation: 'Fully Automated',
      lastDecision: '15 minutes ago',
      status: 'Active'
    },
    {
      id: 204,
      name: 'API Partner Content',
      description: 'Enforces moderation on content ingested via enterprise APIs and webhooks',
      models: ['NLP', 'Fact-Check API'],
      riskScore: 90,
      actions: ['Remove Content', 'Add Warning Label'],
      automation: 'Semi-Automated',
      lastDecision: '2 hours ago',
      status: 'Active'
    }
  ],
  government: [
    {
      id: 301,
      name: 'Critical Threat Escalation',
      description: 'Correlates cross-platform signals for imminent harm and coordinated threats',
      models: ['Risk Scoring (XGBoost)', 'Multimodal Vision', 'NLP'],
      riskScore: 96,
      actions: ['Escalate threat', 'Immediate enforcement'],
      automation: 'Semi-Automated',
      lastDecision: '3 minutes ago',
      status: 'Active'
    },
    {
      id: 302,
      name: 'National Misinformation Response',
      description: 'Flags state-level misinformation campaigns and synthetic media',
      models: ['Fact-Check API', 'Deepfake patterns', 'NLP'],
      riskScore: 93,
      actions: ['Flag accounts', 'Cross-platform tracking'],
      automation: 'Semi-Automated',
      lastDecision: '18 minutes ago',
      status: 'Active'
    },
    {
      id: 303,
      name: 'Law Enforcement Handoff',
      description: 'Packages audit-ready evidence for authorized agency workflows',
      models: ['NLP', 'Audit Logging', 'Risk Scoring (XGBoost)'],
      riskScore: 89,
      actions: ['Send to Moderator', 'Immediate enforcement'],
      automation: 'Semi-Automated',
      lastDecision: '45 minutes ago',
      status: 'Active'
    },
    {
      id: 304,
      name: 'Geo-Targeted Surveillance Feeds',
      description: 'Monitors public and licensed feeds for region-specific policy violations',
      models: ['Multimodal Vision', 'Geo signals', 'NLP'],
      riskScore: 87,
      actions: ['Flag accounts', 'Escalate threat'],
      automation: 'Fully Automated',
      lastDecision: '1 hour ago',
      status: 'Active'
    }
  ]
}
