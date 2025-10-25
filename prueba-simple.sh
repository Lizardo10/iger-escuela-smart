#!/bin/bash

echo "🔧 PRUEBA SIMPLE DE CREACIÓN"
echo "============================"

# Obtener token
echo "🔐 Obteniendo token..."
token=$(curl -s -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"ana.martinez@iger.edu","password":"password123"}' | \
    grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$token" ]; then
    echo "✅ Token obtenido"
else
    echo "❌ Error obteniendo token"
    exit 1
fi

echo ""
echo "📚 Probando creación de lección..."
response=$(curl -s -X POST http://localhost:3001/api/lessons \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $token" \
    -d '{"title":"Lección de Prueba","description":"Descripción de prueba","teacher_id":"teacher-1","classroom_id":"aula-1a","subject":"Matemáticas","grade":"Primer Grado"}' \
    -w "HTTPSTATUS:%{http_code}")

http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')

echo "📋 Respuesta HTTP: $http_code"
echo "📋 Cuerpo: $body"

if [ "$http_code" = "201" ]; then
    echo "✅ Lección creada exitosamente"
else
    echo "❌ Error creando lección"
fi

echo ""
echo "📝 Probando creación de tarea..."
response=$(curl -s -X POST http://localhost:3001/api/tasks \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $token" \
    -d '{"title":"Tarea de Prueba","description":"Descripción de tarea","teacher_id":"teacher-1","classroom_id":"aula-1a","subject":"Matemáticas","grade":"Primer Grado","due_date":"2024-12-31"}' \
    -w "HTTPSTATUS:%{http_code}")

http_code=$(echo $response | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
body=$(echo $response | sed -e 's/HTTPSTATUS:.*//g')

echo "📋 Respuesta HTTP: $http_code"
echo "📋 Cuerpo: $body"

if [ "$http_code" = "201" ]; then
    echo "✅ Tarea creada exitosamente"
else
    echo "❌ Error creando tarea"
fi
