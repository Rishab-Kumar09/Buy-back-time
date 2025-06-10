'use client'

import React, { useState, useEffect } from 'react'
import { VALUE_IMPACT_LEVELS, DELEGATION_TYPES } from '@/lib/constants'

export default function Home() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30) // Last 30 days
      
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
        }),
      })
      
      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            CEO Time & Value Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Optimize your impact and energy with AI-powered insights
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Insights Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Insights</h2>
            {loading ? (
              <p>Loading insights...</p>
            ) : (
              <ul className="space-y-4">
                {insights.map((insight, index) => (
                  <li key={index} className="border-b pb-4">
                    <span className="font-medium">{insight.type}</span>
                    <p className="text-gray-600 mt-1">{insight.recommendation}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Expected Impact: {insight.expectedImpact}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Today's Calendar Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Today's Calendar</h2>
            <div className="space-y-4">
              {/* Calendar events will be populated here */}
            </div>
          </div>

          {/* Value Creation Stats Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Value Creation</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Strategic Time</p>
                <p className="text-2xl font-bold">65%</p>
              </div>
              <div>
                <p className="text-gray-600">Value Created</p>
                <p className="text-2xl font-bold">$250,000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => {/* Voice check-in logic */}}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Voice Check-in
          </button>
          <button
            onClick={fetchInsights}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Refresh Insights
          </button>
        </div>
      </div>
    </main>
  )
} 