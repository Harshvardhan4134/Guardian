import React, { useEffect, useMemo, useState } from 'react'
import { X, Download, Calendar, Filter, CheckCircle, Loader2, FileText, Database, Activity, Shield, Eye } from 'lucide-react'
import type { DeploymentMode } from '../types/deploymentMode'
import { deploymentModeLabel } from '../data/integrationModeData'

interface ExportModalProps {
  onClose: () => void
  deploymentMode: DeploymentMode
}

const ExportModal = ({ onClose, deploymentMode }: ExportModalProps) => {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(['Policy Data'])
  const [exportFormat, setExportFormat] = useState('CSV')
  const [dateRange, setDateRange] = useState('last-30-days')
  const [customDateStart, setCustomDateStart] = useState('')
  const [customDateEnd, setCustomDateEnd] = useState('')
  const [modeFilter, setModeFilter] = useState(deploymentMode)
  const [riskLevelFilter, setRiskLevelFilter] = useState('all')
  const [isExporting, setIsExporting] = useState(false)
  const [exportSuccess, setExportSuccess] = useState(false)
  const [exportError, setExportError] = useState('')

  useEffect(() => {
    setModeFilter(deploymentMode)
  }, [deploymentMode])

  const dataTypes = [
    {
      id: 'policy-data',
      name: 'Policy Data',
      description: 'Includes policies, models used, risk thresholds, automation status',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'overview-metrics',
      name: 'Overview Metrics',
      description: 'Dashboard stats, violations, and performance trends',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'audit-logs',
      name: 'Audit Logs',
      description: 'Full logs with timestamps, actions, and model decisions',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'enforcement-actions',
      name: 'Enforcement Actions',
      description: 'All actions executed by AI enforcement systems',
      icon: Shield,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'multimodal-analysis',
      name: 'Multimodal Analysis Data',
      description: 'Input type (text/image/audio/video), detection tags, confidence scores',
      icon: Eye,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      isNew: true
    },
    ...(deploymentMode === 'government'
      ? [
          {
            id: 'compliance-pack',
            name: 'Compliance & chain-of-custody pack',
            description: 'Agency-ready bundle: signatures, retention tags, and handoff metadata',
            icon: Shield,
            color: 'text-red-700',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            isNew: false
          }
        ]
      : deploymentMode === 'enterprise'
        ? [
            {
              id: 'brand-audit',
              name: 'Brand & workforce audit bundle',
              description: 'Exports moderation queue, internal comms flags, and API partner decisions',
              icon: Activity,
              color: 'text-green-700',
              bgColor: 'bg-green-50',
              borderColor: 'border-green-200',
              isNew: false
            }
          ]
        : [
            {
              id: 'personal-summary',
              name: 'Personal safety summary',
              description: 'Human-readable recap of alerts, device scans, and blocked content',
              icon: FileText,
              color: 'text-blue-700',
              bgColor: 'bg-blue-50',
              borderColor: 'border-blue-200',
              isNew: false
            }
          ])
  ]

  const toggleDataType = (dataType: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType) 
        ? prev.filter(type => type !== dataType)
        : [...prev, dataType]
    )
  }

  const generatedRecords = useMemo(
    () =>
      selectedDataTypes.reduce((total, _, index) => {
        return total + 250 + index * 75
      }, 0),
    [selectedDataTypes]
  )

  const handleExport = async () => {
    if (selectedDataTypes.length === 0) {
      setExportError('Please select at least one data type to export.')
      return
    }

    if (dateRange === 'custom') {
      if (!customDateStart || !customDateEnd) {
        setExportError('Please select both start and end dates for custom range.')
        return
      }
      if (new Date(customDateStart) > new Date(customDateEnd)) {
        setExportError('Start date cannot be after end date.')
        return
      }
    }

    setExportError('')
    setIsExporting(true)
    setExportSuccess(false)

    try {
      await new Promise(resolve => setTimeout(resolve, 1200))
      
      const exportData = {
        deploymentMode,
        dataTypes: selectedDataTypes,
        format: exportFormat,
        dateRange: dateRange === 'custom' ? { start: customDateStart, end: customDateEnd } : dateRange,
        modeFilter,
        riskLevelFilter,
        timestamp: new Date().toISOString(),
        totalRecords: generatedRecords
      }

      const filename = `guardian-ai-${deploymentMode}-export-${Date.now()}.${exportFormat.toLowerCase()}`
      const content =
        exportFormat === 'JSON'
          ? JSON.stringify(exportData, null, 2)
          : exportFormat === 'CSV'
            ? `Data Type,Records,Mode Filter,Risk Filter,Export Time\n${selectedDataTypes.map((type, idx) => `${type},${250 + idx * 75},${modeFilter},${riskLevelFilter},${new Date().toLocaleString()}`).join('\n')}`
            : [
                'Guardian AI Export Report',
                '',
                `Data Types: ${selectedDataTypes.join(', ')}`,
                `Date Range: ${dateRange === 'custom' ? `${customDateStart} to ${customDateEnd}` : dateRange}`,
                `Mode Filter: ${modeFilter}`,
                `Risk Level: ${riskLevelFilter}`,
                `Total Records: ${generatedRecords}`,
                `Exported: ${new Date().toLocaleString()}`
              ].join('\n')

      const mimeType =
        exportFormat === 'JSON'
          ? 'application/json'
          : exportFormat === 'CSV'
            ? 'text/csv'
            : 'application/pdf'

      const blob = new Blob([content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setExportSuccess(true)
      setTimeout(() => {
        setIsExporting(false)
        setExportSuccess(false)
        onClose()
      }, 1200)

    } catch (error) {
      setIsExporting(false)
      setExportError(error instanceof Error ? error.message : 'Export failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-card-hover">
        <div className="p-6 border-b border-borderLight">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary">Export Data</h2>
              <p className="text-textSecondary">
                {deploymentModeLabel(deploymentMode)} workspace — bundles and filters default to this deployment mode (same as Integrations).
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-sectionBg rounded-lg transition-all duration-250"
            >
              <X className="w-5 h-5 text-textSecondary" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Data Types Selection */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Select Data Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((dataType) => {
                const isSelected = selectedDataTypes.includes(dataType.name)
                return (
                  <div 
                    key={dataType.id} 
                    className={`relative border rounded-xl p-4 cursor-pointer transition-all duration-250 hover:shadow-card ${
                      isSelected 
                        ? `border-primary bg-primary/5 shadow-card` 
                        : 'border-borderLight bg-cardBg hover:border-primary/30'
                    }`}
                    onClick={() => toggleDataType(dataType.name)}
                  >
                    {dataType.isNew && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                        NEW
                      </div>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-primary/10' : 'bg-sectionBg'
                      }`}>
                        <dataType.icon className={`w-5 h-5 ${
                          isSelected ? 'text-primary' : 'text-textSecondary'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-textPrimary">{dataType.name}</h4>
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-textSecondary mt-1">{dataType.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Export Format</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'CSV', label: 'CSV', description: 'Spreadsheet format (default)' },
                { value: 'JSON', label: 'JSON', description: 'Structured data format' },
                { value: 'PDF', label: 'PDF', description: 'Formatted reports' }
              ].map((format) => (
                <label 
                  key={format.value} 
                  className={`flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all duration-250 hover:shadow-card ${
                    exportFormat === format.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-borderLight bg-cardBg hover:border-primary/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportFormat === format.value}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-textPrimary">{format.label}</div>
                    <div className="text-xs text-textSecondary mt-1">{format.description}</div>
                  </div>
                  {exportFormat === format.value && (
                    <CheckCircle className="w-4 h-4 text-primary mt-2" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <div>
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Advanced Options</h3>
            <div className="space-y-4">
              {/* Date Range Selector */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date Range Selector
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="last-7-days">Last 7 days</option>
                    <option value="last-30-days">Last 30 days</option>
                    <option value="last-90-days">Last 90 days</option>
                    <option value="last-year">Last year</option>
                    <option value="custom">Custom range</option>
                  </select>
                  {dateRange === 'custom' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={customDateStart}
                        onChange={(e) => setCustomDateStart(e.target.value)}
                        className="border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        placeholder="Start date"
                      />
                      <input
                        type="date"
                        value={customDateEnd}
                        onChange={(e) => setCustomDateEnd(e.target.value)}
                        className="border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                        placeholder="End date"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Mode Filter */}
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-2">
                    <Filter className="w-4 h-4 inline mr-1" />
                    Mode Filter
                  </label>
                  <select 
                    value={modeFilter}
                    onChange={(e) => setModeFilter(e.target.value)}
                    className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="all">All Modes</option>
                    <option value="individual">Individual</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="government">Government</option>
                  </select>
                </div>

                {/* Risk Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-2">Risk Level Filter</label>
                  <select 
                    value={riskLevelFilter}
                    onChange={(e) => setRiskLevelFilter(e.target.value)}
                    className="w-full border border-borderLight rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="all">All Levels</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* System Integration Info */}
          <div className="bg-sectionBg rounded-xl p-4 border border-borderLight">
            <h4 className="font-semibold text-textPrimary mb-3">System Integration</h4>
            <p className="text-sm text-textSecondary mb-3">
              {deploymentMode === 'individual' &&
                'Exports include personal device feeds, linked social platforms, and Individual webhooks from Integrations.'}
              {deploymentMode === 'enterprise' &&
                'Exports include CMS/API connectors, workforce tools, Enterprise webhooks, and moderation queues.'}
              {deploymentMode === 'government' &&
                'Exports include secure feeds, agency handoff fields, Government webhooks, and chain-of-custody metadata.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-primary" />
                <span className="text-sm text-textBody">Multimodal Analysis Layer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-textBody">Policy Enforcement Center</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-sm text-textBody">Auto-Enforcement Engine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-borderLight">
          <div className="flex items-center justify-between">
            <div className="text-sm text-textSecondary">
              Selected: {selectedDataTypes.length} data type{selectedDataTypes.length !== 1 ? 's' : ''}
              {selectedDataTypes.length > 0 && (
                <span className="ml-2 text-primary">
                  ({selectedDataTypes.join(', ')})
                </span>
              )}
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={onClose}
                disabled={isExporting}
                className="px-4 py-2 border border-borderLight rounded-lg hover:bg-sectionBg transition-all duration-250 disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleExport}
                disabled={isExporting || selectedDataTypes.length === 0}
                className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primaryHover transition-all duration-250 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] justify-center"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : exportSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Export Data</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {isExporting && (
            <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm text-primary">
                  Processing export... This may take a few moments.
                </span>
              </div>
            </div>
          )}
          
          {exportSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-800">
                  Export completed successfully! Your download should start automatically.
                </span>
              </div>
            </div>
          )}

          {exportError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-sm text-red-700">{exportError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExportModal