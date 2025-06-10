import { google } from 'googleapis'
import { VALUE_IMPACT_LEVELS, DELEGATION_TYPES } from '@/lib/constants'

// Initialize Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY
})

export async function fetchCalendarEvents(startDate, endDate) {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startDate,
      timeMax: endDate,
      singleEvents: true,
      orderBy: 'startTime',
    })

    // Convert Google Calendar events to our Activity format
    return (response.data.items || []).map(event => {
      const startDateTime = event.start?.dateTime || event.start?.date || new Date().toISOString()
      const endDateTime = event.end?.dateTime || event.end?.date || new Date().toISOString()

      return {
        id: event.id || '',
        userId: 'default-user', // This should be replaced with actual user ID
        title: event.summary || 'Untitled Event',
        description: event.description || '',
        date: new Date(startDateTime),
        duration: calculateDuration(startDateTime, endDateTime),
        energyLevel: 3, // Default middle value
        valueImpact: VALUE_IMPACT_LEVELS.TACTICAL_1X,
        delegationType: DELEGATION_TYPES.KEEP_STRATEGIC,
        estimatedValueCreation: 0,
        calendarEventId: event.id || '',
        meetingParticipants: event.attendees?.map(a => a.email || '').filter(Boolean) || []
      }
    })
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}

export async function analyzeCalendarPatterns(events) {
  const patterns = {
    totalMeetings: events.length,
    totalDuration: events.reduce((sum, event) => sum + event.duration, 0),
    byValueImpact: events.reduce((acc, event) => {
      acc[event.valueImpact] = (acc[event.valueImpact] || 0) + 1
      return acc
    }, {}),
    byDelegationType: events.reduce((acc, event) => {
      acc[event.delegationType] = (acc[event.delegationType] || 0) + 1
      return acc
    }, {}),
    averageValueCreation: events.reduce((sum, event) => sum + event.estimatedValueCreation, 0) / events.length,
    totalParticipants: events.reduce((sum, event) => sum + (event.meetingParticipants?.length || 0), 0)
  }

  return patterns
}

function calculateDuration(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60)) // Duration in minutes
} 