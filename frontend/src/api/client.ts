import { Friend, FriendCreate, FriendUpdate, PointActionCreate, League, PointHistoryEntry } from '../types';

// Determine API URL based on environment
const getApiUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In production (served from nginx), use relative URL
  // This works because nginx proxies /api/ to the backend
  if (import.meta.env.PROD) {
    console.log('Using relative API URL (production)');
    return '';  // Empty string means same origin
  }

  const hostname = window.location.hostname;

  // If accessing via Tailscale, use Tailscale hostname
  if (hostname.includes('ts.net')) {
    const apiUrl = `http://${hostname}:8000`;
    console.log('Using Tailscale API URL:', apiUrl);
    return apiUrl;
  }

  // If accessing via local network IP, use that IP
  if (hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
    const apiUrl = `http://${hostname}:8000`;
    console.log('Using IP-based API URL:', apiUrl);
    return apiUrl;
  }

  // Default to localhost for development
  console.log('Using localhost API URL (development)');
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiUrl();
console.log('API_BASE_URL initialized as:', API_BASE_URL);

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
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update friend: ${response.status} - ${errorText}`);
    }
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

  async getPointHistory(friendId: string, limit: number = 10): Promise<PointHistoryEntry[]> {
    const response = await fetch(`${this.baseUrl}/api/friends/${friendId}/history?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch point history');
    return response.json();
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
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload image: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result.data; // Returns base64 encoded image
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
