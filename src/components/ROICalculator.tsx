'use client'

import React, { useState, useEffect } from 'react'

export default function ROICalculator() {
  const [hourlyRate, setHourlyRate] = useState(0)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeklyValue, setWeeklyValue] = useState(0)
  const [yearlyValue, setYearlyValue] = useState(0)

  useEffect(() => {
    const weekly = hourlyRate * hoursPerWeek
    setWeeklyValue(weekly)
    setYearlyValue(weekly * 52)
  }, [hourlyRate, hoursPerWeek])

  return (
    <div className="card">
      <h2>ROI Calculator</h2>
      <p>Calculate the value of your time</p>

      <div className="form-group">
        <label htmlFor="hourlyRate">Your Hourly Rate ($)</label>
        <input
          type="number"
          id="hourlyRate"
          className="input"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label htmlFor="hoursPerWeek">Hours Per Week</label>
        <input
          type="number"
          id="hoursPerWeek"
          className="input"
          value={hoursPerWeek}
          onChange={(e) => setHoursPerWeek(Number(e.target.value))}
          min="1"
          max="168"
        />
      </div>

      <div className="results" style={{ marginTop: '1rem' }}>
        <p>Weekly Value: ${weeklyValue.toFixed(2)}</p>
        <p>Yearly Value: ${yearlyValue.toFixed(2)}</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9em', color: '#666' }}>
          Every hour you save is worth ${hourlyRate.toFixed(2)}!
        </p>
      </div>
    </div>
  )
} 