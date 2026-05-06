# Mobile App Setup

Start the backend first.

Then run:

```powershell
npm install
Copy-Item .env.example .env
npm run expo:fix
npm start
```

Android emulator API URL:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
```

Real phone API URL:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
```
