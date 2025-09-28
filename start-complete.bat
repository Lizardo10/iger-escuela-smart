@echo off
echo ========================================
echo    IGER Escuela Smart - Inicio Completo
echo ========================================
echo.

echo 🔄 Iniciando servidor backend...
start "IGER Backend" cmd /k "cd backend && node server-sqlite.js"

echo ⏳ Esperando 3 segundos para que el backend inicie...
timeout /t 3 /nobreak > nul

echo 🚀 Iniciando aplicación frontend...
start "IGER Frontend" cmd /k "npm run dev"

echo.
echo ✅ Ambos servidores iniciados correctamente!
echo.
echo 📱 Frontend: http://localhost:5173/
echo 🔧 Backend:  http://localhost:3001/api
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
