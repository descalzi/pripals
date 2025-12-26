# PriPals Cleanup Summary

## Changes Made

Applied learnings from the airspace project cleanup to pripals.

### 1. Docker Compose Consolidation

**Before:**
- `docker-compose.yml` (old)
- `docker-compose.unified.yml` (active)
- `docker-compose.prod.yml` (unused)

**After:**
- `docker-compose.yml` (cleaned up unified config)

**Changes:**
- Removed `-unified` suffix from container name (`pripals-unified` → `pripals`)
- Added Host rule to Traefik labels: `Host(chunkyboy.reindeer-great.ts.net) && PathPrefix(/pripals)`
- Added TLS support for HTTPS via Tailscale Funnel
- Added proper network configuration (`traefik-network`)
- Removed obsolete docker-compose files

### 2. Vite Configuration

**Updated `frontend/vite.config.ts`:**
```typescript
base: process.env.NODE_ENV === 'production' ? '/pripals/' : './'
```

This ensures:
- Production builds use `/pripals/` base path to match Traefik routing
- Local development uses relative paths for flexibility
- Assets load correctly at `/pripals/assets/...`

### 3. Nginx Configuration

**Before:** `nginx-unified.conf` (mixed approach)

**After:** `nginx.conf` (clean, airspace-style)

**Improvements:**
- Uses rewrite rules to handle `/pripals` prefix (`rewrite ^/pripals(/.*)$ $1 break`)
- Separate locations for `/pripals/api/` and `/api/` (production vs local)
- Proper static asset caching with regex locations
- Supports both `/pripals` (production) and `/` (local) access
- Security headers added
- Better organized location blocks

### 4. Dockerfile

**Updated:**
- Changed `nginx-unified.conf` → `nginx.conf`
- No other changes needed (already well-structured)

### 5. Removed Files

- `docker-compose.unified.yml` → consolidated into `docker-compose.yml`
- `docker-compose.prod.yml` → not used
- `docker-compose.old.yml` → backup removed
- `nginx-unified.conf` → replaced with `nginx.conf`

## Architecture

### Current Setup (Unified Container)

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
Nginx (receives: GET /pripals/)
    ↓
Nginx rewrite: /pripals/ → /
    ↓
Serves: /usr/share/nginx/html/index.html
```

**API Request:**
```
Browser: /pripals/api/principals
    ↓
Nginx (receives: GET /pripals/api/principals)
    ↓
Nginx rewrite: /pripals/api/principals → /api/principals
    ↓
Proxy to: http://127.0.0.1:8000/api/principals
    ↓
FastAPI handles request
```

**Asset Request:**
```
Browser: /pripals/assets/index-xxx.js
    ↓
Nginx (receives: GET /pripals/assets/index-xxx.js)
    ↓
Nginx rewrite: /pripals/assets/... → /assets/...
    ↓
Serves: /usr/share/nginx/html/assets/index-xxx.js
```

## Deployment

### Prerequisites

- Docker and Docker Compose
- Traefik network: `docker network create traefik-network`
- Tailscale Funnel configured (see airspace/TAILSCALE-FUNNEL.md)

### Build and Deploy

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

## Configuration Files

### Final Structure

```
pripals/
├── frontend/              # React TypeScript frontend
│   ├── src/
│   ├── Dockerfile        # Frontend build (used in multi-stage)
│   ├── vite.config.ts    # Updated with /pripals/ base path
│   └── package.json
├── backend/              # FastAPI backend
│   ├── app/
│   ├── Dockerfile        # Backend setup (reference)
│   └── requirements.txt
├── docker-compose.yml    # Unified configuration (cleaned up)
├── Dockerfile            # Multi-stage: frontend + backend
├── nginx.conf            # Nginx configuration (cleaned up)
├── start.sh              # Startup script (nginx + uvicorn)
└── README.md             # Project documentation
```

## Key Improvements

1. **Cleaner naming**: Removed `-unified` suffix from all references
2. **Better Traefik routing**: Added Host rule to prevent conflicts
3. **Production-ready**: Vite builds with correct `/pripals/` base path
4. **Consistent with airspace**: Applied same patterns for nginx rewrites
5. **Fewer files**: Consolidated 3 docker-compose files into 1
6. **Better organized**: nginx.conf follows airspace structure

## Testing Checklist

- [ ] Docker Compose starts without errors
- [ ] Container is named `pripals` (not `pripals-unified`)
- [ ] Frontend accessible at http://localhost:8081
- [ ] Frontend accessible at https://chunkyboy.reindeer-great.ts.net/pripals
- [ ] API calls work (check browser console)
- [ ] Static assets load correctly (check /pripals/assets/*)
- [ ] Traefik routes requests properly
- [ ] Database persists (check /app/data volume)

## Next Steps

1. Test the deployment: `docker compose up -d --build`
2. Verify Tailscale Funnel access
3. Check that all features work correctly
4. Update any documentation that references old names
5. Consider adding environment files if needed (see airspace/ENV-FILES.md)

## Comparison with Airspace

**Similarities:**
- Path-based Traefik routing with Host rule
- Vite config with conditional base path
- Nginx rewrite rules for path prefix handling
- Clean docker-compose.yml structure
- Traefik network configuration

**Differences:**
- **Unified container** (nginx + FastAPI in one) vs airspace's separate containers
- Single Dockerfile vs separate frontend/backend Dockerfiles
- Uses start.sh to run both services vs docker-compose orchestration
- Simpler setup (one container) vs more scalable (two containers)

Both approaches are valid - pripals uses unified for simplicity, airspace uses separation for scalability.
