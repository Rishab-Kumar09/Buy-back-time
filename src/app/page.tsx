'use client'

import React, { useState } from 'react'
import type { Activity, AIRecommendation } from '@/lib/types'

export default function Home() {
  // This would come from calendar integration in production
  const upcomingMeetings = [
    {
      title: "Board Meeting",
      duration: 60,
      valueImpact: '10x_strategic',
      participants: 8,
      aiSuggestion: "Keep - Critical strategic discussion"
    },
    {
      title: "Team Updates",
      duration: 30,
      valueImpact: 'delegate_or_eliminate',
      participants: 12,
      aiSuggestion: "Delegate to EA - Can be handled via async updates"
    }
  ]

  // This would be AI-generated in production
  const aiRecommendations = [
    {
      type: 'delegation',
      recommendation: "Weekly team sync can be handled by your EA. This will free up 1 hour/week.",
      impact: { timeFreed: 60, valueIncrease: 5000 }
    },
    {
      type: 'scheduling',
      recommendation: "Schedule strategic planning during your high-energy hours (9-11 AM).",
      impact: { timeFreed: 0, valueIncrease: 10000 }
    }
  ]

  return (
    <div className="container">
      <header style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h1>CEO Time & Value Dashboard</h1>
        <p style={{ color: '#666' }}>Optimizing your impact and energy</p>
      </header>

      <div className="grid">
        <div className="card">
          <h2>AI Insights</h2>
          <div style={{ color: '#0070f3', marginBottom: '1rem' }}>
            🎯 Value Creation Opportunity: $15,000 this week
          </div>
          {aiRecommendations.map((rec, i) => (
            <div key={i} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f7f7f7', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold' }}>{rec.type.toUpperCase()}</div>
              <p>{rec.recommendation}</p>
              <div style={{ color: '#666', fontSize: '0.9em' }}>
                Impact: {rec.impact.timeFreed}min saved | ${rec.impact.valueIncrease} value increase
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Today's Calendar</h2>
          <p style={{ marginBottom: '1rem' }}>AI-analyzed meetings:</p>
          {upcomingMeetings.map((meeting, i) => (
            <div key={i} style={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              backgroundColor: meeting.valueImpact === '10x_strategic' ? '#e8f5e9' : '#fff4e5',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold' }}>{meeting.title}</div>
              <div style={{ fontSize: '0.9em' }}>
                {meeting.duration}min | {meeting.participants} participants
              </div>
              <div style={{ 
                marginTop: '0.5rem',
                fontSize: '0.9em',
                color: meeting.valueImpact === '10x_strategic' ? '#2e7d32' : '#ed6c02'
              }}>
                AI Suggestion: {meeting.aiSuggestion}
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Value Creation Stats</h2>
          <div style={{ marginBottom: '1rem' }}>
            <h3>This Week</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '2em', color: '#0070f3' }}>12.5h</div>
                <div style={{ color: '#666' }}>Strategic Time</div>
              </div>
              <div>
                <div style={{ fontSize: '2em', color: '#2e7d32' }}>$125K</div>
                <div style={{ color: '#666' }}>Value Created</div>
              </div>
            </div>
          </div>
          <div>
            <h3>Delegation Success</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '2em', color: '#0070f3' }}>8.5h</div>
                <div style={{ color: '#666' }}>Time Freed</div>
              </div>
              <div>
                <div style={{ fontSize: '2em', color: '#2e7d32' }}>85%</div>
                <div style={{ color: '#666' }}>Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button className="button" style={{ marginRight: '1rem' }}>
          🎙️ Voice Check-in
        </button>
        <button className="button secondary">
          📊 Weekly Report
        </button>
      </div>
    </div>
  )
} 