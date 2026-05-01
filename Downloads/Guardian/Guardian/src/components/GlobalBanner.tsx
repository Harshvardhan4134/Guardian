import React from 'react'

const GlobalBanner = () => {
  return (
    <>
      {/* Main Banner */}
      <div className="bg-gradient-to-r from-primary to-teal-400 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">Model-Aligned Enforcement Active</div>
            <div className="text-sm opacity-90">
              This dashboard reflects Guardian AI's internally developed detection, risk scoring, and enforcement models. All actions are AI-driven, explainable, and audit-ready.
            </div>
          </div>
          <button className="border-2 border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Secondary Bar */}
      <div className="bg-primary text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg font-semibold">Model-Driven Policy Enforcement Dashboard</div>
          <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
            All actions are AI-driven, explainable, and audit-ready
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalBanner