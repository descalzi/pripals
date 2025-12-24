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

export const POINT_REASONS: PointReason[] = [
  { label: 'Got Pregnant', points: -60 },
  { label: 'Moving away', points: -50 },
  { label: 'Bad Musical Taste', points: -20 },
  { label: 'Replies with audios only', points: -10 },
  { label: 'Good Musical Taste', points: 20 },
  { label: 'Does crossfit', points: 20 },
  { label: 'Plays Tennis', points: 30 }
];
