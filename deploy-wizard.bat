@echo off
setlocal EnableDelayedExpansion

REM ============================================
REM ASISTENTE DE DESPLIEGUE AUTOMATICO
REM IGER Escuela Smart
REM ============================================

color 0B
title IGER - Asistente de Despliegue

echo.
echo   ╔════════════════════════════════════════╗
echo   ║   ASISTENTE DE DESPLIEGUE AUTOMATICO   ║
echo   ║        IGER Escuela Smart              ║
echo   ╚════════════════════════════════════════╝
echo.

REM Variables
set GITHUB_REPO=
set VERCEL_URL=
set RENDER_URL=
set JWT_SECRET=

echo Este asistente te ayudara a desplegar tu proyecto
echo en Vercel y Render de forma automatica.
echo.
pause

REM ============================================
REM PASO 1: PREPARACION
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 1: PREPARACION
echo ════════════════════════════════════════
echo.

echo Instalando dependencias...
if not exist "node_modules" (
    echo - Frontend...
    call npm install --silent
)
if not exist "backend\node_modules" (
    echo - Backend...
    cd backend
    call npm install --silent
    cd ..
)

echo.
echo Construyendo frontend...
call npm run build >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Build exitoso
) else (
    echo [ERROR] Fallo el build
    pause
    exit /b 1
)

echo.
echo [OK] Preparacion completa
pause

REM ============================================
REM PASO 2: GITHUB
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 2: SUBIR A GITHUB
echo ════════════════════════════════════════
echo.

