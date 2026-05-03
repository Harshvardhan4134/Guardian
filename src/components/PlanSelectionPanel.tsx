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
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ease-out sm:px-6 ${
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
              className={`relative z-[1] flex flex-col rounded-2xl border border-borderLight bg-cardBg p-6 shadow-card transition-shadow duration-300 ease-out hover:shadow-card-hover ${
                isPopular ? 'ring-1 ring-primary/20 lg:ring-2' : ''
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-card">
                  Most popular
                </div>
              )}

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-textPrimary">{tier.name}</h3>
                  <p className="mt-1 text-sm text-textSecondary">{tier.subtitle}</p>
                </div>
                <span className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
              </div>

              <p className="mb-6 text-2xl font-bold tracking-tight text-textPrimary sm:text-3xl">
                {tier.priceLabel}
              </p>

              <ul className="mb-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-textBody">
                    <Check className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent && (
                <p className="mb-3 text-center text-xs font-semibold text-primary">Current plan</p>
              )}

              <button
                type="button"
                onClick={() => onConfirmTier(segment, tier.id)}
                className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-out ${
                  isPopular
                    ? 'bg-primary text-white hover:bg-primaryHover'
                    : 'border border-borderLight bg-white text-textPrimary hover:bg-sectionBg'
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
