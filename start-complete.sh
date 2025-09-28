#!/bin/bash

echo "========================================"
echo "   IGER Escuela Smart - Inicio Completo"
echo "========================================"
echo

echo "🔄 Iniciando servidor backend..."
cd backend && node server-sqlite.js &
BACKEND_PID=$!

echo "⏳ Esperando 3 segundos para que el backend inicie..."
sleep 3

echo "🚀 Iniciando aplicación frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo
echo "✅ Ambos servidores iniciados correctamente!"
echo
echo "📱 Frontend: http://localhost:5173/"
echo "🔧 Backend:  http://localhost:3001/api"
echo
echo "Presiona Ctrl+C para detener ambos servidores..."

# Función para limpiar procesos al salir
cleanup() {
    echo
    echo "🛑 Deteniendo servidores..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Esperar a que termine cualquiera de los procesos
wait
