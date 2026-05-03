import {
  Smartphone,
  Monitor,
  Globe,
  Cloud,
  Code,
  Shield,
  AlertTriangle,
  Eye,
  Database
} from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'
import type { PlatformBrandId } from '../types/platformBrand'

type IndividualPlatform = {
  name: string
  brand: PlatformBrandId
  status: string
  lastSync: string
  isConnected: boolean
}

type EnterprisePlatform = {
  name: string
  brand: PlatformBrandId
  status: string
  lastSync: string
  isConnected: boolean
}

/** Shared with Integrations modal and main dashboard copy. */
export const integrationModeData = {
  individual: {
    goal: 'Personal device and account safety through AI-driven monitoring',
    platforms: [
      {
        name: 'Instagram',
        brand: 'instagram',
        status: 'Connected',
        lastSync: '2 min ago',
        isConnected: true
      },
      {
        name: 'Facebook',
        brand: 'facebook',
        status: 'Connected',
        lastSync: '4 min ago',
        isConnected: true
      },
      {
        name: 'WhatsApp',
        brand: 'whatsapp',
        status: 'Connected',
        lastSync: '5 min ago',
        isConnected: true
      },
      {
        name: 'Telegram',
        brand: 'telegram',
        status: 'Connected',
        lastSync: '1 min ago',
        isConnected: true
      },
      {
        name: 'X (Twitter)',
        brand: 'x',
        status: 'Disconnected',
        lastSync: '—',
        isConnected: false
      },
      {
        name: 'YouTube',
        brand: 'youtube',
        status: 'Connected',
        lastSync: '3 min ago',
        isConnected: true
      }
    ] satisfies IndividualPlatform[],
    devices: [
      {
        name: 'Mobile Device',
        status: 'Connected',
        os: 'Android / iOS',
        features: ['App scanning', 'Media analysis', 'Real-time alerts'],
        icon: Smartphone,
        browserStack: false as const
      },
      {
        name: 'Desktop / Laptop',
        status: 'Connected',
        os: 'Windows / Mac',
        features: ['File scanning', 'Browser monitoring', 'Activity detection'],
        icon: Monitor,
        browserStack: false as const
      },
      {
        name: 'Browser Extension',
        status: 'Connected',
        os: 'Chrome · Edge · Safari',
        features: ['Install once per browser', 'Real-time page & media scanning', 'Syncs with your Guardian policies'],
        icon: Globe,
        browserStack: true as const
      }
    ],
    actions: ['Notify user', 'Block harmful content', 'Alert on risky behavior']
  },
  enterprise: {
    goal: 'Platform moderation and internal system control for brand and data safety',
    platforms: [
      {
        name: 'Instagram API',
        brand: 'instagram',
        status: 'Connected',
        lastSync: '2 min ago',
        isConnected: true
      },
      {
        name: 'YouTube Moderation API',
        brand: 'youtube',
        status: 'Connected',
        lastSync: '5 min ago',
        isConnected: true
      },
      {
        name: 'Discord / Slack',
        brand: 'discord_slack',
        status: 'Connected',
        lastSync: '1 min ago',
        isConnected: true
      },
      {
        name: 'Community Platforms',
        brand: 'community',
        status: 'Disconnected',
        lastSync: '—',
        isConnected: false
      }
    ] satisfies EnterprisePlatform[],
    systems: [
      { name: 'Website CMS', type: 'REST API', status: 'Connected', icon: Globe },
      { name: 'Mobile App SDK', type: 'SDK', status: 'Connected', icon: Smartphone },
      { name: 'Cloud Storage', type: 'S3', status: 'Disconnected', icon: Cloud },
      { name: 'Custom API', type: 'GraphQL', status: 'Connected', icon: Code }
    ],
    monitoring: ['Admin Dashboards', 'Internal Tools', 'Employee Activity Monitoring'],
    actions: ['Remove content', 'Shadow ban', 'Reduce visibility', 'Send to moderation queue']
  },
  government: {
    goal: 'Threat detection and national-level monitoring through secure, high-priority integrations',
    systems: [
      { name: 'Cybercrime Database', status: 'Connected', icon: Shield },
      { name: 'Law Enforcement Systems', status: 'Connected', icon: AlertTriangle },
      { name: 'Surveillance APIs', status: 'Connected', icon: Eye },
      { name: 'Intelligence Systems', status: 'Disconnected', icon: Database }
    ],
    infrastructure: ['Mobile network feeds', 'Public system monitoring', 'Device-level threat signals'],
    feeds: ['Threat alerts', 'Suspicious activity streams', 'Geo-based signals'],
    actions: ['Escalate threat', 'Flag accounts', 'Cross-platform tracking', 'Immediate enforcement']
  }
} as const

export function deploymentModeLabel(mode: DeploymentMode): string {
  return mode.charAt(0).toUpperCase() + mode.slice(1)
}
