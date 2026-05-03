import React from 'react'

const GlobalBanner = () => {
  return (
    <>
      <div className="border-b border-white/10 bg-primary px-4 py-4 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 space-y-1">
            <div className="text-lg font-bold tracking-tight">Model-Aligned Enforcement Active</div>
            <div className="text-sm text-white/85">
              This dashboard reflects Guardian AI&apos;s internally developed detection, risk scoring, and enforcement
              models. All actions are{' '}
              <span className="font-semibold text-accent">AI-driven</span>, explainable, and audit-ready.
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border-2 border-white/35 px-4 py-2 text-sm font-medium text-white transition-all duration-300 ease-out hover:border-white hover:bg-white hover:text-primary"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="bg-primary px-4 py-3 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-base font-semibold tracking-tight sm:text-lg">Model-Driven Policy Enforcement Dashboard</div>
          <div className="rounded-full bg-white/15 px-3 py-1.5 text-sm text-white/95 ring-1 ring-white/10">
            <span className="font-medium text-accent">AI-driven</span>, explainable, and audit-ready
          </div>
        </div>
      </div>
    </>
  )
}

export default GlobalBanner
