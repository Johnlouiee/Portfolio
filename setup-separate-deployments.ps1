# PowerShell script to set up separate frontend and backend directories
# This moves files into frontend/ and backend/ directories for separate deployments

Write-Host "=== Setting up separate frontend and backend deployments ===" -ForegroundColor Green

# Create directories if they don't exist
if (-not (Test-Path "frontend")) {
    New-Item -ItemType Directory -Path "frontend" | Out-Null
}
if (-not (Test-Path "backend")) {
    New-Item -ItemType Directory -Path "backend" | Out-Null
}

# Move frontend files
Write-Host "Moving frontend files..." -ForegroundColor Yellow
if (Test-Path "src") {
    Move-Item -Path "src" -Destination "frontend\src" -Force
    Write-Host "✓ Moved src/ to frontend/" -ForegroundColor Green
}

if (Test-Path "public") {
    Move-Item -Path "public" -Destination "frontend\public" -Force
    Write-Host "✓ Moved public/ to frontend/" -ForegroundColor Green
}

# Copy backend files
Write-Host "Moving backend files..." -ForegroundColor Yellow
if (Test-Path "server\server.js") {
    Copy-Item -Path "server\server.js" -Destination "backend\server.js" -Force
    Write-Host "✓ Copied server/server.js to backend/server.js" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend structure: frontend/src, frontend/public, frontend/package.json"
Write-Host "Backend structure: backend/server.js, backend/package.json"
Write-Host ""
Write-Host "For Render deployment:" -ForegroundColor Cyan
Write-Host "  - Frontend service: Root directory = 'frontend'"
Write-Host "  - Backend service: Root directory = 'backend'"

