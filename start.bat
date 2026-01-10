@echo off
title Investment Dashboard
color 0A
echo ================================================
echo    INVESTMENT DASHBOARD - Starting Server
echo ================================================
echo.
cd /d "%~dp0"

if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo Dashboard will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.
call npm run dev
pause
