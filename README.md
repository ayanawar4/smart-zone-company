# Smart Zone Dashboard
### لوحة تحكم Smart Zone لإدارة الأعمال

A business management dashboard for **Smart Zone**, built with **NestJS** (backend API) and **React** (frontend), replacing the Excel workbook with a proper database, statistics, and controls.

برنامج لإدارة أعمال شركة **Smart Zone** بديل لملف الإكسل، يشمل قاعدة بيانات حقيقية وإحصائيات ولوحة تحكم كاملة.

All data already in your Excel file (`6-2026 .xlsx`) has been imported: 14 projects, fund ledger, expenses, salaries, invoices, and employees.

---

## 1. Requirements / المتطلبات

- [Node.js](https://nodejs.org) version 18 or newer (18/20/22 all work). Download and install it first if you don't have it.
- No other software (no database server, no internet connection) is required — everything runs locally on this computer.

يلزم فقط تثبيت Node.js (نسخة 18 أو أحدث) من الموقع الرسمي، ولا يحتاج البرنامج لأي اتصال إنترنت أو برامج أخرى بعد ذلك.

## 2. First-time setup / التجهيز لأول مرة

Open a terminal (Command Prompt / Terminal app) in this folder and run:

```bash
./install.sh
```

(On Windows, run these commands manually instead — see "Manual setup" below.)

This installs everything and loads all the data from the Excel file into a local database automatically.

هذا الأمر يقوم بتجهيز البرنامج وتحميل كل بيانات ملف الإكسل داخل قاعدة بيانات محلية تلقائيًا.

## 3. Run the dashboard / تشغيل البرنامج

```bash
./start.sh
```

Then open **http://localhost:3001** in your browser (Chrome, Safari, Edge...). Keep the terminal window open while you use it; closing it stops the server.

بعد التشغيل افتح المتصفح على الرابط **http://localhost:3001**. يجب إبقاء نافذة الطرفية مفتوحة أثناء الاستخدام.

## Manual setup (Windows or if the scripts don't run)

```bash
cd backend
npm install
npm run seed        # loads the Excel data into the database (run once)
npm run build

cd ../frontend
npm install
npm run build

cd ../backend
npm run start:prod
```

Then open http://localhost:3001.

---

## What's inside / محتويات البرنامج

- **Dashboard** — fund balance, total invoiced, expenses, salaries, net position, monthly income/expense charts, top customers, biggest projects.
- **Projects** — every project from the Excel file (SERVER, RTR, HILTON K.R, HILTON CORNECH, SPA VILLA, etc.) with cost items, installation items, funding (Hesham/Sayed), totals paid and remaining. Add new projects and items, or delete old ones.
- **Invoices** — customer invoices with subtotal/VAT/total, done vs. in-progress status, commission %, and amounts still owed to Smart Zone.
- **Fund Ledger** — the running IN/OUT cash ledger with live balance.
- **Expenses** — office/operating expense log.
- **Salaries** — monthly salary payments per employee.
- **Employees** — staff directory.

Every section supports adding, editing and deleting records — this is a full replacement for manually editing the Excel file.

كل قسم يمكن من خلاله إضافة أو تعديل أو حذف السجلات، بديلاً كاملاً عن التعديل اليدوي في ملف الإكسل.

## Re-importing the Excel file later

If you want to reload from a newer version of the Excel export, place it at `backend/seed-data-source.xlsx`, re-run the extraction script noted in `backend/seed-data/README.txt`, then run `npm run seed` again inside `backend/`. **Warning:** `npm run seed` clears and replaces all current data — only run it if you want to start over from the Excel file.

## Project structure

```
smart-zone-dashboard/
  backend/     NestJS REST API + SQLite database (auto-created in backend/data/)
  frontend/    React dashboard (built into frontend/dist, served by the backend)
  install.sh   first-time setup script
  start.sh     run the app
```

## Backup

Your live data lives in `backend/data/smartzone.sqlite`. Copy this file elsewhere from time to time to keep a backup.

بيانات البرنامج الفعلية محفوظة في ملف `backend/data/smartzone.sqlite`، يفضل عمل نسخة احتياطية منه بين الحين والآخر.
# smart-zone-company
# smart-zone-company
