# NEXUS — Campus Intelligence

MongoDB-powered campus intelligence platform for events, campus services, issues, recommendations and analytics.

## Stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Realtime: MongoDB Change Streams
- Maps/geo: MongoDB 2dsphere queries
- Analytics: MongoDB aggregation pipelines

## Structure

```text
NEXUS-Campus-Intelligence/
├── frontend/
├── backend/
├── database/
└── docs/
```

## Run

### Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Set `MONGO_URI` in `backend/.env`.

The starter includes seed data and API endpoints for dashboard stats, events, nearby campus resources, issues and recommendations.
