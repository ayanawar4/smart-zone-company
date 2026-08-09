#!/usr/bin/env bash
# Smart Zone Dashboard - run the app
# تشغيل البرنامج
set -e
cd "$(dirname "$0")/backend"
echo "Starting Smart Zone Dashboard at http://localhost:3001 ..."
npm run start:prod
