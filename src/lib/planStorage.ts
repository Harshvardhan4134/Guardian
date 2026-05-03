import type { DeploymentMode } from '../types/deploymentMode'

const STORAGE_KEY = 'guardian.plan.v1'

export interface PersistedPlan {
  segment: DeploymentMode
  tierId: string
  onboarded: boolean
}

export function loadPersistedPlan(): PersistedPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedPlan
    if (!parsed.segment || !parsed.tierId || typeof parsed.onboarded !== 'boolean') return null
    return parsed
  } catch {
    return null
  }
}

export function savePersistedPlan(plan: PersistedPlan): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
}
