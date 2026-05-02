import React from 'react'

interface HeaderProps {
  onExportClick: () => void
  onIntegrationsClick: () => void
  onCreatePolicyClick: () => void
  onPolicyCreated?: (policyData: any) => void
}

const Header = ({ onExportClick, onIntegrationsClick, onCreatePolicyClick }: HeaderProps) => {
  return (
    <header className="bg-primary border-b border-borderLight px-4 py-3 sm:py-4">
      <h1 className="sr-only">Guardian AI — Model-Driven Policy Enforcement Dashboard</h1>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <img
            src="/guardian-logo.png"
            alt="Guardian AI — Where Safety Meets Technology"
            className="h-9 sm:h-11 w-auto max-w-[min(100%,220px)] sm:max-w-[280px] object-contain object-left shrink-0"
          />
          <div className="hidden md:block border-l border-white/25 pl-4 min-w-0">
            <p className="text-sm text-white/80 leading-snug">
              Model-Driven Policy Enforcement Dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={onExportClick}
            className="border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-250"
          >
            Export Data
          </button>
          <button 
            onClick={onIntegrationsClick}
            className="border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-250"
          >
            Integrations
          </button>
          <button 
            onClick={onCreatePolicyClick}
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accentHover transition-all duration-250"
          >
            Create Policy
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header