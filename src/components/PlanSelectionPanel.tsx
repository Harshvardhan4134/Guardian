import React from 'react'
import { ArrowRight, Check } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'
import { deploymentModeLabel } from '../data/integrationModeData'
import {
  SEGMENT_ORDER,
  pricingTiersBySegment,
  tierBelongsToSegment
} from '../data/pricingPlans'

interface PlanSelectionPanelProps {
  segment: DeploymentMode
  onSegmentChange: (segment: DeploymentMode) => void
  /** Highlight when this tier is the active subscription (same segment only). */
  activeTierId: string | null
  onConfirmTier: (segment: DeploymentMode, tierId: string) => void
}

const PlanSelectionPanel = ({
  segment,
  onSegmentChange,
  activeTierId,
  onConfirmTier
}: PlanSelectionPanelProps) => {
  const tiers = pricingTiersBySegment[segment]

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div
          className="inline-flex rounded-full border border-borderLight bg-sectionBg p-1 shadow-card"
          role="tablist"
          aria-label="Plan category"
        >
          {SEGMENT_ORDER.map((mode) => {
            const selected = segment === mode
            return (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onSegmentChange(mode)}
                className={`rounded-full px-4 sm:px-6 py-2.5 text-sm font-semibold transition-all duration-250 ${
                  selected ? 'bg-primary text-white shadow-card' : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                {deploymentModeLabel(mode)}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {tiers.map((tier) => {
          const isPopular = Boolean(tier.popular)
          const isCurrent =
            activeTierId != null && tierBelongsToSegment(activeTierId, segment) && activeTierId === tier.id
          const Icon = tier.Icon

          return (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl border bg-background p-6 shadow-card transition-all duration-250 ${
                isPopular ? 'border-accent ring-2 ring-accent/30 lg:scale-[1.02] z-[1]' : 'border-borderLight'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-card">
                  Most popular
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-textPrimary">{tier.name}</h3>
                  <p className="text-sm text-textSecondary mt-1">{tier.subtitle}</p>
                </div>
                <span className="rounded-lg bg-accent/10 p-2 text-accent shrink-0">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-textPrimary tracking-tight mb-6">
                {tier.priceLabel}
              </p>

              <ul className="space-y-3 flex-1 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-textPrimary">
                    <Check className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent && (
                <p className="text-center text-xs font-medium text-accent mb-3">Current plan</p>
              )}

              <button
                type="button"
                onClick={() => onConfirmTier(segment, tier.id)}
                className={`mt-auto w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-250 ${
                  isPopular
                    ? 'bg-primary text-white hover:bg-primaryHover'
                    : 'border border-border bg-background text-textPrimary hover:bg-sectionBg'
                }`}
              >
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-sm text-textSecondary">
        Need a custom deployment?{' '}
        <a href="mailto:sales@example.com" className="font-semibold text-accent hover:underline">
          Contact our sales team
        </a>{' '}
        for tailored solutions.
      </p>
    </div>
  )
}

export default PlanSelectionPanel
