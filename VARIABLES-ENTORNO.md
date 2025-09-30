# 🔧 Variables de Entorno - Guía Completa

## 📋 Frontend (React + Vite)

### Desarrollo Local
Crear archivo `.env.local` en la raíz del proyecto:

```env
# API Backend URL
VITE_API_URL=http://localhost:3001/api
```

### Producción en Vercel
Configurar en Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://tu-backend.onrender.com/api
```

⚠️ **IMPORTANTE:** 
- Las variables en Vite DEBEN empezar con `VITE_`
- Después de cambiar variables, hacer rebuild

---

## 🔌 Backend (Node.js + Express)

### Desarrollo Local
Crear archivo `.env` en la carpeta `backend/`:

```env
# Entorno
NODE_ENV=development

# Puerto
PORT=3001

# JWT Secret (cambiar en producción)
JWT_SECRET=iger-secret-key-2024-development

# CORS Origin
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Producción en Render
Configurar en Render Dashboard → Environment:

```env
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-super-secreta-y-aleatoria-cambiar-AHORA
CORS_ORIGIN=https://tu-app.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

⚠️ **CRÍTICO:**
- `JWT_SECRET` debe ser único y seguro en producción
- `CORS_ORIGIN` debe coincidir con tu URL de Vercel
- No subir archivo `.env` a GitHub (está en `.gitignore`)

---

## 🔐 Generar JWT_SECRET Seguro

### Opción 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Opción 2: PowerShell
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

### Opción 3: Online
- https://randomkeygen.com/
- Usar "CodeIgniter Encryption Keys"

---

## 📝 Plantillas de Archivos

### `.env.local` (Frontend - Raíz del proyecto)
```env
# Desarrollo Local
VITE_API_URL=http://localhost:3001/api

# Para probar contra producción:
# VITE_API_URL=https://tu-backend.onrender.com/api
```

### `backend/.env` (Backend)
```env
NODE_ENV=development
PORT=3001
JWT_SECRET=iger-dev-secret-2024
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ✅ Verificación

### 1. Verificar Frontend
```bash
# En el código, debería imprimir la URL del API
console.log(import.meta.env.VITE_API_URL)
```

### 2. Verificar Backend
```bash
# Probar endpoint de health
curl http://localhost:3001/api/health

# O abrir en navegador
http://localhost:3001/api/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "message": "IGER Backend API funcionando correctamente con SQLite"
}
```

---

## 🚨 Errores Comunes

### Error: "VITE_API_URL is undefined"
**Solución:** 
- Crear archivo `.env.local` en la raíz
- Reiniciar el servidor de desarrollo (`npm run dev`)

### Error: "CORS policy has blocked"
**Solución:**
- Verificar que `CORS_ORIGIN` en backend coincida con la URL del frontend
- En desarrollo: `http://localhost:5173`
- En producción: `https://tu-app.vercel.app`

### Error: "JWT_SECRET not found"
**Solución:**
- Crear archivo `backend/.env`
- Agregar `JWT_SECRET=tu-clave-aqui`
- Reiniciar servidor backend

---

## 📦 Archivos .gitignore

Verificar que `.gitignore` incluya:

```gitignore
# Variables de entorno
.env
.env.local
.env.production
.env.development
backend/.env
backend/.env.local
backend/.env.production

# Dependencias
node_modules/
backend/node_modules/

# Build
dist/
build/

# Base de datos local
*.sqlite
*.db
```

---

## 🔄 Flujo de Trabajo

### Desarrollo Local
1. Crear `.env.local` en raíz
2. Crear `backend/.env`
3. Iniciar backend: `cd backend && npm run dev`
4. Iniciar frontend: `npm run dev`

### Producción
1. Configurar variables en Vercel (Frontend)
2. Configurar variables en Render (Backend)
3. Hacer push a GitHub
4. Despliegue automático

---

## 📚 Referencias

- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Node.js dotenv](https://www.npmjs.com/package/dotenv)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Render Environment Variables](https://render.com/docs/environment-variables)

---

¡Variables de entorno configuradas correctamente! ✅
