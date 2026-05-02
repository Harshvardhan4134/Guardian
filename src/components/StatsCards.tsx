import React from 'react'
import { Shield, AlertTriangle, Zap, FileText } from 'lucide-react'

const StatsCards = () => {
  const stats = [
    {
      icon: Shield,
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10',
      badge: '+3 this week',
      badgeColor: 'bg-green-100 text-green-800',
      number: '24',
      title: 'Active AI Policies',
      subtitle: 'Mapped to detection and enforcement models'
    },
    {
      icon: AlertTriangle,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      badge: '-12% from yesterday',
      badgeColor: 'bg-red-100 text-red-800',
      number: '147',
      title: 'High-Risk Violations (24h)',
      subtitle: 'Calculated using AI risk scoring models'
    },
    {
      icon: Zap,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      badge: '+8% this week',
      badgeColor: 'bg-green-100 text-green-800',
      number: '1,284',
      title: 'Automated Enforcement Actions',
      subtitle: 'Executed by AI enforcement workflows'
    },
    {
      icon: FileText,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      badge: 'All timestamped',
      badgeColor: 'bg-blue-100 text-blue-800',
      number: '3,567',
      title: 'Audit Logs Generated',
      subtitle: 'Created automatically by the audit engine'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-cardBg rounded-xl p-6 border border-borderLight shadow-card hover:shadow-card-hover transition-all duration-250">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${stat.badgeColor}`}>
              {stat.badge}
            </span>
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