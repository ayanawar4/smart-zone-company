This folder contains the data imported from the original "6-2026 .xlsx" Excel file.

To re-import from a newer Excel export:
1. Requires Python 3 with openpyxl installed (pip install openpyxl)
2. Place the new Excel file at backend/seed-data-source.xlsx
3. From the backend/ folder, run: python3 scripts/extract_excel.py
   This regenerates the JSON files in this folder.
4. Run: npm run seed
   This clears the database and reloads it from these JSON files.
