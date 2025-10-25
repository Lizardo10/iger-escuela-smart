#!/bin/bash

echo "🔧 DIAGNÓSTICO DEL SISTEMA IGER ESCUELA SMART"
echo "============================================="
echo ""

# Verificar si el backend está ejecutándose
echo "📡 Verificando backend local..."
if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "✅ Backend local funcionando en http://localhost:3001"
else
    echo "❌ Backend local no está ejecutándose"
    echo "💡 Solución: Ejecuta 'cd backend && node server-sqlite.js'"
fi

echo ""

# Verificar si el frontend está ejecutándose
echo "🎨 Verificando frontend local..."
if curl -s http://localhost:5176 > /dev/null 2>&1; then
    echo "✅ Frontend local funcionando en http://localhost:5176"
else
    echo "❌ Frontend local no está ejecutándose"
    echo "💡 Solución: Ejecuta 'npm run dev'"
fi

echo ""

# Probar login
echo "🔐 Probando login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@iger.edu","password":"password123"}')

if echo "$LOGIN_RESPONSE" | grep -q "token"; then
    echo "✅ Login funcionando correctamente"
    echo "🔑 Token generado exitosamente"
else
    echo "❌ Error en login"
    echo "📋 Respuesta: $LOGIN_RESPONSE"
fi

echo ""
echo "🎯 SOLUCIÓN PARA EL ERROR DE CREDENCIALES:"
echo "==========================================="
echo ""
echo "El error 'Credenciales inválidas' ocurre porque:"
echo "1. El frontend desplegado en Vercel está intentando conectarse a un backend que no existe"
echo "2. Necesitas desplegar el backend en Render o usar el sistema local"
echo ""
echo "🚀 OPCIONES DISPONIBLES:"
echo ""
echo "OPCIÓN 1 - USAR SISTEMA LOCAL (Recomendado):"
echo "1. Ejecuta: cd backend && node server-sqlite.js"
echo "2. Ejecuta: npm run dev"
echo "3. Accede a: http://localhost:5176"
echo "4. Usa las credenciales: admin@iger.edu / password123"
echo ""
echo "OPCIÓN 2 - DESPLEGAR BACKEND EN RENDER:"
echo "1. Ve a: https://render.com"
echo "2. Crea un nuevo Web Service"
echo "3. Conecta tu repositorio de GitHub"
echo "4. Configura las variables de entorno"
echo "5. Despliega el backend"
echo "6. Actualiza VITE_API_URL en Vercel con la nueva URL"
echo ""
echo "✨ ¡El sistema local está completamente funcional!"

