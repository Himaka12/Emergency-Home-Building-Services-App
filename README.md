# Service Provider App

Simple setup guide after cloning this project.

## 1. Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
```

Open `backend/.env` and add your MongoDB URL and JWT secret.

Then create the admin user:

```powershell
npm run seed:admin
```

Start backend:

```powershell
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## 2. Admin Dashboard

Open a new terminal:

```powershell
cd admin-dashboard
npm install
Copy-Item .env.example .env
npm run dev
```

Admin dashboard runs on:

```text
http://localhost:3000
```

Login using the admin email and password from `backend/.env`.

## 3. Mobile App

Open a new terminal:

```powershell
cd mobile-app
npm install
Copy-Item .env.example .env
npm run expo:fix
npm start
```

For Android emulator, keep this in `mobile-app/.env`:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

For a real phone, replace it with your computer IP:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
```

That is all.
