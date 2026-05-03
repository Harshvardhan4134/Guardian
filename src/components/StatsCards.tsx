import React, { useMemo } from 'react'
import { Shield, AlertTriangle, Zap, FileText } from 'lucide-react'
import type { Policy } from './PolicyTable'
import type { DeploymentMode } from '../types/deploymentMode'

interface StatsCardsProps {
  deploymentMode: DeploymentMode
  policies: Policy[]
}

const StatsCards = ({ deploymentMode, policies }: StatsCardsProps) => {
  const stats = useMemo(() => {
    const active = policies.filter((p) => p.status === 'Active').length
    const paused = policies.filter((p) => p.status === 'Paused').length
    const highRisk = policies.filter((p) => p.riskScore >= 85).length
    const avgRisk =
      policies.length > 0
        ? Math.round(policies.reduce((sum, p) => sum + p.riskScore, 0) / policies.length)
        : 0
    const automated = policies.filter((p) => p.automation === 'Fully Automated').length
    const enforcementApprox = policies.reduce((sum, p) => sum + p.actions.length * 42 + p.riskScore * 3, 0)

    if (deploymentMode === 'individual') {
      return [
        {
          icon: Shield,
          iconColor: 'text-primary',
          iconBg: 'bg-primary/10',
          badge: `${paused} paused`,
          badgeColor: 'bg-blue-100 text-blue-800',
          number: String(active),
          title: 'Active personal policies',
          subtitle: 'Protecting accounts & devices you connected in Integrations'
        },
        {
          icon: AlertTriangle,
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
          badge: `${highRisk} elevated`,
          badgeColor: 'bg-amber-100 text-amber-800',
          number: String(Math.max(highRisk * 12 + 8, policies.length * 9)),
          title: 'Personal risk signals (24h)',
          subtitle: 'Alerts tied to your devices and linked platforms'
        },
        {
          icon: Zap,
          iconColor: 'text-purple-600',
          iconBg: 'bg-purple-100',
          badge: `${automated} auto`,
          badgeColor: 'bg-green-100 text-green-800',
          number: String(Math.max(Math.round(enforcementApprox / 120), policies.length * 18)),
          title: 'Automated safeguards',
          subtitle: 'Quiet blocks, warnings, and age-gates on your behalf'
        },
        {
          icon: FileText,
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-100',
          badge: `Avg risk ${avgRisk}`,
          badgeColor: 'bg-blue-100 text-blue-800',
          number: String(890 + policies.length * 112),
          title: 'Personal activity log entries',
          subtitle: 'Timestamped decisions for your review and export'
        }
      ]
    }

    if (deploymentMode === 'enterprise') {
      return [
        {
          icon: Shield,
          iconColor: 'text-primary',
          iconBg: 'bg-primary/10',
          badge: `${active} live`,
          badgeColor: 'bg-green-100 text-green-800',
          number: String(active),
          title: 'Active workspace policies',
          subtitle: 'Mapped to APIs, CMS, and internal tools from Integrations'
        },
        {
          icon: AlertTriangle,
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
          badge: highRisk >= 3 ? 'Review queue' : 'Stable',
          badgeColor: highRisk >= 3 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800',
          number: String(210 + highRisk * 34 + policies.length * 11),
          title: 'Moderation queue items (24h)',
          subtitle: 'Brand safety and workforce communications combined'
        },
        {
          icon: Zap,
          iconColor: 'text-purple-600',
          iconBg: 'bg-purple-100',
          badge: `+${automated} workflows`,
          badgeColor: 'bg-green-100 text-green-800',
          number: String(4200 + Math.round(enforcementApprox / 45)),
          title: 'Enterprise enforcement runs',
          subtitle: 'Removals, shadow bans, and visibility changes executed by AI'
        },
        {
          icon: FileText,
          iconColor: 'text-indigo-600',
          iconBg: 'bg-indigo-100',
          badge: 'SOC2-ready trail',
          badgeColor: 'bg-blue-100 text-blue-800',
          number: String(12000 + policies.length * 480),
          title: 'Audit events captured',
          subtitle: 'Immutable log stream for compliance and internal review'
        }
      ]
    }

    return [
      {
        icon: Shield,
        iconColor: 'text-primary',
        iconBg: 'bg-primary/10',
        badge: `${active} mission-critical`,
        badgeColor: 'bg-red-100 text-red-800',
        number: String(active),
        title: 'Active national policies',
        subtitle: 'Aligned to secure feeds and agency systems in Integrations'
      },
      {
        icon: AlertTriangle,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-100',
        badge: `${highRisk} priority`,
        badgeColor: 'bg-red-100 text-red-900',
        number: String(64 + highRisk * 9 + policies.length * 4),
        title: 'Escalated threat assessments',
        subtitle: 'Cross-platform correlation and handoff-ready packages'
      },
      {
        icon: Zap,
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
        badge: 'Real-time',
        badgeColor: 'bg-orange-100 text-orange-900',
        number: String(1800 + Math.round(enforcementApprox / 60)),
        title: 'Immediate enforcement actions',
        subtitle: 'Executed under government action presets and watchlists'
      },
      {
        icon: FileText,
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-100',
        badge: 'Classified handling',
        badgeColor: 'bg-slate-200 text-slate-800',
        number: String(28000 + policies.length * 620),
        title: 'Chain-of-custody log lines',
        subtitle: 'Signed, timestamped records for oversight and export'
      }
    ]
  }, [deploymentMode, policies])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-xl border border-borderLight bg-cardBg p-6 shadow-card transition-shadow duration-300 ease-out hover:shadow-card-hover"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.badgeColor}`}>{stat.badge}</span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-bold text-textPrimary">{stat.number}</div>
            <div className="text-lg font-semibold text-textPrimary">{stat.title}</div>
            <div className="text-sm text-textSecondary">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
