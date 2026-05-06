# Backend API

Node.js, Express.js, MongoDB, and Mongoose backend for the mobile app and admin dashboard.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

API base URL:

```text
http://localhost:5000/api
```

## First Admin User

Edit `backend/.env`, then run:

```powershell
npm run seed:admin
```

The script creates or updates the admin user using the `ADMIN_*` values in `.env`.

## Main Route Groups

- `/api/auth`
- `/api/services`
- `/api/bookings`
- `/api/workers`
- `/api/admin`
- `/api/ratings`
- `/api/complaints`
- `/api/notifications`

## Notes

- Passwords are hashed with bcrypt before saving.
- JWT is used for protected routes.
- Role authorization is enforced in middleware.
- Uploaded files will be stored in `uploads` during local development.
- Cloudinary and Expo Push Notifications can be added later without changing the main folder structure.
