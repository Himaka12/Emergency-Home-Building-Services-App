# Project Documentation

## Overview

This project is a service-providing application for home and building maintenance services such as electrician work, plumbing, cleaning, appliance repair, AC repair, and related support.

The MVP has three user roles:

- Customer
- Worker
- Admin

Customers and workers use one shared Expo React Native mobile app. Admins use a separate React web dashboard.

## System Architecture

The project uses a local-first monorepo:

```text
mobile-app -> backend -> MongoDB
admin-dashboard -> backend -> MongoDB
```

The mobile app and admin dashboard never communicate directly. All business logic, authorization, validation, and database access live in the backend API.

## Technology Stack

- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Mobile app: React Native with Expo
- Admin dashboard: React.js
- Authentication: JWT and bcrypt
- API requests: Axios
- Image uploads: local upload folder first
- Push notifications: structure prepared for Expo Push Notifications later

## MVP Scope

Included:

- Customer registration and login
- Worker registration and login
- Admin login
- Service categories
- Manual booking creation
- Manual admin worker assignment
- Booking status management
- Worker approval
- Ratings after completed jobs

Excluded for now:

- Online payments
- Live tracking
- Automatic nearest-worker matching
- In-app chat
- Full push notification implementation

## Development Phases

1. Create folder structure.
2. Initialize backend.
3. Add MongoDB connection.
4. Add models.
5. Add auth routes.
6. Add role middleware.
7. Add service category routes.
8. Add booking routes.
9. Add worker routes.
10. Add admin routes.
11. Test backend with Postman.
12. Initialize admin dashboard.
13. Connect admin dashboard to backend.
14. Initialize mobile app.
15. Connect mobile app to backend.
16. Add push notification structure later.
17. Test locally.
18. Push to GitHub.
19. Deploy later.
