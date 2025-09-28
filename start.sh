#!/bin/bash
echo "🚀 Iniciando IGER Escuela Smart..."

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

echo "✅ Servidores iniciados!"
echo "📊 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener los servidores"

# Esperar a que se presione Ctrl+C
wait
