# Start Both Backend and Frontend in Parallel
Write-Host "Starting Development Environment..." -ForegroundColor Cyan

# Start backend in new window
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; .\start_backend.ps1"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; .\start_frontend.ps1"

Write-Host ""
Write-Host "Development environment started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Backend API Docs: http://localhost:8000/docs" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