REM Verificar si ya tiene remote
git remote -v >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Ya tienes un repositorio configurado
    git remote -v
    echo.
    set /p CONTINUE="Deseas hacer push ahora? (S/N): "
    if /i "!CONTINUE!"=="S" (
        git add .
        git commit -m "Deploy: Production ready"
        git push
        echo [OK] Codigo subido a GitHub
    )
) else (
    echo No tienes un repositorio remoto configurado
    echo.
    echo Opciones:
    echo 1. Configurar GitHub ahora
    echo 2. Continuar sin GitHub (manual despues)
    echo.
    set /p GITHUB_OPTION="Selecciona (1/2): "
    
    if "!GITHUB_OPTION!"=="1" (
        echo.
        echo Ve a GitHub y crea un nuevo repositorio
        echo Luego copia la URL (ej: https://github.com/usuario/repo.git)
        echo.
        set /p GITHUB_REPO="Pega la URL de tu repo: "
        
        git init
        git add .
        git commit -m "Initial commit - IGER Escuela Smart"
        git branch -M main
        git remote add origin !GITHUB_REPO!
        git push -u origin main
        
        echo [OK] Codigo subido a GitHub
    )
)

pause

REM ============================================
REM PASO 3: GENERAR JWT SECRET
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 3: SEGURIDAD
echo ════════════════════════════════════════
echo.

echo Generando clave JWT segura...
echo.

REM Generar JWT_SECRET aleatorio
set JWT_SECRET=iger_secret_!RANDOM!!RANDOM!!RANDOM!!RANDOM!_!RANDOM!!RANDOM!

echo Tu JWT_SECRET generado:
echo !JWT_SECRET!
echo.
echo GUARDA ESTA CLAVE - La necesitaras para Render
echo.

REM Guardar en archivo
echo JWT_SECRET=!JWT_SECRET! > JWT_SECRET.txt
echo CORS_ORIGIN=PENDIENTE_URL_VERCEL >> JWT_SECRET.txt

echo [OK] Clave guardada en: JWT_SECRET.txt
pause

REM ============================================
REM PASO 4: VERCEL
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 4: DESPLEGAR EN VERCEL (Frontend)
echo ════════════════════════════════════════
echo.

echo Opciones:
echo 1. Desplegar con Vercel CLI (automatico)
echo 2. Desplegar manualmente (dashboard web)
echo.
set /p VERCEL_OPTION="Selecciona (1/2): "

if "!VERCEL_OPTION!"=="1" (
    echo.
    echo Instalando Vercel CLI...
    call npm install -g vercel >nul 2>&1
    
    echo.
    echo Desplegando en Vercel...
    echo Sigue las instrucciones en pantalla:
    echo - Inicia sesion si es necesario
    echo - Acepta la configuracion predeterminada
    echo.
    
    call vercel --prod
    
    echo.
    set /p VERCEL_URL="Pega la URL de Vercel aqui: "
    echo !VERCEL_URL! > VERCEL_URL.txt
    
) else (
    echo.
    echo INSTRUCCIONES PARA VERCEL:
    echo ═══════════════════════════
    echo.
    echo 1. Ve a: https://vercel.com/new
    echo 2. Importa tu repositorio de GitHub
    echo 3. Framework Preset: Vite
    echo 4. Click: Deploy
    echo.
    echo Cuando termine el deploy, copia la URL
    echo.
    pause
    
    set /p VERCEL_URL="Pega la URL de Vercel: "
    echo !VERCEL_URL! > VERCEL_URL.txt
)

echo.
echo [OK] Vercel configurado
echo URL: !VERCEL_URL!
pause

REM ============================================
REM PASO 5: CONFIGURAR VARIABLE EN VERCEL
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 5: VARIABLES DE VERCEL
echo ════════════════════════════════════════
echo.

echo IMPORTANTE: Configura esta variable en Vercel
echo.
echo 1. Ve a: !VERCEL_URL!/settings/environment-variables
echo 2. O: https://vercel.com/dashboard (tu proyecto ^> Settings)
echo 3. Agrega esta variable:
echo.
echo    Variable: VITE_API_URL
echo    Value: PENDIENTE (la pondremos despues de Render)
echo.
echo Por ahora, deja esto pendiente
echo.
pause

REM ============================================
REM PASO 6: RENDER
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 6: DESPLEGAR EN RENDER (Backend)
echo ════════════════════════════════════════
echo.

echo Render requiere configuracion manual
echo.
echo INSTRUCCIONES:
echo ═══════════════
echo.
echo 1. Ve a: https://dashboard.render.com/create?type=web
echo.
echo 2. Connect a repository ^> Selecciona tu repo de GitHub
echo.
echo 3. Configuracion:
echo    Name: iger-backend
echo    Region: Oregon (o la mas cercana)
echo    Branch: main
echo    Root Directory: backend
echo    Runtime: Node
echo.
echo 4. Build Command (COPIA ESTO):
echo    npm install ^&^& node scripts/init-database-fixed.js
echo.
echo 5. Start Command (COPIA ESTO):
echo    npm start
echo.
echo 6. Instance Type: Free
echo.
echo 7. Environment Variables (IMPORTANTE):
echo.
echo    NODE_ENV = production
echo    PORT = 10000
echo    JWT_SECRET = !JWT_SECRET!
echo    CORS_ORIGIN = !VERCEL_URL!
echo.
echo Estas variables estan en: JWT_SECRET.txt
echo.

REM Crear archivo con config de Render
echo # CONFIGURACION RENDER > RENDER_CONFIG.txt
echo. >> RENDER_CONFIG.txt
echo Build Command: >> RENDER_CONFIG.txt
echo npm install ^&^& node scripts/init-database-fixed.js >> RENDER_CONFIG.txt
echo. >> RENDER_CONFIG.txt
echo Start Command: >> RENDER_CONFIG.txt
echo npm start >> RENDER_CONFIG.txt
echo. >> RENDER_CONFIG.txt
echo Environment Variables: >> RENDER_CONFIG.txt
echo NODE_ENV=production >> RENDER_CONFIG.txt
echo PORT=10000 >> RENDER_CONFIG.txt
echo JWT_SECRET=!JWT_SECRET! >> RENDER_CONFIG.txt
echo CORS_ORIGIN=!VERCEL_URL! >> RENDER_CONFIG.txt

echo [Guardado] Configuracion en: RENDER_CONFIG.txt
echo.
echo Presiona cualquier tecla para abrir el archivo...
pause >nul
notepad RENDER_CONFIG.txt

echo.
echo Cuando termines de configurar Render...
pause

set /p RENDER_URL="Pega la URL de Render (ej: https://xxx.onrender.com): "
echo !RENDER_URL! > RENDER_URL.txt

echo.
echo [OK] Render configurado
pause

REM ============================================
REM PASO 7: ACTUALIZAR VERCEL
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 7: ACTUALIZAR VERCEL
echo ════════════════════════════════════════
echo.

echo Ahora debes actualizar la variable en Vercel:
echo.
echo 1. Ve a: https://vercel.com/dashboard
echo 2. Selecciona tu proyecto
echo 3. Settings ^> Environment Variables
echo 4. Agrega o edita:
echo.
echo    VITE_API_URL = !RENDER_URL!/api
echo.
echo 5. Guarda y REDEPLOY el proyecto
echo.

echo VITE_API_URL=!RENDER_URL!/api > VERCEL_VAR.txt
echo.
echo [Guardado] Variable en: VERCEL_VAR.txt
notepad VERCEL_VAR.txt

pause

REM ============================================
REM PASO 8: VERIFICACION
REM ============================================
cls
echo.
echo ════════════════════════════════════════
echo PASO 8: VERIFICACION FINAL
echo ════════════════════════════════════════
echo.

echo Verifica que todo funcione:
echo.
echo 1. Backend Health Check:
echo    !RENDER_URL!/api/health
echo.
echo 2. Frontend:
echo    !VERCEL_URL!
echo.
echo 3. Login:
echo    Email: admin@iger.edu.gt
echo    Password: admin123
echo.

echo Abriendo URLs en el navegador...
timeout /t 2 >nul

start !RENDER_URL!/api/health
timeout /t 2 >nul
start !VERCEL_URL!

echo.
pause

REM ============================================
REM RESUMEN FINAL
REM ============================================
cls
echo.
echo   ╔════════════════════════════════════════╗
echo   ║         DESPLIEGUE COMPLETADO!         ║
echo   ╚════════════════════════════════════════╝
echo.
echo TUS URLs:
echo ══════════
echo Frontend: !VERCEL_URL!
echo Backend:  !RENDER_URL!
echo Health:   !RENDER_URL!/api/health
echo.
echo CREDENCIALES:
echo ═════════════
echo Admin:      admin@iger.edu.gt / admin123
echo Profesor:   profesor@iger.edu.gt / prof123
echo Estudiante: estudiante@iger.edu.gt / est123
echo.
echo ARCHIVOS CREADOS:
echo ═════════════════
echo - JWT_SECRET.txt (guarda este archivo de forma segura)
echo - RENDER_CONFIG.txt (configuracion de Render)
echo - VERCEL_VAR.txt (variable de Vercel)
echo - VERCEL_URL.txt (URL del frontend)
echo - RENDER_URL.txt (URL del backend)
echo.
echo DASHBOARDS:
echo ═══════════
echo Vercel:  https://vercel.com/dashboard
echo Render:  https://dashboard.render.com
echo.
echo ¡Tu aplicacion esta VIVA! 🚀
echo.
pause
