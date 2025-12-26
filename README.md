# Pri-Pals

A friendly, funny web application to rank your friends based on points. Friends are organized into three leagues: **Primium** (The Elite), **Prime** (The Inner Circle), and **Primitives** (The Bottom Tier).

## Overview

Pri-Pals uses a Duolingo-inspired design with a cartoonish, bouncy, minimalistic style optimized for mobile screens. Track your friends, assign points for various reasons, and watch them climb (or fall) through the league ranks!

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite build tool
- Material-UI (MUI) components
- React Router for navigation
- Recharts for data visualization

### Backend
- Python 3.12
- FastAPI web framework
- SQLite database
- Uvicorn ASGI server

### Deployment
- **Unified Docker container** (Nginx + FastAPI)
- Traefik reverse proxy
- Tailscale Funnel for public access

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Traefik network: `docker network create traefik-network`

### Deploy with Docker

```bash
cd /usr/scratch/mdescalzi/local/webs/pripals

# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

### Access Points

- **Production**: https://chunkyboy.reindeer-great.ts.net/pripals
- **Local**: http://localhost:8081

### Local Development

**Frontend:**
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Frontend will be at http://localhost:8080

**Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Backend will be at http://localhost:8000

## Features

### ✨ Core Features

- **League System**: Three-tier ranking (Primium, Prime, Primitives)
- **Friend Management**: Add, edit, remove friends with profile pictures
- **Couple Support**: Track couples together
- **Point System**: Add/remove points with predefined funny reasons
- **Real-time Rankings**: Automatic league updates when points change
- **Mobile-First Design**: Optimized for mobile screens
- **Profile Pictures**: Upload and display friend avatars
- **Point History**: Track all point changes over time

### League Tiers

1. **Primium** - "The Elite" (Top 3 friends)
   - Gold gradient background
   - Elite status badge

2. **Prime** - "The Inner Circle" (Next 5 friends)
   - Silver gradient background
   - Inner circle badge

3. **Primitives** - "The Bottom Tier. Lucky if they get a 'like' on their IG story." (Everyone else)
   - Bronze gradient background
   - Participation trophy vibe

### Point Reasons

**Negative:**
- Got Pregnant: -60
- Moving away: -50
- Bad Musical Taste: -20
- Replies with audios only: -10

**Positive:**
- Good Musical Taste: +20
- Does crossfit: +20
- Plays Tennis: +30

## Architecture

### Unified Container Approach

PriPals uses a **single unified container** with Nginx and FastAPI running together:

```
┌─────────────────────────────────────┐
│         pripals Container           │
│  ┌──────────────┐  ┌─────────────┐ │
│  │    Nginx     │  │   FastAPI   │ │
│  │   :8080      │→ │   :8000     │ │
│  │ (frontend +  │  │  (backend)  │ │
│  │  api proxy)  │  │             │ │
│  └──────────────┘  └─────────────┘ │
│         ↓                           │
│  /usr/share/nginx/html (frontend)  │
│  /app/data (SQLite database)       │
└─────────────────────────────────────┘
```

### Request Flow

**Production (via Tailscale Funnel):**
```
Browser: https://chunkyboy.reindeer-great.ts.net/pripals
    ↓
Tailscale Funnel
    ↓
Traefik (matches: Host + PathPrefix=/pripals)
    ↓
Nginx (receives: /pripals/)
    ↓
Rewrite: /pripals/ → /
    ↓
