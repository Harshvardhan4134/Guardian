import React, { useEffect, useState } from 'react'
import { X, Save } from 'lucide-react'
import type { Policy } from './PolicyTable'

interface ManagePolicyModalProps {
  policy: Policy
  onClose: () => void
  onSave: (policy: Policy) => void
}

const ManagePolicyModal = ({ policy, onClose, onSave }: ManagePolicyModalProps) => {
  const [draft, setDraft] = useState<Policy>(policy)

  useEffect(() => {
    setDraft(policy)
  }, [policy])

  const handleSave = () => {
    if (!draft.name.trim()) {
      window.alert('Policy name is required.')
      return
    }
    const models = draft.models.map((m) => m.trim()).filter(Boolean)
    const actions = draft.actions.map((a) => a.trim()).filter(Boolean)
    if (models.length === 0 || actions.length === 0) {
      window.alert('Add at least one model and one enforcement action.')
      return
    }
    onSave({
      ...draft,
      name: draft.name.trim(),
      description: draft.description.trim(),
      models,
      actions,
      riskScore: Math.min(100, Math.max(0, draft.riskScore)),
      lastDecision: 'Just now'
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-card-hover border border-borderLight">
        <div className="p-6 border-b border-borderLight flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-textPrimary">Manage policy</h2>
            <p className="text-sm text-textSecondary mt-1">Update settings for this enforcement rule</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-sectionBg rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-textSecondary" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Status</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, status: 'Active' }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                  draft.status === 'Active'
                    ? 'bg-primary text-white border-primary'
                    : 'border-borderLight text-textSecondary hover:bg-sectionBg'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setDraft((d) => ({ ...d, status: 'Paused' }))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                  draft.status === 'Paused'
                    ? 'bg-primary text-white border-primary'
                    : 'border-borderLight text-textSecondary hover:bg-sectionBg'
                }`}
              >
                Paused
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Policy name</label>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Description</label>
            <textarea
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              rows={3}
              className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Risk score (0–100): {draft.riskScore}
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={draft.riskScore}
              onChange={(e) => setDraft((d) => ({ ...d, riskScore: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">Automation</label>
            <select
              value={draft.automation}
              onChange={(e) => setDraft((d) => ({ ...d, automation: e.target.value }))}
              className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            >
              <option value="Semi-Automated">Semi-Automated</option>
              <option value="Fully Automated">Fully Automated</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              AI models (comma-separated)
            </label>
            <input
              type="text"
              value={draft.models.join(', ')}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  models: e.target.value.split(',').map((m) => m.trim()).filter(Boolean)
                }))
              }
              className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="NLP, Multimodal Vision"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Enforcement actions (comma-separated)
            </label>
            <input
              type="text"
              value={draft.actions.join(', ')}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  actions: e.target.value.split(',').map((a) => a.trim()).filter(Boolean)
                }))
              }
              className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              placeholder="Flag Content, Notify User"
            />
          </div>
        </div>

        <div className="p-6 border-t border-borderLight flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-borderLight rounded-lg text-textSecondary hover:bg-sectionBg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primaryHover"
          >
            <Save className="w-4 h-4" />
            Save changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManagePolicyModal
