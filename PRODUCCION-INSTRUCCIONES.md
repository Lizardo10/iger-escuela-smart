# 🚀 INSTRUCCIONES RÁPIDAS PARA PRODUCCIÓN

## ✅ Estado del Proyecto
- ✅ Build del frontend completado exitosamente
- ✅ Backend configurado con SQLite
- ✅ Base de datos inicializada
- ✅ Scripts de producción creados
- ✅ Archivos de configuración para Vercel y Render listos

---

## 🎯 OPCIÓN 1: Producción Local (Más Rápido)

### Windows:
```bash
start-production.bat
```

Este comando hace TODO automáticamente:
1. Instala dependencias si no existen
2. Inicializa la base de datos si no existe
3. Construye el frontend optimizado
4. Inicia backend en puerto 3001
5. Inicia frontend en puerto 4173

**Acceder en:**
- 🌐 Frontend: http://localhost:4173
- 🔌 Backend API: http://localhost:3001/api
- ❤️ Health Check: http://localhost:3001/api/health

---

## 🌐 OPCIÓN 2: Desplegar en la Nube (Vercel + Render)

### PASO 1: Subir código a GitHub
```bash
git add .
git commit -m "Configuración de producción lista"
git push origin main
```

### PASO 2: Desplegar Backend en Render

1. **Ir a:** https://render.com
2. **Click:** "New +" → "Web Service"
3. **Conectar** tu repositorio de GitHub
4. **Configurar:**
   - Name: `iger-backend`
   - Region: Oregon
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install && node scripts/init-database-fixed.js`
   - Start Command: `npm start`
   - Instance Type: Free

5. **Variables de Entorno (Environment):**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=iger-secret-2024-CAMBIAR-ESTA-CLAVE-AHORA
   CORS_ORIGIN=https://tu-app.vercel.app
   ```
   ⚠️ **IMPORTANTE:** Cambia `JWT_SECRET` por algo seguro

6. **Click:** "Create Web Service"
7. **Copiar** la URL (ej: `https://iger-backend.onrender.com`)

### PASO 3: Desplegar Frontend en Vercel

1. **Ir a:** https://vercel.com
2. **Click:** "Add New..." → "Project"
3. **Importar** tu repositorio de GitHub
4. **Configurar:**
   - Framework Preset: Vite
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Variables de Entorno (Environment Variables):**
   ```
   VITE_API_URL=https://iger-backend.onrender.com/api
   ```
   ⚠️ Reemplaza con tu URL real de Render

6. **Click:** "Deploy"
7. **Copiar** la URL (ej: `https://tu-app.vercel.app`)

### PASO 4: Actualizar CORS

1. Volver a **Render Dashboard**
2. Ir a tu servicio backend
3. **Environment** → Editar `CORS_ORIGIN`
4. Cambiar a: `https://tu-app.vercel.app` (tu URL real de Vercel)
5. Guardar (se redesplega automáticamente)

---

## 🔐 Credenciales de Prueba

### Administrador
```
Email: admin@iger.edu.gt
Password: admin123
```

### Profesor
```
Email: profesor@iger.edu.gt
Password: prof123
```

### Estudiante
```
Email: estudiante@iger.edu.gt
Password: est123
```

---

## 🐛 Solución de Problemas

### Error: "CORS policy"
- Verifica que `CORS_ORIGIN` en Render coincida con tu URL de Vercel
- No incluyas `/` al final

### Error: "Backend no responde"
- En Render Free tier, la primera petición tarda ~30 segundos
- Verifica que `VITE_API_URL` sea correcta
- Revisa logs en Render Dashboard

### Error: "Login no funciona"
- Verifica que el backend esté corriendo
- Abre la consola del navegador (F12) para ver errores
- Verifica `/api/health` en tu backend

---

## 📊 Comandos Útiles

### Desarrollo Local
```bash
# Frontend
npm run dev          # Puerto 5173

# Backend
cd backend
npm run dev          # Puerto 3001
```

### Producción Local
```bash
# Todo junto
start-production.bat  # Windows

# O manualmente:
npm run build        # Construir frontend
npm run preview      # Preview en puerto 4173

cd backend
npm start            # Backend en puerto 3001
```

### Reiniciar Base de Datos
```bash
cd backend
npm run init-db
```

---

## 📁 Archivos Importantes

- `vercel.json` - Config para Vercel
- `render.yaml` - Config para Render
- `DEPLOY.md` - Guía detallada completa
- `start-production.bat` - Script de producción Windows
- `start-production.sh` - Script de producción Linux/Mac

---

## ⚠️ Notas Importantes

### Render Free Tier
- Se apaga después de 15 min de inactividad
- Primera petición puede tardar ~30 segundos
- Los archivos se borran cada 7 días de inactividad
- Para 24/7 considera plan pagado

### Base de Datos
- SQLite funciona bien para demos/pequeños proyectos
- Para producción seria considerar PostgreSQL
- Los datos se reinician con cada redespliegue en Render

### Vercel
- ✅ Siempre disponible
- ✅ CDN global
- ✅ SSL automático
- ✅ Redespliegue automático con cada push

---

## 🎉 ¡Todo Listo!

Tu proyecto está completamente configurado para:
- ✅ Desarrollo local
- ✅ Producción local
- ✅ Despliegue en Vercel (Frontend)
- ✅ Despliegue en Render (Backend)

**¿Necesitas más ayuda?**
- Guía detallada: Ver `DEPLOY.md`
- Guía rápida: Ver `README-PRODUCCION.md`

---

**Creado:** $(date)
**Estado:** ✅ LISTO PARA PRODUCCIÓN
