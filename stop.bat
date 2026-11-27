@echo off
title Stop All Dev Servers
echo Stopping Charitize development server windows...

taskkill /FI "WINDOWTITLE eq Laravel Filament CMS (Port 8000)*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Stripe Server (Express)*" /T /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Frontend Dev (Vite)*" /T /F >nul 2>&1

echo All dev servers stopped.
timeout /t 2 /nobreak > nul

