@echo off
REM Script de inicio limpio para IGER Escuela Smart

echo 🚀 IGER Escuela Smart - Sistema Completo
echo ========================================
echo ✨ Calendarios por rol ✨
echo 🤖 Chat IA especializado ✨
echo 📚 Sistema de tareas corregido ✨
echo 👥 Dashboards segmentados ✨
echo.

REM Verificar dependencias
if not exist "node_modules" (
    echo ⚠️  Instalando dependencias...
    call npm install --silent
    echo ✅ Dependencias instaladas
)

if not exist "backend\node_modules" (
    cd backend
    call npm install --silent
    cd ..
)

REM Verificar base de datos
if not exist "backend\database.sqlite" (
    echo ℹ️  Inicializando base de datos...
    cd backend
    call node scripts/init-database-fixed.js >nul 2>&1
    cd ..
    echo ✅ Base de datos inicializada
)

REM Verificar configuración de OpenAI
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado
    echo ℹ️  Ejecuta: setup-env.bat para configurar OpenAI
    echo.
    echo 🚀 Iniciando sistema sin OpenAI...
) else (
    echo ✅ Configuración de OpenAI encontrada
)

REM Iniciar backend
echo ℹ️  Iniciando backend...
cd backend
start "IGER Backend" cmd /k "node server-sqlite.js"
cd ..

REM Esperar 2 segundos
timeout /t 2 /nobreak >nul

REM Iniciar frontend
echo ℹ️  Iniciando frontend...
start "IGER Frontend" cmd /k "npm run dev"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

echo ✅ 🎉 ¡IGER Escuela Smart está funcionando!
echo.
echo 🌐 Acceso:
echo    • Frontend: http://localhost:5173
echo    • Backend: http://localhost:3001/api
echo.
echo 👤 Usuarios de prueba:
echo    • admin@iger.edu (Administrador)
echo    • ana.martinez@iger.edu (Maestro)
echo    • maria.garcia@iger.edu (Estudiante)
echo.
echo 🔧 Para configurar OpenAI:
echo    • Ejecuta: setup-env.bat
echo.

REM Abrir navegador
timeout /t 1 /nobreak >nul
start http://localhost:5173

pause
