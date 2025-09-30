# ⚡ INICIO RÁPIDO - 3 PASOS

## 🎯 Opción 1: Producción Local (2 minutos)

### Windows:
```bash
start-production.bat
```

### Linux/Mac:
```bash
./start-production.sh
```

**¡Listo!** Abre: http://localhost:4173

---

## 🌐 Opción 2: Desplegar en la Nube (10 minutos)

### PASO 1: GitHub
```bash
git add .
git commit -m "Ready for production"
git push
```

### PASO 2: Render (Backend)
1. https://render.com → New Web Service
2. Conectar repo → Root: `backend`
3. Build: `npm install && node scripts/init-database-fixed.js`
4. Start: `npm start`
5. Variables:
   ```
   JWT_SECRET=cambiar-por-clave-segura
   CORS_ORIGIN=https://tu-app.vercel.app
   ```

### PASO 3: Vercel (Frontend)
1. https://vercel.com → New Project
2. Framework: Vite
3. Variable:
   ```
   VITE_API_URL=https://tu-backend.onrender.com/api
   ```

### PASO 4: Actualizar CORS
Render → Environment → `CORS_ORIGIN` = tu URL de Vercel

---

## 🔐 Login

```
admin@iger.edu.gt / admin123
profesor@iger.edu.gt / prof123
estudiante@iger.edu.gt / est123
```

---

## 📚 Más Info

- Guía detallada: `DEPLOY.md`
- Variables: `VARIABLES-ENTORNO.md`
- Instrucciones: `PRODUCCION-INSTRUCCIONES.md`
