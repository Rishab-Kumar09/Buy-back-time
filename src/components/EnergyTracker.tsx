'use client'

import React, { useState } from 'react'
import type { EnergyLog } from '@/lib/types'

interface EnergyTrackerProps {
  onLogEnergy: (log: Omit<EnergyLog, 'id' | 'userId'>) => void
}

export default function EnergyTracker({ onLogEnergy }: EnergyTrackerProps) {
  const [notes, setNotes] = useState('')

  const handleEnergyClick = (level: number) => {
    onLogEnergy({
      level,
      timestamp: new Date(),
      notes: notes.trim() || undefined
    })
    setNotes('')
  }

  return (
    <div className="card">
      <h2>Energy Tracker</h2>
      <p>How are your energy levels right now?</p>
      
      <div className="energy-meter" style={{ marginBottom: '1rem' }}>
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            className="button secondary"
            style={{ margin: '0.25rem' }}
            onClick={() => handleEnergyClick(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          className="input"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How are you feeling?"
        />
      </div>
    </div>
  )
} 