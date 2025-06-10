export interface Activity {
  id: string;
  userId: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  energyLevel: number; // 1-5
  category: 'high_value' | 'low_value';
  delegationType: 'self' | 'ai' | 'ea' | 'eliminate';
  estimatedHourlyRate: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  targetHourlyRate: number;
}

export interface EnergyLog {
  id: string;
  userId: string;
  level: number; // 1-5
  timestamp: Date;
  notes?: string;
} 