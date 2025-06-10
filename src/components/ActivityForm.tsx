'use client'

import React, { useState } from 'react'
import type { Activity, ValueImpactLevel, DelegationType } from '@/lib/types'

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id' | 'userId'>) => void
}

type ActivityFormData = {
  title: string;
  description: string;
  duration: number;
  energyLevel: number;
  valueImpact: ValueImpactLevel;
  delegationType: DelegationType;
  estimatedValueCreation: number;
}

export default function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    duration: 30,
    energyLevel: 3,
    valueImpact: '1x_tactical',
    delegationType: 'keep_strategic',
    estimatedValueCreation: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      date: new Date(),
    })
    setFormData({
      title: '',
      description: '',
      duration: 30,
      energyLevel: 3,
      valueImpact: '1x_tactical',
      delegationType: 'keep_strategic',
      estimatedValueCreation: 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Log Strategic Activity</h2>
      <div className="form-group">
        <label htmlFor="title">Activity Title</label>
        <input
          type="text"
          id="title"
          className="input"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="input"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration (minutes)</label>
        <input
          type="number"
          id="duration"
          className="input"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="energyLevel">Energy Level (1-5)</label>
        <input
          type="range"
          id="energyLevel"
          className="input"
          value={formData.energyLevel}
          onChange={(e) => setFormData({ ...formData, energyLevel: Number(e.target.value) })}
          min="1"
          max="5"
          step="1"
        />
        <span>{formData.energyLevel}</span>
      </div>

      <div className="form-group">
        <label htmlFor="valueImpact">Value Impact Level</label>
        <select
          id="valueImpact"
          className="input"
          value={formData.valueImpact}
          onChange={(e) => setFormData({ ...formData, valueImpact: e.target.value as ValueImpactLevel })}
        >
          <option value="10x_strategic">10x Strategic ($100k+ impact)</option>
          <option value="5x_growth">5x Growth ($50k+ impact)</option>
          <option value="2x_operational">2x Operational ($10k+ impact)</option>
          <option value="1x_tactical">1x Tactical ($1k+ impact)</option>
          <option value="delegate_or_eliminate">Should Delegate/Eliminate</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="delegationType">Recommended Action</label>
        <select
          id="delegationType"
          className="input"
          value={formData.delegationType}
          onChange={(e) => setFormData({ ...formData, delegationType: e.target.value as DelegationType })}
        >
          <option value="keep_strategic">Keep (Strategic)</option>
          <option value="delegate_to_ai">Delegate to AI</option>
          <option value="delegate_to_ea">Delegate to EA</option>
          <option value="delegate_to_team">Delegate to Team</option>
          <option value="eliminate">Eliminate</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="value">Estimated Value Creation ($)</label>
        <input
          type="number"
          id="value"
          className="input"
          value={formData.estimatedValueCreation}
          onChange={(e) => setFormData({ ...formData, estimatedValueCreation: Number(e.target.value) })}
          min="0"
          step="1000"
          required
        />
      </div>

      <button type="submit" className="button">Log Strategic Activity</button>
    </form>
  )
} 