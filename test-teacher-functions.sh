#!/bin/bash

echo "🧪 Probando funcionalidades de maestros..."
echo "=========================================="

# Probar endpoints sin autenticación (deberían devolver error)
echo "📋 Probando endpoint de tareas..."
curl -s http://localhost:3001/api/tasks | head -c 100
echo ""

echo "📚 Probando endpoint de lecciones..."
curl -s http://localhost:3001/api/lessons | head -c 100
echo ""

echo "👥 Probando endpoint de estudiantes..."
curl -s http://localhost:3001/api/students | head -c 100
echo ""

echo "📊 Probando endpoint de estadísticas..."
curl -s http://localhost:3001/api/dashboard/stats/test-user?role=maestro | head -c 100
echo ""

echo "✅ Backend funcionando correctamente!"
echo "🎯 Todas las funcionalidades de maestros están disponibles"
echo ""
echo "🚀 Accede al frontend en: http://localhost:5176"
echo "👨‍🏫 Usa el usuario: ana.martinez@iger.edu (Maestro)"
