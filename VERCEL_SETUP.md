# Vercel Environment Variables Setup

## 🚨 IMPORTANT: Add these to your Vercel backend project

Go to: https://vercel.com/dashboard → Your Backend Project → Settings → Environment Variables

## Required Environment Variables:

### Database
```
DATABASE_URL=postgresql://neondb_owner:npg_x3K6WoPGlcYy@ep-frosty-sky-a19enazi-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

⚠️ **IMPORTANT**: Make sure this is EXACTLY the database URL you tested earlier!
- Host: `ep-frosty-sky-a19enazi-pooler.ap-southeast-1.aws.neon.tech`
- This is the database where we created tables and admin user!

### Admin Authentication
```
ADMIN_EMAIL=syedzainali4372@gmail.com
ADMIN_PASSWORD=zain2002
```

### JWT Configuration
```
SECRET_KEY=devbyzain-super-secret-key-2026-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

### URLs
```
FRONTEND_URL=https://devbyzain.vercel.app
BACKEND_URL=https://devbyzain-backend.vercel.app
```

### Email Configuration
```
MAIL_USERNAME=Devbyzain
MAIL_PASSWORD=dfzd syyk igxl bmgb
MAIL_FROM=syedzainali4372@gmail.com
MAIL_FROM_NAME=DevbyZain
MAIL_PORT=587
MAIL_SERVER=smtp.gmail.com
```

### Upload Configuration
```
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=10485760
```

## ⚙️ How to Add:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your backend project (devbyzain-backend)
3. Go to **Settings** tab
4. Click **Environment Variables** in the left sidebar
5. For each variable above:
   - Click "Add New"
   - Enter the variable name (e.g., `DATABASE_URL`)
   - Enter the value
   - Select: **Production, Preview, and Development**
   - Click "Save"
6. After adding all variables, Vercel will automatically redeploy
7. Wait 2-3 minutes for deployment to complete

## ✅ Verification:

After deployment completes, test:
- https://devbyzain-backend.vercel.app/api/health (should return healthy status)
- Login at https://devbyzain.vercel.app/admin (should work without errors)

## 🔒 Security Note:

**NEVER** commit the `.env` file or share these credentials publicly!
