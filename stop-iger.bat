@echo off
echo ========================================
echo    IGER Escuela Smart - Detener Servidores
echo ========================================
echo.

echo 🛑 Deteniendo servidores IGER...

echo 🔍 Buscando procesos en puerto 3001 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Matando proceso %%a...
    taskkill /PID %%a /F >nul 2>&1
)

echo 🔍 Buscando procesos en puerto 5173 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo Matando proceso %%a...
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo ✅ Servidores detenidos correctamente!
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
