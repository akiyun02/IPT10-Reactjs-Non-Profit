@echo off
title Dev Launcher - Non-Profit Project
echo ========================================================
echo  Starting Frontend and Backend Development Servers...
echo ========================================================
echo.

:: Navigate to root directory of this script
cd /d "%~dp0"

:: Start Backend server in its own window
echo [1/2] Starting Backend Server (Express on port 4242)...
start "Backend Server (Express)" cmd /k "cd /d "%~dp0server" && npm start"

:: Start Frontend dev server in its own window
echo [2/2] Starting Frontend Dev Server (Vite on port 5173)...
start "Frontend Dev (Vite)" cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ========================================================
echo  Both servers have been started in separate windows!
echo  - Frontend: http://localhost:5173
echo  - Backend:  http://localhost:4242
echo.
echo  You can safely close this launcher window at any time.
echo ========================================================
pause

