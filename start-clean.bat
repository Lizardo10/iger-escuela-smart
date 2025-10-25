@echo off
echo.
echo ========================================
echo   IGER Escuela Smart - Sistema Completo
echo ========================================
echo.
echo ✅ Calendarios por rol
echo ✅ Chat IA especializado  
echo ✅ Sistema de tareas corregido
echo ✅ Dashboards segmentados
echo.

REM Verificar si existe .env
if not exist .env (
    echo 📝 Copiando configuración...
    copy env-config .env >nul
    echo ✅ Archivo .env creado
) else (
    echo ✅ Configuración de OpenAI encontrada
)

echo.
echo 🚀 Iniciando backend...
start "Backend" cmd /k "cd backend && node server-sqlite.js"

timeout /t 3 /nobreak >nul

echo 🚀 Iniciando frontend...
start "Frontend" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ✅ ¡IGER Escuela Smart está funcionando!
echo.
echo 🌐 Acceso:
echo    • Frontend: http://localhost:5173
echo    • Backend: http://localhost:3001/api
echo.
echo 👥 Usuarios de prueba:
echo    • admin@iger.edu (Administrador)
echo    • ana.martinez@iger.edu (Maestro)
echo    • maria.garcia@iger.edu (Estudiante)
echo.
echo 🔧 Para configurar OpenAI:
echo    • Ejecuta: setup-env.bat
echo.
pause
