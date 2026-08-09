# How to Run Smart Zone Dashboard

## Prerequisites
- Node.js 18+
- A Neon Postgres database (https://console.neon.tech)

---

## 1. Configure Environment

Edit `backend/.env` and set your Neon connection string:

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

# Frontend
cd ../frontend
npm install
```

---

## 3. Build the Backend

```bash
cd backend
npm run build
```

---

## 4. Seed the Database (first time only)

```bash
cd backend
npx ts-node src/seed/seed.ts
```

---

## 5. Start the Backend

```bash
cd backend
node dist/main.js
```

Backend runs at: http://localhost:3001

---

## 6. Start the Frontend (development)

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Production Build (single deployment)

Build both and serve from the backend:

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
npm run build

# Start (serves frontend + API together)
node dist/main.js
```

Open: http://localhost:3001

---

## Deploy to Render

1. Push code to GitHub
2. Create a new **Web Service** on https://render.com
3. Set the following in Render dashboard:
   - **Build Command:** `cd frontend && npm install && npm run build && cd ../backend && npm install && npm run build`
   - **Start Command:** `node backend/dist/main.js`
   - **Environment Variable:** `DATABASE_URL` = your Neon connection string

---

## Project Structure

```
smart-zone-dashboard/
├── backend/          # NestJS API (port 3001)
│   ├── src/
│   │   ├── projects/
│   │   ├── invoices/
│   │   ├── fund/
│   │   ├── expenses/
│   │   ├── salaries/
│   │   ├── employees/
│   │   ├── dashboard/
│   │   └── seed/
│   └── .env          ← set DATABASE_URL here
└── frontend/         # React + Vite + TypeScript (port 5173)
    └── src/
        ├── components/
        └── pages/
```
