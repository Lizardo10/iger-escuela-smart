#!/bin/bash

# Script de inicio rápido para IGER Escuela Smart con SQLite
echo "🚀 Iniciando IGER Escuela Smart con SQLite..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

# Verificar si la base de datos existe
if [ ! -f "backend/database.sqlite" ]; then
    echo "🗄️ Inicializando base de datos SQLite..."
    cd backend && npm run init-db && cd ..
fi

# Verificar si el archivo .env existe
if [ ! -f "backend/.env" ]; then
    echo "⚙️ Configurando variables de entorno..."
    cp backend/env.example backend/.env
fi

echo "✅ Todo configurado correctamente!"
echo ""
echo "🎯 Iniciando servidores..."
echo "📊 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "👤 Credenciales de prueba:"
echo "   - Administrador: admin@iger.edu"
echo "   - Maestro: ana.martinez@iger.edu"
echo "   - Estudiante: maria.garcia@iger.edu"
echo ""
echo "Presiona Ctrl+C para detener los servidores"
echo ""

# Iniciar backend en background
echo "📡 Iniciando backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Esperar un poco para que el backend inicie
sleep 3

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

# Esperar a que se presione Ctrl+C
wait

