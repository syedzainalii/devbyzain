# Start Frontend Server Script
Write-Host "Starting Next.js Frontend Server..." -ForegroundColor Green

# Install dependencies if node_modules doesn't exist
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Create .env.local if not exists
if (!(Test-Path ".env.local")) {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_API_URL=http://localhost:8000
"@ | Out-File -FilePath .env.local -Encoding utf8
}

# Start development server
Write-Host "Starting Next.js development server on http://localhost:3000..." -ForegroundColor Green
npm run dev
