# ✅ CHECKLIST DE DESPLIEGUE

## 📋 Pre-Despliegue

### Local
- [ ] Backend funciona: `cd backend && npm start`
- [ ] Frontend funciona: `npm run dev`
- [ ] Base de datos inicializada: `backend/database.sqlite` existe
- [ ] Build exitoso: `npm run build` sin errores
- [ ] Health check funciona: http://localhost:3001/api/health
- [ ] Login funciona con credenciales de prueba

### GitHub
- [ ] Código subido a GitHub
- [ ] Branch `main` actualizada
- [ ] `.gitignore` configurado (no subir `.env`, `node_modules`)
- [ ] Archivos de configuración presentes:
  - [ ] `vercel.json`
  - [ ] `render.yaml`
  - [ ] `.vercelignore`
  - [ ] `.renderignore`

---

## 🔌 Backend (Render)

### Configuración
- [ ] Web Service creado en Render
- [ ] Repositorio conectado
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && node scripts/init-database-fixed.js`
- [ ] Start Command: `npm start`
- [ ] Runtime: Node
- [ ] Instance: Free (o el que prefieras)

### Variables de Entorno
- [ ] `NODE_ENV=production`
- [ ] `PORT=10000`
- [ ] `JWT_SECRET=` (clave única y segura)
- [ ] `CORS_ORIGIN=` (URL de Vercel)
- [ ] `RATE_LIMIT_WINDOW_MS=900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS=100`

### Verificación
- [ ] Deploy completado sin errores
- [ ] URL del backend copiada (ej: `https://xxx.onrender.com`)
- [ ] Health check funciona: `https://xxx.onrender.com/api/health`
- [ ] Respuesta JSON: `{"status":"OK",...}`

---

## 🌐 Frontend (Vercel)

### Configuración
- [ ] Proyecto creado en Vercel
- [ ] Repositorio importado
- [ ] Framework Preset: Vite
- [ ] Root Directory: `./`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Variables de Entorno
- [ ] `VITE_API_URL=https://tu-backend.onrender.com/api`
  - [ ] URL del backend correcta (de Render)
  - [ ] Incluye `/api` al final
  - [ ] Sin `/` final después de `/api`

### Verificación
- [ ] Deploy completado sin errores
- [ ] URL del frontend copiada (ej: `https://xxx.vercel.app`)
- [ ] Página carga correctamente
- [ ] No hay errores de CORS en consola (F12)
- [ ] Formulario de login visible

---

## 🔄 Post-Despliegue

### Actualizar CORS
- [ ] Volver a Render Dashboard
- [ ] Ir a tu servicio backend
- [ ] Environment → Editar `CORS_ORIGIN`
- [ ] Poner URL real de Vercel: `https://xxx.vercel.app`
- [ ] Guardar (auto-redeploy)
- [ ] Esperar ~2 minutos para redeploy

### Pruebas Funcionales
- [ ] Abrir URL de Vercel
- [ ] Login como Admin: `admin@iger.edu.gt` / `admin123`
- [ ] Dashboard carga correctamente
- [ ] Navegar entre secciones
- [ ] Verificar que datos se cargan (usuarios, aulas, etc.)
- [ ] Logout y login con otro rol
- [ ] Login como Profesor y Estudiante

### Pruebas de API
- [ ] Backend responde: `https://xxx.onrender.com/api/health`
- [ ] Sin errores CORS en consola
- [ ] Requests a `/api/users`, `/api/classrooms` funcionan
- [ ] Tokens JWT se generan correctamente

---

## 🐛 Troubleshooting

### ❌ Error: CORS Policy
- [ ] `CORS_ORIGIN` en Render = URL exacta de Vercel
- [ ] Sin `/` al final de `CORS_ORIGIN`
- [ ] Backend redeployado después de cambiar CORS

### ❌ Error: Backend no responde
- [ ] Primera petición = esperar 30 segundos (Render free)
- [ ] `VITE_API_URL` correcta en Vercel
- [ ] Incluye `/api` en la URL
- [ ] Backend está corriendo (check Render logs)

### ❌ Error: Login falla
- [ ] Health check funciona primero
- [ ] Consola del navegador (F12) muestra error específico
- [ ] `JWT_SECRET` configurado en Render
- [ ] Base de datos inicializada correctamente

### ❌ Error: Build falla
**Vercel:**
- [ ] `package.json` tiene `"build": "vite build"`
- [ ] Todas las dependencias en `dependencies` (no solo `devDependencies`)

**Render:**
- [ ] Build command correcto
- [ ] `backend/package.json` existe
- [ ] Scripts de inicialización existen

---

## 📊 Monitoreo

### Render
- [ ] Dashboard → Logs = sin errores críticos
- [ ] Dashboard → Metrics = uso razonable
- [ ] Configurar alertas (opcional)

### Vercel
- [ ] Dashboard → Deployments = deploy exitoso
- [ ] Dashboard → Analytics = tráfico funcionando
- [ ] No hay errores de función

---

## 🔐 Seguridad

### Credenciales
- [ ] `JWT_SECRET` es único y seguro (64+ caracteres aleatorios)
- [ ] No usar `JWT_SECRET` de ejemplo
- [ ] Credenciales de admin cambiadas (recomendado para producción real)

### Variables
- [ ] Archivos `.env` NO están en GitHub
- [ ] `.gitignore` configurado correctamente
- [ ] Variables sensibles solo en Render/Vercel dashboards

---

## 📝 Documentación

- [ ] README.md actualizado con URLs de producción
- [ ] Credenciales documentadas (si es demo)
- [ ] Usuarios saben cómo acceder al sistema

---

## 🎉 Finalización

### Todo OK cuando:
- ✅ Frontend carga en Vercel
- ✅ Backend responde en Render
- ✅ Login funciona con las 3 cuentas
- ✅ No hay errores en consola
- ✅ Datos se cargan correctamente
- ✅ Navegación entre secciones funciona

---

## 📞 Soporte

### Render Issues
- Logs: Render Dashboard → Logs
- Docs: https://render.com/docs

### Vercel Issues
- Logs: Vercel Dashboard → Deployments → View Function Logs
- Docs: https://vercel.com/docs

---

**Última revisión:** $(date)
**Estado:** ⬜ Pendiente | 🔄 En Progreso | ✅ Completado
