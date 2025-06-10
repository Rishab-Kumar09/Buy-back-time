import { NextResponse } from 'next/server'
import { generateActivityInsights } from '@/lib/services/ai'
import { fetchCalendarEvents, analyzeCalendarPatterns } from '@/lib/services/calendar'

export async function POST(request: Request) {
  try {
    // Get date range from request
    const { startDate, endDate } = await request.json()

    // Fetch calendar events
    const events = await fetchCalendarEvents(startDate, endDate)
    const patterns = await analyzeCalendarPatterns(events)

    // Generate AI insights
    const insights = await generateActivityInsights(events, patterns)

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Error generating insights:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
} 