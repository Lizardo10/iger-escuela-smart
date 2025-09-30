# 🚀 Guía de Despliegue - IGER Escuela Smart

## 📋 Requisitos Previos

- Cuenta en [Vercel](https://vercel.com) (para Frontend)
- Cuenta en [Render](https://render.com) (para Backend)
- Git instalado

---

## 🔧 Paso 1: Desplegar Backend en Render

### 1.1 Crear nuevo Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:
   - **Name**: `iger-backend` (o el nombre que prefieras)
   - **Region**: Oregon (o la más cercana)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && node scripts/init-database-fixed.js`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 1.2 Configurar Variables de Entorno

En la sección **Environment** de Render, agrega:

```
NODE_ENV=production
PORT=10000
JWT_SECRET=tu-clave-secreta-muy-segura-cambiala-aqui
CORS_ORIGIN=https://tu-app.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

⚠️ **IMPORTANTE**: 
- Cambia `JWT_SECRET` por una clave aleatoria y segura
- Actualiza `CORS_ORIGIN` después de desplegar el frontend

### 1.3 Desplegar

1. Click en **"Create Web Service"**
2. Espera a que termine el deployment
3. Copia la URL de tu backend (ej: `https://iger-backend.onrender.com`)

---

## 🌐 Paso 2: Desplegar Frontend en Vercel

### 2.1 Crear nuevo proyecto en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Configura el proyecto:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raíz del proyecto)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.2 Configurar Variables de Entorno

En la sección **Environment Variables**, agrega:

```
VITE_API_URL=https://tu-backend.onrender.com/api
```

⚠️ **IMPORTANTE**: 
- Reemplaza `tu-backend.onrender.com` con la URL real de tu backend en Render

### 2.3 Desplegar

1. Click en **"Deploy"**
2. Espera a que termine el deployment
3. Copia la URL de tu frontend (ej: `https://tu-app.vercel.app`)

---

## 🔄 Paso 3: Actualizar CORS en el Backend

1. Regresa a Render Dashboard
2. Ve a tu servicio backend
3. En **Environment**, actualiza:
   ```
   CORS_ORIGIN=https://tu-app.vercel.app
   ```
4. Guarda los cambios (se redesplega automáticamente)

---

## ✅ Paso 4: Verificar el Despliegue

### 4.1 Verificar Backend

Visita: `https://tu-backend.onrender.com/api/health`

Deberías ver:
```json
{
  "status": "OK",
  "message": "IGER Backend API funcionando correctamente con SQLite"
}
```

### 4.2 Verificar Frontend

1. Visita tu URL de Vercel
2. Intenta hacer login con las credenciales de prueba:
   - **Admin**: admin@iger.edu.gt / admin123
   - **Profesor**: profesor@iger.edu.gt / prof123
   - **Estudiante**: estudiante@iger.edu.gt / est123

---

## 🔐 Credenciales de Prueba

### Administrador
- Email: `admin@iger.edu.gt`
- Password: `admin123`

### Profesor
- Email: `profesor@iger.edu.gt`
- Password: `prof123`

### Estudiante
- Email: `estudiante@iger.edu.gt`
- Password: `est123`

---

## 🛠️ Comandos Útiles para Desarrollo Local

### Frontend
```bash
npm run dev          # Modo desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build
npm run prod         # Build + Preview
```

### Backend
```bash
cd backend
npm run dev          # Modo desarrollo con nodemon
npm start            # Iniciar servidor producción
npm run init-db      # Reinicializar base de datos
```

### Ambos (con scripts auxiliares)
```bash
# Windows
start-complete.bat   # Inicia frontend y backend

# Linux/Mac
./start-complete.sh  # Inicia frontend y backend
```

---

## 📝 Notas Importantes

### Render (Free Tier)
- ⚠️ El servicio se apaga después de 15 minutos de inactividad
- La primera petición después de inactividad puede tardar ~30 segundos
- Para mantenerlo activo 24/7, considera actualizar al plan pagado

### Base de Datos SQLite
- ⚠️ En Render Free, los archivos se borran después de 7 días de inactividad
- Para producción seria, considera migrar a PostgreSQL
- Los datos se reinicializan cada vez que se redesplega

### Vercel
- ✅ El frontend está siempre disponible
- ✅ CDN global para mejor rendimiento
- ✅ SSL automático

---

## 🐛 Solución de Problemas

### Error de CORS
- Verifica que `CORS_ORIGIN` en Render coincida con tu URL de Vercel
- No incluyas `/` al final de la URL

### Backend no responde
- Verifica que la URL en `VITE_API_URL` sea correcta
- Revisa los logs en Render Dashboard
- Espera ~30 segundos en la primera petición (free tier)

### Login no funciona
- Verifica que el backend esté funcionando (`/api/health`)
- Revisa la consola del navegador para errores
- Verifica que `JWT_SECRET` esté configurado en Render

---

## 📊 Monitoreo

### Render
- Dashboard → Logs: Ver logs en tiempo real
- Dashboard → Metrics: Ver uso de recursos

### Vercel
- Dashboard → Deployments: Ver historial
- Dashboard → Analytics: Ver tráfico y rendimiento

---

## 🚀 Redespliegue

### Frontend (Vercel)
- Push a GitHub → Vercel despliega automáticamente
- O en Vercel Dashboard → Deployments → Redeploy

### Backend (Render)
- Push a GitHub → Render despliega automáticamente
- O en Render Dashboard → Manual Deploy

---

## 📞 Soporte

Para más ayuda, revisa:
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Render](https://render.com/docs)

---

¡Listo! Tu aplicación IGER Escuela Smart está en producción 🎉
