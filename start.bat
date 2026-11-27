@echo off
title Dev Launcher - Non-Profit Project
echo ========================================================
echo  Starting Frontend, Stripe Server, and Laravel Filament CMS...
echo ========================================================
echo.

:: Navigate to root directory of this script
cd /d "%~dp0"

:: Auto-initialize SQLite database if missing
if not exist "backend\database\database.sqlite" (
    echo [Setup] Creating and seeding SQLite database...
    type nul > "backend\database\database.sqlite"
    pushd "%~dp0backend"
    php -d extension=intl -d extension=zip -d extension=pdo_sqlite -d extension=sqlite3 artisan migrate:fresh --seed --force
    popd
)

:: Start Laravel Headless API & Filament Dashboard in its own window
echo [1/3] Starting Laravel API ^& Filament Dashboard (Port 8000)...
start "Laravel Filament CMS (Port 8000)" cmd /k "cd /d "%~dp0backend\public" && php -d extension=intl -d extension=zip -d extension=pdo_sqlite -d extension=sqlite3 -S 127.0.0.1:8000 ../vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php"

:: Start Stripe Backend server in its own window
echo [2/3] Starting Stripe Payment Server (Express on port 4242)...
start "Stripe Server (Express)" cmd /k "cd /d "%~dp0server" && npm start"

:: Start Frontend dev server in its own window
echo [3/3] Starting Frontend Dev Server (Vite on port 5173)...
start "Frontend Dev (Vite)" cmd /k "cd /d "%~dp0" && npm run dev"

:: Wait briefly then open the frontend in default browser
timeout /t 3 /nobreak > nul
start "" "http://localhost:5173"

echo.
echo ========================================================
echo  All servers have been started in separate windows!
echo  - Frontend:             http://localhost:5173
echo  - Filament Dashboard:   http://localhost:8000/admin
echo  - Laravel Headless API: http://localhost:8000/api/cms/health
echo  - Stripe Backend:       http://localhost:4242
echo.
echo  Filament Login: admin@charitize.org / password
echo  Run stop.bat anytime to close all 3 server windows.
echo ========================================================
pause
