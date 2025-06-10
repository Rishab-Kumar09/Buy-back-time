'use client'

import React, { useState } from 'react'
import ActivityForm from '@/components/ActivityForm'
import EnergyTracker from '@/components/EnergyTracker'
import ROICalculator from '@/components/ROICalculator'
import type { Activity, EnergyLog } from '@/lib/types'

export default function Home() {
  const [activities, setActivities] = useState<Partial<Activity>[]>([])
  const [energyLogs, setEnergyLogs] = useState<Partial<EnergyLog>[]>([])

  const handleActivitySubmit = (activity: Omit<Activity, 'id' | 'userId'>) => {
    setActivities([...activities, activity])
    // For MVP, we'll just store in state. Later we'll add Supabase integration
    console.log('Activity logged:', activity)
  }

  const handleEnergyLog = (log: Omit<EnergyLog, 'id' | 'userId'>) => {
    setEnergyLogs([...energyLogs, log])
    // For MVP, we'll just store in state. Later we'll add Supabase integration
    console.log('Energy logged:', log)
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Buy Back Your Time</h1>
      
      <div className="grid">
        <ActivityForm onSubmit={handleActivitySubmit} />
        <div>
          <EnergyTracker onLogEnergy={handleEnergyLog} />
          <div style={{ marginTop: '1rem' }}>
            <ROICalculator />
          </div>
        </div>
      </div>

      {activities.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Recent Activities</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {activities.map((activity, index) => (
              <li key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #eee', borderRadius: '4px' }}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9em', color: '#666' }}>
                  <span>Duration: {activity.duration}min</span>
                  <span>Energy: {activity.energyLevel}/5</span>
                  <span>Type: {activity.delegationType}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {energyLogs.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Energy History</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {energyLogs.map((log, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                Level {log.level}/5 - {log.timestamp?.toLocaleTimeString()}
                {log.notes && <p style={{ fontSize: '0.9em', color: '#666' }}>{log.notes}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 