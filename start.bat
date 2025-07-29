@echo off
echo Starting Hedeya E-commerce Website...
echo.

REM Set execution policy for this session
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force"

REM Start the development server
npm run dev

pause
