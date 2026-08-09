# How to Run Smart Zone Dashboard

## Project Structure

```
smart-zone-company/
└── backend/                  ← ONE NestJS project (TypeScript)
    ├── client/               ← React frontend (inside NestJS)
    │   ├── src/
    │   └── vite.config.ts
    ├── src/                  ← NestJS API & entities
    ├── seed-data/            ← JSON seed files
    ├── .env                  ← set DATABASE_URL here
    └── package.json
```

---

## Prerequisites

- Node.js 18+
- Neon Postgres database → https://console.neon.tech

---

## 1. Configure Environment

Edit `backend/.env`:

```
PORT=3001
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
```

---

## 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (inside backend)
cd client
npm install
```

---

## 3. Seed the Database (first time only)

```bash
cd backend
npx ts-node src/seed/seed.ts
```

---

## Development Mode (two terminals)

**Terminal 1 — Backend:**
```bash
cd backend
npm run build
node dist/main.js
```
→ API runs at http://localhost:3001

**Terminal 2 — Frontend (hot reload):**
```bash
cd backend/client
npm run dev
```
→ UI runs at http://localhost:5173 (proxies /api to backend)

---

## Production Mode (single server)

Build everything and run from one NestJS process:

```bash
# 1. Build frontend
cd backend/client
npm run build

# 2. Build backend
cd ..
npm run build

# 3. Start (serves API + frontend together)
node dist/main.js
```

→ Open http://localhost:3001 — NestJS serves the React app + API from one URL.

---

## Deploy to Render (one service)

1. Push code to GitHub
2. Go to https://render.com → **New Web Service** → connect your repo
3. Set:
   - **Root Directory:** `backend`
   - **Build Command:** `cd client && npm install && npm run build && cd .. && npm install && npm run build`
   - **Start Command:** `node dist/main.js`
4. Add environment variable:
   - `DATABASE_URL` = your Neon connection string
5. Deploy → one URL for everything
