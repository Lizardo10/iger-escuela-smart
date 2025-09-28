@echo off
echo 🚀 Iniciando IGER Escuela Smart...

echo 📡 Iniciando backend...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 Iniciando frontend...
start "Frontend" cmd /k "npm run dev"

echo ✅ Servidores iniciados!
echo 📊 Backend: http://localhost:3001
echo 🎨 Frontend: http://localhost:5173
pause
