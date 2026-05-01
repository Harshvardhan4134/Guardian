import React from 'react'
import { Check } from 'lucide-react'

const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      subtitle: 'Detection Only',
      isHighlighted: false,
      features: ['Basic AI Detection', 'Manual Review', 'Standard Support']
    },
    {
      name: 'Professional',
      subtitle: 'Detection + Intelligence',
      isHighlighted: true,
      features: ['Advanced AI Detection', 'Risk Intelligence', 'Automated Alerts', 'Priority Support']
    },
    {
      name: 'Enterprise',
      subtitle: 'Detection + Intelligence + Automation + Compliance',
      isHighlighted: false,
      isSelected: true,
      features: ['Full AI Suite', 'Automated Enforcement', 'Compliance Tools', 'Dedicated Support', 'Custom Models']
    }
  ]

  const highlights = [
    'Unlock AI Risk Intelligence with Professional',
    'Automate enforcement decisions with Enterprise',
    'Reduce platform violations by up to 70%',
    'Meet compliance and audit requirements effortlessly'
  ]

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-textPrimary mb-2">Pricing Difference – Quick Summary</h2>
        <p className="text-textSecondary">Choose the right level of AI protection for your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-xl p-6 border-2 transition-all ${
              plan.isSelected 
                ? 'bg-footer text-white border-footer' 
                : plan.isHighlighted 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-white'
            }`}
          >
            <div className="text-center mb-6">
              <h3 className={`text-xl font-semibold mb-1 ${plan.isSelected ? 'text-white' : 'text-textPrimary'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.isSelected ? 'text-white/80' : 'text-textSecondary'}`}>
                {plan.subtitle}
              </p>
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <Check className={`w-5 h-5 ${plan.isSelected ? 'text-white' : 'text-primary'}`} />
                  <span className={`text-sm ${plan.isSelected ? 'text-white' : 'text-textPrimary'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {plan.isSelected && (
              <div className="mt-4 text-center">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((highlight, index) => (
          <div key={index} className="text-center p-4 bg-primary/5 rounded-lg">
            <p className="text-primary font-medium text-sm">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PricingSection