Serves frontend or proxies /api to backend
```

## API Endpoints

### Friends
- `GET /api/friends` - Get all friends
- `POST /api/friends` - Create new friend
- `GET /api/friends/{id}` - Get specific friend
- `PUT /api/friends/{id}` - Update friend
- `DELETE /api/friends/{id}` - Delete friend
- `POST /api/friends/{id}/points` - Add/remove points
- `GET /api/friends/{id}/history` - Get point history

### Leagues
- `GET /api/leagues` - Get all leagues with ranked friends

### Utilities
- `POST /api/upload` - Upload profile picture (returns base64)
- `GET /health` - Health check endpoint
- `GET /docs` - API documentation (Swagger UI)

## Project Structure

```
pripals/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components (Home, FriendDetail)
│   │   ├── theme/        # MUI theme configuration
│   │   ├── types/        # TypeScript types
│   │   ├── api/          # API client
│   │   └── App.tsx       # Main app component
│   ├── vite.config.ts    # Vite configuration
│   ├── .env.production   # Production environment
│   └── package.json
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── models/       # Pydantic models
│   │   ├── services/     # Business logic
│   │   └── main.py       # FastAPI app entry
│   └── requirements.txt
├── docker-compose.yml    # Unified deployment config
├── Dockerfile            # Multi-stage: frontend build + backend
├── nginx.conf            # Nginx reverse proxy config
├── start.sh              # Container startup script
└── PROJECT_SPEC.md       # Detailed design specification
```

## Configuration

### Environment Variables

**Frontend (`frontend/.env.production`):**
- `VITE_API_URL` - Backend API URL (for production builds)

**Backend:**
- `DATABASE_URL` - SQLite database path
- `PYTHONUNBUFFERED` - Python unbuffered output

### Vite Configuration

Production builds use `/pripals/` base path:
```typescript
base: process.env.NODE_ENV === 'production' ? '/pripals/' : './'
```

### Nginx Configuration

- Frontend served from `/usr/share/nginx/html`
- API requests (`/pripals/api/*`) proxied to FastAPI at `localhost:8000`
- Rewrite rules handle `/pripals` prefix
- Static asset caching
- SPA routing support

## Database

- **Type**: SQLite (file-based)
- **Location**: `/app/data/pripals.db` (Docker volume)
- **Persistence**: Data persists across container restarts via named volume

## Deployment

### Docker Compose

The application uses a single unified container approach:

```yaml
services:
  pripals:
    container_name: pripals
    ports:
      - "8081:8080"
    volumes:
      - pripals-data:/app/data
    networks:
      - traefik-network
```

### Traefik Labels

```yaml
- "traefik.http.routers.pripals.rule=Host(`chunkyboy.reindeer-great.ts.net`) && PathPrefix(`/pripals`)"
- "traefik.http.routers.pripals.entrypoints=web,websecure"
- "traefik.http.routers.pripals.tls=true"
```

### Tailscale Funnel

For public internet access via Tailscale Funnel:

```bash
# Enable Tailscale Funnel
tailscale funnel --bg https+insecure://localhost:443

# Verify
tailscale serve status
```

See airspace project's `TAILSCALE-FUNNEL.md` for detailed setup.

## Development

### Adding New Point Reasons

Edit `backend/app/services/database.py`:
```python
POINT_REASONS = {
    "new_reason": {"points": 50, "description": "Description"},
}
```

### Customizing Leagues

Edit `backend/app/services/database.py`:
```python
LEAGUES = {
    "primium": {"min_rank": 1, "max_rank": 3},
    "prime": {"min_rank": 4, "max_rank": 8},
    "primitives": {"min_rank": 9, "max_rank": float('inf')},
}
```

### Frontend Styling

Theme configuration in `frontend/src/theme/theme.ts` - based on Duolingo's playful design.

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs -f

# Rebuild from scratch
docker compose down
docker compose up -d --build
```

### API calls failing
- Check `VITE_API_URL` in `frontend/.env.production`
- Verify nginx proxy configuration in `nginx.conf`
- Check backend is running: `docker compose logs -f`

### Database issues
```bash
# Access container
docker exec -it pripals bash

# Check database
ls -la /app/data/
```

## Documentation

- **PROJECT_SPEC.md** - Detailed design specification and requirements
- See **airspace** project for Traefik and Tailscale Funnel setup guides

## License

MIT

## Recent Changes

See `CLEANUP-SUMMARY.md` for details on recent project consolidation and improvements.
