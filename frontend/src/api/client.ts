import { Friend, FriendCreate, FriendUpdate, PointActionCreate, League } from '../types';

// Determine API URL based on environment
const getApiUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // If accessing via Tailscale, use Tailscale hostname
  if (window.location.hostname.includes('ts.net')) {
    return `http://${window.location.hostname.replace(':8080', '')}:8000`;
  }

  // If accessing via local network IP, use that IP
  if (window.location.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    return `http://${window.location.hostname}:8000`;
  }

  // Default to localhost
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiUrl();

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Friends endpoints
  async getFriends(): Promise<Friend[]> {
    const response = await fetch(`${this.baseUrl}/api/friends`);
    if (!response.ok) throw new Error('Failed to fetch friends');
    return response.json();
  }

  async getFriend(id: string): Promise<Friend> {
    const response = await fetch(`${this.baseUrl}/api/friends/${id}`);
    if (!response.ok) throw new Error('Failed to fetch friend');
    return response.json();
  }

  async createFriend(friend: FriendCreate): Promise<Friend> {
    const response = await fetch(`${this.baseUrl}/api/friends`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(friend),
    });
    if (!response.ok) throw new Error('Failed to create friend');
    return response.json();
  }

  async updateFriend(id: string, updates: FriendUpdate): Promise<Friend> {
    const response = await fetch(`${this.baseUrl}/api/friends/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update friend');
    return response.json();
  }

  async deleteFriend(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/friends/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete friend');
  }

  async addPoints(friendId: string, pointAction: PointActionCreate): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/friends/${friendId}/points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pointAction),
    });
    if (!response.ok) throw new Error('Failed to add points');
  }

  // Leagues endpoint
  async getLeagues(): Promise<League[]> {
    const response = await fetch(`${this.baseUrl}/api/leagues`);
    if (!response.ok) throw new Error('Failed to fetch leagues');
    return response.json();
  }

  // Upload endpoint
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/api/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');

    const result = await response.json();
    return result.data; // Returns base64 encoded image
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
