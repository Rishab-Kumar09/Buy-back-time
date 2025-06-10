import { google } from 'googleapis'
import type { Activity } from '@/lib/types'

// Initialize Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_API_KEY
})

export async function fetchCalendarEvents(timeMin: Date, timeMax: Date) {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    })

    return response.data.items
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    return []
  }
}

export async function analyzeCalendarPatterns(events: any[]) {
  // Group events by type, duration, participants
  const patterns = events.reduce((acc, event) => {
    const duration = (new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / (1000 * 60)
    const attendees = event.attendees?.length || 0
    
    return {
      ...acc,
      totalMeetings: (acc.totalMeetings || 0) + 1,
      totalDuration: (acc.totalDuration || 0) + duration,
      totalAttendees: (acc.totalAttendees || 0) + attendees,
      meetingsByDuration: {
        ...acc.meetingsByDuration,
        [duration]: (acc.meetingsByDuration?.[duration] || 0) + 1
      }
    }
  }, {})

  return patterns
} 