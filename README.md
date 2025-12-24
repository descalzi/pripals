# Pri-Pals

A friendly, funny web application to rank your friends based on points. Friends are organized into three leagues: Primium (The Elite), Prime (The Inner Circle), and Primitives (The Bottom Tier).

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- React Router

### Backend
- Python 3.12
- FastAPI
- Uvicorn

## Getting Started

### With Docker (Recommended)

1. Make sure Docker and Docker Compose are installed
2. Run the application:

```bash
docker-compose up --build
```

3. Access the application:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Local Development

#### Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend will be available at http://localhost:8080

#### Backend

```bash
cd backend

# Create and activate virtual environment (first time only)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at http://localhost:8000

**Note**: Always activate the virtual environment before running the backend:
```bash
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

## Features

- **League System**: Three tiers (Primium, Prime, Primitives)
- **Friend Management**: Add, edit, remove friends
- **Couple Support**: Track couples together
- **Point System**: Add/remove points with predefined reasons
- **Profile Pictures**: Upload and display friend avatars
- **Mobile-First Design**: Optimized for mobile screens
- **Duolingo-Inspired UI**: Cartoonish, bouncy, minimalistic design

## Project Structure

```
pripals/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── theme/         # MUI theme configuration
│   │   ├── types/         # TypeScript types
│   │   ├── api/           # API client
│   │   └── assets/        # Static assets
│   └── package.json
├── backend/
│   ├── venv/              # Python virtual environment (not in git)
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── models/        # Pydantic models
│   │   └── services/      # Business logic
│   └── requirements.txt
├── docker-compose.yml
└── PROJECT_SPEC.md        # Detailed project specification
```

## API Endpoints

- `GET /api/friends` - Get all friends
- `POST /api/friends` - Create new friend
- `GET /api/friends/{id}` - Get specific friend
- `PUT /api/friends/{id}` - Update friend
- `DELETE /api/friends/{id}` - Delete friend
- `POST /api/friends/{id}/points` - Add/remove points
- `GET /api/leagues` - Get all leagues with friends
- `POST /api/upload` - Upload profile picture

## League Tiers

1. **Primium** - "The Elite" (Top 3 friends)
2. **Prime** - "The Inner Circle" (Next 5 friends)
3. **Primitives** - "The Bottom Tier. Lucky if they get a 'like' on their IG story." (Everyone else)

## Point Reasons

### Negative
- Got Pregnant: -60
- Moving away: -50
- Bad Musical Taste: -20
- Replies with audios only: -10

### Positive
- Good Musical Taste: +20
- Does crossfit: +20
- Plays Tennis: +30

## License

MIT
