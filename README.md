# Service Providing Mobile Application with Admin Dashboard

MERN + Expo monorepo for a home and building services application.

## Project Apps

- `backend` - Node.js, Express.js, MongoDB, Mongoose API.
- `admin-dashboard` - React admin dashboard.
- `mobile-app` - Expo SDK 55 React Native app for customers and workers.
- `docs` - Project documentation.

## Local Setup After Cloning

Run commands in separate terminals when starting the apps.

## 1. Backend Setup

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Update `backend/.env` with your MongoDB URL, JWT secret, and admin seed values.

Create or update the first admin user:

```powershell
npm run seed:admin
```

Start backend:

```powershell
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

## 2. Admin Dashboard Setup

```powershell
cd admin-dashboard
npm install
Copy-Item .env.example .env
npm run dev
```

Admin dashboard runs at:

```text
http://localhost:3000
```

Login with the admin email and password from `backend/.env` after running `npm run seed:admin`.

## 3. Mobile App Setup

```powershell
cd mobile-app
npm install
Copy-Item .env.example .env
npm run expo:fix
npm start
```

Expo will show a QR code and device/emulator options.

## Local API URLs

Backend API:

```text
http://localhost:5000/api
```

Admin dashboard `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Mobile app `.env` for Android emulator:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

Mobile app `.env` for real phone on same Wi-Fi:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
```

## Notes

- Run `npm install` separately inside `backend`, `admin-dashboard`, and `mobile-app`.
- Do not commit `.env`, `node_modules`, `dist`, `build`, or uploaded files.
- Do commit `.env.example`, source code, README files, docs, and package files.
- The npm scripts call local tools through Node directly, which avoids Windows path issues when the project folder contains special characters like `&`.
