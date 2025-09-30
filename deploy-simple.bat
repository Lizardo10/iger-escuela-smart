@echo off
REM ============================================
REM Script Simple de Despliegue
REM Solo prepara y sube a GitHub
REM ============================================

echo ====================================
echo PREPARACION PARA DESPLIEGUE
echo ====================================
echo.

REM Verificar dependencias
echo [1/5] Verificando dependencias...
if not exist "node_modules" npm install
if not exist "backend\node_modules" (
    cd backend
    npm install
    cd ..
)

REM Build
echo.
echo [2/5] Construyendo frontend...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR en build
    pause
    exit /b 1
)

REM Git
echo.
echo [3/5] Preparando Git...
git add .
git commit -m "Ready for production deployment"

echo.
echo [4/5] Subiendo a GitHub...
git push
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Si no tienes repositorio remoto configurado:
    echo   git remote add origin https://github.com/tu-usuario/tu-repo.git
    echo   git push -u origin main
    echo.
    pause
)

echo.
echo [5/5] Creando archivo de configuracion...

REM Crear archivo con las instrucciones
echo # INSTRUCCIONES DE DESPLIEGUE > NEXT-STEPS.txt
echo. >> NEXT-STEPS.txt
echo TU CODIGO ESTA EN GITHUB! >> NEXT-STEPS.txt
echo. >> NEXT-STEPS.txt
echo PASO 1: BACKEND EN RENDER >> NEXT-STEPS.txt
echo -------------------------- >> NEXT-STEPS.txt
echo 1. Ve a: https://dashboard.render.com >> NEXT-STEPS.txt
echo 2. Click: New ^> Web Service >> NEXT-STEPS.txt
echo 3. Conecta tu repo de GitHub >> NEXT-STEPS.txt
echo 4. Root Directory: backend >> NEXT-STEPS.txt
echo 5. Build: npm install ^&^& node scripts/init-database-fixed.js >> NEXT-STEPS.txt
echo 6. Start: npm start >> NEXT-STEPS.txt
echo 7. Variables: >> NEXT-STEPS.txt
echo    JWT_SECRET=cambiar-clave-segura >> NEXT-STEPS.txt
echo    CORS_ORIGIN=https://tu-app.vercel.app >> NEXT-STEPS.txt
echo. >> NEXT-STEPS.txt
echo PASO 2: FRONTEND EN VERCEL >> NEXT-STEPS.txt
echo --------------------------- >> NEXT-STEPS.txt
echo 1. Ve a: https://vercel.com/new >> NEXT-STEPS.txt
echo 2. Importa tu repo >> NEXT-STEPS.txt
echo 3. Framework: Vite >> NEXT-STEPS.txt
echo 4. Variable: VITE_API_URL=https://tu-backend.onrender.com/api >> NEXT-STEPS.txt
echo. >> NEXT-STEPS.txt
echo PASO 3: ACTUALIZAR CORS >> NEXT-STEPS.txt
echo ----------------------- >> NEXT-STEPS.txt
echo 1. Render ^> Environment ^> CORS_ORIGIN = URL de Vercel >> NEXT-STEPS.txt
echo. >> NEXT-STEPS.txt
echo CREDENCIALES: >> NEXT-STEPS.txt
echo admin@iger.edu.gt / admin123 >> NEXT-STEPS.txt

echo.
echo ====================================
echo LISTO PARA DESPLEGAR!
echo ====================================
echo.
echo Tu codigo esta en GitHub
echo.
echo Ahora sigue los pasos en: NEXT-STEPS.txt
echo.
echo O usa los comandos CLI:
echo   vercel --prod
echo.
notepad NEXT-STEPS.txt
pause
