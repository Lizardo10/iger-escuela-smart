# 🔧 SOLUCIÓN ERROR DE CORS

## ❌ Problema Detectado

Error en prueba local:
```
Access to fetch at 'http://localhost:3001/api/auth/login' from origin 'http://localhost:4173' 
has been blocked by CORS policy
```

**Causa:** El backend solo acepta peticiones del puerto 5173 (dev), pero el preview corre en 4173.

---

## ✅ SOLUCIÓN APLICADA

He actualizado `backend/server-sqlite.js` para aceptar **ambos puertos**:
- ✅ `http://localhost:5173` (modo dev)
- ✅ `http://localhost:4173` (modo preview/producción local)

---

## 🚀 PASOS PARA ARREGLARLO

### 1. Detener el Backend

Si tienes el backend corriendo, presiona `Ctrl+C` en la terminal del backend.

### 2. Reiniciar el Backend

```bash
cd backend
npm start
```

O si usas nodemon:
```bash
cd backend
npm run dev
```

### 3. Verificar

Deberías ver en los logs:
```
✅ Conectado a la base de datos SQLite
🚀 Servidor IGER Backend ejecutándose en puerto 3001
```

### 4. Probar de Nuevo

1. Abre: http://localhost:4173
2. Intenta hacer login con: `admin@iger.edu.gt` / `admin123`
3. **¡Ahora debería funcionar!** ✅

---

## 🔍 VERIFICACIÓN

Si sigues teniendo problemas:

1. **Abre la consola del navegador** (F12)
2. Ve a la pestaña **Network**
3. Intenta login de nuevo
4. Click en la petición a `/api/auth/login`
5. Ve a **Headers**
6. Verifica que `Access-Control-Allow-Origin` incluya `http://localhost:4173`

---

## 📝 CONFIGURACIÓN PERMANENTE

Para evitar este problema en el futuro, puedes crear un archivo `.env` en `backend/`:

```env
# backend/.env
CORS_ORIGIN=http://localhost:5173,http://localhost:4173
```

Esto permite ambos puertos automáticamente.

---

## 🌐 PARA PRODUCCIÓN

Cuando despliegues en Vercel + Render:

**Render Environment:**
```
CORS_ORIGIN=https://tu-app.vercel.app
```

**Vercel Environment:**
```
VITE_API_URL=https://tu-backend.onrender.com/api
```

---

**Solución aplicada:** 30 de Septiembre, 2025
**Estado:** ✅ Listo - Solo reinicia el backend
