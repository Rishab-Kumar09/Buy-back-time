'use client'

import React, { useState } from 'react'
import type { Activity } from '@/lib/types'

interface ActivityFormProps {
  onSubmit: (activity: Omit<Activity, 'id' | 'userId'>) => void
}

export default function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    energyLevel: 3,
    category: 'high_value',
    delegationType: 'self',
    estimatedHourlyRate: 0,
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
      category: 'high_value',
      delegationType: 'self',
      estimatedHourlyRate: 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Log Activity</h2>
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
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="input"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Activity['category'] })}
        >
          <option value="high_value">High Value</option>
          <option value="low_value">Low Value</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="delegationType">Delegation Type</label>
        <select
          id="delegationType"
          className="input"
          value={formData.delegationType}
          onChange={(e) => setFormData({ ...formData, delegationType: e.target.value as Activity['delegationType'] })}
        >
          <option value="self">Self</option>
          <option value="ai">AI</option>
          <option value="ea">EA</option>
          <option value="eliminate">Eliminate</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="rate">Hourly Rate ($)</label>
        <input
          type="number"
          id="rate"
          className="input"
          value={formData.estimatedHourlyRate}
          onChange={(e) => setFormData({ ...formData, estimatedHourlyRate: Number(e.target.value) })}
          min="0"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="button">Save Activity</button>
    </form>
  )
} 