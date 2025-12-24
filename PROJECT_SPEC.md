# Pri-Pals - Project Specification

## Overview
Pri-Pals is a friendly, funny web application to rank your friends based on points. Friends are organized into three leagues based on their point totals.

## Design Philosophy
- **Inspiration**: Duolingo-style design
- **Style**: Cartoonish, bouncy, minimalistic
- **Target**: Mobile phone screens (mobile-first)

## Leagues System

### League Tiers (in order)
1. **Primium** - "The Elite" (Top 3 friends)
2. **Prime** - "The Inner Circle" (Next 5 friends)
3. **Primitives** - "The Bottom Tier. Lucky if they get a 'like' on their IG story." (Everyone else)

## Points System

### Negative Points
- **-60**: Got Pregnant
- **-50**: Moving away
- **-20**: Bad Musical Taste
- **-10**: Replies with audios only

### Positive Points
- **+20**: Good Musical Taste
- **+20**: Does crossfit
- **+30**: Plays Tennis

## Features

### Friends Management
- Add new friends (name + profile picture upload)
- Remove friends
- Mark friends as "a couple" (tracks two names under same points/league)
- Each friend starts with 0 points

### Points Management
- Add points to friends (select from predefined reasons)
- Remove points from friends (select from predefined reasons)
- Points determine league placement

### League View
- Display friends grouped by their current league
- Visual hierarchy showing league importance
- Show friend's current point total

### Navigation
- Bottom app bar with main action icons:
  - League view
  - Manage friends
  - Settings
  - (Add more as needed)

## Tech Stack

### Frontend
- **React**: v19
- **TypeScript**: For type safety
- **Vite**: Build tool
- **Package Manager**: pnpm (with exact versions)
- **UI Framework**: Material-UI (MUI)
- **Styling**: MUI Theme system (avoid inline CSS)
- **Port**: 8080

### Backend
- **Python**: 3.12
- **Framework**: FastAPI
- **Port**: TBD (typically 8000)

### Deployment
- **Docker**: Single Docker container running both frontend and backend
- **No Authentication**: No login/auth system required

## Data Model

### Friend Entity
```typescript
interface Friend {
  id: string;
  name: string;
  profilePicture: string; // URL or base64
  points: number;
  isCouple: boolean;
  partnerName?: string; // Only if isCouple is true
  createdAt: Date;
  updatedAt: Date;
}
```

### Point Action Entity
```typescript
interface PointAction {
  id: string;
  friendId: string;
  points: number;
  reason: string;
  timestamp: Date;
}
```

## API Endpoints

### Friends
- `GET /api/friends` - Get all friends
- `POST /api/friends` - Create new friend
- `PUT /api/friends/{id}` - Update friend
- `DELETE /api/friends/{id}` - Delete friend
- `POST /api/friends/{id}/points` - Add/remove points from friend

### Leagues
- `GET /api/leagues` - Get all friends organized by league

### File Upload
- `POST /api/upload` - Upload profile picture

## UI Components Needed

### Pages/Views
1. **League View** - Main view showing all leagues and friends
2. **Manage Friends** - Add/edit/delete friends
3. **Friend Detail** - View/manage individual friend and their points
4. **Settings** - App settings

### Components
- League card (for each league tier)
- Friend card (shows avatar, name, points)
- Bottom navigation bar
- Add friend dialog/modal
- Points action dialog/modal
- Profile picture uploader

## Color Scheme (Duolingo-inspired)
- Primary: Vibrant green (#58CC02)
- Secondary: Bright orange/yellow accents
- Background: Clean white/light gray
- League-specific colors:
  - Primium: Gold/Purple gradient
  - Prime: Silver/Blue
  - Primitives: Bronze/Gray

## Animations
- Bouncy transitions when moving between leagues
- Celebrate animations when friends move up
- Smooth point counter animations

## Development Phases

### Phase 1: Setup & Infrastructure ✅ COMPLETED
- [x] Initialize frontend (React + Vite + TypeScript + MUI)
- [x] Initialize backend (FastAPI + Python 3.12)
- [x] Set up Docker configuration
- [x] Configure npm with exact versions (using npm instead of pnpm)
- [x] Set up MUI theme

### Phase 2: Core Backend ✅ COMPLETED
- [x] Define data models
- [x] Set up in-memory storage
- [x] Implement Friends CRUD endpoints
- [x] Implement Points management endpoints
- [x] Implement League calculation logic
- [x] Implement file upload for profile pictures

### Phase 3: Core Frontend ✅ COMPLETED
- [x] Set up routing
- [x] Create MUI theme with Duolingo-inspired design
- [x] Build Bottom Navigation
- [x] Build League View component
- [x] Build Friend Card component
- [x] Implement Friends management UI
- [x] Implement Points management UI

### Phase 4: Integration ✅ COMPLETED
- [x] Connect frontend to backend APIs
- [x] Implement profile picture upload flow
- [x] Add error handling
- [x] Add loading states

### Phase 5: Polish ✅ COMPLETED
- [x] Add animations and transitions
- [x] Responsive design (MUI handles this)
- [x] Add empty states
- [x] Add confirmation dialogs
- [x] Mobile-first design implemented

### Phase 6: Deployment ✅ COMPLETED
- [x] Finalize Docker configuration
- [x] Create docker-compose file
- [x] Test full deployment
- [x] Documentation

## Notes
- All league names intentionally start with 'pri' to match app name
- App name is "Pri-Pals" (capitalized P)
- Mobile-first design approach
- No user authentication needed
- Single Docker container deployment
