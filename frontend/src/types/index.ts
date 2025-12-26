export interface Friend {
  id: string;
  name: string;
  profilePicture: string;
  points: number;
  isCouple: boolean;
  partnerName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FriendCreate {
  name: string;
  profilePicture: string;
  isCouple: boolean;
  partnerName?: string;
}

export interface FriendUpdate {
  name?: string;
  profilePicture?: string;
  isCouple?: boolean;
  partnerName?: string;
}

export interface PointAction {
  id: string;
  friendId: string;
  points: number;
  reason: string;
  timestamp: string;
}

export interface PointActionCreate {
  points: number;
  reason: string;
}

export enum LeagueType {
  PRIMIUM = 'PRIMIUM',
  PRIME = 'PRIME',
  PRIMITIVES = 'PRIMITIVES'
}

export interface League {
  type: LeagueType;
  title: string;
  description: string;
  friends: Friend[];
}

export interface PointReason {
  label: string;
  points: number;
}

export interface PointHistoryEntry {
  timestamp: string;
  points: number;
  totalPoints: number;
}

export const POINT_REASONS: PointReason[] = [
  { label: 'Got Pregnant', points: -60 },
  { label: 'Got Pregnant Again', points: -80 },
  { label: 'Is Moving Away', points: -50 },
  { label: 'Bad Taste in Music', points: -20 },
  { label: 'Hates Hiking', points: -10 },
  { label: 'Replies With Audios', points: -10 },
  { label: 'Gay', points: 50 },
  { label: 'Plays Tennis', points: 30 },
  { label: 'Hikes', points: 25 },
  { label: 'Good Taste in Music', points: 20 },
  { label: 'Good Taste in Books', points: 20 },
  { label: 'Does Crossfit', points: 20 },
  { label: 'Offers Tech Support', points: 15 },
];
