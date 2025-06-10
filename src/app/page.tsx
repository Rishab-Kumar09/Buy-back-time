'use client'

import React from 'react'

export default function Home() {
  return (
    <div className="grid">
      <div className="card">
        <h2>Time Tracking</h2>
        <p>Track your daily activities and energy levels</p>
        <button className="button">Log Activity</button>
      </div>

      <div className="card">
        <h2>Energy Levels</h2>
        <p>Monitor your energy throughout the day</p>
        <div className="energy-meter">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              className="button secondary"
              style={{ margin: '0.25rem' }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>ROI Calculator</h2>
        <p>Calculate the value of your time</p>
        <div className="form-group">
          <label>Hourly Rate ($)</label>
          <input type="number" className="input" placeholder="Enter your rate" />
        </div>
      </div>
    </div>
  )
} 