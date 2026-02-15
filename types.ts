
export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  role: Role;
  text: string;
  isError?: boolean;
  isWarning?: boolean;
}

export interface ChatHistoryItem {
  role: Role;
  parts: { text: string }[];
}

export interface ScoreEntry {
  type: string;
  score: number;
  date: string;
}

export type SubscriptionTier = 'free' | 'basic' | 'advanced' | 'pro';
export type RelationshipStatus = 'none' | 'short' | 'long' | 'married' | null;

export interface UserProfile {
  nickname: string;
  avatarId: string;
  scores: ScoreEntry[];
  tier: SubscriptionTier;
  relationshipStatus: RelationshipStatus;
  chatUsage: number;
  analysisUsage: number;
  violationCount: number;
  isBanned: boolean;
}

export const AVATARS = [
  { id: 'wolf', name: 'Maskeli Kurt', icon: '🐺' },
  { id: 'lion', name: 'Maskeli Aslan', icon: '🦁' },
  { id: 'eagle', name: 'Maskeli Kartal', icon: '🦅' },
  { id: 'panther', name: 'Maskeli Panter', icon: '🐆' },
  { id: 'owl', name: 'Maskeli Baykuş', icon: '🦉' },
];

export interface TierBadge {
  name: string;
  tier: SubscriptionTier;
  color: string;
  icon: string;
  rankName: string;
}

export const TIER_BADGES: Record<SubscriptionTier, TierBadge> = {
  free: { name: 'Yeni Üye', tier: 'free', color: '#71717a', icon: '🐾', rankName: 'Aday' },
  basic: { name: 'Genç Kurt', tier: 'basic', color: '#cd7f32', icon: '🐺', rankName: 'Bronz' },
  advanced: { name: 'Savaşçı Kurt', tier: 'advanced', color: '#c0c0c0', icon: '🐺', rankName: 'Gümüş' },
  pro: { name: 'Alfa Kurt', tier: 'pro', color: '#ffd700', icon: '🐺', rankName: 'Altın' },
};

export const LIMITS = {
  free: { chat: 10, analysis: 1 },
  basic: { chat: 20, analysis: 3 },
  advanced: { chat: Infinity, analysis: 10 },
  pro: { chat: Infinity, analysis: Infinity }
};

export type QuestionType = 'mcq' | 'open';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: { text: string; score: number; feedback: string }[];
}
