# Backend Setup

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env` and add:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
```

Create admin user:

```powershell
npm run seed:admin
```

Start backend:

```powershell
npm run dev
```

Backend URL:

```text
http://localhost:5000
```
