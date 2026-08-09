#!/usr/bin/env bash
# Smart Zone Dashboard - first-time setup
# تجهيز البرنامج لأول مرة
set -e
cd "$(dirname "$0")"

echo "==> Installing backend dependencies..."
cd backend
npm install

echo "==> Loading your Excel data into the database..."
npm run seed

echo "==> Building backend..."
npm run build
cd ..

echo "==> Installing frontend dependencies..."
cd frontend
npm install

echo "==> Building dashboard..."
npm run build
cd ..

echo ""
echo "Setup complete! / اكتمل التجهيز بنجاح"
echo "Run ./start.sh then open http://localhost:3001"
echo "شغل ./start.sh ثم افتح المتصفح على http://localhost:3001"
