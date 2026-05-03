import type { LucideIcon } from 'lucide-react'
import { Zap, Shield, Sparkles, User, Database, Globe, Lock } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'

export interface PricingTierDef {
  id: string
  name: string
  subtitle: string
  priceLabel: string
  features: string[]
  popular?: boolean
  Icon: LucideIcon
}

export const pricingTiersBySegment: Record<DeploymentMode, PricingTierDef[]> = {
  individual: [
    {
      id: 'ind-starter',
      name: 'Starter',
      subtitle: 'Essential moderation for creators.',
      priceLabel: '₹999 /mo',
      Icon: Zap,
      features: [
        '1 Admin Seat',
        '3 Accounts Connected',
        '10,000 Scans/mo',
        'Basic Fraud Alerts',
        'Email Support'
      ]
    },
    {
      id: 'ind-pro',
      name: 'Pro',
      subtitle: 'Advanced safety for growing brands.',
      priceLabel: '₹2,999 /mo',
      popular: true,
      Icon: Shield,
      features: [
        '3 Seats',
        '10 Accounts Connected',
        '50,000 Scans/mo',
        'Deepfake Image Scanning',
        'Priority Support'
      ]
    },
    {
      id: 'ind-elite',
      name: 'Elite',
      subtitle: 'Full protection for power users.',
      priceLabel: '₹5,999 /mo',
      Icon: Sparkles,
      features: [
        '10 Seats',
        'Unlimited Accounts',
        '200,000 Scans/mo',
        'Brand Safety Manager',
        '24/7 Support'
      ]
    }
  ],
  enterprise: [
    {
      id: 'ent-startup',
      name: 'Startup',
      subtitle: 'For growing teams and departments.',
      priceLabel: '₹9,999 /mo',
      Icon: User,
      features: [
        '10 Seats',
        '3 Departments',
        '500,000 Scans/mo',
        'RBAC Controls',
        'Department Analytics'
      ]
    },
    {
      id: 'ent-growth',
      name: 'Growth',
      subtitle: 'Scalable safety for enterprises.',
      priceLabel: '₹29,999 /mo',
      popular: true,
      Icon: Database,
      features: [
        '50 Seats',
        'Unlimited Departments',
        '2,000,000 Scans/mo',
        'Video/Voice Deepfake Detection',
        'Full API Access'
      ]
    },
    {
      id: 'ent-elite',
      name: 'Ent. Elite',
      subtitle: 'Customized scale for global firms.',
      priceLabel: '₹79,999 /mo',
      Icon: Shield,
      features: [
        '200+ Seats',
        'Unlimited Units',
        '10,000,000 Scans/mo',
        'Custom AI Training',
        'SOC2 Compliance'
      ]
    }
  ],
  government: [
    {
      id: 'gov-municipal',
      name: 'Municipal',
      subtitle: 'City-level monitoring and safety.',
      priceLabel: '₹99,999 /mo',
      Icon: Globe,
      features: [
        'Smart City Integration',
        'Citizen Intelligence',
        'Regional Monitoring',
        'Public Safety Alerts',
        'Hybrid Cloud'
      ]
    },
    {
      id: 'gov-state',
      name: 'State',
      subtitle: 'State-wide protection and scale.',
      priceLabel: '₹2,99,999 /mo',
      popular: true,
      Icon: Database,
      features: [
        '500 Seats',
        '100M Scans/mo',
        'Gov Response Team',
        'Dedicated Infrastructure',
        'Private VPC'
      ]
    },
    {
      id: 'gov-national',
      name: 'National',
      subtitle: 'National security and defense Grade.',
      priceLabel: '₹9,99,999+ /mo',
      Icon: Lock,
      features: [
        'Classified Infrastructure',
        'Election Security',
        'Air-Gapped Deployment',
        '24/7 War Room Support',
        'Custom Cryptography'
      ]
    }
  ]
}

export const SEGMENT_ORDER: DeploymentMode[] = ['individual', 'enterprise', 'government']

export function defaultTierIdForSegment(segment: DeploymentMode): string {
  const tiers = pricingTiersBySegment[segment]
  const popular = tiers.find((t) => t.popular)
  return popular?.id ?? tiers[0].id
}

export function tierBelongsToSegment(tierId: string, segment: DeploymentMode): boolean {
  return pricingTiersBySegment[segment].some((t) => t.id === tierId)
}

export function findTierById(
  tierId: string
): { segment: DeploymentMode; tier: PricingTierDef } | null {
  for (const seg of SEGMENT_ORDER) {
    const tier = pricingTiersBySegment[seg].find((t) => t.id === tierId)
    if (tier) return { segment: seg, tier }
  }
  return null
}
