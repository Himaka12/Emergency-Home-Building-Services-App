# Backend API

Node.js, Express.js, MongoDB, and Mongoose backend.

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Update `.env` before starting the backend.

Required values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
ADMIN_NAME=Local Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PHONE=0700000000
ADMIN_PASSWORD=Admin@12345
DNS_SERVERS=8.8.8.8,1.1.1.1
```

## Create First Admin User

Run this after updating `.env`:

```powershell
npm run seed:admin
```

This creates or updates the admin user using:

```env
ADMIN_EMAIL
ADMIN_PASSWORD
```

## Start Backend

```powershell
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api
```

Health check:

```text
http://localhost:5000/health
```

## Available Scripts

```powershell
npm run dev
npm start
npm run seed:admin
```

## Main Route Groups

- `/api/auth`
- `/api/services`
- `/api/bookings`
- `/api/workers`
- `/api/admin`
- `/api/ratings`
- `/api/complaints`
- `/api/notifications`

## MongoDB Atlas Note

If MongoDB Atlas gives DNS errors such as `querySrv ECONNREFUSED`, keep this in `.env`:

```env
DNS_SERVERS=8.8.8.8,1.1.1.1
```
