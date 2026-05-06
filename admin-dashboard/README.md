# Admin Dashboard

React dashboard for admins.

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Check `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Start Admin Dashboard

Start the backend first, then run:

```powershell
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Admin Login

Before logging in, create the admin user from the backend folder:

```powershell
cd ../backend
npm run seed:admin
```

Then login using the admin email and password from `backend/.env`.

## Available Scripts

```powershell
npm run dev
npm run build
npm run preview
```

## Pages

- Login
- Dashboard
- Bookings
- Workers
- Customers
- Service categories
- Complaints
