# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup Backend (Python/FastAPI)

```powershell
# Navigate to server directory
cd server

# Create virtual environment
py -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# The .env file is already configured with SQLite
# Start the backend server
py -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

**Backend will be running at:**
- API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Step 2: Setup Frontend (Next.js)

Open a new terminal window:

```powershell
# Navigate to client directory
cd client

# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

**Frontend will be running at:**
- Website: http://localhost:3000

### Step 3: Access the Application

1. **Visit the website**: http://localhost:3000
2. **Admin Login**: http://localhost:3000/admin
   - Default Email: `admin@example.com`
   - Default Password: `admin123`

## 🎯 Quick Launch Scripts

### Launch Everything at Once

```powershell
# Run from project root
.\start_dev.ps1
```

This will open two PowerShell windows - one for backend, one for frontend.

### Individual Launch Scripts

**Backend only:**
```powershell
cd server
.\start_backend.ps1
```

**Frontend only:**
```powershell
cd client
.\start_frontend.ps1
```

## 📱 Main Features

### Public Pages
- **Home** (`/`) - Hero section with animations
- **Portfolio** (`/portfolio`) - Product showcase gallery
- **Portfolio Detail** (`/portfolio/[id]`) - Individual product details
- **Services** (`/services`) - Custom website request form
- **About** (`/about`) - About me page
- **Order** (`/order`) - Purchase and customization orders

### Admin Dashboard (`/admin`)
- **Products Management** (`/admin/products`) - Add/Edit/Delete products
- **Orders Management** (`/admin/orders`) - View and manage orders
- **Requests Management** (`/admin/requests`) - Handle custom requests
- **File Upload** - Upload images from your device

## 🔑 Default Admin Credentials

**⚠️ IMPORTANT: Change these in production!**

Located in `server/.env`:
```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## 📁 File Upload

Images are stored in `server/uploads/` directory and served at `/uploads/{filename}`

Supported formats: JPG, PNG, GIF, WebP
Max size: 10MB

## 🛠️ Environment Variables

### Backend (`server/.env`)
```env
DATABASE_URL=sqlite:///./portfolio.db
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
SECRET_KEY=your-secret-key-change-in-production
UPLOAD_DIR=uploads
MAX_UPLOAD_SIZE=10485760
```

### Frontend (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Deployment to Vercel

1. **Push code to GitHub**
2. **Import project in Vercel**
3. **Set environment variables in Vercel dashboard:**
   - `DATABASE_URL` - PostgreSQL connection string
   - `ADMIN_EMAIL` - Your admin email
   - `ADMIN_PASSWORD` - Secure password
   - `SECRET_KEY` - Strong secret key
   - `NEXT_PUBLIC_API_URL` - Your Vercel API URL

4. **Deploy!**

The `vercel.json` is already configured to route:
- `/api/*` → FastAPI backend
- `/uploads/*` → Static files
- Everything else → Next.js frontend

## 🧪 Testing

### Test Backend API
Visit http://localhost:8000/docs for interactive API documentation

### Test Frontend Build
```powershell
cd client
npm run build
```

### Test Production Build
```powershell
cd client
npm run build
npm start
```

## 📝 Common Commands

### Backend
```powershell
# Install dependencies
pip install -r requirements.txt

# Run migrations (tables auto-create on first run)
# No manual migration needed

# Start server
py -m uvicorn api.main:app --reload
```

### Frontend
```powershell
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### Backend won't start
- Make sure Python is installed: `py --version`
- Check if port 8000 is available
- Verify virtual environment is activated
- Check `.env` file exists

### Frontend won't build
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check `package.json` for correct dependencies

### Database errors
- Delete `portfolio.db` file to reset database
- Backend will recreate tables on next start

### File upload issues
- Ensure `server/uploads` directory exists
- Check file size is under 10MB
- Verify file format is supported (JPG, PNG, GIF, WebP)

## 📚 Project Structure

```
├── client/                    # Next.js Frontend
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable components
│   ├── lib/                  # API & utilities
│   └── public/               # Static assets
│
├── server/                   # FastAPI Backend
│   ├── api/                  # API routes
│   ├── models.py             # Database models
│   ├── schemas.py            # Pydantic schemas
│   ├── auth.py               # Authentication
│   ├── config.py             # Settings
│   └── uploads/              # Upload directory
│
└── vercel.json               # Vercel deployment config
```

## 💡 Tips

1. **Keep backend running** while developing frontend
2. **Use API docs** at `/docs` to test endpoints
3. **Check browser console** for frontend errors
4. **Monitor backend logs** for API errors
5. **Backup database** before major changes

## 🎨 Customization

- **Colors**: Edit CSS variables in `client/app/globals.css`
- **Components**: Modify files in `client/components/`
- **API Logic**: Update `server/api/main.py`
- **Database**: Modify `server/models.py`

---

**Built with ❤️ using Next.js 15 and FastAPI**

Need help? Check the main README.md for detailed documentation.
