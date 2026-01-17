# HRMS Lite

Lightweight Human Resource Management System built with the MERN stack (using SQLite).

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (Professional UI)
- **Backend**: Node.js, Express
- **Database**: SQLite (No installation required)

## Prerequisites
- Node.js installed

## Quick Start (Run Locally)

1. **Install & Start Backend**
   ```bash
   cd server
   npm install
   node server.js
   ```
   Server runs on `http://localhost:5000`

2. **Install & Start Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173` (typically)

## Features
- **Employee Management**: Add, View, and Delete employees.
- **Attendance**: Mark daily attendance (Present/Absent) and view history.
- **Data Persistence**: Uses a local SQLite file (`server/hrms.db`).

## API Structure
- `GET /api/employees`
- `POST /api/employees`
- `DELETE /api/employees/:id`
- `GET /api/attendance`
- `POST /api/attendance`

## Assumptions
- Single admin user (no auth).
- Basic validation on email and required fields.
- Date is stored as string `YYYY-MM-DD`.
