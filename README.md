# Service Providing Mobile Application with Admin Dashboard

Local-first MERN + React Native monorepo for a home and building services platform.

## Apps

- `backend` - Node.js, Express.js, MongoDB, Mongoose API.
- `mobile-app` - Expo SDK 55 React Native app for customers and workers.
- `admin-dashboard` - React web dashboard for admins.
- `docs` - Project, API, database, and user-flow documentation.

## Architecture

The mobile app and admin dashboard do not communicate with each other. Both clients communicate with the shared backend API, and the backend is the only layer that reads or writes MongoDB.

```text
Mobile App -> Backend API -> MongoDB
Admin Dashboard -> Backend API -> MongoDB
```

## Local Development

Backend API:

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

Admin dashboard:

```powershell
cd admin-dashboard
npm install
npm run dev
```

Mobile app:

```powershell
cd mobile-app
npm install
npm run expo:fix
npm start
```

## Local URLs

- Backend: `http://localhost:5000`
- Backend API: `http://localhost:5000/api`
- Admin dashboard: `http://localhost:3000`
- Android emulator API URL: `http://10.0.2.2:5000/api`
- Physical device API URL: `http://YOUR_LOCAL_IP:5000/api`

## First Admin User

Configure `backend/.env`, then run:

```powershell
cd backend
npm run seed:admin
```

The seed values are read from `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PHONE`, and `ADMIN_PASSWORD`.

## What Not To Commit

Do not commit `.env`, `node_modules`, uploaded files, build folders, logs, or local IDE files.

Do commit `.env.example`, source code, `package.json`, `package-lock.json` after install, docs, README files, and `backend/uploads/.gitkeep`.

## Windows Path Note

The current project path contains `&`. On Windows, some `node_modules/.bin/*.cmd` files can break on that character.

Use the provided npm scripts:

```powershell
cd backend
npm run dev
```

```powershell
cd mobile-app
npm run expo:fix
npm start
```
