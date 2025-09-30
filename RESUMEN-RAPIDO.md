# ⚡ RESUMEN RÁPIDO - DESPLIEGUE MANUAL

## 🎯 5 PASOS PRINCIPALES

### 1️⃣ PREPARAR (5 min)
```bash
npm install
cd backend && npm install && cd ..
npm run build
```

### 2️⃣ GITHUB (3 min)
```bash
git init
git add .
git commit -m "Ready for production"
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 3️⃣ RENDER - Backend (10 min)

1. https://dashboard.render.com → New Web Service
2. Conectar tu repo de GitHub
3. **Root Directory:** `backend`
4. **Build:** `npm install && node scripts/init-database-fixed.js`
5. **Start:** `npm start`
6. **Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=tu-clave-secreta-larga
   CORS_ORIGIN=https://placeholder.vercel.app
   ```
7. Create Web Service
8. **Copiar URL:** `https://tu-backend.onrender.com`

### 4️⃣ VERCEL - Frontend (5 min)

1. https://vercel.com/new → Import Git Repository
2. Importar tu repo
3. Framework: Vite
4. **Variable:**
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```
5. Deploy
6. **Copiar URL:** `https://tu-proyecto.vercel.app`

### 5️⃣ CONECTAR (2 min)

1. Render → Environment
2. Editar `CORS_ORIGIN` → `https://tu-proyecto.vercel.app`
3. Save (auto-redeploy)

---

## ✅ VERIFICAR

1. Backend: `https://tu-backend.onrender.com/api/health`
2. Frontend: `https://tu-proyecto.vercel.app`
3. Login: `admin@iger.edu.gt` / `admin123`

---

## 🎉 ¡LISTO!

**Guía completa:** Ver `MANUAL-PASO-A-PASO.md`

---

**Tiempo total:** ~25 minutos
