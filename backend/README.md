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

## MongoDB Atlas DNS

Some local routers and mobile hotspots fail MongoDB Atlas `mongodb+srv` DNS lookups. This project supports a DNS override through:

```env
DNS_SERVERS=8.8.8.8,1.1.1.1
```

Keep this in `backend/.env` if you see errors like `querySrv ECONNREFUSED`.

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

## Windows Path Note

This project is currently inside a folder path that contains `&`. Some Windows `.cmd` shims in `node_modules/.bin` break on that path.

Use the npm scripts in this project instead of calling local binaries directly:

```powershell
npm run dev
```

The `dev` script calls Nodemon through Node directly, so it avoids the broken `.cmd` path.
