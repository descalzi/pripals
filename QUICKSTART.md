# Pri-Pals Quick Start Guide

## 🚀 Get Started in 3 Steps

### Option 1: Docker (Easiest)

```bash
docker-compose up --build
```

Access the app:
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Option 2: Local Development

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Access at: http://localhost:8080

## 📱 How to Use

### 1. Add Friends
- Go to the **Friends** tab (bottom navigation)
- Click the **+** button
- Enter friend's name
- Optionally upload a profile picture
- Toggle "This is a couple" if adding a couple
- Click **Add**

### 2. Manage Points
- Go to the **Leagues** tab
- Click the **+** or **-** buttons on friend cards
- Select a reason from the list:
  - **Positive reasons:** Good Musical Taste (+20), Does crossfit (+20), Plays Tennis (+30)
  - **Negative reasons:** Replies with audios only (-10), Bad Musical Taste (-20), Moving away (-50), Got Pregnant (-60)

### 3. Watch the Leagues
Friends automatically move between leagues based on points:
- **Primium** (Gold/Purple) - Top 3 friends
- **Prime** (Silver/Blue) - Next 5 friends
- **Primitives** (Bronze/Gray) - Everyone else

## 🎨 Features

✅ Mobile-first design (optimized for phones)
✅ Duolingo-inspired UI (bouncy, colorful, fun)
✅ Real-time league updates
✅ Profile picture uploads
✅ Couple support (track two people together)
✅ Persistent storage (in-memory for now)

## 🛠️ Tech Stack

**Frontend:** React 19 + TypeScript + Vite + MUI
**Backend:** Python 3.12 + FastAPI
**Deployment:** Docker + docker-compose

## 📖 Next Steps

- See [README.md](README.md) for detailed documentation
- See [PROJECT_SPEC.md](PROJECT_SPEC.md) for full specifications
- Check `/api/docs` at http://localhost:8000/docs for API documentation

## 🐛 Troubleshooting

**Backend won't start?**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend won't start?**
```bash
cd frontend
npm install --legacy-peer-deps
```

**Can't connect to backend?**
- Make sure backend is running on port 8000
- Check CORS settings in `backend/app/main.py`
- Verify `VITE_API_URL` in frontend (defaults to http://localhost:8000)

## 🎯 Have Fun!

Pri-Pals is designed to be funny and lighthearted. Rank your friends, watch them compete for the top spot, and enjoy the league system! 🏆
