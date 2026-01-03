# Start Backend Server Script
Write-Host "Starting FastAPI Backend Server..." -ForegroundColor Green

# Check if virtual environment exists
if (!(Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    py -m venv venv
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
py -m pip install -r requirements.txt

# Create .env if not exists
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
}

# Create uploads directory if not exists
if (!(Test-Path "uploads")) {
    Write-Host "Creating uploads directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "uploads"
}

# Start server
Write-Host "Starting FastAPI server on http://localhost:8000..." -ForegroundColor Green
Write-Host "API Documentation: http://localhost:8000/docs" -ForegroundColor Cyan
py -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
