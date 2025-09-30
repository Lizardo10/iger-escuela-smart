@echo off
REM ============================================
REM Script de Despliegue Automatico - Windows
REM IGER Escuela Smart
REM ============================================

echo.
echo ====================================
echo DESPLIEGUE AUTOMATICO
echo IGER Escuela Smart
echo ====================================
echo.

REM Colores (opcional)
color 0A

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js no esta instalado
    pause
    exit /b 1
)

echo [1/7] Verificando dependencias...
echo.

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo Instalando dependencias del frontend...
    call npm install
)

if not exist "backend\node_modules" (
    echo Instalando dependencias del backend...
    cd backend
    call npm install
    cd ..
)

echo.
echo [2/7] Construyendo el frontend...
echo.
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Fallo al construir el frontend
    pause
    exit /b 1
)

echo.
echo [3/7] Verificando Git...
echo.

REM Verificar si es un repositorio git
if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    git add .
    git commit -m "Initial commit - IGER Escuela Smart"
    echo.
    echo IMPORTANTE: Debes conectar este repo a GitHub:
    echo   git remote add origin https://github.com/tu-usuario/tu-repo.git
    echo   git push -u origin main
    echo.
    pause
) else (
    echo Repositorio Git detectado
    git status
    echo.
    echo Subiendo cambios a GitHub...
    git add .
    git commit -m "Deploy: Configuracion de produccion completa"
    git push
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ADVERTENCIA: No se pudo hacer push automaticamente
        echo Por favor ejecuta manualmente: git push
        echo.
    )
)

echo.
echo [4/7] Instalando Vercel CLI...
echo.
call npm install -g vercel
if %ERRORLEVEL% NEQ 0 (
    echo ADVERTENCIA: No se pudo instalar Vercel CLI globalmente
    echo Intentando con npx...
)

echo.
echo [5/7] Instalando Render CLI...
echo.
call npm install -g @render/cli
if %ERRORLEVEL% NEQ 0 (
    echo ADVERTENCIA: No se pudo instalar Render CLI
    echo Usaremos el dashboard web para Render
)

echo.
echo ====================================
echo DESPLIEGUE DEL FRONTEND (Vercel)
echo ====================================
echo.
echo Iniciando despliegue en Vercel...
echo Sigue las instrucciones en pantalla:
echo   - Selecciona tu cuenta
echo   - Confirma el proyecto
echo   - Acepta las configuraciones
echo.

REM Intentar desplegar con Vercel
call vercel --prod
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Si Vercel CLI fallo, usa este comando:
    echo   npx vercel --prod
    echo.
    echo O despliega manualmente en: https://vercel.com
    echo.
)

echo.
echo ====================================
echo IMPORTANTE: CONFIGURAR VARIABLES
echo ====================================
echo.
echo Despues de desplegar en Vercel:
echo.
echo 1. Ve a: https://vercel.com/dashboard
echo 2. Selecciona tu proyecto
echo 3. Settings ^> Environment Variables
echo 4. Agrega: VITE_API_URL = https://tu-backend.onrender.com/api
echo 5. Redeploy el proyecto
echo.
pause

echo.
echo ====================================
echo DESPLIEGUE DEL BACKEND (Render)
echo ====================================
echo.
echo Render requiere configuracion manual:
echo.
echo 1. Ve a: https://dashboard.render.com
echo 2. Click: New ^> Web Service
echo 3. Conecta tu repositorio de GitHub
echo 4. Configuracion:
echo    - Name: iger-backend
echo    - Region: Oregon
echo    - Branch: main
echo    - Root Directory: backend
echo    - Build Command: npm install ^&^& node scripts/init-database-fixed.js
echo    - Start Command: npm start
echo.
echo 5. Variables de Entorno:
echo    NODE_ENV=production
echo    PORT=10000
echo    JWT_SECRET=tu-clave-secreta-cambiar-AHORA
echo    CORS_ORIGIN=https://tu-app.vercel.app
echo.
echo 6. Click: Create Web Service
echo.
pause

echo.
echo ====================================
echo PASO FINAL: ACTUALIZAR CORS
echo ====================================
echo.
echo Despues de que ambos esten desplegados:
echo.
echo 1. Copia la URL de Vercel (ej: https://mi-app.vercel.app)
echo 2. Ve a Render Dashboard
echo 3. Selecciona tu servicio backend
echo 4. Environment ^> Editar CORS_ORIGIN
echo 5. Poner la URL de Vercel
echo 6. Guardar (auto-redeploy)
echo.
echo ====================================
echo VERIFICACION FINAL
echo ====================================
echo.
echo Verifica que todo funcione:
echo 1. Backend Health: https://tu-backend.onrender.com/api/health
echo 2. Frontend: https://tu-app.vercel.app
echo 3. Login con: admin@iger.edu.gt / admin123
echo.
echo ====================================
echo DESPLIEGUE COMPLETADO
echo ====================================
echo.
echo URLs Importantes:
echo - Vercel Dashboard: https://vercel.com/dashboard
echo - Render Dashboard: https://dashboard.render.com
echo.
echo Credenciales de prueba:
echo   Admin:      admin@iger.edu.gt / admin123
echo   Profesor:   profesor@iger.edu.gt / prof123
echo   Estudiante: estudiante@iger.edu.gt / est123
echo.
pause
