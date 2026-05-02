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

/** Shared with Integrations modal and main dashboard copy. */
export const integrationModeData = {
  individual: {
    goal: 'Personal device and account safety through AI-driven monitoring',
    platforms: [
      { name: 'Instagram', icon: '📷', status: 'Connected', lastSync: '2 min ago', isConnected: true },
      { name: 'WhatsApp', icon: '💚', status: 'Connected', lastSync: '5 min ago', isConnected: true },
      { name: 'Telegram', icon: '✈️', status: 'Connected', lastSync: '1 min ago', isConnected: true },
      { name: 'X (Twitter)', icon: '🐦', status: 'Disconnected', lastSync: '—', isConnected: false },
      { name: 'YouTube', icon: '📺', status: 'Connected', lastSync: '3 min ago', isConnected: true }
    ],
    devices: [
      {
        name: 'Mobile Device',
        status: 'Connected',
        os: 'Android / iOS',
        features: ['App scanning', 'Media analysis', 'Real-time alerts'],
        icon: Smartphone
      },
      {
        name: 'Desktop / Laptop',
        status: 'Connected',
        os: 'Windows / Mac',
        features: ['File scanning', 'Browser monitoring', 'Activity detection'],
        icon: Monitor
      },
      {
        name: 'Browser Extension',
        status: 'Connected',
        os: 'Chrome / Edge / Safari',
        features: ['Detect harmful content in real time'],
        icon: Globe
      }
    ],
    actions: ['Notify user', 'Block harmful content', 'Alert on risky behavior']
  },
  enterprise: {
    goal: 'Platform moderation and internal system control for brand and data safety',
    platforms: [
      { name: 'Instagram API', icon: '📷', status: 'Connected', lastSync: '2 min ago', isConnected: true },
      { name: 'YouTube Moderation API', icon: '📺', status: 'Connected', lastSync: '5 min ago', isConnected: true },
      { name: 'Discord / Slack', icon: '💬', status: 'Connected', lastSync: '1 min ago', isConnected: true },
      { name: 'Community Platforms', icon: '👥', status: 'Disconnected', lastSync: '—', isConnected: false }
    ],
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
