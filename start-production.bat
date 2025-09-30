@echo off
REM Script para iniciar el proyecto completo en producción local

echo ====================================
echo IGER Escuela Smart
echo Modo Produccion Local
echo ====================================
echo.

REM Verificar si Node.js está instalado
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado
    echo Por favor instala Node.js primero
    pause
    exit /b 1
)

REM Instalar dependencias del frontend si es necesario
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    call npm install
)

REM Instalar dependencias del backend si es necesario
if not exist "backend\node_modules" (
    echo Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

REM Verificar si existe la base de datos
if not exist "backend\database.sqlite" (
    echo Inicializando base de datos...
    cd backend
    call npm run init-db
    cd ..
)

echo.
echo Construyendo el frontend...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Fallo al construir el frontend
    pause
    exit /b 1
)

echo.
echo ====================================
echo Iniciando servicios...
echo ====================================
echo.

REM Crear script temporal para el backend
echo @echo off > temp_backend.bat
echo cd backend >> temp_backend.bat
echo call npm start >> temp_backend.bat

REM Crear script temporal para el frontend
echo @echo off > temp_frontend.bat
echo call npm run preview >> temp_frontend.bat

REM Iniciar backend en nueva ventana
start "IGER Backend" /D "%CD%" temp_backend.bat

REM Esperar un momento
timeout /t 3 /nobreak >nul

REM Iniciar frontend en nueva ventana
start "IGER Frontend" /D "%CD%" temp_frontend.bat

REM Esperar un momento
timeout /t 2 /nobreak >nul

echo.
echo ====================================
echo SERVICIOS INICIADOS
echo ====================================
echo.
echo Frontend: http://localhost:4173
echo Backend:  http://localhost:3001/api
echo Health:   http://localhost:3001/api/health
echo.
echo Credenciales de prueba:
echo   Admin:      admin@iger.edu.gt / admin123
echo   Profesor:   profesor@iger.edu.gt / prof123
echo   Estudiante: estudiante@iger.edu.gt / est123
echo.
echo ====================================
echo.
echo Presiona cualquier tecla para salir y detener los servicios...
pause >nul

REM Cerrar las ventanas del backend y frontend
taskkill /FI "WindowTitle eq IGER Backend*" /F >nul 2>nul
taskkill /FI "WindowTitle eq IGER Frontend*" /F >nul 2>nul

REM Limpiar archivos temporales
del temp_backend.bat >nul 2>nul
del temp_frontend.bat >nul 2>nul

echo Servicios detenidos
