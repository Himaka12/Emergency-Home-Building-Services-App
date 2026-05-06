# Admin Dashboard

React dashboard for admins. Customers and workers do not use this app.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Local URL:

```text
http://localhost:3000
```

## Current MVP Pages

- Admin login
- Dashboard summary
- Bookings
- Workers
- Customers
- Service categories
- Complaints

## Notes

- API calls are centralized in `src/api`.
- Admin auth state is managed in `src/context/AuthContext.jsx`.
- Protected routes prevent non-admin users from viewing dashboard pages.
- Styling is intentionally simple until backend workflows are tested.
