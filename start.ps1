# Hedeya Development Setup Script

Write-Host "Setting up Hedeya E-commerce Website..." -ForegroundColor Green

# Set execution policy for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force

# Check if node_modules exists
if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start the development server
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "The website will open at http://localhost:3000" -ForegroundColor Cyan

npm run dev
