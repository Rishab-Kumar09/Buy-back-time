// Value Impact Levels
export const VALUE_IMPACT_LEVELS = {
  STRATEGIC_10X: '10x_strategic', // $100k+ impact (M&A, strategic partnerships)
  GROWTH_5X: '5x_growth', // $50k+ impact (key hires, major client deals)
  OPERATIONAL_2X: '2x_operational', // $10k+ impact (team optimization, process improvements)
  TACTICAL_1X: '1x_tactical', // $1k+ impact (regular meetings, daily decisions)
  DELEGATE: 'delegate_or_eliminate' // Low-value tasks to be delegated
}

// Delegation Types
export const DELEGATION_TYPES = {
  KEEP_STRATEGIC: 'keep_strategic', // Must be handled by CEO (strategic value)
  DELEGATE_TO_AI: 'delegate_to_ai', // Can be automated with AI
  DELEGATE_TO_EA: 'delegate_to_ea', // Can be handled by Executive Assistant
  DELEGATE_TO_TEAM: 'delegate_to_team', // Can be delegated to team members
  ELIMINATE: 'eliminate' // Can be eliminated without impact
}

// User Roles
export const USER_ROLES = {
  CEO: 'ceo',
  EXECUTIVE: 'executive',
  EA: 'ea',
  TEAM_MEMBER: 'team_member'
}

// AI Recommendation Types
export const RECOMMENDATION_TYPES = {
  DELEGATION: 'delegation',
  SCHEDULING: 'scheduling',
  ENERGY_OPTIMIZATION: 'energy_optimization',
  VALUE_INCREASE: 'value_increase'
}

// Recommendation Status
export const RECOMMENDATION_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  IMPLEMENTED: 'implemented'
} 