# Mobile App

Expo SDK 55 React Native app for customers and workers.

## Requirements

- Node.js `20.19.4` or newer
- Expo Go compatible with SDK 55, or an Expo development build

## Setup

```powershell
npm install
Copy-Item .env.example .env
npm run expo:fix
```

## Configure API URL

For Android emulator:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

For a real phone on the same Wi-Fi network:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
```

After changing `.env`, restart Expo.

## Start Mobile App

Start the backend first, then run:

```powershell
npm start
```

Expo will show the QR code and emulator options.

## Available Scripts

```powershell
npm start
npm run android
npm run ios
npm run web
npm run expo:fix
```

## Notes

- Do not hardcode API URLs inside screens.
- API requests are configured in `src/api/apiClient.js`.
- Auth state is managed in `src/context/AuthContext.js`.
- Navigation is role-based for customer and worker users.
