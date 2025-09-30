# 🚀 IGER Escuela Smart - Producción

## ⚡ Inicio Rápido para Producción

### 🪟 Windows
```bash
start-production.bat
```

### 🐧 Linux / Mac
```bash
./start-production.sh
```

Este comando automáticamente:
1. ✅ Instala todas las dependencias
2. ✅ Inicializa la base de datos
3. ✅ Construye el frontend para producción
4. ✅ Inicia backend y frontend en modo producción

---

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:4173
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

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

## 🚢 Desplegar en la Nube

Para desplegar en **Vercel** y **Render**, sigue la guía completa en:

📖 **[DEPLOY.md](./DEPLOY.md)**

---

## 📝 Configuración de Variables de Entorno

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (backend/.env)
```env
NODE_ENV=production
PORT=3001
JWT_SECRET=tu-clave-secreta-aqui
CORS_ORIGIN=http://localhost:5173
```

---

## 🛠️ Comandos Manuales

### Frontend
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview producción
npm run preview

# Build + Preview
npm run prod
```

### Backend
```bash
cd backend

# Desarrollo
npm run dev

# Producción
npm start

# Inicializar DB
npm run init-db
```

---

## ✅ Verificación

1. **Backend funcionando:**
   ```bash
   curl http://localhost:3001/api/health
   ```
   
   Respuesta esperada:
   ```json
   {
     "status": "OK",
     "message": "IGER Backend API funcionando correctamente con SQLite"
   }
   ```

2. **Frontend funcionando:**
   - Abre http://localhost:4173
   - Deberías ver la página de login

---

## 🐛 Solución de Problemas

### Error: Puerto en uso
```bash
# Windows
netstat -ano | findstr :4173
netstat -ano | findstr :3001

# Linux/Mac
lsof -ti:4173
lsof -ti:3001
```

### Error: Módulos no encontrados
```bash
# Reinstalar dependencias
npm install
cd backend && npm install && cd ..
```

### Error: Base de datos corrupta
```bash
cd backend
npm run init-db
cd ..
```

---

## 📊 Estructura del Proyecto

```
proyecto_analisis/
├── backend/                 # API Backend (Express + SQLite)
│   ├── database.sqlite     # Base de datos
│   ├── server-sqlite.js    # Servidor principal
│   └── scripts/            # Scripts de inicialización
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # Componentes React
│   ├── services/          # Servicios API
│   └── hooks/             # Custom Hooks
├── vercel.json            # Config Vercel
├── render.yaml            # Config Render
└── DEPLOY.md             # Guía de despliegue
```

---

## 📚 Documentación

- **[DEPLOY.md](./DEPLOY.md)** - Guía completa de despliegue
- **[README.md](./README.md)** - Documentación general
- **[SISTEMA_COMPLETO.md](./SISTEMA_COMPLETO.md)** - Documentación del sistema

---

## 🎯 Próximos Pasos

1. ✅ Prueba el sistema localmente
2. 📤 Despliega en Vercel y Render
3. 🔐 Cambia las credenciales de producción
4. 🔒 Actualiza el `JWT_SECRET`
5. 📊 Configura monitoreo

---

¡Listo para producción! 🎉
