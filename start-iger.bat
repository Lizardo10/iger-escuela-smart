@echo off
echo ========================================
echo    IGER Escuela Smart - Inicio Inteligente
echo ========================================
echo.

echo 🔍 Verificando si el backend ya está corriendo...
curl -s http://localhost:3001/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend ya está funcionando en puerto 3001
) else (
    echo 🔄 Iniciando servidor backend...
    start "IGER Backend" cmd /k "cd backend && node server-sqlite.js"
    echo ⏳ Esperando 5 segundos para que el backend inicie...
    timeout /t 5 /nobreak > nul
)

echo 🔍 Verificando si el frontend ya está corriendo...
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Frontend ya está funcionando en puerto 5173
) else (
    echo 🚀 Iniciando aplicación frontend...
    start "IGER Frontend" cmd /k "npm run dev"
    echo ⏳ Esperando 3 segundos para que el frontend inicie...
    timeout /t 3 /nobreak > nul
)

echo.
echo ✅ Verificación completa!
echo.
echo 📱 Frontend: http://localhost:5173/
echo 🔧 Backend:  http://localhost:3001/api
echo.
echo 👤 Usuarios de prueba:
echo    - admin@iger.edu (Administrador)
echo    - ana.martinez@iger.edu (Maestro)
echo    - maria.garcia@iger.edu (Estudiante)
echo.
echo 🌐 Abriendo aplicación en el navegador...
start http://localhost:5173/
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
