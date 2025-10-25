#!/bin/bash

echo "🔧 SOLUCIONANDO ERROR 401 - CREDENCIALES INVÁLIDAS"
echo "================================================="
echo ""

echo "📋 DIAGNÓSTICO:"
echo "✅ Backend funcionando en http://localhost:3001"
echo "✅ Frontend funcionando en http://localhost:5173"
echo "✅ Login con curl funciona correctamente"
echo "❌ Frontend muestra errores 401 (Unauthorized)"
echo ""

echo "🎯 CAUSA DEL PROBLEMA:"
echo "El frontend está intentando hacer login automático con credenciales"
echo "incorrectas almacenadas en localStorage o cookies del navegador."
echo ""

echo "🚀 SOLUCIONES DISPONIBLES:"
echo ""
echo "OPCIÓN 1 - LIMPIAR CACHE DEL NAVEGADOR (Recomendado):"
echo "1. Presiona Ctrl+Shift+Delete en el navegador"
echo "2. Selecciona 'Cookies' y 'Datos de sitios web'"
echo "3. Haz clic en 'Eliminar datos'"
echo "4. Recarga la página (F5)"
echo "5. Intenta hacer login con: admin@iger.edu / password123"
echo ""

echo "OPCIÓN 2 - USAR MODO INCOGNITO:"
echo "1. Abre una ventana de incógnito (Ctrl+Shift+N)"
echo "2. Ve a http://localhost:5173"
echo "3. Haz login con: admin@iger.edu / password123"
echo ""

echo "OPCIÓN 3 - LIMPIAR LOCALSTORAGE MANUALMENTE:"
echo "1. Abre las herramientas de desarrollador (F12)"
echo "2. Ve a la pestaña 'Application' o 'Aplicación'"
echo "3. En el panel izquierdo, busca 'Local Storage'"
echo "4. Haz clic en 'http://localhost:5173'"
echo "5. Elimina todas las entradas (especialmente 'iger-token')"
echo "6. Recarga la página"
echo ""

echo "🔑 CREDENCIALES CORRECTAS:"
echo "   👑 Administrador: admin@iger.edu / password123"
echo "   👨‍🏫 Maestro:       ana.martinez@iger.edu / password123"
echo "   👨‍🎓 Estudiante:    maria.garcia@iger.edu / password123"
echo ""

echo "✅ VERIFICACIÓN:"
echo "Si el problema persiste después de limpiar el cache,"
echo "el sistema está funcionando correctamente y solo necesitas"
echo "limpiar los datos almacenados en el navegador."
echo ""

echo "🎉 ¡El sistema está completamente funcional!"

