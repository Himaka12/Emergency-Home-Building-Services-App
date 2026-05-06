# Mobile App

Expo React Native app shared by customers and workers.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm start
```

## API URL

Android emulator:

```text
http://10.0.2.2:5000/api
```

Physical mobile device:

```text
http://YOUR_LOCAL_IP:5000/api
```

Use `EXPO_PUBLIC_API_URL` in `.env`. Do not hardcode API URLs inside screens.

## Current Structure

- `src/api` - Axios client and API methods.
- `src/context` - Auth state.
- `src/navigation` - Auth, customer, worker, and root navigators.
- `src/screens` - Role-based screen placeholders.
- `src/storage` - Token storage helper.
- `src/constants` - Roles and booking statuses.

## Later Additions

- Image picker and local upload flow.
- Expo Push Notifications registration.
- Stronger form validation.
- More complete booking and worker workflows.
