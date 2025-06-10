import OpenAI from 'openai'
import { VALUE_IMPACT_LEVELS, DELEGATION_TYPES } from '@/lib/constants'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateActivityInsights(activities, calendarPatterns) {
  try {
    const prompt = `
      Analyze these activities and calendar patterns for a business leader:
      
      Activities: ${JSON.stringify(activities, null, 2)}
      Calendar Patterns: ${JSON.stringify(calendarPatterns, null, 2)}
      
      Generate strategic recommendations focusing on:
      1. Which activities could be delegated or eliminated
      2. How to optimize high-value activities
      3. Energy level patterns and optimal scheduling
      4. Potential value creation opportunities
      
      Format recommendations as structured data with type, recommendation, and expected impact.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI productivity coach specializing in the Buy Back Your Time methodology. Focus on maximizing strategic value and minimizing time spent on low-value activities."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })

    const response = JSON.parse(completion.choices[0].message.content)
    return response.recommendations
  } catch (error) {
    console.error('Error generating AI insights:', error)
    return []
  }
}

export async function predictValueImpact(title, description) {
  try {
    const prompt = `
      Analyze this activity and recommend how it should be handled:
      
      Title: ${title}
      Description: ${description}
      
      Predict:
      1. Value impact level (10x_strategic, 5x_growth, 2x_operational, 1x_tactical, delegate_or_eliminate)
      2. Best delegation approach (keep_strategic, delegate_to_ai, delegate_to_ea, delegate_to_team, eliminate)
      3. Estimated dollar value creation
      
      Format response as JSON with valueImpact, delegationType, and estimatedValue fields.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are an AI productivity coach specializing in the Buy Back Your Time methodology. Help leaders focus on high-value strategic activities."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })

    return JSON.parse(completion.choices[0].message.content)
  } catch (error) {
    console.error('Error predicting value impact:', error)
    return {
      valueImpact: VALUE_IMPACT_LEVELS.TACTICAL_1X,
      delegationType: DELEGATION_TYPES.KEEP_STRATEGIC,
      estimatedValue: 0
    }
  }
} 