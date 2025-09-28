# 🔧 Solución de Problemas de Conexión - IGER Escuela Smart

## ❌ Problema Identificado
Error de conexión con la base de datos local SQLite.

## ✅ Solución Implementada

### 1. **Base de Datos SQLite Creada**
- ✅ Base de datos inicializada correctamente
- ✅ Usuarios de prueba creados
- ✅ Esquema completo ejecutado

### 2. **Servidor Backend Funcionando**
- ✅ Puerto: 3001
- ✅ API disponible en: http://localhost:3001/api
- ✅ Health check: http://localhost:3001/api/health

### 3. **Usuarios de Prueba Disponibles**
```
👤 Administrador: admin@iger.edu
👩‍🏫 Maestro: ana.martinez@iger.edu  
👧 Estudiante: maria.garcia@iger.edu
```

## 🚀 Cómo Iniciar la Aplicación

### **Opción 1: Script Inteligente (Recomendado)**
```bash
# Windows - Detecta si ya están corriendo
start-iger.bat

# Linux/Mac
./start-complete.sh
```

### **Opción 2: Script Completo**
```bash
# Windows
start-complete.bat

# Linux/Mac
./start-complete.sh
```

### **Opción 3: Manual**
```bash
# Terminal 1 - Backend
cd backend
node server-sqlite.js

# Terminal 2 - Frontend  
npm run dev
```

### **🛑 Detener Servidores**
```bash
# Windows - Detener todos los servidores
stop-iger.bat

# O manualmente:
# Ctrl+C en cada terminal
```

## 🔍 Verificar que Todo Funciona

### 1. **Backend (Puerto 3001)**
```bash
curl http://localhost:3001/api/health
```
**Respuesta esperada:**
```json
{
  "status": "OK",
  "message": "IGER Backend API funcionando correctamente con SQLite"
}
```

### 2. **Frontend (Puerto 5173)**
- Abre: http://localhost:5173/
- Deberías ver la pantalla de login con el logo animado

### 3. **Login de Prueba**
- Usa cualquiera de los emails de prueba
- No necesitas contraseña (login simplificado)

## 🛠️ Solución de Problemas

### **Error: "Cannot connect to database"**
```bash
# Recrear la base de datos
cd backend
node scripts/init-database-fixed.js
```

### **Error: "Port 3001 already in use"**
```bash
# Encontrar y matar el proceso
netstat -ano | findstr :3001
taskkill /PID [PID_NUMBER] /F
```

### **Error: "Port 5173 already in use"**
```bash
# Encontrar y matar el proceso
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

### **Error: "Module not found"**
```bash
# Instalar dependencias
npm install
cd backend
npm install
```

## 📁 Estructura de Archivos Importantes

```
proyecto_analisis/
├── backend/
│   ├── database.sqlite          # Base de datos SQLite
│   ├── server-sqlite.js         # Servidor backend
│   └── scripts/
│       └── init-database-fixed.js
├── src/
│   ├── services/
│   │   └── apiService.ts        # Configuración API
│   └── components/
├── start-complete.bat           # Script Windows
├── start-complete.sh            # Script Linux/Mac
└── INSTRUCCIONES-CONEXION.md    # Este archivo
```

## 🎯 Estado Actual

- ✅ **Base de datos**: SQLite funcionando
- ✅ **Backend**: Servidor corriendo en puerto 3001
- ✅ **Frontend**: Aplicación React en puerto 5173
- ✅ **Conexión**: API conectada correctamente
- ✅ **Usuarios**: Datos de prueba disponibles
- ✅ **Logo**: Animado y responsivo

## 🆘 Si Aún Tienes Problemas

1. **Verifica que ambos puertos estén libres:**
   ```bash
   netstat -ano | findstr :3001
   netstat -ano | findstr :5173
   ```

2. **Reinicia completamente:**
   ```bash
   # Cerrar todos los procesos
   # Ejecutar start-complete.bat
   ```

3. **Verifica la consola del navegador:**
   - F12 → Console
   - Busca errores de red o JavaScript

4. **Revisa los logs del backend:**
   - Deberías ver: "✅ Conectado a la base de datos SQLite"
   - Deberías ver: "🚀 Servidor IGER Backend ejecutándose en puerto 3001"

¡Tu aplicación IGER Escuela Smart debería estar funcionando perfectamente ahora! 🎉
