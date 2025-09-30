#!/bin/bash

# ============================================
# Script de Despliegue Automatico - Linux/Mac
# IGER Escuela Smart
# ============================================

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}DESPLIEGUE AUTOMATICO${NC}"
echo -e "${GREEN}IGER Escuela Smart${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}ERROR: Node.js no está instalado${NC}"
    exit 1
fi

echo -e "${BLUE}[1/7] Verificando dependencias...${NC}"
echo ""

# Instalar dependencias si no existen
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias del frontend..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Instalando dependencias del backend..."
    cd backend
    npm install
    cd ..
fi

echo ""
echo -e "${BLUE}[2/7] Construyendo el frontend...${NC}"
echo ""
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}ERROR: Fallo al construir el frontend${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}[3/7] Verificando Git...${NC}"
echo ""

# Verificar si es un repositorio git
if [ ! -d ".git" ]; then
    echo "Inicializando repositorio Git..."
    git init
    git add .
    git commit -m "Initial commit - IGER Escuela Smart"
    echo ""
    echo -e "${YELLOW}IMPORTANTE: Debes conectar este repo a GitHub:${NC}"
    echo "  git remote add origin https://github.com/tu-usuario/tu-repo.git"
    echo "  git push -u origin main"
    echo ""
    read -p "Presiona Enter cuando hayas hecho push a GitHub..."
else
    echo "Repositorio Git detectado"
    git status
    echo ""
    echo "Subiendo cambios a GitHub..."
    git add .
    git commit -m "Deploy: Configuracion de produccion completa"
    git push
    if [ $? -ne 0 ]; then
        echo ""
        echo -e "${YELLOW}ADVERTENCIA: No se pudo hacer push automaticamente${NC}"
        echo "Por favor ejecuta manualmente: git push"
        echo ""
    fi
fi

echo ""
echo -e "${BLUE}[4/7] Instalando Vercel CLI...${NC}"
echo ""
if ! command -v vercel &> /dev/null; then
    npm install -g vercel
fi

echo ""
echo -e "${BLUE}[5/7] Instalando Render CLI...${NC}"
echo ""
if ! command -v render &> /dev/null; then
    npm install -g @render/cli
fi

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}DESPLIEGUE DEL FRONTEND (Vercel)${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "Iniciando despliegue en Vercel..."
echo "Sigue las instrucciones en pantalla:"
echo "  - Inicia sesión con tu cuenta"
echo "  - Selecciona configuración de proyecto"
echo "  - Confirma el despliegue"
echo ""

# Intentar desplegar con Vercel
vercel --prod
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${YELLOW}Si Vercel CLI falló, intenta:${NC}"
    echo "  npx vercel --prod"
    echo ""
    echo "O despliega manualmente en: https://vercel.com"
    echo ""
fi

echo ""
echo -e "${YELLOW}====================================${NC}"
echo -e "${YELLOW}IMPORTANTE: CONFIGURAR VARIABLES${NC}"
echo -e "${YELLOW}====================================${NC}"
echo ""
echo "Después de desplegar en Vercel:"
echo ""
echo "1. Ve a: https://vercel.com/dashboard"
echo "2. Selecciona tu proyecto"
echo "3. Settings > Environment Variables"
echo "4. Agrega: VITE_API_URL = https://tu-backend.onrender.com/api"
echo "5. Redeploy el proyecto"
echo ""
read -p "Presiona Enter cuando hayas configurado las variables..."

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}DESPLIEGUE DEL BACKEND (Render)${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "Render requiere configuración manual:"
echo ""
echo "1. Ve a: https://dashboard.render.com"
echo "2. Click: New > Web Service"
echo "3. Conecta tu repositorio de GitHub"
echo "4. Configuración:"
echo "   - Name: iger-backend"
echo "   - Region: Oregon"
echo "   - Branch: main"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install && node scripts/init-database-fixed.js"
echo "   - Start Command: npm start"
echo ""
echo "5. Variables de Entorno:"
echo "   NODE_ENV=production"
echo "   PORT=10000"
echo "   JWT_SECRET=tu-clave-secreta-cambiar-AHORA"
echo "   CORS_ORIGIN=https://tu-app.vercel.app"
echo ""
echo "6. Click: Create Web Service"
echo ""
read -p "Presiona Enter cuando hayas desplegado en Render..."

echo ""
echo -e "${YELLOW}====================================${NC}"
echo -e "${YELLOW}PASO FINAL: ACTUALIZAR CORS${NC}"
echo -e "${YELLOW}====================================${NC}"
echo ""
echo "Después de que ambos estén desplegados:"
echo ""
echo "1. Copia la URL de Vercel (ej: https://mi-app.vercel.app)"
echo "2. Ve a Render Dashboard"
echo "3. Selecciona tu servicio backend"
echo "4. Environment > Editar CORS_ORIGIN"
echo "5. Poner la URL de Vercel"
echo "6. Guardar (auto-redeploy)"
echo ""
read -p "Presiona Enter cuando hayas actualizado CORS..."

echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}VERIFICACION FINAL${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "Verifica que todo funcione:"
echo "1. Backend Health: https://tu-backend.onrender.com/api/health"
echo "2. Frontend: https://tu-app.vercel.app"
echo "3. Login con: admin@iger.edu.gt / admin123"
echo ""
echo -e "${GREEN}====================================${NC}"
echo -e "${GREEN}DESPLIEGUE COMPLETADO${NC}"
echo -e "${GREEN}====================================${NC}"
echo ""
echo "URLs Importantes:"
echo "- Vercel Dashboard: https://vercel.com/dashboard"
echo "- Render Dashboard: https://dashboard.render.com"
echo ""
echo "Credenciales de prueba:"
echo "  Admin:      admin@iger.edu.gt / admin123"
echo "  Profesor:   profesor@iger.edu.gt / prof123"
echo "  Estudiante: estudiante@iger.edu.gt / est123"
echo ""
