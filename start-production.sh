#!/bin/bash

# Script para iniciar el proyecto completo en producción local

echo "🚀 Iniciando IGER Escuela Smart - Modo Producción Local"
echo ""

# Colores para mejor visualización
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js primero."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala npm primero."
    exit 1
fi

# Instalar dependencias del frontend si es necesario
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias del frontend...${NC}"
    npm install
fi

# Instalar dependencias del backend si es necesario
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias del backend...${NC}"
    cd backend
    npm install
    cd ..
fi

# Verificar si existe la base de datos
if [ ! -f "backend/database.sqlite" ]; then
    echo -e "${YELLOW}🗄️  Inicializando base de datos...${NC}"
    cd backend
    npm run init-db
    cd ..
fi

echo ""
echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"
echo ""

# Construir el frontend
echo -e "${BLUE}🔨 Construyendo el frontend...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend construido correctamente${NC}"
else
    echo "❌ Error al construir el frontend"
    exit 1
fi

echo ""
echo -e "${BLUE}🚀 Iniciando servicios en modo producción...${NC}"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C para limpiar procesos
trap cleanup INT TERM

# Iniciar el backend
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar el frontend en modo preview
npm run preview &
FRONTEND_PID=$!

# Esperar un momento para que todo inicie
sleep 2

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ IGER Escuela Smart - Modo Producción Local${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🌐 Frontend:${NC} http://localhost:4173"
echo -e "${BLUE}🔌 Backend:${NC}  http://localhost:3001/api"
echo -e "${BLUE}❤️  Health:${NC}  http://localhost:3001/api/health"
echo ""
echo -e "${YELLOW}📝 Credenciales de prueba:${NC}"
echo "   Admin:      admin@iger.edu.gt / admin123"
echo "   Profesor:   profesor@iger.edu.gt / prof123"
echo "   Estudiante: estudiante@iger.edu.gt / est123"
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Presiona Ctrl+C para detener los servicios"
echo ""

# Esperar a que los procesos terminen
wait
