# Mobile App

Expo React Native app shared by customers and workers.

This app is configured for Expo SDK 55.

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run expo:fix
npm start
```

SDK 55 requires Node.js `20.19.4` or newer.

## Windows Path Note

This project is currently inside a folder path that contains `&`. On Windows, `npx expo ...` can break because the generated Expo `.cmd` file does not handle that path safely.

Use these npm scripts instead:

```powershell
npm run expo:fix
npm start
```

## Expo Go SDK 55 Note

Expo SDK 55 uses React Native `0.83.6` and React `19.2.0`. During the SDK 55 release transition, Expo Go from the app stores may not always match SDK 55 immediately. If Expo Go complains about SDK mismatch, install/run the SDK 55-compatible Expo Go through Expo CLI or use a development build.

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
