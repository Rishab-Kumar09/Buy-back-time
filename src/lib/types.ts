export type ValueImpactLevel = 
  | '10x_strategic' // $100k+ impact (M&A, strategic partnerships)
  | '5x_growth' // $50k+ impact (key hires, major client deals)
  | '2x_operational' // $10k+ impact (team optimization, process improvements)
  | '1x_tactical' // $1k+ impact (regular meetings, daily decisions)
  | 'delegate_or_eliminate' // Low-value tasks to be delegated

export type DelegationType = 
  | 'keep_strategic' // Must be handled by CEO (strategic value)
  | 'delegate_to_ai' // Can be automated with AI
  | 'delegate_to_ea' // Can be handled by Executive Assistant
  | 'delegate_to_team' // Can be delegated to team members
  | 'eliminate' // Can be eliminated without impact

export interface Activity {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  energyLevel: number; // 1-5
  valueImpact: ValueImpactLevel;
  delegationType: DelegationType;
  estimatedValueCreation: number; // in dollars
  actualValueCreation?: number; // measured impact
  calendarEventId?: string; // for synced calendar events
  meetingParticipants?: string[]; // for analyzing meeting patterns
  aiSuggestions?: {
    delegationRecommendation: DelegationType;
    reasonForRecommendation: string;
    potentialValueIncrease: number;
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ceo' | 'executive' | 'ea' | 'team_member';
  targetValueCreationRate: number; // Expected value creation per hour
  preferences: {
    slackEnabled: boolean;
    voiceEnabled: boolean;
    autoScheduleEnabled: boolean;
    preferredWorkingHours: {
      start: string; // HH:mm
      end: string; // HH:mm
    };
    highEnergyHours: {
      start: string; // HH:mm
      end: string; // HH:mm
    }[];
  }
}

export interface EnergyLog {
  id: string;
  userId: string;
  level: number; // 1-5
  timestamp: Date;
  notes?: string;
  context?: {
    precedingActivity?: string; // ID of activity before this log
    followingActivity?: string; // ID of activity after this log
    timeOfDay: string; // morning, afternoon, evening
    dayOfWeek: string;
  }
}

export interface AIRecommendation {
  id: string;
  userId: string;
  timestamp: Date;
  type: 'delegation' | 'scheduling' | 'energy_optimization' | 'value_increase';
  recommendation: string;
  expectedImpact: {
    timeFreed: number; // minutes
    valueIncrease: number; // dollars
    energyPreservation: number; // 1-5
  };
  status: 'pending' | 'accepted' | 'rejected' | 'implemented';
  results?: {
    actualTimeFreed: number;
    actualValueIncrease: number;
    actualEnergyImpact: number;
  }
} 